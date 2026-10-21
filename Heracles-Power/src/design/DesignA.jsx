import { Link } from "react-router-dom";
import "./design.css";
import HeroCanvas from "./HeroCanvas";
import PreviewBar from "./PreviewBar";
import TiltCard from "./TiltCard";
import { useDepthSection, useParallax } from "./useDepth";

const display = { fontFamily: "Oswald, Impact, sans-serif" };
const body = { fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" };

const cards = [
  {
    kicker: "01",
    title: "Diet list",
    copy: "Indian meals with calories you can add up before you eat them.",
    to: "/diet",
  },
  {
    kicker: "02",
    title: "Workout floor",
    copy: "Gym, yoga, cardio, and calisthenics, each with a moving demo.",
    to: "/Fitscreen",
  },
  {
    kicker: "03",
    title: "BMI check",
    copy: "Height and weight, turned into a number you can actually read.",
    to: "/bmi",
  },
];

export default function DesignA() {
  const glow = useParallax(0.18);
  const depth = useDepthSection();

  return (
    <div className="design-preview min-h-screen overflow-x-hidden bg-[#070708] text-[#f4f1ea]" style={body}>
      <PreviewBar tone="dark" />

      <section className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 lg:min-h-[calc(100vh-57px)] lg:grid-cols-[1.05fr_0.95fr] lg:py-6">
        <div ref={glow} className="gold-glow pointer-events-none absolute -left-20 top-10 h-72 w-72 sm:h-96 sm:w-96" />
        <div className="relative z-10 order-2 max-w-xl lg:order-1">
          <p className="text-xs uppercase tracking-[0.28em] text-[#FFC100]">Preview A · Night Forge</p>
          <h1 className="mt-4 text-5xl uppercase leading-[0.92] sm:text-7xl" style={display}>
            Forge a stronger week.
          </h1>
          <p className="mt-5 max-w-md text-base text-white/70 sm:text-lg">
            A darker take on Hercules Power. Calories, BMI, and workouts sit in one place, lit like a late session on the gym floor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/Fitscreen" className="rounded-full bg-[#FFC100] px-5 py-2.5 text-sm font-semibold text-black">
              Open workouts
            </Link>
            <Link to="/login" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white">
              Join now
            </Link>
          </div>
        </div>
        <HeroCanvas
          variant="dumbbell"
          floor="#101114"
          className="relative z-10 order-1 h-64 w-full sm:h-80 lg:order-2 lg:h-[520px]"
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-16 sm:px-6 md:grid-cols-3">
        {cards.map((card) => (
          <TiltCard key={card.title}>
            <Link to={card.to} className="glass-night block h-full rounded-3xl p-6">
              <p className="text-xs tracking-[0.22em] text-[#FFC100]">{card.kicker}</p>
              <h2 className="mt-4 text-3xl uppercase" style={display}>{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/70">{card.copy}</p>
            </Link>
          </TiltCard>
        ))}
      </section>

      <section ref={depth} className="relative overflow-hidden border-y border-white/10 py-24 sm:py-32">
        <p
          data-depth="0.18"
          className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-[18vw] uppercase leading-none text-white/[0.04]"
          style={display}
        >
          Depth
        </p>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p data-depth="0.08" className="text-xs uppercase tracking-[0.28em] text-[#FFC100]">
            Scroll
          </p>
          <h2 data-depth="-0.06" className="mt-4 text-4xl uppercase leading-none sm:text-6xl" style={display}>
            The page moves in layers, the way a bar moves on your back.
          </h2>
          <p data-depth="0.04" className="mx-auto mt-6 max-w-xl text-white/65">
            Gold stays the accent. Black holds the room. Cards tilt when you have a mouse, and stay flat on a phone so the page can scroll.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#FFC100]">Still the same app</p>
          <h2 className="mt-3 text-4xl uppercase sm:text-5xl" style={display}>This preview does not replace the live homepage.</h2>
          <p className="mt-4 text-white/70">
            Diet, BMI, workouts, and login are the current pages. Pick this direction or Daylight before the rest of the app is restyled.
          </p>
        </div>
        <div className="glass-night rounded-3xl p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.18em] text-white/50">Direction A uses</p>
          <ul className="mt-4 space-y-2 text-lg">
            <li>A rotating gold dumbbell</li>
            <li>Glass cards with tilt</li>
            <li>Scroll depth behind the headline</li>
          </ul>
          <Link to="/design-b" className="mt-6 inline-block text-sm font-semibold text-[#FFC100]">
            Compare with Daylight
          </Link>
        </div>
      </section>
    </div>
  );
}
