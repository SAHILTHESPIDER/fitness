import { Link } from "react-router-dom";
import "./design.css";
import HeroCanvas from "./HeroCanvas";
import PreviewBar from "./PreviewBar";
import TiltCard from "./TiltCard";
import { useDepthSection, useParallax } from "./useDepth";

const display = { fontFamily: "Anton, Impact, sans-serif" };
const body = { fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif" };

const tiles = [
  {
    title: "Meals with numbers",
    copy: "Search the food list, keep a running calorie total, and stay inside the day.",
    to: "/diet",
    className: "md:col-span-2",
  },
  {
    title: "Lift library",
    copy: "Gym, yoga, cardio, calisthenics.",
    to: "/Fitscreen",
    className: "",
  },
  {
    title: "BMI",
    copy: "A fast read on height and weight.",
    to: "/bmi",
    className: "",
  },
  {
    title: "Plans",
    copy: "Membership stays marked coming soon. No card form on this preview.",
    to: "/",
    className: "md:col-span-2",
  },
];

export default function DesignB() {
  const float = useParallax(0.12);
  const depth = useDepthSection();

  return (
    <div className="design-preview min-h-screen overflow-x-hidden bg-[#f4f1ea] text-[#141414]" style={body}>
      <PreviewBar tone="light" />

      <section className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 pb-8 pt-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/50">Preview B · Daylight</p>
          <h1 className="mt-3 text-5xl uppercase leading-[0.9] tracking-tight sm:text-7xl" style={display}>
            Strong, in daylight.
          </h1>
          <p className="mt-5 max-w-md text-base text-black/70 sm:text-lg">
            The cleaner direction. Same black, white, and gold, with more air and a kettlebell that keeps moving while you read.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/diet" className="rounded-full bg-[#141414] px-5 py-2.5 text-sm font-semibold text-white">
              Open the diet list
            </Link>
            <Link to="/design-a" className="rounded-full bg-[#FFC100] px-5 py-2.5 text-sm font-semibold text-black">
              See Night Forge
            </Link>
          </div>
        </div>
        <div className="relative order-1 lg:order-2">
          <div ref={float} className="gold-glow pointer-events-none absolute inset-6" />
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/70">
            <HeroCanvas
              variant="kettlebell"
              floor="#efeae0"
              className="h-64 w-full sm:h-80 lg:h-[480px]"
            />
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-black/10 bg-[#141414] py-3 text-[#FFC100]">
        <p className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.35em]">
          Gym · Yoga · Cardio · Calisthenics · Food · BMI · Gym · Yoga · Cardio · Calisthenics
        </p>
      </div>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-4">
        {tiles.map((tile) => (
          <TiltCard key={tile.title} className={tile.className}>
            <Link to={tile.to} className="glass-day block h-full rounded-3xl p-6">
              <h2 className="text-2xl uppercase leading-none" style={display}>{tile.title}</h2>
              <p className="mt-3 text-sm leading-6 text-black/70">{tile.copy}</p>
            </Link>
          </TiltCard>
        ))}
      </section>

      <section ref={depth} className="relative overflow-hidden bg-[#141414] py-24 text-[#f4f1ea] sm:py-28">
        <div data-depth="0.16" className="gold-glow pointer-events-none absolute -right-10 top-0 h-64 w-64" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <p data-depth="0.1" className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FFC100]">
            Scroll depth
          </p>
          <h2 data-depth="-0.05" className="mt-4 text-4xl uppercase leading-[0.95] sm:text-6xl" style={display}>
            Energy without the noise.
          </h2>
          <p data-depth="0.05" className="mt-5 max-w-xl text-white/70">
            The kettlebell is the motion. The rest of the page stays quiet: wide type, a gold chip, and cards that lean toward your cursor on a laptop.
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-4xl uppercase" style={display}>Current homepage stays put.</h2>
          <p className="mt-3 max-w-lg text-black/70">
            This route is only a preview. The owner picks Night Forge or Daylight before any other screen is restyled.
          </p>
        </div>
        <Link to="/" className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold">
          Back to today’s homepage
        </Link>
      </section>
    </div>
  );
}
