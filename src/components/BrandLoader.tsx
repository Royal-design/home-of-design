import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";

let shown = false;

export function BrandLoader() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (shown || prefersReducedMotion()) {
        el.style.display = "none";
        shown = true;
        return;
      }
      shown = true;
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      tl.to(el, { autoAlpha: 0, duration: 0.7, delay: 1.1 }).set(el, {
        display: "none"
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="brand-loader" aria-hidden="true">
      <div className="brand-loader__mark">Home of Design</div>
      <div className="brand-loader__bar">
        <span />
      </div>
    </div>
  );
}
