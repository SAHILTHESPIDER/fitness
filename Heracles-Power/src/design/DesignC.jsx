import { Link } from "react-router-dom";
import "./design.css";
import StoryHero from "./HeroStage";
import { Counter, Magnetic, Marquee, useFonts, useLenis } from "./bits";

const display = { fontFamily: "Syne, Impact, sans-serif" };
const body = { fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" };

const features = [
  { title: "Meals with a total", copy: "Search the food list and watch the calories add up before you commit to the plate." },
  { title: "Lifts you can see", copy: "Gym, yoga, cardio, and calisthenics, each with a moving demo instead of a still photo." },
  { title: "A number you trust", copy: "BMI from height and weight, with the gauge coloured the way a clinician would expect." },
  { title: "A week, written", copy: "The coach teaser below is the shape of the AI plan: your days, your goal, your equipment." },
];

const workouts = [
  { name: "Gym", copy: "Press, pull, squat. The heavy work." },
  { name: "Yoga", copy: "Balance, breath, long positions." },
  { name: "Cardio", copy: "Rope, run, bike, stairs." },
  { name: "Bodyweight", copy: "Muscle-up, dip, pistol." },
];

const meals = [
  { name: "Dal tadka", kcal: "180", note: "Weeknight bowl" },
  { name: "Grilled fish", kcal: "300", note: "High protein" },
  { name: "Paneer tikka", kcal: "270", note: "Vegetarian" },
  { name: "Chicken tikka", kcal: "350", note: "After training" },
];

export default function DesignC() {
  useFonts();
  useLenis();

  return (
    <div className="design-preview min-h-screen overflow-x-hidden bg-[#070b14] text-[#e7f2ff]" style={body}>
      <header className="absolute left-0 right-0 top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <Link to="/" className="text-sm font-semibold tracking-wide">Hercules Power</Link>
        <nav className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <Link className="rounded-full border border-[#d6ff4a]/40 px-3 py-1 text-[#d6ff4a]" to="/design-d">Ember</Link>
          <Link className="px-2 py-1 text-white/70" to="/diet">Diet</Link>
          <Link className="px-2 py-1 text-white/70" to="/Fitscreen">Workouts</Link>
          <Link className="px-2 py-1 text-white/70" to="/bmi">BMI</Link>
        </nav>
      </header>

      <StoryHero
        model="barbell"
        accent="#d6ff4a"
        secondary="#5ce1ff"
        clear="#070b14"
        shadowY={-0.58}
        font={display}
        beats={[
          { kicker: "Direction C · Volt", title: "Charge the bar.", copy: "Deep navy, electric lime, and a barbell that turns as you scroll." },
          { kicker: "Scroll", title: "The camera moves in.", copy: "Lighting, bloom, and a steel sleeve. Not a flat icon." },
          { kicker: "Then the plan", title: "Your week, after the lift.", copy: "Food, workouts, and a coach that writes the next four days." },
        ]}
      />

      <Marquee
        className="border-y border-[#5ce1ff]/20 bg-[#0c1424] text-[#5ce1ff]"
        items={["Gym", "Yoga", "Cardio", "Calisthenics", "Meals", "BMI", "Coach"]}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        {[
          ["95", "meals in the list"],
          ["4", "ways to train"],
          ["24", "hours the tools stay open"],
        ].map(([num, label]) => (
          <div key={label}>
            <p className="text-6xl text-[#d6ff4a]" style={display}><Counter to={Number(num)} /></p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/60">{label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[#5ce1ff]">Features</p>
        <h2 className="mt-3 max-w-xl text-4xl uppercase leading-none sm:text-6xl" style={display}>Four tools. One voltage.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <article key={feature.title} className="rounded-3xl border border-white/10 bg-[#10192b]/80 p-6 backdrop-blur-md [transform:perspective(900px)] transition duration-300 hover:[transform:rotateX(4deg)_rotateY(-4deg)]">
              <p className="text-[#d6ff4a]">0{index + 1}</p>
              <h3 className="mt-4 text-2xl" style={display}>{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#d6ff4a]">AI coach</p>
          <h2 className="mt-3 text-4xl uppercase leading-none sm:text-5xl" style={display}>Tell it the week. It writes the work.</h2>
          <p className="mt-4 text-white/70">This is the teaser, not a live model. When the key is on the server, the coach will use your goal, your days, and the foods and lifts already in the app.</p>
        </div>
        <div className="rounded-3xl border border-[#5ce1ff]/30 bg-[#0c1828]/80 p-5 shadow-[0_0_40px_rgba(92,225,255,0.12)] backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.2em] text-[#5ce1ff]">Preview conversation</p>
          <div className="mt-4 space-y-3 text-sm">
            <p className="ml-auto max-w-[80%] rounded-2xl bg-[#d6ff4a] px-4 py-3 text-[#071018]">Four gym days. I want to get leaner.</p>
            <p className="max-w-[85%] rounded-2xl border border-white/10 px-4 py-3 text-white/85">Push, pull, legs, and an easy conditioning day. Breakfast from the high-protein list. Stop if a joint complains.</p>
          </div>
          <p className="mt-4 text-xs text-white/50">General fitness guidance, not medical advice.</p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-4">
          <h2 className="text-4xl uppercase sm:text-5xl" style={display}>Workouts</h2>
          <Link to="/Fitscreen" className="text-sm text-[#5ce1ff]">Open the library</Link>
        </div>
        <div className="mx-auto mt-6 flex max-w-6xl gap-4 overflow-x-auto pb-2">
          {workouts.map((item) => (
            <article key={item.name} className="min-w-[220px] flex-1 rounded-3xl border border-[#5ce1ff]/25 bg-gradient-to-br from-[#123] to-[#0b1524] p-5">
              <h3 className="text-3xl" style={display}>{item.name}</h3>
              <p className="mt-3 text-sm text-white/70">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-4xl uppercase sm:text-5xl" style={display}>Meals</h2>
        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {meals.map((meal) => (
            <div key={meal.name} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-lg">{meal.name}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">{meal.note}</p>
              </div>
              <p className="text-[#d6ff4a]" style={display}>{meal.kcal} kcal</p>
            </div>
          ))}
        </div>
        <Link to="/diet" className="mt-4 inline-block text-sm text-[#5ce1ff]">Browse the full list</Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-white/45">Sample voices for this design</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["The food list finally matches what I actually cook.", "Asha"],
            ["I open workouts on my phone between sets.", "Rohit"],
            ["BMI used to feel like a lecture. This one is just clear.", "Meera"],
          ].map(([quote, name]) => (
            <blockquote key={name} className="rounded-3xl bg-[#10192b] p-6">
              <p className="text-lg leading-snug">“{quote}”</p>
              <footer className="mt-4 text-sm text-[#5ce1ff]">{name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-2">
        <article className="rounded-3xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Now</p>
          <h3 className="mt-3 text-4xl" style={display}>Free tools</h3>
          <p className="mt-3 text-sm text-white/70">Diet list, workout demos, and BMI. No card form.</p>
          <Magnetic className="mt-6">
            <Link to="/login" className="inline-block rounded-full bg-[#d6ff4a] px-5 py-2.5 text-sm font-semibold text-[#071018]">Create an account</Link>
          </Magnetic>
        </article>
        <article className="rounded-3xl border border-[#5ce1ff]/40 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#5ce1ff]">Later</p>
          <h3 className="mt-3 text-4xl" style={display}>Member plans</h3>
          <p className="mt-3 text-sm text-white/70">Paid plans stay marked coming soon until a real checkout exists.</p>
          <span className="mt-6 inline-block rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/70">Coming soon</span>
        </article>
      </section>

      <section className="wash-drift mx-4 my-10 rounded-[2rem] px-6 py-16 text-[#071018] sm:mx-6" style={{ backgroundImage: "radial-gradient(800px 400px at 0% 0%, #5ce1ff, transparent 50%), radial-gradient(700px 400px at 100% 100%, #d6ff4a, transparent 45%), linear-gradient(#d6ff4a, #9dff6a)" }}>
        <h2 className="text-5xl uppercase leading-none sm:text-7xl" style={display}>Start with the list you already have.</h2>
        <Magnetic className="mt-8">
          <Link to="/diet" className="inline-block rounded-full bg-[#071018] px-6 py-3 text-sm font-semibold text-[#d6ff4a]">Open diet</Link>
        </Magnetic>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Hercules Power · Volt is a design study. The live homepage is unchanged.</p>
        <nav className="flex flex-wrap gap-4">
          <Link to="/">Home</Link>
          <Link to="/design-a">Night Forge</Link>
          <Link to="/design-b">Daylight</Link>
          <Link to="/About">About</Link>
        </nav>
      </footer>
    </div>
  );
}
