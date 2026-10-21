import { useEffect, useRef } from "react";

export function useParallax(amount) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate3d(0, ${window.scrollY * amount}px, 0)`;
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [amount]);

  return ref;
}

export function useDepthSection() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = root.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        root.querySelectorAll("[data-depth]").forEach((el) => {
          const depth = Number(el.getAttribute("data-depth"));
          el.style.transform = `translate3d(0, ${(-center * depth).toFixed(1)}px, 0)`;
        });
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
