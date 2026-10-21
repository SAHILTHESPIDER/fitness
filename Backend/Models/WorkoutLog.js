const mongoose = require("mongoose");

const workoutLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Usertest", required: true, index: true },
  date: { type: String, required: true },
  name: { type: String, required: true },
  sets: Number,
  reps: String,
  muscle: String,
  category: String,
}, { timestamps: true });

workoutLogSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model("WorkoutLog", workoutLogSchema);
