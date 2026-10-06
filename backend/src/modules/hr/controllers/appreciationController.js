const Appreciation = require('../models/Appreciation');
const asyncHandler = require('../../../shared/middleware/asyncHandler');

// @desc    Get all appreciations
// @route   GET /api/appreciations
const getAppreciations = asyncHandler(async (req, res) => {
  const { employeeId, search } = req.query;
  const query = {};

  if (employeeId && employeeId !== 'all') {
    query.givenTo = employeeId;
  }

  if (search) {
    query.$or = [
      { awardName: new RegExp(search, 'i') },
      { appreciationNote: new RegExp(search, 'i') }
    ];
  }

  const appreciations = await Appreciation.find(query)
    .populate('givenTo', 'name email role avatar department')
    .populate('givenBy', 'name email role avatar')
    .sort({ givenOn: -1, createdAt: -1 });

  res.json({
    success: true,
    count: appreciations.length,
    data: appreciations
  });
});

// @desc    Get single appreciation
// @route   GET /api/appreciations/:id
const getAppreciationById = asyncHandler(async (req, res) => {
  const appreciation = await Appreciation.findById(req.params.id)
    .populate('givenTo', 'name email role avatar department')
    .populate('givenBy', 'name email role avatar');

  if (!appreciation) {
    return res.status(404).json({ success: false, message: 'Appreciation not found' });
  }

  res.json({ success: true, data: appreciation });
});

// @desc    Create appreciation
// @route   POST /api/appreciations
const createAppreciation = asyncHandler(async (req, res) => {
  const appreciation = new Appreciation(req.body);
  await appreciation.save();

  const populated = await Appreciation.findById(appreciation._id)
    .populate('givenTo', 'name email role avatar department')
    .populate('givenBy', 'name email role avatar');

  res.status(201).json({ success: true, data: populated });
});

// @desc    Delete appreciation
// @route   DELETE /api/appreciations/:id
const deleteAppreciation = asyncHandler(async (req, res) => {
  const appreciation = await Appreciation.findByIdAndDelete(req.params.id);
  if (!appreciation) {
    return res.status(404).json({ success: false, message: 'Appreciation not found' });
  }
  res.json({ success: true, message: 'Appreciation removed', data: {} });
});

module.exports = {
  getAppreciations,
  getAppreciationById,
  createAppreciation,
  deleteAppreciation
};

