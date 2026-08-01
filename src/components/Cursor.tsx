import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

export function Cursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const ring = root.querySelector<HTMLDivElement>(".cc-ring")!;
    const dot = root.querySelector<HTMLDivElement>(".cc-dot")!;

    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.16, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.16, ease: "power2.out" });

    const move = (e: MouseEvent) => {
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const view = target.closest<HTMLElement>("[data-cursor='view']");
      const drag = target.closest<HTMLElement>("[data-cursor='drag']");
      const hover = target.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']"
      );

      root.classList.toggle("is-view", Boolean(view));
      root.classList.toggle("is-drag", Boolean(drag));
      root.classList.toggle("is-hover", Boolean(hover) && !view && !drag);

      const label = view?.dataset.cursorLabel ?? drag?.dataset.cursorLabel ?? "";
      if (labelRef.current) labelRef.current.textContent = label;
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true">
      <div className="cc-ring" />
      <div className="cc-dot" />
      <span ref={labelRef} className="cc-label" />
    </div>
  );
}
