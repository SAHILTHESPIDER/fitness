const express = require("express");
const User = require("../Models/User");
const { requireAuth } = require("../lib/auth");
const { foodCatalog, exerciseCatalog } = require("../lib/catalog");
const { SAFETY } = require("../lib/safety");

const router = express.Router();
router.use(requireAuth);

function aiReady() {
  return Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim());
}

async function askModel(system, user) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    signal: AbortSignal.timeout(25000),
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!response.ok) throw new Error("openai");
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

router.post("/meals", async (req, res) => {
  if (!aiReady()) {
    return res.status(503).json({
      success: false,
      message: "The coach is offline until the server has an OpenAI key.",
      safety: SAFETY,
    });
  }
  const preference = ["veg", "nonveg", "both"].includes(req.body.preference) ? req.body.preference : "both";
  const target = Math.min(4000, Math.max(1200, Number(req.body.calories) || 2000));
  const note = String(req.body.note || "").slice(0, 400);
  let catalog = foodCatalog();
  if (preference !== "both") catalog = catalog.filter((item) => item.diet === preference);
  const brief = catalog.map((item) => ({ id: item.id, name: item.name, calories: item.calories }));
  try {
    const plan = await askModel(
      "You choose meals from a fixed catalog. Reply with JSON only: {\"meals\":[{\"slot\":\"breakfast|lunch|dinner|snack\",\"foodId\":number}]}. Use only ids from the catalog. Do not invent foods or calorie numbers. Pick 4 meals.",
      `Preference: ${preference}. Aim near ${target} kcal using the catalog calorie numbers. Note: ${note || "none"}. Catalog: ${JSON.stringify(brief)}`,
    );
    const meals = [];
    for (const row of plan.meals || []) {
      const found = catalog.find((item) => item.id === Number(row.foodId));
      if (!found || meals.some((meal) => meal.foodId === found.id)) continue;
      meals.push({
        foodId: found.id,
        name: found.name,
        calories: found.calories,
        slot: ["breakfast", "lunch", "dinner", "snack"].includes(row.slot) ? row.slot : "snack",
        quantity: found.quantity,
      });
    }
    if (!meals.length) {
      return res.status(502).json({ success: false, message: "The coach could not match foods from the list. Try again.", safety: SAFETY });
    }
    return res.json({ success: true, meals, safety: SAFETY });
  } catch {
    return res.status(502).json({ success: false, message: "The coach could not answer just now. Try again in a moment.", safety: SAFETY });
  }
});

router.post("/workouts", async (req, res) => {
  if (!aiReady()) {
    return res.status(503).json({
      success: false,
      message: "The coach is offline until the server has an OpenAI key.",
      safety: SAFETY,
    });
  }
  const days = Math.min(6, Math.max(1, Number(req.body.days) || 3));
  const setting = ["gym", "home", "either"].includes(req.body.setting) ? req.body.setting : "either";
  const goal = String(req.body.goal || "").slice(0, 400);
  let catalog = exerciseCatalog();
  if (setting === "home") catalog = catalog.filter((item) => item.home);
  if (setting === "gym") catalog = catalog.filter((item) => item.category !== "Yoga");
  const names = catalog.map((item) => item.name);
  try {
    const plan = await askModel(
      "You write a workout plan using only the given exercise names. Reply with JSON only: {\"days\":[{\"name\":\"Day 1\",\"exercises\":[\"Exact Name\"]}]}. Do not invent exercises, sets, or reps.",
      `Write ${days} days. Setting: ${setting}. Goal: ${goal || "general fitness"}. Use 4 exercises a day, only from this list: ${JSON.stringify(names)}`,
    );
    const cleanDays = [];
    for (const [index, day] of (plan.days || []).entries()) {
      if (cleanDays.length >= days) break;
      const exercises = [];
      for (const name of day.exercises || []) {
        const found = catalog.find((item) => item.name.toLowerCase() === String(name).toLowerCase());
        if (!found || exercises.some((item) => item.name === found.name)) continue;
        exercises.push({
          name: found.name,
          muscle: found.muscle,
          sets: found.sets,
          reps: found.reps,
          category: found.category,
          gif: found.gif,
        });
      }
      if (exercises.length) cleanDays.push({ name: day.name || `Day ${index + 1}`, exercises });
    }
    if (!cleanDays.length) {
      return res.status(502).json({ success: false, message: "The coach could not match exercises from the list. Try again.", safety: SAFETY });
    }
    const plan = { createdAt: new Date().toISOString(), setting, days: cleanDays, safety: SAFETY };
    return res.json({ success: true, plan, safety: SAFETY });
  } catch {
    return res.status(502).json({ success: false, message: "The coach could not answer just now. Try again in a moment.", safety: SAFETY });
  }
});

router.post("/plan", async (req, res) => {
  const catalog = exerciseCatalog();
  const cleanDays = [];
  for (const [index, day] of (req.body.days || []).entries()) {
    const exercises = [];
    for (const entry of day.exercises || []) {
      const label = typeof entry === "string" ? entry : entry.name;
      const found = catalog.find((item) => item.name.toLowerCase() === String(label || "").toLowerCase());
      if (!found || exercises.some((item) => item.name === found.name)) continue;
      exercises.push({
        name: found.name,
        muscle: found.muscle,
        sets: found.sets,
        reps: found.reps,
        category: found.category,
        gif: found.gif,
      });
    }
    if (exercises.length) cleanDays.push({ name: day.name || `Day ${index + 1}`, exercises });
  }
  if (!cleanDays.length) {
    return res.status(400).json({ success: false, message: "That plan does not match the exercise list." });
  }
  const saved = {
    createdAt: new Date().toISOString(),
    setting: req.body.setting || "either",
    days: cleanDays,
    safety: SAFETY,
  };
  await User.findByIdAndUpdate(req.userId, { workoutPlan: saved });
  return res.json({ success: true, message: "Plan saved on your profile.", plan: saved, safety: SAFETY });
});

module.exports = router;
