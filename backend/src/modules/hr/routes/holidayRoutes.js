const express = require('express');
const router = express.Router();
const {
  getHolidays,
  getHolidayById,
  createHoliday,
  updateHoliday,
  deleteHoliday
} = require('../controllers/holidayController');

router.route('/')
  .get(getHolidays)
  .post(createHoliday);

router.route('/:id')
  .get(getHolidayById)
  .put(updateHoliday)
  .delete(deleteHoliday);

module.exports = router;
