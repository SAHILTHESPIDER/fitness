import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { apiError } from "../api";
import { useAuth } from "../useAuth";
import { Counter, Magnetic, Marquee } from "../design/bits";
import { useLenis } from "../design/useLenis";
import StoryHero from "../design/HeroStage";
import "../design/design.css";

const features = [
  { title: "Meals with a total", copy: "Search the food list and watch the calories add up before you save the plate." },
  { title: "Lifts you can see", copy: "Gym, yoga, cardio, calisthenics, and home sessions, with the muscle, sets, and reps on the card." },
  { title: "A number you trust", copy: "BMI from height and weight, coloured underweight, healthy, overweight, then obese." },
  { title: "A week, written", copy: "The coach uses your goal, your days, and the foods and lifts already in the app." },
];

const workouts = [
  { name: "Gym", copy: "Press, pull, squat. The heavy work." },
  { name: "Yoga", copy: "Balance, breath, long positions." },
  { name: "Cardio", copy: "Rope, run, bike, stairs." },
  { name: "Home", copy: "The moves you can do without a gym." },
];

const meals = [
  { name: "Dal tadka", kcal: "180", note: "Weeknight bowl" },
  { name: "Grilled fish", kcal: "300", note: "High protein" },
  { name: "Paneer tikka", kcal: "270", note: "Vegetarian" },
  { name: "Chicken tikka", kcal: "350", note: "After training" },
];

