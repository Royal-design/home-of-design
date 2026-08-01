import { ProductCard } from "@/components/ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductSkeleton } from "./ProductSkeleton";
import { ProductType } from "@/types";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";
import { addToCart } from "@/redux/slice/cartSlice";
import { cn } from "@/lib/utils";

export const AllProducts = () => {
  const { filterProducts, loading } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourite.items);
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

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil(filterProducts.length / itemsPerPage)
  );

  const currentProducts = filterProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterProducts.length]);

  return (
    <section className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-3">
          {filterProducts.length} {filterProducts.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      {filterProducts.length === 0 && !loading && (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="font-display text-2xl text-ink">Nothing matched</p>
          <p className="max-w-xs text-sm text-ink-2">
            Try clearing a filter or choosing a different room.
          </p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3">
          {[...Array(6).keys()].map((index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 max-sm:gap-x-3 sm:grid-cols-3">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCartClick={addToCartClick}
              favourites={favourites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="flex h-10 w-10 cursor-pointer items-center justify-center border border-line text-ink-2 transition-all hover:border-bronze hover:text-bronze disabled:cursor-not-allowed disabled:opacity-30"
          >
            <MoveLeft size={15} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              type="button"
              onClick={() => setCurrentPage(i + 1)}
              aria-label={`Page ${i + 1}`}
              aria-current={currentPage === i + 1 ? "page" : undefined}
              className={cn(
                "flex h-10 w-10 cursor-pointer items-center justify-center border font-mono text-xs transition-all duration-300",
                currentPage === i + 1
                  ? "border-bronze bg-bronze text-paper"
                  : "border-line text-ink-2 hover:border-bronze hover:text-bronze"
              )}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="flex h-10 w-10 cursor-pointer items-center justify-center border border-line text-ink-2 transition-all hover:border-bronze hover:text-bronze disabled:cursor-not-allowed disabled:opacity-30"
          >
            <MoveRight size={15} />
          </button>
        </div>
      )}
    </section>
  );
};
