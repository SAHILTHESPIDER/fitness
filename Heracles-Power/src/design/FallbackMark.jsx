export default function FallbackMark({ variant = "dumbbell", animate = true }) {
  const spinning = animate ? "spin-mark" : "";

  if (variant === "kettlebell") {
    return (
      <svg viewBox="0 0 200 240" className={`h-full w-full ${spinning}`} aria-hidden="true">
        <ellipse cx="100" cy="214" rx="62" ry="10" fill="rgba(20,20,20,0.12)" />
        <path d="M70 78c0-28 14-46 30-46s30 18 30 46" fill="none" stroke="#141414" strokeWidth="12" strokeLinecap="round" />
        <circle cx="100" cy="132" r="58" fill="#FFC100" stroke="#141414" strokeWidth="6" />
        <circle cx="84" cy="116" r="14" fill="#fff4c4" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 160" className={`h-full w-full ${spinning}`} aria-hidden="true">
      <ellipse cx="140" cy="142" rx="90" ry="8" fill="rgba(255,193,0,0.25)" />
      <rect x="118" y="70" width="44" height="14" rx="7" fill="#f4f1ea" />
      <rect x="36" y="48" width="28" height="58" rx="6" fill="#FFC100" />
      <rect x="216" y="48" width="28" height="58" rx="6" fill="#FFC100" />
      <rect x="18" y="58" width="22" height="38" rx="4" fill="#1a1a1a" />
      <rect x="240" y="58" width="22" height="38" rx="4" fill="#1a1a1a" />
    </svg>
  );
}
