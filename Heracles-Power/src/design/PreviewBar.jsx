import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PreviewBar({ tone = "dark" }) {
  useEffect(() => {
    const id = "design-preview-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;700&family=Oswald:wght@500;600&family=Outfit:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  const dark = tone === "dark";

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur-md ${
        dark
          ? "border-white/10 bg-black/55 text-[#f4f1ea]"
          : "border-black/10 bg-[#f4f1ea]/80 text-[#141414]"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="text-sm font-semibold tracking-wide">
          Hercules Power
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <Link className={chip(dark, false)} to="/design-a">
            A · Night Forge
          </Link>
          <Link className={chip(dark, false)} to="/design-b">
            B · Daylight
          </Link>
          <Link className={chip(dark, false)} to="/design-c">
            C · Volt
          </Link>
          <Link className={chip(dark, false)} to="/design-d">
            D · Ember
          </Link>
          <Link className={chip(dark, true)} to="/bmi">
            BMI
          </Link>
          <Link className={chip(dark, true)} to="/diet">
            Diet
          </Link>
          <Link className={chip(dark, true)} to="/Fitscreen">
            Workouts
          </Link>
        </nav>
      </div>
    </header>
  );
}

function chip(dark, quiet) {
  if (quiet) {
    return dark
      ? "rounded-full px-3 py-1 text-white/70 hover:text-white"
      : "rounded-full px-3 py-1 text-black/60 hover:text-black";
  }
  return dark
    ? "rounded-full border border-[#FFC100]/50 px-3 py-1 text-[#FFC100]"
    : "rounded-full border border-black/15 bg-white px-3 py-1";
}
