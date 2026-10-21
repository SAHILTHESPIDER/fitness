import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api, { apiError } from "../api";
import { useAuth } from "../useAuth";
import { shiftKey, todayKey } from "../lib/dates";
import { filterFoods, flattenFood } from "../lib/food";
import { Field, Note, Page } from "../ui";

const filters = [
  ["all", "All"],
  ["veg", "Veg"],
  ["nonveg", "Non-veg"],
  ["protein", "Protein"],
];

function FoodImage({ src, alt }) {
  const [failed, setFailed] = useState(!src);
  if (failed) {
    return <img src="/placeholder-food.svg" alt="" className="h-36 w-full rounded-2xl bg-ink object-cover" />;
  }
  return <img src={src} alt={alt} className="h-36 w-full rounded-2xl bg-ink object-cover" onError={() => setFailed(true)} />;
}

export default function Diet() {
  const { user } = useAuth();
  const today = todayKey();
  const [foods, setFoods] = useState([]);
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [guest, setGuest] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hp-cart") || "[]"); } catch { return []; }
  });
  const [target, setTarget] = useState(null);
  const [water, setWater] = useState(0);
  const [note, setNote] = useState("");
  const [tone, setTone] = useState("cyan");

  const visible = useMemo(() => filterFoods(foods, type, query), [foods, type, query]);
  const cart = user ? meals : guest;
  const total = cart.reduce((sum, item) => sum + Number(item.calories || 0), 0);

  useEffect(() => {
    fetch("/Food.json")
      .then((res) => res.json())
      .then((data) => setFoods(flattenFood(data)))
      .catch(() => setNote("The food list could not be loaded."));
  }, []);

  useEffect(() => {
    localStorage.setItem("hp-cart", JSON.stringify(guest));
  }, [guest]);

  useEffect(() => {
    if (!user) return undefined;
    let gone = false;
    Promise.all([
      api.get("/api/logs/meals", { params: { date: today } }),
      api.get("/api/logs/summary", { params: { today } }),
    ]).then(([mealRes, summaryRes]) => {
      if (gone) return;
      setMeals(mealRes.data.meals || []);
      setTarget(summaryRes.data.calorieTarget);
      setWater(summaryRes.data.waterGlasses || 0);
    }).catch((error) => {
      if (!gone) {
        setTone("danger");
        setNote(apiError(error, "Today's log could not be loaded."));
      }
    });
    return () => {
      gone = true;
    };
  }, [user, today]);

  async function addFood(food) {
    if (!user) {
      setGuest((current) => [...current, { key: crypto.randomUUID(), ...food }]);
      setNote("Saved on this device. Log in to keep it on your account.");
      setTone("cyan");
      return;
    }
    try {
      const res = await api.post("/api/logs/meals", {
        date: today,
        name: food.name,
        calories: food.calories,
        foodId: food.id,
        quantity: 1,
      });
      setMeals(res.data.meals);
      setNote(`${food.name} added to today.`);
      setTone("cyan");
    } catch (error) {
      setTone("danger");
      setNote(apiError(error, "That meal could not be saved."));
    }
  }

  async function removeItem(item) {
    if (!user) {
      setGuest((current) => current.filter((row) => row.key !== item.key));
      return;
    }
    const res = await api.delete(`/api/logs/meals/${item.id}`);
    setMeals(res.data.meals);
  }

  async function repeatYesterday() {
    try {
      const res = await api.post("/api/logs/meals/repeat", { from: shiftKey(today, -1), to: today });
      setMeals(res.data.meals);
      setTone("cyan");
      setNote(res.data.message);
    } catch (error) {
      setTone("danger");
      setNote(apiError(error, "Yesterday could not be copied."));
    }
  }

  async function keepGuest() {
    try {
      let latest = meals;
      for (const item of guest) {
        const res = await api.post("/api/logs/meals", {
          date: today,
          name: item.name,
          calories: item.calories,
          foodId: item.id,
          quantity: 1,
        });
        latest = res.data.meals;
      }
      setMeals(latest);
      setGuest([]);
      setNote("The list from this device is now on your account.");
    } catch (error) {
      setTone("danger");
      setNote(apiError(error, "Those meals could not be moved."));
    }
  }

  async function changeWater(next) {
    const glasses = Math.min(12, Math.max(0, next));
    setWater(glasses);
    try {
      await api.put("/api/logs/habits", { date: today, waterGlasses: glasses });
    } catch (error) {
      setTone("danger");
      setNote(apiError(error, "Water could not be saved."));
    }
  }

  return (
    <Page kicker="Food" title="Diet">
      {note ? <Note tone={tone}>{note}</Note> : null}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <Field label="Search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Dal, paneer, fish" />
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.map(([id, label]) => (
              <button key={id} type="button" onClick={() => setType(id)} className={type === id ? "btn-lime" : "btn-ghost"}>{label}</button>
            ))}
          </div>
          <p className="mt-3 text-sm text-mist/50">{visible.length} meals</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {visible.map((food) => (
              <article key={food.id} className="card">
                <FoodImage src={food.image} alt={food.name} />
                <h2 className="mt-3 font-display text-2xl">{food.name}</h2>
                <p className="text-sm text-cyan">{food.calories} kcal {food.quantity ? `· ${food.quantity}` : ""}</p>
                <button type="button" className="btn-lime mt-3" onClick={() => addFood(food)}>Add</button>
              </article>
            ))}
          </div>
        </div>
        <aside className="card h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl uppercase">Today</h2>
          <p className="mt-2 font-display text-4xl text-lime">{total}<span className="text-base text-mist/60"> kcal</span></p>
          {user && target ? <p className="text-sm text-mist/60">Target {target} kcal</p> : null}
          {!user ? <p className="mt-2 text-sm text-mist/60">Log in to save this list on your account. It stays in this browser until then.</p> : null}
          {user && guest.length ? (
            <button type="button" className="btn-ghost mt-3 w-full" onClick={keepGuest}>Add the {guest.length} device items to today</button>
          ) : null}
          {user ? (
            <>
              <button type="button" className="btn-ghost mt-3 w-full" onClick={repeatYesterday}>Repeat yesterday</button>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-sm">Water</span>
                <button type="button" className="btn-ghost !min-h-0 px-3 py-1" onClick={() => changeWater(water - 1)}>-</button>
                <span className="text-cyan">{water}/12</span>
                <button type="button" className="btn-ghost !min-h-0 px-3 py-1" onClick={() => changeWater(water + 1)}>+</button>
              </div>
              <Link to="/coach" className="mt-4 inline-block text-sm text-cyan">Suggest meals</Link>
            </>
          ) : (
            <Link to="/login" className="btn-lime mt-4 w-full">Log in to save</Link>
          )}
          <ul className="mt-4 space-y-2 text-sm">
            {cart.map((item) => (
              <li key={item.id || item.key} className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate">{item.name}</span>
                <button type="button" className="shrink-0 text-cyan" onClick={() => removeItem(item)}>Remove</button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Page>
  );
}
