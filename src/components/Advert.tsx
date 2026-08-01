import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export const Advert = () => {
  return (
    <section className="border-t border-line bg-ink text-paper">
      <div className="mx-auto max-w-shell px-5 py-24 text-center sm:px-6 sm:py-32">
        <Reveal>
          <p className="eyebrow text-bronze">The seasonal edit</p>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight">
            Up to 30% off the pieces{" "}
            <em className="italic text-bronze">we love most.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-paper/70">
            A short list of favourites from the collection — reduced until the
            season turns. When they’re gone, they’re gone.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-paper px-8 py-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-all duration-500 ease-expo-out hover:bg-bronze hover:text-paper"
            >
              Shop the edit <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
