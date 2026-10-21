import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

const links = [
  ["/diet", "Diet"],
  ["/workout", "Workouts"],
  ["/bmi", "BMI"],
  ["/coach", "Coach"],
  ["/about", "About"],
];

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const home = location.pathname === "/";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const itemClass = ({ isActive }) => (
    `block rounded-full px-3 py-2 text-sm ${isActive ? "bg-lime text-ink" : "text-mist/80 hover:text-lime"}`
  );

  return (
    <header className={`${home ? "absolute bg-gradient-to-b from-navy via-navy/80 to-transparent" : "sticky border-b border-white/10 bg-navy/90 backdrop-blur"} left-0 right-0 top-0 z-40`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="font-display text-lg font-bold tracking-tight">Hercules Power</Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className={itemClass}>{label}</NavLink>
          ))}
          {user ? (
            <>
              <NavLink to="/profile" className={itemClass}>Profile</NavLink>
              <button type="button" onClick={logout} className="rounded-full px-3 py-2 text-sm text-mist/70">Log out</button>
            </>
          ) : (
            <NavLink to="/login" className="btn-lime !min-h-0 px-4 py-2">Log in</NavLink>
          )}
        </nav>
        <button
          type="button"
          className="rounded-full border border-white/20 px-3 py-2 text-sm lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav className="absolute left-0 right-0 top-full border-t border-white/10 bg-ink px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-1">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} className={itemClass}>{label}</NavLink>
            ))}
            {user ? (
              <>
                <NavLink to="/profile" className={itemClass}>Profile</NavLink>
                <button type="button" onClick={logout} className="rounded-full px-3 py-2 text-left text-sm text-mist/70">Log out</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={itemClass}>Log in</NavLink>
                <NavLink to="/signup" className={itemClass}>Sign up</NavLink>
              </>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-2xl">Hercules Power</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-mist/60">
            Meal lists, workout demos, and BMI are free. An account saves logs, water, and the coach plan. Paid plans are not for sale yet, and this site does not take a card.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm text-mist/80">
          <Link to="/">Home</Link>
          <Link to="/diet">Diet</Link>
          <Link to="/workout">Workouts</Link>
          <Link to="/bmi">BMI</Link>
          <Link to="/coach">Coach</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Log in</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
      <p className="px-4 pb-8 text-center text-xs text-mist/40">Hercules Power</p>
    </footer>
  );
}

export function Page({ kicker, title, children }) {
  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-8 sm:px-6">
      {kicker ? <p className="text-xs uppercase tracking-[0.28em] text-cyan">{kicker}</p> : null}
      <h1 className="mt-2 font-display text-4xl uppercase leading-none sm:text-6xl">{title}</h1>
      <div className="mt-8 min-w-0">{children}</div>
    </div>
  );
}

export function Field({ label, children, ...props }) {
  return (
    <label className="block min-w-0 text-sm">
      <span className="mb-1.5 block text-mist/70">{label}</span>
      {children || <input className="field" {...props} />}
    </label>
  );
}

export function Note({ children, tone = "cyan" }) {
  const color = tone === "danger" ? "border-danger/50 text-danger" : "border-cyan/40 text-cyan";
  return <p className={`rounded-2xl border px-4 py-3 text-sm ${color}`}>{children}</p>;
}

export function RequireAuth({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();
  if (!ready) return <p className="px-4 py-20 text-center text-mist/70">Loading your account…</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}
