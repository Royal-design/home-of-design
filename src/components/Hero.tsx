import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion";
import heroImage from "../assets/banner/hero-main.webp";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const wrap = imageWrapRef.current;
    if (!img || !wrap) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(img, {
        x: dx * -16,
        y: dy * -12,
        duration: 1.1,
        ease: "power2.out"
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set(
            [
              ".hero-eyebrow",
              ".hero-line",
              ".hero-copy",
              ".hero-cta",
              ".hero-meta",
              imageWrapRef.current
            ],
            { clearProps: "opacity,transform,clipPath" }
          );
        }
      });

      tl.from(".hero-eyebrow", { opacity: 0, y: 16, duration: 1 }, 0.15)
        .from(
          ".hero-line",
          { opacity: 0, y: 26, duration: 1.1, stagger: 0.09 },
          0.25
        )
        .from(
          imageWrapRef.current,
          { clipPath: "inset(0 0 100% 0)", duration: 1.4, ease: "power4.inOut" },
          0.35
        )
        .from(imgRef.current, { scale: 1.12, duration: 1.6 }, 0.4)
        .from(".hero-copy", { opacity: 0, y: 20, duration: 1 }, 0.75)
        .from(
          ".hero-cta",
          { opacity: 0, y: 14, duration: 0.8, stagger: 0.08 },
          0.85
        )
        .from(".hero-meta", { opacity: 0, duration: 0.9 }, 1.05);

      gsap.to(imgRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-paper"
      aria-label="Introduction"
    >
      <div className="mx-auto grid max-w-shell gap-10 px-5 pt-32 sm:px-6 sm:pt-36 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-0 lg:pt-28">
        <div className="lg:col-span-6 lg:pb-4">
          <p className="hero-eyebrow eyebrow text-ink-3">
            The House of Design — Furniture & Objects
          </p>

          <h1 className="mt-8 font-display text-[clamp(3.25rem,9vw,8rem)] leading-[0.94] tracking-tightest text-ink">
            <span className="hero-line block">Objects</span>
            <span className="hero-line block">for living,</span>
            <span className="hero-line block">
              <em className="italic text-bronze">made to last.</em>
            </span>
          </h1>

          <div className="hero-copy mt-8 max-w-md space-y-4">
            <p className="text-[15px] leading-relaxed text-ink-2">
              Modern furniture built with material honesty — solid wood,
              honest joints, considered proportions. Designed in-house, crafted
              to outlive trends.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/products" className="btn-primary hero-cta">
              Shop the collection <ArrowRight size={14} />
            </Link>
            <Link
              to="/about"
              className="hero-cta link-underline font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-2 transition-colors hover:text-bronze"
            >
              The House
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 lg:h-[72vh]">
          <div
            ref={imageWrapRef}
            className="relative h-[58vh] overflow-hidden sm:h-[64vh] lg:h-full"
          >
            <img
              ref={imgRef}
              src={heroImage}
              alt="A sculptural sofa in a sunlit living space"
              className="fade-img h-full w-full scale-[1.04] object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute bottom-4 left-4 border border-line bg-paper/85 px-3 py-2 backdrop-blur-sm">
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink-2">
                Signature Sofa No. 01
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-meta mx-auto flex max-w-shell items-center justify-between px-5 py-7 sm:px-6">
        <div className="flex items-center gap-3">
          <ArrowDown size={14} className="animate-bounce text-bronze" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ink-3">
            Scroll to explore
          </span>
        </div>
        <p className="hidden font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ink-3 sm:block">
          Sofas — Chairs — Tables — Lighting
        </p>
      </div>
    </section>
  );
}
