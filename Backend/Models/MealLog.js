const mongoose = require("mongoose");

const mealLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Usertest", required: true, index: true },
  date: { type: String, required: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  foodId: Number,
  quantity: { type: Number, default: 1 },
}, { timestamps: true });

mealLogSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model("MealLog", mealLogSchema);
