import { Link } from "react-router-dom";
import "./design.css";
import StoryHero from "./HeroStage";
import { Counter, Magnetic, Marquee, useFonts, useLenis } from "./bits";

const display = { fontFamily: "Teko, Impact, sans-serif" };
const body = { fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif" };

export default function DesignD() {
  useFonts();
  useLenis();

  return (
    <div className="design-preview min-h-screen overflow-x-hidden bg-[#f6efe8] text-[#1c1210]" style={body}>
      <header className="absolute left-0 right-0 top-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-[#fff6f2] sm:px-8">
        <Link to="/" className="text-sm font-semibold tracking-[0.16em] uppercase">Hercules Power</Link>
        <nav className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <Link className="rounded-full bg-[#ff4d3a] px-3 py-1 font-semibold text-white" to="/design-c">Volt</Link>
          <Link className="px-2 py-1" to="/Fitscreen">Train</Link>
          <Link className="px-2 py-1" to="/diet">Eat</Link>
          <Link className="px-2 py-1" to="/bmi">BMI</Link>
        </nav>
      </header>

      <StoryHero
        model="kettlebell"
        accent="#ff4d3a"
        secondary="#ffb088"
        clear="#1a0d0c"
        shadowY={-0.9}
        font={display}
        beats={[
          { kicker: "Direction D · Ember", title: "Heat, then control.", copy: "Crimson on charcoal. A kettlebell with a real highlight, not a circle and a handle." },
          { kicker: "Scroll", title: "It swings into view.", copy: "The camera walks around the bell while the page stays still." },
          { kicker: "After the set", title: "Eat. Repeat. Log it.", copy: "The rest of this page is the whole product, in a sport editorial layout." },
        ]}
      />

      <Marquee
        className="bg-[#ff4d3a] text-[#1c1210]"
        items={["Show up", "Lift", "Eat", "Recover", "Repeat"]}
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8102e]">Features</p>
        <h2 className="text-6xl uppercase leading-[0.85] sm:text-8xl" style={display}>
          Built like a kit, not a brochure.
        </h2>
      </section>

      <section className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-[2rem] bg-[#1c1210] sm:mx-6 sm:grid-cols-2 lg:mx-auto">
        {[
          ["01", "Food log", "A running calorie total from the meals already in the app."],
          ["02", "Workout floor", "Demos for the gym, the mat, the road, and the living room."],
          ["03", "BMI", "Height, weight, and a gauge that does not call a high score healthy."],
          ["04", "Coach", "A week plan from your goal. The live model waits on an API key."],
        ].map(([num, title, copy]) => (
          <article key={num} className="bg-[#f6efe8] p-6 sm:p-8">
            <p className="text-[#c8102e]" style={display}>{num}</p>
            <h3 className="text-5xl uppercase leading-none" style={display}>{title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#1c1210]/75">{copy}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[#1c1210] p-6 text-[#fff6f2] sm:p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-[#ffb088]">AI coach</p>
          <h2 className="mt-3 text-6xl uppercase leading-none" style={display}>Four days. No fluff.</h2>
          <p className="mt-4 text-sm leading-6 text-white/70">Sample of the tone. The real coach will only suggest foods and lifts that already exist in the app, and it will say when it cannot run.</p>
          <p className="mt-4 text-xs text-[#ffb088]">General fitness guidance, not medical advice.</p>
        </div>
        <ol className="space-y-4">
          {[
            ["Mon", "Push. Bench, press, dips."],
            ["Tue", "Pull. Rows and pull-ups."],
            ["Thu", "Legs. Squat pattern, then walk."],
            ["Sat", "Easy conditioning. Keep a joint quiet."],
          ].map(([day, copy]) => (
            <li key={day} className="flex items-baseline gap-4 border-b border-[#1c1210]/15 pb-3">
              <span className="w-16 text-4xl uppercase text-[#c8102e]" style={display}>{day}</span>
              <span>{copy}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#1c1210] px-4 py-16 text-[#fff6f2] sm:px-6">
        <div className="mx-auto flex max-w-6xl items-end justify-between">
          <h2 className="text-6xl uppercase leading-none" style={display}>Workouts</h2>
          <Link to="/Fitscreen" className="text-sm text-[#ffb088]">Library</Link>
        </div>
        <div className="mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Gym", "Barbell and machine patterns."],
            ["Yoga", "Holds, balance, breath."],
            ["Cardio", "Rope, run, bike, stairs."],
            ["Calisthenics", "Rings, bar, floor."],
          ].map(([name, copy]) => (
            <article key={name} className="rounded-3xl border border-white/10 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#ff4d3a]">
              <h3 className="text-5xl uppercase" style={display}>{name}</h3>
              <p className="mt-2 text-sm text-white/65">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-6xl uppercase leading-none" style={display}>Meals</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#1c1210]/70">Calories come from the food list, not from a guess. Add them, see the day, come back tomorrow.</p>
          <Magnetic className="mt-6">
            <Link to="/diet" className="inline-block rounded-full bg-[#c8102e] px-5 py-2.5 text-sm font-semibold text-white">Open the diet list</Link>
          </Magnetic>
        </div>
        <ul className="divide-y divide-[#1c1210]/15">
          {[
            ["Rajma chawal", "350"],
            ["Egg curry", "250"],
            ["Palak paneer", "200"],
            ["Grilled fish", "300"],
          ].map(([name, kcal]) => (
            <li key={name} className="flex items-baseline justify-between py-4">
              <span className="text-3xl uppercase" style={display}>{name}</span>
              <span className="text-[#c8102e]">{kcal}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#ff4d3a] px-4 py-14 text-[#1c1210] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {[
            [95, "meals you can search"],
            [4, "training lanes"],
            [1, "BMI reading"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="text-7xl leading-none" style={display}><Counter to={num} /></p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8102e]">Sample lines for this layout</p>
        <div className="mt-6 space-y-8">
          {[
            ["I stopped guessing breakfast.", "Kabir"],
            ["The workout page is the one I leave open.", "Neel"],
            ["Clear numbers. No lecture.", "Sara"],
          ].map(([quote, name]) => (
            <blockquote key={name} className="border-l-4 border-[#ff4d3a] pl-5">
              <p className="text-4xl uppercase leading-none sm:text-5xl" style={display}>{quote}</p>
              <footer className="mt-2 text-sm">{name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-8 sm:px-6 md:grid-cols-2">
        <article className="rounded-[2rem] bg-[#1c1210] p-8 text-[#fff6f2]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#ffb088]">Open now</p>
          <h3 className="mt-2 text-6xl uppercase leading-none" style={display}>The free kit</h3>
          <p className="mt-3 text-sm text-white/70">Diet, workouts, BMI, and an account. Nothing here takes a card number.</p>
        </article>
        <article className="rounded-[2rem] border border-[#1c1210]/15 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c8102e]">Not yet</p>
          <h3 className="mt-2 text-6xl uppercase leading-none" style={display}>Paid plans</h3>
          <p className="mt-3 text-sm text-[#1c1210]/70">Membership stays coming soon. The old checkout that asked for a card is not linked from this page.</p>
          <span className="mt-6 inline-block rounded-full border border-[#1c1210]/20 px-4 py-2 text-sm">Coming soon</span>
        </article>
      </section>

      <section className="mx-4 mb-10 overflow-hidden rounded-[2rem] bg-[#1c1210] px-6 py-16 text-[#fff6f2] sm:mx-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[#ff4d3a]">Next session</p>
        <h2 className="mt-3 max-w-3xl text-6xl uppercase leading-[0.85] sm:text-8xl" style={display}>Pick up the bell. Then open the list.</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Magnetic>
            <Link to="/Fitscreen" className="inline-block rounded-full bg-[#ff4d3a] px-5 py-3 text-sm font-semibold text-white">Workouts</Link>
          </Magnetic>
          <Magnetic>
            <Link to="/bmi" className="inline-block rounded-full border border-white/20 px-5 py-3 text-sm">Check BMI</Link>
          </Magnetic>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[#1c1210]/60 sm:flex-row sm:justify-between sm:px-6">
        <p>Hercules Power · Ember is a design study. Today’s homepage stays as it is.</p>
        <nav className="flex flex-wrap gap-4">
          <Link to="/">Home</Link>
          <Link to="/design-c">Volt</Link>
          <Link to="/About">About</Link>
          <Link to="/login">Join</Link>
        </nav>
      </footer>
    </div>
  );
}
