import { formatter } from "@/features/formatter";
import { addToCart } from "@/redux/slice/cartSlice";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProductType } from "@/types";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

export const FeaturedProduct = () => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const favourites = useAppSelector((state) => state.favourite.items);
  const featured = products.filter((product) => product.featured);
  const [hero, ...rest] = featured;

  const toggleFavorite = (product: ProductType) => {
    if (favourites.find((item: ProductType) => item.id === product.id)) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const addToCartClick = (product: ProductType) => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <section className="border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-ink-3">03 — Signature</p>
              <h2 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                The signature collection
              </h2>
            </div>
            <Link
              to="/products"
              className="link-underline self-start font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-2 transition-colors hover:text-bronze sm:self-auto"
            >
              View all pieces
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {hero && (
            <Reveal className="relative h-full">
              <div className="card-media card-media-hover group relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[62vh]">
                <Link
                  to={`/products/${hero.id}`}
                  data-cursor="view"
                  data-cursor-label="View"
                  aria-label={`View ${hero.name}`}
                  className="block h-full w-full"
                >
                  <img
                    src={hero.mainImage}
                    alt={hero.name}
                    loading="lazy"
                    decoding="async"
                    className="fade-img h-full w-full object-contain p-6 transition-transform [transition-duration:1.4s] ease-expo-out group-hover:scale-[1.05] sm:p-10"
                  />
                </Link>
                <div className="" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 sm:p-9">
                  <div>
                    <p className="eyebrow text-paper/70">Signature piece</p>
                    <h3 className="mt-2 font-display text-3xl text-neutral sm:text-4xl">
                      {hero.name}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-neutral dark:text-neutral-2 leading-relaxed">
                      {hero.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-lg text-neutral-2">
                      {formatter.format(hero.price.newPrice)}
                    </p>
                    <Link
                      to={`/products/${hero.id}`}
                      className="mt-3 inline-flex text-neutral items-center gap-2 border border-paper/60 px-4 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-paper hover:text-ink"
                    >
                      Explore <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          <div className="grid grid-cols-2 gap-5 max-sm:gap-3">
            {rest.slice(0, 4).map((product, i) => (
              <Reveal key={product.id} delay={i * 0.08}>
                <ProductCard
                  product={product}
                  favourites={favourites}
                  toggleFavorite={toggleFavorite}
                  addToCartClick={addToCartClick}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
