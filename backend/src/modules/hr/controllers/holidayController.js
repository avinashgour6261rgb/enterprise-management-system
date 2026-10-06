const Holiday = require('../models/Holiday');
const asyncHandler = require('../../../shared/middleware/asyncHandler');

// @desc    Get all holidays
// @route   GET /api/holidays
const getHolidays = asyncHandler(async (req, res) => {
  const { year, search } = req.query;
  const query = {};

  if (year) {
    query.date = new RegExp(`^${year}`);
  }

  if (search) {
    query.$or = [
      { name: new RegExp(search, 'i') },
      { type: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') }
    ];
  }

  const holidays = await Holiday.find(query).sort({ date: 1 });

  res.json({
    success: true,
    count: holidays.length,
    data: holidays
  });
});

// @desc    Get single holiday
// @route   GET /api/holidays/:id
const getHolidayById = asyncHandler(async (req, res) => {
  const holiday = await Holiday.findById(req.params.id);
  if (!holiday) {
    return res.status(404).json({ success: false, message: 'Holiday not found' });
  }
  res.json({ success: true, data: holiday });
});

// @desc    Create new holiday
// @route   POST /api/holidays
const createHoliday = asyncHandler(async (req, res) => {
  const holiday = new Holiday(req.body);
  await holiday.save();
  res.status(201).json({ success: true, data: holiday });
});

// @desc    Update holiday
// @route   PUT /api/holidays/:id
const updateHoliday = asyncHandler(async (req, res) => {
  const holiday = await Holiday.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!holiday) {
    return res.status(404).json({ success: false, message: 'Holiday not found' });
  }
  res.json({ success: true, data: holiday });
});

// @desc    Delete holiday
// @route   DELETE /api/holidays/:id
const deleteHoliday = asyncHandler(async (req, res) => {
  const holiday = await Holiday.findByIdAndDelete(req.params.id);
  if (!holiday) {
    return res.status(404).json({ success: false, message: 'Holiday not found' });
  }
  res.json({ success: true, message: 'Holiday removed', data: {} });
});

module.exports = {
  getHolidays,
  getHolidayById,
  createHoliday,
  updateHoliday,
  deleteHoliday
};

