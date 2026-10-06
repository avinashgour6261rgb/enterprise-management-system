const express = require('express');
const router = express.Router();
const {
  getMonthlyAttendance,
  getAttendanceByDate,
  markAttendance,
  bulkMarkAttendance,
  deleteAttendance
} = require('../controllers/attendanceController');

router.get('/monthly', getMonthlyAttendance);
router.get('/daily', getAttendanceByDate);
router.post('/bulk', bulkMarkAttendance);
router.post('/mark', markAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
