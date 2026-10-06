const mongoose = require('mongoose');

const AppreciationSchema = new mongoose.Schema(
  {
    givenTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: [true, 'Recipient employee is required']
    },
    givenToName: { type: String, required: true },
    givenToAvatar: { type: String, default: '' },
    givenToRole: { type: String },

    givenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    givenByName: { type: String, required: true },

    awardName: {
      type: String,
      required: [true, 'Award title is required'],
      trim: true,
      minlength: [3, 'Award name must be at least 3 characters'],
      maxlength: [100, 'Award name cannot exceed 100 characters']
    },
    awardBadgeIcon: {
      type: String,
      enum: ['trophy', 'star', 'medal', 'award', 'heart', 'crown', 'rocket', 'sparkles'],
      default: 'trophy'
    },
    givenOn: {
      type: String,
      required: [true, 'Award date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD']
    },
    rewardPointsOrCash: {
      type: String,
      default: ''
    },
    appreciationNote: {
      type: String,
      required: [true, 'Appreciation note / citation is required'],
      minlength: [10, 'Please write a meaningful appreciation (min 10 characters)'],
      maxlength: [1000, 'Appreciation note too long (max 1000 characters)']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

AppreciationSchema.index({ givenTo: 1, givenOn: -1 });
AppreciationSchema.index({ givenOn: -1 });

module.exports = mongoose.model('Appreciation', AppreciationSchema);
