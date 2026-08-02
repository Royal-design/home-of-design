import { useEffect, useRef, useState } from "react";
import { ProductType } from "@/types";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  product: ProductType;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = [product.mainImage, ...product.images];
  const [active, setActive] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setActive(0);
  }, [product.id]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 1.035 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" }
    );
  }, [active, product.id]);

  const discount = product.price.oldPrice
    ? Math.round((1 - product.price.newPrice / product.price.oldPrice) * 100)
    : 0;

  return (
    <div>
      <div className="card-media relative aspect-[4/5] overflow-hidden sm:aspect-[3/4] lg:aspect-auto lg:h-[72vh]">
        <img
          key={active}
          ref={imgRef}
          src={images[active]}
          alt={product.name}
          className="h-full w-full object-contain p-6 sm:p-10 lg:p-12"
          loading="eager"
          decoding="async"
        />
        {discount > 0 && (
          <span className="absolute left-5 top-5 bg-bronze px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-paper">
            −{discount}%
          </span>
        )}
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-hidden">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1} of ${images.length}`}
            aria-current={i === active}
            className={cn(
              "card-media h-20 w-20 shrink-0 cursor-pointer overflow-hidden border transition-all duration-300 sm:h-24 sm:w-24",
              i === active
                ? "border-bronze"
                : "border-line opacity-60 hover:opacity-100"
            )}
          >
            <img
              src={img}
              alt=""
              className="h-full w-full object-contain p-2"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
