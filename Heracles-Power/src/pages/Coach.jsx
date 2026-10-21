import { useState } from "react";
import { Link } from "react-router-dom";
import api, { apiError } from "../api";
import { useAuth } from "../useAuth";
import { todayKey } from "../lib/dates";
import { SAFETY } from "../lib/safety";
import { Field, Note, Page } from "../ui";

export default function Coach() {
  const { user, updateUser } = useAuth();
  const [preference, setPreference] = useState(user?.dietPreference || "both");
  const [calories, setCalories] = useState("2000");
  const [note, setNote] = useState("");
  const [days, setDays] = useState(String(user?.workoutDays || 3));
  const [setting, setSetting] = useState(user?.workoutSetting || "either");
  const [goal, setGoal] = useState("");
  const [meals, setMeals] = useState([]);
  const [plan, setPlan] = useState(null);
  const [status, setStatus] = useState("");
  const [tone, setTone] = useState("cyan");
  const [busy, setBusy] = useState("");
  const [confirmMeals, setConfirmMeals] = useState(false);
  const [confirmPlan, setConfirmPlan] = useState(false);
  const [confirmDay, setConfirmDay] = useState("");

  function say(message, next = "cyan") {
    setTone(next);
    setStatus(message);
  }

  async function suggestMeals(event) {
    event.preventDefault();
    if (!user) return say("Log in so the coach can use your account.");
    setBusy("meals");
    setConfirmMeals(false);
    try {
      const res = await api.post("/api/ai/meals", { preference, calories: Number(calories), note });
      setMeals(res.data.meals || []);
      say("Check the meals, then confirm if you want them on today.");
    } catch (error) {
      setMeals([]);
      say(apiError(error, "The coach could not answer."), "danger");
    } finally {
      setBusy("");
    }
  }

  async function saveMeals() {
    setBusy("save-meals");
    try {
      for (const meal of meals) {
        await api.post("/api/logs/meals", {
          date: todayKey(),
          name: meal.name,
          calories: meal.calories,
          foodId: meal.foodId,
          quantity: 1,
        });
      }
      setConfirmMeals(false);
      say("Those meals are on today.");
    } catch (error) {
      say(apiError(error, "The meals could not be saved."), "danger");
    } finally {
      setBusy("");
    }
  }

  async function buildWeek(event) {
    event.preventDefault();
    if (!user) return say("Log in so the plan can be saved to you.");
    setBusy("week");
    setConfirmPlan(false);
    try {
      const res = await api.post("/api/ai/workouts", { days: Number(days), setting, goal });
      setPlan(res.data.plan);
      say("Check the week. Nothing is saved until you confirm.");
    } catch (error) {
      setPlan(null);
      say(apiError(error, "The coach could not answer."), "danger");
    } finally {
      setBusy("");
    }
  }

  async function savePlan() {
    setBusy("save-plan");
    try {
      const res = await api.post("/api/ai/plan", { setting: plan.setting, days: plan.days });
      updateUser({ ...user, workoutPlan: res.data.plan });
      setConfirmPlan(false);
      say(res.data.message);
    } catch (error) {
      say(apiError(error, "The plan could not be saved."), "danger");
    } finally {
      setBusy("");
    }
  }

  async function logDay(day) {
    setBusy(day.name);
    try {
      for (const item of day.exercises) {
        await api.post("/api/logs/workouts", {
          date: todayKey(),
          name: item.name,
          sets: item.sets,
          reps: item.reps,
          muscle: item.muscle,
          category: item.category,
        });
      }
      setConfirmDay("");
      say(`${day.name} is on today's workout log.`);
    } catch (error) {
      say(apiError(error, "That day could not be logged."), "danger");
    } finally {
      setBusy("");
    }
  }

  return (
    <Page kicker="Coach" title="AI coach">
      <p className="max-w-2xl text-sm text-mist/70">{SAFETY}</p>
      {!user ? <p className="mt-4 text-sm"><Link to="/login" className="text-cyan">Log in</Link> to ask for meals or a week. The key stays on the server.</p> : null}
      {status ? <div className="mt-4"><Note tone={tone}>{status}</Note></div> : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <form onSubmit={suggestMeals} className="card grid gap-3">
          <h2 className="font-display text-3xl uppercase">Meals</h2>
          <Field label="Preference">
            <select className="field" value={preference} onChange={(event) => setPreference(event.target.value)}>
              <option value="both">Both</option>
              <option value="veg">Vegetarian</option>
              <option value="nonveg">Non-vegetarian</option>
            </select>
          </Field>
          <Field label="Calorie target" type="number" min="1200" max="4000" value={calories} onChange={(event) => setCalories(event.target.value)} />
          <Field label="Note">
            <textarea className="field min-h-20" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Higher protein, no dairy" />
          </Field>
          <button type="submit" className="btn-lime w-fit" disabled={Boolean(busy) || !user}>{busy === "meals" ? "Asking…" : "Suggest meals"}</button>
          {meals.length ? (
            <div className="space-y-2 text-sm">
              {meals.map((meal) => (
                <p key={meal.foodId} className="flex justify-between gap-3"><span className="capitalize">{meal.slot}: {meal.name}</span><span className="text-lime">{meal.calories} kcal</span></p>
              ))}
              {confirmMeals ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  <button type="button" className="btn-lime" onClick={saveMeals} disabled={busy === "save-meals"}>Yes, add to today</button>
                  <button type="button" className="btn-ghost" onClick={() => setConfirmMeals(false)}>Cancel</button>
                </div>
              ) : (
                <button type="button" className="btn-ghost" onClick={() => setConfirmMeals(true)}>Add these meals to today</button>
              )}
            </div>
          ) : null}
        </form>

        <form onSubmit={buildWeek} className="card grid gap-3">
          <h2 className="font-display text-3xl uppercase">Workout week</h2>
          <Field label="Days" type="number" min="1" max="6" value={days} onChange={(event) => setDays(event.target.value)} />
          <Field label="Setting">
            <select className="field" value={setting} onChange={(event) => setSetting(event.target.value)}>
              <option value="either">Either</option>
              <option value="gym">Gym</option>
              <option value="home">Home</option>
            </select>
          </Field>
          <Field label="Goal">
            <textarea className="field min-h-20" value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="Get leaner, four gym days" />
          </Field>
          <button type="submit" className="btn-lime w-fit" disabled={Boolean(busy) || !user}>{busy === "week" ? "Asking…" : "Build my week"}</button>
          {plan?.days?.length ? (
            <div className="space-y-3 text-sm">
              {plan.days.map((day) => (
                <article key={day.name}>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-cyan">{day.name}</h3>
                    {confirmDay === day.name ? (
                      <button type="button" className="text-lime" onClick={() => logDay(day)}>Confirm log</button>
                    ) : (
                      <button type="button" className="text-mist/70" onClick={() => setConfirmDay(day.name)}>Log today</button>
                    )}
                  </div>
                  <ul className="mt-1 space-y-1">
                    {day.exercises.map((item) => (
                      <li key={item.name}>{item.name} · {item.muscle} · {item.sets} x {item.reps}</li>
                    ))}
                  </ul>
                </article>
              ))}
              {confirmPlan ? (
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="btn-lime" onClick={savePlan} disabled={busy === "save-plan"}>Yes, save the plan</button>
                  <button type="button" className="btn-ghost" onClick={() => setConfirmPlan(false)}>Cancel</button>
                </div>
              ) : (
                <button type="button" className="btn-ghost" onClick={() => setConfirmPlan(true)}>Save this plan to my profile</button>
              )}
            </div>
          ) : null}
        </form>
      </div>
      <p className="mt-6 text-xs text-mist/50">{SAFETY}</p>
    </Page>
  );
}
