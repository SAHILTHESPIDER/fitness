const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Ratings: {
    type: Number,
    required: true,
  },
  Feedback: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
