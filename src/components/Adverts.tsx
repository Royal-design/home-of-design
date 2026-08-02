import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import advert1 from "../assets/adverts/room-living.webp";
import advert2 from "../assets/adverts/room-office.webp";
import { Reveal } from "./Reveal";

const rooms = [
  {
    title: "The living room",
    body: "Soft seating, considered tables, lighting that sets the evening.",
    imageUrl: advert1,
    cta: "Shop living",
  },
  {
    title: "The working room",
    body: "Desks and chairs engineered for long days, styled for the rest of them.",
    imageUrl: advert2,
    cta: "Shop office",
  },
];

export const Adverts = () => {
  return (
    <section className="border-t border-line bg-paper-2/40 py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-ink-3">06 — In rooms</p>
              <h2 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                Where they live
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-2">
              Furniture only makes sense in a room. Here are ours, in situ.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {rooms.map((room, i) => (
            <Reveal key={room.title} delay={i * 0.1}>
              <Link
                to="/products"
                className="card-media card-media-hover group relative block aspect-[16/10] overflow-hidden"
                data-cursor="view"
                data-cursor-label="Shop"
                aria-label={room.cta}
              >
                <img
                  src={room.imageUrl}
                  alt={room.title}
                  loading="lazy"
                  decoding="async"
                  className="fade-img h-full w-full object-cover transition-transform [transition-duration:1.4s] ease-expo-out group-hover:scale-[1.06]"
                />
                <div className="card-scrim" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 sm:p-8">
                  <div>
                    <h3 className="font-display text-3xl text-[#f9d171] sm:text-4xl">
                      {room.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-white">
                      {room.body}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-2 border border-[#f9d171] px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#f9d171] transition-all duration-300 group-hover:bg-paper group-hover:text-ink">
                    {room.cta} <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
