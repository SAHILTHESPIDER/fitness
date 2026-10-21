const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../Models/User");
const { signupValidation, loginValidation, updateValidation } = require("../Middleware/AuthValidation");
const { requireAuth, signToken, publicUser } = require("../lib/auth");
const { smtpReady, sendResetEmail } = require("../lib/mail");

const router = express.Router();

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function duplicateMessage(error) {
  const field = Object.keys(error.keyPattern || {})[0];
  if (field === "phone") return "That phone number is already registered.";
  return "That email is already registered.";
}

router.post("/signup", signupValidation, async (req, res) => {
  try {
    const body = req.body;
    const password = await bcrypt.hash(body.password, 10);
    const user = await User.create({
      name: body.name,
      lastname: body.lastname,
      phone: body.phone,
      dob: body.dob,
      gender: body.gender,
      email: body.email.toLowerCase(),
      password,
      weight: body.weight,
      heightFeet: body.heightFeet,
      heightInches: body.heightInches,
      goalWeight: body.goalWeight,
      dietPreference: body.dietPreference,
      workoutDays: body.workoutDays,
      workoutSetting: body.workoutSetting,
      weightHistory: [{ weight: body.weight, date: new Date() }],
    });
    return res.status(201).json({
      success: true,
      message: "Account created.",
      token: signToken(user._id),
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: duplicateMessage(error) });
    }
    return res.status(500).json({ success: false, message: "Could not create the account." });
  }
});

router.post("/login", loginValidation, async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const user = await User.findOne({ email: new RegExp(`^${escapeRegExp(email)}$`, "i") });
    if (!user) return res.status(401).json({ success: false, message: "Email or password is wrong." });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Email or password is wrong." });
    return res.json({
      success: true,
      message: "Logged in.",
      token: signToken(user._id),
      user: publicUser(user),
    });
  } catch {
    return res.status(500).json({ success: false, message: "Could not log in." });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ success: false, message: "Please log in." });
  return res.json({ success: true, user: publicUser(user) });
});

router.put("/me", requireAuth, updateValidation, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(401).json({ success: false, message: "Please log in." });
    const nextWeight = req.body.weight;
    const previousWeight = user.weightHistory?.at?.(-1)?.weight;
    Object.assign(user, req.body);
    if (!Array.isArray(user.weightHistory)) user.weightHistory = [];
    if (Number.isFinite(nextWeight) && nextWeight !== previousWeight) {
      user.weightHistory.push({ weight: nextWeight, date: new Date() });
    }
    await user.save();
    return res.json({ success: true, message: "Profile saved.", user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: duplicateMessage(error) });
    }
    return res.status(500).json({ success: false, message: "Could not save the profile." });
  }
});

router.post("/weight", requireAuth, async (req, res) => {
  const weight = Number(req.body.weight);
  if (!Number.isFinite(weight) || weight < 30 || weight > 300) {
    return res.status(400).json({ success: false, message: "Enter a weight between 30 and 300 kg." });
  }
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ success: false, message: "Please log in." });
  user.weight = weight;
  user.weightHistory.push({ weight, date: new Date() });
  await user.save();
  return res.json({ success: true, message: "Weight saved.", user: publicUser(user) });
});

router.post("/forgot-password", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Enter a valid email." });
  }
  if (!smtpReady()) {
    return res.status(503).json({
      success: false,
      message: "Password reset email is not set up on the server yet.",
    });
  }
  const generic = { success: true, message: "If that email has an account, we sent a reset link." };
  const user = await User.findOne({ email: new RegExp(`^${escapeRegExp(email)}$`, "i") });
  if (!user) return res.json(generic);
  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordTokenHash = crypto.createHash("sha256").update(token).digest("hex");
  user.resetPasswordExpires = new Date(Date.now() + 30 * 60 * 1000);
  await user.save();
  const appUrl = process.env.APP_URL || "http://localhost:5173";
  try {
    await sendResetEmail(user.email, `${appUrl}/reset-password?token=${token}`);
  } catch {
    return res.status(503).json({ success: false, message: "The reset email could not be sent. Try again later." });
  }
  return res.json(generic);
});

router.post("/reset-password", async (req, res) => {
  const token = String(req.body.token || "");
  const password = String(req.body.password || "");
  const confirm = String(req.body.confirmPassword || "");
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters." });
  }
  if (password !== confirm) {
    return res.status(400).json({ success: false, message: "Passwords do not match." });
  }
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetPasswordTokenHash: hash,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) {
    return res.status(400).json({ success: false, message: "This reset link is invalid or expired." });
  }
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordTokenHash = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return res.json({ success: true, message: "Password updated. You can log in." });
});

module.exports = router;
