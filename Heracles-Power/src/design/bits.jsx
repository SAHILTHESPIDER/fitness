import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "./webgl";

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    if (window.matchMedia("(max-width: 760px)").matches) return undefined;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame = 0;
    const loop = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

export function useFonts() {
  useEffect(() => {
    const id = "design-cd-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&family=Outfit:wght@400;500;600&family=Syne:wght@700;800&family=Teko:wght@500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

export function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let started = false;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / 1100);
        const eased = 1 - (1 - progress) ** 3;
        setValue(Math.round(to * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export function Magnetic({ className = "", children }) {
  const ref = useRef(null);

  function onMove(event) {
    const node = ref.current;
    if (!node || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    node.style.transform = `translate(${(x * 0.28).toFixed(1)}px, ${(y * 0.28).toFixed(1)}px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  }

  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block transition-transform duration-200 ${className}`}>
      {children}
    </span>
  );
}

export function Marquee({ items, className = "" }) {
  const line = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track py-3 text-sm font-semibold uppercase tracking-[0.28em]">
        {line.map((item, index) => (
          <span key={`${item}-${index}`} className="px-4">{item}</span>
        ))}
      </div>
    </div>
  );
}
