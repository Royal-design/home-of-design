import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger, smoothScroll } from "@/lib/motion";

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4
    });

    smoothScroll.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    if (reduce) lenis.destroy();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      smoothScroll.lenis = null;
    };
  }, [enabled]);
}
