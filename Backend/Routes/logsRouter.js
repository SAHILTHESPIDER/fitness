const express = require("express");
const User = require("../Models/User");
const MealLog = require("../Models/MealLog");
const WorkoutLog = require("../Models/WorkoutLog");
const HabitLog = require("../Models/HabitLog");
const { requireAuth } = require("../lib/auth");
const { bmi, bmiCategory, calorieTarget } = require("../lib/calories");
const { isDateKey, weekDates } = require("../lib/dates");
const { foodCatalog } = require("../lib/catalog");

const router = express.Router();
router.use(requireAuth);

function presentMeal(meal) {
  return {
    id: meal._id,
    date: meal.date,
    name: meal.name,
    calories: meal.calories,
    foodId: meal.foodId,
    quantity: meal.quantity,
  };
}

function presentWorkout(item) {
  return {
    id: item._id,
    date: item.date,
    name: item.name,
    sets: item.sets,
    reps: item.reps,
    muscle: item.muscle,
    category: item.category,
  };
}

function caloriesFor(body) {
  const quantity = Math.min(10, Math.max(1, Number(body.quantity) || 1));
  let base = Number(body.calories);
  if (body.foodId != null) {
    const found = foodCatalog().find((item) => item.id === Number(body.foodId));
    if (found) base = found.calories;
  }
  if (!Number.isFinite(base) || base < 0 || base > 5000) return null;
  return { calories: Math.round(base * quantity), quantity };
}

router.get("/meals", async (req, res) => {
  const date = req.query.date;
  if (!isDateKey(date)) return res.status(400).json({ success: false, message: "Pick a valid day." });
  const meals = await MealLog.find({ user: req.userId, date }).sort({ createdAt: 1 });
  return res.json({ success: true, meals: meals.map(presentMeal) });
});

router.post("/meals", async (req, res) => {
  if (!isDateKey(req.body.date)) return res.status(400).json({ success: false, message: "Pick a valid day." });
  const name = String(req.body.name || "").trim();
  if (!name) return res.status(400).json({ success: false, message: "That meal needs a name." });
  const counted = caloriesFor(req.body);
  if (!counted) return res.status(400).json({ success: false, message: "That calorie number is not usable." });
  await MealLog.create({
    user: req.userId,
    date: req.body.date,
    name,
    calories: counted.calories,
    foodId: req.body.foodId,
    quantity: counted.quantity,
  });
  const meals = await MealLog.find({ user: req.userId, date: req.body.date }).sort({ createdAt: 1 });
  return res.status(201).json({ success: true, meals: meals.map(presentMeal) });
});

router.post("/meals/repeat", async (req, res) => {
  const { from, to } = req.body;
  if (!isDateKey(from) || !isDateKey(to)) {
    return res.status(400).json({ success: false, message: "Pick two valid days." });
  }
  const previous = await MealLog.find({ user: req.userId, date: from });
  if (previous.length) {
    await MealLog.insertMany(previous.map((meal) => ({
      user: req.userId,
      date: to,
      name: meal.name,
      calories: meal.calories,
      foodId: meal.foodId,
      quantity: meal.quantity,
    })));
  }
  const meals = await MealLog.find({ user: req.userId, date: to }).sort({ createdAt: 1 });
  return res.json({
    success: true,
    message: previous.length ? "Yesterday's meals were copied." : "Nothing was logged yesterday.",
    meals: meals.map(presentMeal),
  });
});

router.delete("/meals/:id", async (req, res) => {
  const meal = await MealLog.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!meal) return res.status(404).json({ success: false, message: "That meal is not on your log." });
  const meals = await MealLog.find({ user: req.userId, date: meal.date }).sort({ createdAt: 1 });
  return res.json({ success: true, meals: meals.map(presentMeal) });
});

router.get("/workouts", async (req, res) => {
  const date = req.query.date;
  if (date && !isDateKey(date)) return res.status(400).json({ success: false, message: "Pick a valid day." });
  const query = { user: req.userId };
  if (date) query.date = date;
  const workouts = await WorkoutLog.find(query).sort({ createdAt: -1 }).limit(40);
  return res.json({ success: true, workouts: workouts.map(presentWorkout) });
});

