import { formatter } from "@/features/formatter";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types";
import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: ProductType;
  favourites: ProductType[];
  toggleFavorite: (product: ProductType) => void;
  addToCartClick: (product: ProductType) => void;
}

export const ProductCard = ({
  product,
  addToCartClick,
  toggleFavorite,
  favourites,
}: ProductCardProps) => {
  const isFavourite = favourites.some((item) => item.id === product.id);
  const discount = product.price.oldPrice
    ? Math.round((1 - product.price.newPrice / product.price.oldPrice) * 100)
    : 0;

  return (
    <article className="group card-surface card-surface-hover flex h-full flex-col p-3 sm:p-4">
      <div className="card-media card-media-hover relative aspect-[4/5] overflow-hidden">
        <Link
          to={`/products/${product.id}`}
          data-cursor="view"
          data-cursor-label="View"
          aria-label={`View ${product.name}`}
          className="block h-full w-full"
        >
          <img
            src={product.mainImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="fade-img h-full w-full object-contain transition-transform duration-[1.3s] ease-expo-out group-hover:-translate-y-1 group-hover:scale-[1.06]"
          />
        </Link>

        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-bronze px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-paper">
              −{discount}%
            </span>
          )}
          {product.bestSelling && (
            <span className="border border-amber-300 bg-amber-50/90 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-amber-700 backdrop-blur-sm">
              Best seller
            </span>
          )}
        </div>

        <div className="absolute inset-x-4 bottom-4 flex translate-y-2 items-center justify-between gap-2 opacity-100 transition-all duration-500 ease-expo-out max-sm:opacity-100 max-sm:translate-y-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCartClick(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            className={cn(
              "flex cursor-pointer items-center gap-2 px-2 py-2 md:px-4 md:py-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper transition-colors duration-300",
              "bg-ink hover:bg-bronze",
            )}
          >
            <Plus size={13} /> Add
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product);
            }}
            aria-label={
              isFavourite
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            className={cn(
              "flex h-7 w-7 md:h-11 md:w-11 cursor-pointer items-center justify-center border backdrop-blur-sm transition-all duration-300",
              isFavourite
                ? "border-bronze bg-bronze text-paper"
                : "border-line bg-paper/85 text-ink hover:border-bronze hover:text-bronze",
            )}
          >
            <Heart size={15} className={isFavourite ? "fill-paper" : ""} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col px-1 pb-1 sm:px-0.5">
        <p className="eyebrow text-ink-3">{product.category}</p>

        <Link
          to={`/products/${product.id}`}
          className="mt-1 line-clamp-2 text-sm md:text-[15px]  leading-4 text-ink transition-colors hover:text-bronze"
        >
          {product.name}
        </Link>

        <div className="mt-3 flex items-center gap-2">
          {discount > 0 && (
            <span className="font-mono text-xs text-ink-3 line-through">
              {formatter.format(product.price.oldPrice)}
            </span>
          )}

          <span className="font-mono text-base text-ink">
            {formatter.format(product.price.newPrice)}
          </span>
        </div>
      </div>
    </article>
  );
};
