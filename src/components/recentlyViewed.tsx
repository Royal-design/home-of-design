import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { RelatedProductCard } from "./RelatedProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProductsType, ProductType } from "@/types";
import { addToCart } from "@/redux/slice/cartSlice";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";

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
    <div className="related-swiper px-[6rem] max-lg:px-8 max-sm:px-[1rem] max-md:px-[1rem] ">
      <p className="text-2xl max-sm:text-lg my-4">
        Recent <span className="uppercase font-bold"> Products</span>
      </p>
      <div className="max-sm:hidden max-md:hidden">
        <Swiper
          slidesPerView={4}
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {recentlyViewedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <RelatedProductCard
                favourites={favourites}
                toggleFavorite={toggleFavorite}
                product={product}
                addToCartClick={addToCartClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden max-md:block">
        <Swiper
          slidesPerView={3}
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {recentlyViewedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <RelatedProductCard
                favourites={favourites}
                toggleFavorite={toggleFavorite}
                product={product}
                addToCartClick={addToCartClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden px-0 [@media(min-width:380px)_and_(max-width:700px)]:block">
        <Swiper
          slidesPerView={2}
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {recentlyViewedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <RelatedProductCard
                favourites={favourites}
                toggleFavorite={toggleFavorite}
                product={product}
                addToCartClick={addToCartClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden px-0 [@media(max-width:379px)]:block">
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {recentlyViewedProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <RelatedProductCard
                favourites={favourites}
                toggleFavorite={toggleFavorite}
                product={product}
                addToCartClick={addToCartClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
