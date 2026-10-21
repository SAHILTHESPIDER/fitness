const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true, unique: true, match: /^[0-9]{10}$/ },
  dob: { type: Date, required: true },
  gender: { type: String, required: true, enum: ["male", "female"] },
  email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
  password: { type: String, required: true },
  weight: { type: Number, required: true },
  heightFeet: { type: Number, required: true },
  heightInches: { type: Number, required: true },
  goalWeight: { type: Number, required: true },
  dietPreference: { type: String, enum: ["veg", "nonveg", "both"], default: "both" },
  workoutDays: { type: Number, default: 3, min: 1, max: 7 },
  workoutSetting: { type: String, enum: ["gym", "home", "either"], default: "either" },
  weightHistory: [{
    weight: Number,
    date: { type: Date, default: Date.now },
  }],
  resetPasswordTokenHash: String,
  resetPasswordExpires: Date,
  workoutPlan: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model("Usertest", userSchema);
