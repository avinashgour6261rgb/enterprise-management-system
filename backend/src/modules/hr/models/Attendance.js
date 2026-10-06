const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Employee reference is required']
    },
    employeeName: { type: String, required: true },
    employeeAvatar: { type: String, default: '' },
    employeeRole: { type: String },
    employeeCode: { type: String },

    date: {
      type: String,
      required: [true, 'Attendance date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD']
    },
    status: {
      type: String,
      required: true,
      enum: ['present', 'late', 'absent', 'half_day', 'holiday', 'day_off', 'on_leave']
    },
    clockInTime: {
      type: String,     // "09:15:00"
      default: null
    },
    clockOutTime: {
      type: String,     // "18:30:00"
      default: null
    },
    totalWorkingHours: {
      type: Number,
      default: 0,
      min: 0,
      max: 24
    },
    isLate: {
      type: Boolean,
      default: false
    },
    lateByMinutes: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      default: '',
      maxlength: [300, 'Notes too long (max 300 characters)']
    },
    markedBy: {
      type: String,
      default: 'System'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Unique per employee per day
AttendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ date: 1, status: 1 });

// Auto-compute totalWorkingHours from clock times
AttendanceSchema.pre('save', function (next) {
  if (this.clockInTime && this.clockOutTime) {
    const [inH, inM, inS = 0] = this.clockInTime.split(':').map(Number);
    const [outH, outM, outS = 0] = this.clockOutTime.split(':').map(Number);
    const inTotal = inH * 3600 + inM * 60 + inS;
    const outTotal = outH * 3600 + outM * 60 + outS;
    const diffSecs = Math.max(0, outTotal - inTotal);
    this.totalWorkingHours = +(diffSecs / 3600).toFixed(2);

    // Late if clock-in after 09:30
    const graceLimit = 9 * 3600 + 30 * 60;
    if (inTotal > graceLimit) {
      this.isLate = true;
      this.lateByMinutes = Math.floor((inTotal - graceLimit) / 60);
    }
  }
  next();
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
