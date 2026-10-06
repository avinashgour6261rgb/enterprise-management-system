const express = require('express');
const router = express.Router();
const {
  getLeaves,
  getLeaveById,
  createLeave,
  updateLeaveStatus,
  deleteLeave
} = require('../controllers/leaveController');

router.route('/')
  .get(getLeaves)
  .post(createLeave);

router.route('/:id')
  .get(getLeaveById)
  .delete(deleteLeave);

router.put('/:id/status', updateLeaveStatus);

module.exports = router;
