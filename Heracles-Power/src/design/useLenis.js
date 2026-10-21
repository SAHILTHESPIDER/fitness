import { useEffect } from "react";
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
