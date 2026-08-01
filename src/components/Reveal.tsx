import { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  start = "top 86%"
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          delay,
          scrollTrigger: { trigger: ref.current, start, once: true }
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
