import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({
  ease: "power4.out"
});

export { gsap, ScrollTrigger, useGSAP };

export const smoothScroll = {
  lenis: null as Lenis | null
};

export function scrollToTop() {
  try {
    if (smoothScroll.lenis) {
      smoothScroll.lenis.scrollTo(0, { immediate: true });
      return;
    }
  } catch {
    /* fall back to native scroll below */
  }
  window.scrollTo(0, 0);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
