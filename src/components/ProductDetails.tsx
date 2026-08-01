import BreadCrumbs from "./BreadCrumbs";
import { Heart, Share2, Minus, Plus } from "lucide-react";
import { formatter } from "@/features/formatter";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { decrement, increment } from "@/redux/slice/quantitySlice";
import { addToCart } from "@/redux/slice/cartSlice";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";
import { ProductType } from "@/types";
import { cn } from "@/lib/utils";

interface ProductDetailsProps {
  product: ProductType;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(
    (state) => state.quantity.quantity[product.id] || 1
  );
  const favourite = useAppSelector((state) => state.favourite.items);
  const isFavourite = favourite.some((item) => item.id === product.id);

  const discount = product.price.oldPrice
    ? Math.round((1 - product.price.newPrice / product.price.oldPrice) * 100)
    : 0;

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(increment({ productId: product.id }));
  };
  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(decrement({ productId: product.id }));
  };

  const addToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: Math.max(quantity, 1) }));
  };

  const toggleFavorite = () => {
    if (isFavourite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  useEffect(() => {
    const viewedProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );
    const updatedProducts = viewedProducts.filter(
      (p: ProductType) => p.id !== product.id
    );
    updatedProducts.unshift(product);
    localStorage.setItem(
      "recentProducts",
      JSON.stringify(updatedProducts.slice(0, 5))
    );
  }, [product]);

  return (
    <div>
      <BreadCrumbs />

      <div className="mt-8">
        <p className="eyebrow text-ink-3">{product.category}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex gap-1" aria-label={`Rated ${product.rating} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "text-sm",
                  i < product.rating ? "text-bronze" : "text-ink-3/40"
                )}
              >
                ★
              </span>
            ))}
          </div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-3">
            {product.reviews.length} {product.reviews.length === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div className="mt-8 flex items-baseline gap-4">
          <p className="font-mono text-2xl text-ink">
            {formatter.format(product.price.newPrice)}
          </p>
          {discount > 0 && (
            <>
              <p className="font-mono text-sm text-ink-3 line-through">
                {formatter.format(product.price.oldPrice)}
              </p>
              <span className="bg-bronze px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-paper">
                −{discount}%
              </span>
            </>
          )}
        </div>

        <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-ink-2">
          {product.description}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <div className="flex items-center border border-line">
          <button
            type="button"
            onClick={handleDecrement}
            aria-label="Decrease quantity"
            className="flex h-12 w-12 cursor-pointer items-center justify-center text-ink-2 transition-colors hover:text-bronze"
          >
            <Minus size={15} />
          </button>
          <span className="min-w-10 text-center font-mono text-sm text-ink">
            {Math.max(quantity, 1)}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            aria-label="Increase quantity"
            className="flex h-12 w-12 cursor-pointer items-center justify-center text-ink-2 transition-colors hover:text-bronze"
          >
            <Plus size={15} />
          </button>
        </div>

        <button
          type="button"
          onClick={addToCartClick}
          className="btn-primary flex-1"
        >
          Add to cart
        </button>
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={isFavourite ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "flex h-12 w-12 cursor-pointer items-center justify-center border transition-all duration-300",
            isFavourite
              ? "border-bronze bg-bronze text-paper"
              : "border-line text-ink-2 hover:border-bronze hover:text-bronze"
          )}
        >
          <Heart size={16} className={isFavourite ? "fill-paper" : ""} />
        </button>
        <button
          type="button"
          aria-label="Share"
          className="flex h-12 w-12 cursor-pointer items-center justify-center border border-line text-ink-2 transition-all hover:border-bronze hover:text-bronze"
        >
          <Share2 size={16} />
        </button>
      </div>

      <dl className="mt-12 border-t border-line">
        {[
          ["SKU", String(product.id)],
          ["Category", product.category],
          ["In stock", product.inStock ? "Ready to ship" : "Made to order"]
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between border-b border-line py-3.5">
            <dt className="eyebrow text-ink-3">{label}</dt>
            <dd className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink">
              {value}
            </dd>
          </div>
        ))}
        <div className="flex items-start justify-between gap-6 border-b border-line py-3.5">
          <dt className="eyebrow pt-1 text-ink-3">Tags</dt>
          <dd className="flex flex-wrap justify-end gap-2">
            {product.tags.map((tag, i) => (
              <span
                key={i}
                className="border border-line px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-2"
              >
                {tag}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  );
};
