const Attendance = require('../models/Attendance');
const asyncHandler = require('../../../shared/middleware/asyncHandler');

// ─── GET /api/attendance ─────────────────────────────────────────────────────
// Query: ?month=9&year=2026&employeeId=...
const getMonthlyAttendance = asyncHandler(async (req, res) => {
  const { month, year, employeeId } = req.query;

  if (!month || !year) {
    return res.status(400).json({ success: false, message: 'month and year query params are required' });
  }

  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  const query = { date: new RegExp(`^${monthStr}`) };
  if (employeeId && employeeId !== 'all') query.employee = employeeId;

  const records = await Attendance.find(query).sort({ date: 1, employee: 1 });

  res.json({ success: true, count: records.length, data: records });
});

// ─── GET /api/attendance/summary ──────────────────────────────────────────────
// Returns aggregate counts for a given month/year/employee
const getAttendanceSummary = asyncHandler(async (req, res) => {
  const { month, year, employeeId } = req.query;
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;

  const matchStage = { date: new RegExp(`^${monthStr}`) };
  if (employeeId && employeeId !== 'all') matchStage.employee = require('mongoose').Types.ObjectId.createFromHexString(employeeId);

  const summary = await Attendance.aggregate([
    { $match: matchStage },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  const result = {
    present: 0, late: 0, absent: 0,
    half_day: 0, holiday: 0, day_off: 0, on_leave: 0
  };
  summary.forEach(s => {
    if (result[s._id] !== undefined) result[s._id] = s.count;
  });

  res.json({ success: true, data: result });
});

// ─── POST /api/attendance ─────────────────────────────────────────────────────
const markAttendance = asyncHandler(async (req, res) => {
  const { employee, date, status, clockInTime, clockOutTime, notes, markedBy } = req.body;

  if (!employee || !date || !status) {
    return res.status(400).json({ success: false, message: 'employee, date, and status are required' });
  }

  // Upsert: update existing or create new
  const record = await Attendance.findOneAndUpdate(
    { employee, date },
    { employee, date, status, clockInTime, clockOutTime, notes, markedBy: markedBy || 'HR Admin' },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
  );

  // Re-fetch so pre-save hooks are applied via findOneAndUpdate won't trigger pre-save
  // So we manually compute here:
  if (clockInTime && clockOutTime) {
    const [inH, inM, inS = 0] = clockInTime.split(':').map(Number);
    const [outH, outM, outS = 0] = clockOutTime.split(':').map(Number);
    const diffSecs = Math.max(0, (outH * 3600 + outM * 60 + outS) - (inH * 3600 + inM * 60 + inS));
    record.totalWorkingHours = +(diffSecs / 3600).toFixed(2);
    const graceLimit = 9 * 3600 + 30 * 60;
    record.isLate = (inH * 3600 + inM * 60 + inS) > graceLimit;
    record.lateByMinutes = record.isLate
      ? Math.floor(((inH * 3600 + inM * 60 + inS) - graceLimit) / 60)
      : 0;
    await record.save();
  }

  res.status(200).json({ success: true, data: record });
});

// ─── DELETE /api/attendance/:id ───────────────────────────────────────────────
const deleteAttendanceRecord = asyncHandler(async (req, res) => {
  const record = await Attendance.findByIdAndDelete(req.params.id);
  if (!record) return res.status(404).json({ success: false, message: 'Attendance record not found' });
  res.json({ success: true, message: 'Record deleted', data: {} });
});

module.exports = { getMonthlyAttendance, getAttendanceSummary, markAttendance, deleteAttendanceRecord };

