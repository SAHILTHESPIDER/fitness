import { useEffect, useState } from "react";
import api, { apiError } from "../api";
import { useAuth } from "../useAuth";
import { todayKey } from "../lib/dates";
import { SAFETY } from "../lib/safety";
import { Field, Note, Page } from "../ui";

const habits = [
  ["stretch", "Stretch"],
  ["sleep", "Sleep"],
  ["walk", "Walk"],
];

function goalLine(weight, goal) {
  const diff = Number(weight) - Number(goal);
  if (!Number.isFinite(diff)) return "Add a weight and a goal.";
  if (Math.abs(diff) <= 1) return "You are at your goal weight.";
  if (diff > 0) return `${diff.toFixed(1)} kg to go.`;
  return `${Math.abs(diff).toFixed(1)} kg under your goal.`;
}

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [summary, setSummary] = useState(null);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState("cyan");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (!user) return undefined;
    setForm({
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
      weight: user.weight,
      heightFeet: user.heightFeet,
      heightInches: user.heightInches,
      goalWeight: user.goalWeight,
      dietPreference: user.dietPreference || "both",
      workoutDays: user.workoutDays || 3,
      workoutSetting: user.workoutSetting || "either",
    });
    let gone = false;
    api.get("/api/logs/summary", { params: { today: todayKey() } })
      .then((res) => {
        if (!gone) setSummary(res.data);
      })
      .catch((error) => {
        if (!gone) {
          setTone("danger");
          setNote(apiError(error, "Your logs could not be loaded."));
        }
      });
    return () => {
      gone = true;
    };
  }, [user]);

  function say(message, nextTone = "cyan") {
    setTone(nextTone);
    setNote(message);
  }

  async function saveProfile(event) {
    event.preventDefault();
    try {
      const res = await api.put("/auth/me", {
        ...form,
        weight: Number(form.weight),
        heightFeet: Number(form.heightFeet),
        heightInches: Number(form.heightInches),
        goalWeight: Number(form.goalWeight),
        workoutDays: Number(form.workoutDays),
      });
      updateUser(res.data.user);
      setEditing(false);
      say("Profile saved.");
      const summaryRes = await api.get("/api/logs/summary", { params: { today: todayKey() } });
      setSummary(summaryRes.data);
    } catch (error) {
      say(apiError(error, "The profile could not be saved."), "danger");
    }
  }

  async function addWeight(event) {
    event.preventDefault();
    try {
      const res = await api.post("/auth/weight", { weight: Number(weight) });
      updateUser(res.data.user);
      setWeight("");
      const summaryRes = await api.get("/api/logs/summary", { params: { today: todayKey() } });
      setSummary(summaryRes.data);
      say("Weight saved.");
    } catch (error) {
      say(apiError(error, "The weight could not be saved."), "danger");
    }
  }

  async function saveHabits(next) {
    if (!summary) return;
    try {
      const res = await api.put("/api/logs/habits", { date: todayKey(), ...next });
      setSummary((current) => ({ ...current, waterGlasses: res.data.waterGlasses, habits: res.data.habits }));
    } catch (error) {
      say(apiError(error, "Habits could not be saved."), "danger");
    }
  }

  const maxCalories = Math.max(1, ...(summary?.week || []).map((day) => day.calories));

  return (
    <Page kicker="Account" title={`${user.name} ${user.lastname}`}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-mist/60">{user.email}</p>
        <button type="button" className="btn-ghost" onClick={logout}>Log out</button>
      </div>
      {note ? <Note tone={tone}>{note}</Note> : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="card">
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Goal</p>
          <p className="mt-3 font-display text-3xl text-lime">{goalLine(summary?.weight ?? user.weight, summary?.goalWeight ?? user.goalWeight)}</p>
          <p className="mt-2 text-sm text-mist/60">{summary?.weight ?? user.weight} kg now · goal {summary?.goalWeight ?? user.goalWeight} kg</p>
        </article>
        <article className="card">
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">BMI</p>
          <p className="mt-3 font-display text-3xl text-cyan">{summary?.bmi ?? "—"}</p>
          <p className="mt-2 text-sm text-mist/60">{summary?.bmiCategory || "Add height and weight"}</p>
        </article>
        <article className="card">
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">Today</p>
          <p className="mt-3 font-display text-3xl text-lime">{summary?.todayCalories ?? 0}</p>
          <p className="mt-2 text-sm text-mist/60">of {summary?.calorieTarget ?? "—"} kcal</p>
        </article>
        <article className="card">
          <p className="text-xs uppercase tracking-[0.18em] text-mist/50">This week</p>
          <p className="mt-3 font-display text-3xl">{summary?.workouts?.length ?? 0}</p>
          <p className="mt-2 text-sm text-mist/60">logged exercises</p>
        </article>
      </div>

      <section className="card mt-4">
        <h2 className="font-display text-2xl uppercase">Calories this week</h2>
        <div className="mt-4 flex h-40 items-end gap-2">
          {(summary?.week || []).map((day) => (
            <div key={day.date} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="flex h-28 w-full items-end">
                <div className="w-full rounded-t bg-lime" style={{ height: `${Math.max(6, (day.calories / maxCalories) * 100)}%` }} />
              </div>
              <span className="text-[10px] text-mist/50">{day.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card mt-4">
        <h2 className="font-display text-2xl uppercase">Workouts this week</h2>
        <ul className="mt-4 divide-y divide-white/10">
          {(summary?.workouts || []).length ? summary.workouts.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
              <span>{item.name}</span>
              <span className="text-cyan">{item.sets} x {item.reps} · {item.muscle} · {item.date.slice(5)}</span>
            </li>
          )) : <li className="py-3 text-sm text-mist/60">Nothing logged this week.</li>}
        </ul>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <article className="card">
          <h2 className="font-display text-2xl uppercase">Water and habits</h2>
          <div className="mt-4 flex items-center gap-3">
            <button type="button" className="btn-ghost" onClick={() => saveHabits({ waterGlasses: Math.max(0, (summary?.waterGlasses || 0) - 1), ticks: summary?.habits })}>-</button>
            <p className="font-display text-3xl text-cyan">{summary?.waterGlasses || 0}<span className="text-base text-mist/50"> / 12</span></p>
            <button type="button" className="btn-lime" onClick={() => saveHabits({ waterGlasses: Math.min(12, (summary?.waterGlasses || 0) + 1), ticks: summary?.habits })}>+</button>
          </div>
          <div className="mt-4 grid gap-2">
            {habits.map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-lime"
                  checked={Boolean(summary?.habits?.[key])}
                  onChange={(event) => saveHabits({
                    waterGlasses: summary?.waterGlasses || 0,
                    ticks: { ...summary?.habits, [key]: event.target.checked },
                  })}
                />
                {label}
              </label>
            ))}
          </div>
        </article>

        <article className="card">
          <h2 className="font-display text-2xl uppercase">Weight history</h2>
          <form onSubmit={addWeight} className="mt-4 flex gap-2">
            <input className="field" type="number" min="30" max="300" step="0.1" placeholder="kg" value={weight} onChange={(event) => setWeight(event.target.value)} required />
            <button type="submit" className="btn-lime shrink-0">Save</button>
          </form>
          <ul className="mt-4 max-h-48 space-y-2 overflow-auto text-sm">
            {[...(summary?.weightHistory || user.weightHistory || [])].reverse().map((entry, index) => (
              <li key={`${entry.date}-${index}`} className="flex justify-between gap-3">
                <span>{entry.weight} kg</span>
                <span className="text-mist/50">{entry.date ? new Date(entry.date).toLocaleDateString() : ""}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {summary?.workoutPlan?.days?.length ? (
        <section className="card mt-4">
          <h2 className="font-display text-2xl uppercase">Saved coach plan</h2>
          <p className="mt-2 text-xs text-mist/50">{SAFETY}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {summary.workoutPlan.days.map((day) => (
              <article key={day.name} className="rounded-2xl border border-white/10 p-4">
                <h3 className="text-cyan">{day.name}</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {day.exercises.map((item) => (
                    <li key={item.name}>{item.name} · {item.sets} x {item.reps}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="card mt-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl uppercase">Details</h2>
          <button type="button" className="btn-ghost" onClick={() => setEditing((value) => !value)}>{editing ? "Close" : "Edit"}</button>
        </div>
        {editing && form ? (
          <form onSubmit={saveProfile} className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="First name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required minLength={3} />
            <Field label="Last name" value={form.lastname} onChange={(event) => setForm({ ...form, lastname: event.target.value })} required minLength={3} />
            <Field label="Phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required pattern="[0-9]{10}" />
            <Field label="Weight (kg)" type="number" value={form.weight} onChange={(event) => setForm({ ...form, weight: event.target.value })} required />
            <Field label="Height, feet" type="number" value={form.heightFeet} onChange={(event) => setForm({ ...form, heightFeet: event.target.value })} required />
            <Field label="Height, inches" type="number" value={form.heightInches} onChange={(event) => setForm({ ...form, heightInches: event.target.value })} required />
            <p className="text-sm text-cyan sm:col-span-2">{form.heightFeet} ft {form.heightInches} in</p>
            <Field label="Goal weight (kg)" type="number" value={form.goalWeight} onChange={(event) => setForm({ ...form, goalWeight: event.target.value })} required />
            <Field label="Food preference">
              <select className="field" value={form.dietPreference} onChange={(event) => setForm({ ...form, dietPreference: event.target.value })}>
                <option value="both">Both</option>
                <option value="veg">Vegetarian</option>
                <option value="nonveg">Non-vegetarian</option>
              </select>
            </Field>
            <Field label="Training days" type="number" min="1" max="7" value={form.workoutDays} onChange={(event) => setForm({ ...form, workoutDays: event.target.value })} />
            <Field label="Where you train">
              <select className="field" value={form.workoutSetting} onChange={(event) => setForm({ ...form, workoutSetting: event.target.value })}>
                <option value="either">Either</option>
                <option value="gym">Gym</option>
                <option value="home">Home</option>
              </select>
            </Field>
            <button type="submit" className="btn-lime sm:col-span-2 w-fit">Save details</button>
          </form>
        ) : (
          <p className="mt-3 text-sm text-mist/70">{user.heightFeet} ft {user.heightInches} in · {user.dietPreference} · {user.workoutDays} days · {user.workoutSetting}</p>
        )}
      </section>
    </Page>
  );
}
