import { useRef } from "react";

export default function TiltCard({ className = "", children }) {
  const ref = useRef(null);

  function onMove(event) {
    const card = ref.current;
    if (!card) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${(-py * 9).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg) translateZ(10px)`;
  }

  function onLeave() {
    if (ref.current) {
      ref.current.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
  }

  return (
    <div className={`[perspective:1000px] ${className}`}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="h-full transition-transform duration-200 ease-out will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