export default function Home() {
  useLenis();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [reviewNote, setReviewNote] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("5");

  useEffect(() => {
    let gone = false;
    api.get("/api/reviews/all")
      .then((res) => {
        if (!gone) setReviews(res.data.reviews || []);
      })
      .catch(() => {
        if (!gone) setReviewNote("Reviews will show when the server is reachable.");
      });
    return () => {
      gone = true;
    };
  }, []);

  async function submitReview(event) {
    event.preventDefault();
    setReviewNote("");
    try {
      const res = await api.post("/api/reviews/add", { rating: Number(rating), feedback });
      setReviews((current) => [res.data.review, ...current]);
      setFeedback("");
      setReviewNote("Thanks. Your review is live.");
    } catch (error) {
      setReviewNote(apiError(error, "The review could not be saved."));
    }
  }

  return (
    <div className="min-w-0 overflow-x-hidden">
      <StoryHero
        model="barbell"
        accent="#d6ff4a"
        secondary="#5ce1ff"
        clear="#070b14"
        shadowY={-0.58}
        font={{ fontFamily: "Syne, Impact, sans-serif" }}
        beats={[
          { kicker: "Hercules Power", title: "Charge the bar.", copy: "Deep navy, electric lime, and a barbell that turns as you scroll." },
          { kicker: "Scroll", title: "The camera moves in.", copy: "Lighting, bloom, and a steel sleeve. Built for the phone too." },
          { kicker: "Then the plan", title: "Your week, after the lift.", copy: "Food, workouts, and a coach that writes the next few days." },
        ]}
      />

      <Marquee
        className="border-y border-cyan/20 bg-ink text-cyan"
        items={["Gym", "Yoga", "Cardio", "Home", "Meals", "BMI", "Coach"]}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        {[
          ["95", "meals in the list"],
          ["5", "ways to train"],
          ["24", "hours the tools stay open"],
        ].map(([num, label]) => (
          <div key={label}>
            <p className="font-display text-6xl text-lime"><Counter to={Number(num)} /></p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-mist/60">{label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan">Features</p>
        <h2 className="mt-3 max-w-xl font-display text-4xl uppercase leading-none sm:text-6xl">Four tools. One voltage.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <article key={feature.title} className="card">
              <p className="text-lime">0{index + 1}</p>
              <h3 className="mt-4 font-display text-2xl">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-mist/70">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-lime">AI coach</p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">Tell it the week. It writes the work.</h2>
          <p className="mt-4 text-mist/70">The coach runs on the server. It may only pick foods and exercises that already live in the app, and you confirm before anything is saved.</p>
          <Link to="/coach" className="btn-lime mt-6">Open the coach</Link>
        </div>
        <div className="rounded-3xl border border-cyan/30 bg-ink/80 p-5 shadow-[0_0_40px_rgba(92,225,255,0.12)]">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan">How a reply looks</p>
          <div className="mt-4 space-y-3 text-sm">
            <p className="ml-auto max-w-[80%] rounded-2xl bg-lime px-4 py-3 text-ink">Four gym days. I want to get leaner.</p>
            <p className="max-w-[85%] rounded-2xl border border-white/10 px-4 py-3 text-mist/85">Push, pull, legs, and an easy conditioning day. Breakfast from the food list. Stop if a joint complains.</p>
          </div>
          <p className="mt-4 text-xs text-mist/50">General fitness guidance, not medical advice.</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4">
          <h2 className="font-display text-4xl uppercase sm:text-5xl">Workouts</h2>
          <Link to="/workout" className="text-sm text-cyan">Open the library</Link>
        </div>
        <div className="mx-auto mt-6 flex w-full max-w-6xl gap-4 overflow-x-auto pb-2">
          {workouts.map((item) => (
            <article key={item.name} className="min-w-[220px] flex-1 rounded-3xl border border-cyan/25 bg-gradient-to-br from-[#123] to-ink p-5">
              <h3 className="font-display text-3xl">{item.name}</h3>
              <p className="mt-3 text-sm text-mist/70">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-4xl uppercase sm:text-5xl">Meals</h2>
        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {meals.map((meal) => (
            <div key={meal.name} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-lg">{meal.name}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-mist/45">{meal.note}</p>
              </div>
              <p className="font-display text-lime">{meal.kcal} kcal</p>
            </div>
          ))}
        </div>
        <Link to="/diet" className="mt-4 inline-block text-sm text-cyan">Browse the full list</Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-mist/45">Reviews from people with an account</p>
        {reviewNote ? <p className="mt-4 text-sm text-cyan">{reviewNote}</p> : null}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.length ? reviews.slice(0, 6).map((review) => (
            <blockquote key={review.id} className="card">
              <p className="text-lg leading-snug">{review.feedback}</p>
              <footer className="mt-4 text-sm text-cyan">{review.name} · {review.rating}/5</footer>
            </blockquote>
          )) : (
            <p className="text-sm text-mist/60">No reviews yet.</p>
          )}
        </div>
        {user ? (
          <form onSubmit={submitReview} className="card mt-6 grid gap-3">
            <label className="text-sm text-mist/70">
              Rating
              <select className="field mt-1" value={rating} onChange={(event) => setRating(event.target.value)}>
                {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </label>
            <label className="text-sm text-mist/70">
              Your note
              <textarea className="field mt-1 min-h-24" value={feedback} onChange={(event) => setFeedback(event.target.value)} required minLength={3} />
            </label>
            <button type="submit" className="btn-lime w-fit">Post review</button>
          </form>
        ) : (
          <p className="mt-4 text-sm text-mist/60">Log in to leave a review. The name on it comes from your account.</p>
        )}
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-2">
        <article className="card">
          <p className="text-xs uppercase tracking-[0.2em] text-mist/50">Now</p>
          <h3 className="mt-3 font-display text-4xl">Free tools</h3>
          <p className="mt-3 text-sm text-mist/70">Diet list, workout demos, and BMI. No card form.</p>
          <Magnetic className="mt-6">
            <Link to="/signup" className="btn-lime">Create an account</Link>
          </Magnetic>
        </article>
        <article className="rounded-3xl border border-cyan/40 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan">Later</p>
          <h3 className="mt-3 font-display text-4xl">Member plans</h3>
          <p className="mt-3 text-sm text-mist/70">Monthly and yearly plans are coming soon. Nothing here charges a card.</p>
          <span className="mt-6 inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm text-mist/70">Coming soon</span>
        </article>
      </section>

      <section className="wash-drift mx-4 my-10 overflow-hidden rounded-[2rem] px-6 py-16 text-ink sm:mx-6" style={{ backgroundImage: "radial-gradient(800px 400px at 0% 0%, #5ce1ff, transparent 50%), radial-gradient(700px 400px at 100% 100%, #d6ff4a, transparent 45%), linear-gradient(#d6ff4a, #9dff6a)" }}>
        <h2 className="font-display text-5xl uppercase leading-none sm:text-7xl">Start with the list you already have.</h2>
        <Magnetic className="mt-8">
          <Link to="/diet" className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-lime">Open diet</Link>
        </Magnetic>
      </section>
    </div>
  );
}
