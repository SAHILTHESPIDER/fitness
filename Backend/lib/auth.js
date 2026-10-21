const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) {
    return res.status(401).json({ success: false, message: "Please log in." });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Your session expired. Log in again." });
  }
}

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    phone: user.phone,
    dob: user.dob,
    gender: user.gender,
    email: user.email,
    weight: user.weight,
    heightFeet: user.heightFeet,
    heightInches: user.heightInches,
    goalWeight: user.goalWeight,
    dietPreference: user.dietPreference || "both",
    workoutDays: user.workoutDays || 3,
    workoutSetting: user.workoutSetting || "either",
    weightHistory: user.weightHistory || [],
    workoutPlan: user.workoutPlan || null,
  };
}

module.exports = { requireAuth, signToken, publicUser };
