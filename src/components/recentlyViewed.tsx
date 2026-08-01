import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProductsType, ProductType } from "@/types";
import { addToCart } from "@/redux/slice/cartSlice";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";
import { Reveal } from "./Reveal";

export const RecentlyViewed: React.FC = () => {
  const dispatch = useAppDispatch();
  const [recentlyViewedProducts, setRecentlyViewedProducts] =
    useState<ProductsType>([]);

  const favourites = useAppSelector((state) => state.favourite.items);
  const toggleFavorite = (product: ProductType) => {
    if (favourites.find((item: ProductType) => item.id === product.id)) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentProducts") || "[]");
    setRecentlyViewedProducts(recent);
  }, []);

  if (recentlyViewedProducts.length === 0) return null;

  const addToCartClick = (product: ProductType) => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <section className="border-t border-line bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <Reveal>
          <div className="border-b border-line pb-8">
            <p className="eyebrow text-ink-3">From your visit</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Recently viewed
            </h2>
          </div>
        </Reveal>

        <div className="swiper-free-navigation mt-10">
          <Swiper
            slidesPerView={1.15}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4.2 }
            }}
            navigation
            modules={[Navigation]}
          >
            {recentlyViewedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  product={product}
                  favourites={favourites}
                  toggleFavorite={toggleFavorite}
                  addToCartClick={addToCartClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
