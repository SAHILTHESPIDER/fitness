const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Usertest", required: true },
  date: { type: String, required: true },
  waterGlasses: { type: Number, default: 0, min: 0, max: 12 },
  ticks: {
    stretch: { type: Boolean, default: false },
    sleep: { type: Boolean, default: false },
    walk: { type: Boolean, default: false },
  },
}, { timestamps: true });

habitLogSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("HabitLog", habitLogSchema);
