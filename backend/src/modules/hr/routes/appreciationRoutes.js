const express = require('express');
const router = express.Router();
const {
  getAppreciations,
  getAppreciationById,
  createAppreciation,
  deleteAppreciation
} = require('../controllers/appreciationController');

router.route('/')
  .get(getAppreciations)
  .post(createAppreciation);

router.route('/:id')
  .get(getAppreciationById)
  .delete(deleteAppreciation);

module.exports = router;
