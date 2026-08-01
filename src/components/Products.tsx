import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilterProducts, setLoading } from "@/redux/slice/productSlice";
import { ProductSkeleton } from "./ProductSkeleton";
import { addToCart } from "@/redux/slice/cartSlice";
import { ProductType } from "@/types";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "all" as const, label: "All pieces" },
  { id: "recommended" as const, label: "Recommended" },
  { id: "bestSelling" as const, label: "Best sellers" }
];

export const Products = () => {
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<
    "recommended" | "bestSelling" | "all"
  >("all");
  const favourites = useAppSelector((state) => state.favourite.items);
  const { filterProducts, loading, products } = useAppSelector(
    (state) => state.products
  );

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

  const handleTabChange = (tab: "recommended" | "bestSelling" | "all") => {
    if (tab === selectedTab) return;
    dispatch(setLoading(true));
    setSelectedTab(tab);
    setTimeout(() => {
      let filteredProducts;
      if (tab === "all") {
        filteredProducts = products.slice(3, 11);
      } else {
        filteredProducts = products.filter((product) => {
          if (tab === "recommended" || tab === "bestSelling") {
            return product[tab];
          }
          return false;
        });
      }
      dispatch(setFilterProducts(filteredProducts));
      dispatch(setLoading(false));
    }, 400);
  };

  return (
    <section className="border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-ink-3">05 — The collection</p>
              <h2 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                Everyday pieces
              </h2>
            </div>
            <div className="flex items-center gap-6 lg:pb-2" role="tablist" aria-label="Filter products">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedTab === tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "relative cursor-pointer pb-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300",
                    selectedTab === tab.id
                      ? "text-ink"
                      : "text-ink-3 hover:text-ink-2"
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 h-px bg-bronze transition-all duration-500 ease-expo-out",
                      selectedTab === tab.id ? "w-full" : "w-0"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-14">
          {loading ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {[...Array(8).keys()].map((i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 max-sm:gap-x-3 sm:grid-cols-3 lg:grid-cols-4">
              {filterProducts.map((product, i) => (
                <Reveal key={product.id} delay={(i % 4) * 0.06}>
                  <ProductCard
                    product={product}
                    addToCartClick={addToCartClick}
                    favourites={favourites}
                    toggleFavorite={toggleFavorite}
                  />
                </Reveal>
              ))}
            </div>
          )}
          {!loading && filterProducts.length === 0 && (
            <p className="py-16 text-center text-sm text-ink-3">
              No pieces found in this selection yet.
            </p>
          )}
        </div>

        <Reveal className="mt-16 flex justify-center">
          <Link to="/products" className="btn-outline">
            Browse the full collection <ArrowRight size={14} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