router.post("/workouts", async (req, res) => {
  if (!isDateKey(req.body.date)) return res.status(400).json({ success: false, message: "Pick a valid day." });
  const name = String(req.body.name || "").trim();
  if (!name) return res.status(400).json({ success: false, message: "That exercise needs a name." });
  const item = await WorkoutLog.create({
    user: req.userId,
    date: req.body.date,
    name,
    sets: Number(req.body.sets) || undefined,
    reps: req.body.reps ? String(req.body.reps) : "",
    muscle: req.body.muscle ? String(req.body.muscle) : "",
    category: req.body.category ? String(req.body.category) : "",
  });
  return res.status(201).json({ success: true, workout: presentWorkout(item) });
});

router.delete("/workouts/:id", async (req, res) => {
  const item = await WorkoutLog.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!item) return res.status(404).json({ success: false, message: "That workout is not on your log." });
  return res.json({ success: true });
});

router.get("/habits", async (req, res) => {
  if (!isDateKey(req.query.date)) return res.status(400).json({ success: false, message: "Pick a valid day." });
  const habit = await HabitLog.findOne({ user: req.userId, date: req.query.date });
  return res.json({
    success: true,
    waterGlasses: habit?.waterGlasses || 0,
    habits: habit?.ticks || { stretch: false, sleep: false, walk: false },
  });
});

router.put("/habits", async (req, res) => {
  if (!isDateKey(req.body.date)) return res.status(400).json({ success: false, message: "Pick a valid day." });
  const existing = await HabitLog.findOne({ user: req.userId, date: req.body.date });
  const water = req.body.waterGlasses == null
    ? (existing?.waterGlasses || 0)
    : Math.min(12, Math.max(0, Number(req.body.waterGlasses) || 0));
  const ticks = req.body.ticks
    ? {
      stretch: Boolean(req.body.ticks.stretch),
      sleep: Boolean(req.body.ticks.sleep),
      walk: Boolean(req.body.ticks.walk),
    }
    : {
      stretch: Boolean(existing?.ticks?.stretch),
      sleep: Boolean(existing?.ticks?.sleep),
      walk: Boolean(existing?.ticks?.walk),
    };
  const habit = await HabitLog.findOneAndUpdate(
    { user: req.userId, date: req.body.date },
    { waterGlasses: water, ticks },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  return res.json({ success: true, waterGlasses: habit.waterGlasses, habits: habit.ticks });
});

router.get("/summary", async (req, res) => {
  const today = isDateKey(req.query.today) ? req.query.today : null;
  if (!today) return res.status(400).json({ success: false, message: "Pick a valid day." });
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ success: false, message: "Please log in." });
  const days = weekDates(today);
  const [meals, workouts, habit] = await Promise.all([
    MealLog.find({ user: req.userId, date: { $in: days } }),
    WorkoutLog.find({ user: req.userId, date: { $in: days } }).sort({ createdAt: -1 }),
    HabitLog.findOne({ user: req.userId, date: today }),
  ]);
  const week = days.map((date) => ({
    date,
    calories: meals.filter((meal) => meal.date === date).reduce((sum, meal) => sum + meal.calories, 0),
  }));
  const score = bmi(user.weight, user.heightFeet, user.heightInches);
  return res.json({
    success: true,
    calorieTarget: calorieTarget(user),
    bmi: score,
    bmiCategory: bmiCategory(score),
    todayCalories: week.find((day) => day.date === today)?.calories || 0,
    week,
    workouts: workouts.map(presentWorkout),
    waterGlasses: habit?.waterGlasses || 0,
    habits: habit?.ticks || { stretch: false, sleep: false, walk: false },
    weight: user.weight,
    goalWeight: user.goalWeight,
    weightHistory: user.weightHistory || [],
    workoutPlan: user.workoutPlan || null,
  });
});

module.exports = router;
