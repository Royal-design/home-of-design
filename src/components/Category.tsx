import { useNavigate } from "react-router-dom";
import { data } from "@/assets/data/data";
import { useAppDispatch } from "@/redux/store";
import { filterByCategory } from "@/redux/slice/productSlice";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function Category() {
  const categories = data.categories;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const go = (name: string) => {
    dispatch(filterByCategory(name));
    navigate("/products");
  };

  return (
    <section className="bg-paper py-24 sm:py-32" aria-label="Shop by room">
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-ink-3">02 — Collections</p>
              <h2 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                Rooms, considered
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-2">
              Six families of furniture, each built around the way a room is
              actually lived in.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.id} delay={(i % 3) * 0.08}>
              <button
                type="button"
                onClick={() => go(category.name)}
                className="group relative block w-full cursor-pointer overflow-hidden text-left"
                data-cursor="view"
                data-cursor-label="Explore"
                aria-label={`Shop ${category.name}`}
              >
                <div className="card-media card-media-hover aspect-[4/5] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    className="fade-img h-full w-full object-cover transition-transform duration-[1.2s] ease-expo-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="card-scrim opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-paper/70">
                      0{i + 1}
                    </p>
                    <p className="mt-1 font-display text-xl text-paper sm:text-2xl">
                      {category.name}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="mb-1 text-paper transition-transform duration-500 ease-expo-out group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
