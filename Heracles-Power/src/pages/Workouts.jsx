import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api, { apiError } from "../api";
import { useAuth } from "../useAuth";
import { todayKey } from "../lib/dates";
import { Field, Note, Page } from "../ui";

const categories = ["All", "Gym", "Yoga", "Cardio", "Calisthenics", "Home"];

function MoveImage({ src, alt }) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return <img src="/placeholder-move.svg" alt="" className="h-40 w-full rounded-2xl bg-ink object-cover" />;
  }
  return <img src={src} alt={alt} className="h-40 w-full rounded-2xl bg-ink object-cover" onError={() => setFailed(true)} />;
}

export default function Workouts() {
  const { user } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  const [tone, setTone] = useState("cyan");

  useEffect(() => {
    fetch("/exercises.json")
      .then((res) => res.json())
      .then((data) => setExercises(data.exercises || []))
      .catch(() => setNote("The exercise list could not be loaded."));
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle) {
      return exercises.filter((item) => (
        item.name.toLowerCase().includes(needle) || item.muscle.toLowerCase().includes(needle)
      ));
    }
    if (category === "Home") return exercises.filter((item) => item.home);
    if (category === "All") return exercises;
    return exercises.filter((item) => item.category === category);
  }, [exercises, category, query]);

  async function logMove(item) {
    if (!user) {
      setTone("cyan");
      setNote("Log in to save this workout.");
      return;
    }
    try {
      await api.post("/api/logs/workouts", {
        date: todayKey(),
        name: item.name,
        sets: item.sets,
        reps: item.reps,
        muscle: item.muscle,
        category: item.category,
      });
      setTone("cyan");
      setNote(`${item.name} logged for today.`);
    } catch (error) {
      setTone("danger");
      setNote(apiError(error, "That exercise could not be logged."));
    }
  }

  return (
    <Page kicker="Training" title="Workouts">
      {note ? <Note tone={tone}>{note}</Note> : null}
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Field label="Search every category" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Squat, back, plank" />
        </div>
        <Link to="/coach" className="btn-lime">Build my week</Link>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button key={item} type="button" onClick={() => setCategory(item)} className={category === item && !query ? "btn-lime" : "btn-ghost"}>{item}</button>
        ))}
      </div>
      <p className="mt-3 text-sm text-mist/50">{visible.length} exercises {query ? "across the whole library" : ""}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <article key={`${item.category}-${item.name}`} className="card">
            <MoveImage src={item.gif} alt={item.name} />
            <h2 className="mt-3 font-display text-2xl">{item.name}</h2>
            <p className="text-sm text-cyan">{item.muscle} · {item.sets} sets · {item.reps}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-mist/45">{item.category}</p>
            <button type="button" className="btn-ghost mt-3" onClick={() => logMove(item)}>Log today</button>
          </article>
        ))}
      </div>
    </Page>
  );
}
