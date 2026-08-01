import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";

const STATEMENT =
  "A room should hold memory. Each piece leaves our workshop with a maker's mark, joined by hand, engineered to be lived on, and designed to age with grace.";

const PRINCIPLES = [
  { index: "01", title: "Material honesty", body: "Solid timber, natural fibres, honest finishes. Nothing veneered for appearance." },
  { index: "02", title: "Considered proportions", body: "Measured against the human body and the rooms we live in." },
  { index: "03", title: "Built to repair", body: "Replaceable parts, serviceable joints. A piece that lasts decades." }
];

export function CraftStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const words = gsap.utils.toArray<HTMLElement>(".craft-word");
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "bottom 40%",
            scrub: true
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="border-t border-line bg-paper-2/40 py-24 sm:py-32"
      aria-label="Craft philosophy"
    >
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <p className="eyebrow text-ink-3">01 — The House</p>

        <p className="mt-10 max-w-5xl font-display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.15] tracking-tight text-ink">
          {STATEMENT.split(" ").map((word, i) => (
            <span key={i} className="craft-word inline-block">
              {word}
              {i < STATEMENT.split(" ").length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-px border-t border-line md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div
              key={p.index}
              className="group border-b border-line px-6 py-10 transition-colors duration-500 hover:bg-paper-2 md:border-b-0 md:border-r"
            >
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-bronze">
                {p.index}
              </p>
              <h3 className="mt-5 font-display text-2xl text-ink">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
