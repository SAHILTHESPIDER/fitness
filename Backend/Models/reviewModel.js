const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Ratings: { type: Number, required: true, min: 1, max: 5 },
  Feedback: { type: String, required: true, maxlength: 500 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Usertest" },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
