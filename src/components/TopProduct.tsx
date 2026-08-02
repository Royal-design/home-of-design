import { formatter } from "@/features/formatter";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { useAppSelector } from "@/redux/store";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import bedroomImg from "../assets/category/bedroom (1).webp";
import diningImg from "../assets/category/dinning room.webp";
import officeImg from "../assets/category/ofiice.webp";
import outdoorImg from "../assets/category/outdoor (3).webp";

const GALLERY_IMAGES: Record<number, string> = {
  105: bedroomImg,
  106: officeImg,
  107: outdoorImg,
  110: diningImg,
};

export const TopProduct = () => {
  const { products } = useAppSelector((state) => state.products);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = prefersReducedMotion();

  const items = products.filter((product) => product.topProduct);

  useGSAP(
    () => {
      if (reduce || items.length === 0) return;

      const track = trackRef.current;
      if (!track) return;

      const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-forest text-on-dark"
      aria-label="Most desired pieces"
    >
      <div
        ref={trackRef}
        className={
          reduce
            ? "mx-auto grid max-w-shell grid-cols-1 gap-10 px-5 py-24 sm:grid-cols-2 sm:px-6 lg:grid-cols-4"
            : "flex h-auto min-h-[30rem] items-stretch gap-6 px-5 py-16 sm:gap-8 sm:px-[6vw] sm:py-20 lg:h-[100svh] lg:min-h-0 lg:py-0 lg:pr-[12vw]"
        }
      >
        {/* Intro */}
        <div
          className={
            reduce
              ? "sm:col-span-2 lg:col-span-4"
              : "flex w-full shrink-0 flex-col justify-center lg:w-[34vw]"
          }
        >
          <p className="eyebrow text-bronze">04 — Most desired</p>

          <h2 className="mt-6 font-display text-4xl leading-[1] tracking-tight sm:text-5xl lg:text-7xl">
            Pieces people <em className="italic text-bronze">return to.</em>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-on-dark/70">
            The furniture our customers come back for — resized, re-finished, or
            re-gifted. Scroll to browse the hall of favourites.
          </p>

          <Link
            to="/products"
            className="link-underline mt-8 inline-flex items-center gap-2 self-start font-mono text-[0.7rem] uppercase tracking-[0.18em] text-on-dark/80 transition-colors hover:text-bronze"
          >
            All pieces <ArrowRight size={14} />
          </Link>
        </div>

        {items.map((product, i) => {
          const img = GALLERY_IMAGES[product.id] ?? product.mainImage;

          return (
            <div
              key={product.id}
              className={
                reduce ? "" : "w-[82vw] shrink-0 sm:w-[44vw] lg:w-[32rem]"
              }
            >
              <Link
                to={`/products/${product.id}`}
                data-cursor="view"
                data-cursor-label="View"
                aria-label={`View ${product.name}`}
                className="group relative block overflow-hidden"
              >
                <div className="card-media card-media-hover aspect-[4/5] overflow-hidden">
                  <img
                    src={img}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="fade-img h-full w-full object-cover transition-transform [transition-duration:1.4s] ease-expo-out group-hover:scale-[1.06]"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-6">
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow text-paper/70">{product.category}</p>

                    <h3 className="mt-1 line-clamp-2 font-display text-xl leading-tight text-[#F6D98C] sm:text-2xl">
                      {product.name}
                    </h3>
                  </div>

                  <p className="shrink-0 font-mono text-base font-semibold text-paper sm:text-lg">
                    {formatter.format(product.price.newPrice)}
                  </p>
                </div>
              </Link>

              <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/40">
                No. {String(i + 1).padStart(2, "0")}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
