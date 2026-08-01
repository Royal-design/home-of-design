import { useRef } from "react";
import SplitType from "split-type";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitReveal({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  start = "top 88%",
  as = "p"
}: SplitRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as "p";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;

      const split = new SplitType(el, {
        types: "lines,words",
        tagName: "span",
        lineClass: "sr-line",
        wordClass: "sr-word"
      });

      gsap.set(split.lines, { overflow: "hidden" });
      gsap.set(split.words, { willChange: "transform" });

      gsap.fromTo(
        split.words,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.2,
          stagger,
          delay,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start, once: true }
        }
      );

      return () => {
        split.revert();
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as React.Ref<HTMLParagraphElement>} className={cn("sr-text", className)}>
      {text}
    </Tag>
  );
}
