import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { data } from "@/assets/data/data";

type ProductsType = typeof data.products;
export const RecentlyViewed: React.FC = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] =
    useState<ProductsType>([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentProducts") || "[]");
    setRecentlyViewedProducts(recent);
  }, []);

  if (recentlyViewedProducts.length === 0) return null;

  return (
    <div className="related-swiper px-[6rem] max-sm:px-[1rem] max-md:px-[1rem] ">
      <p className="text-2xl my-4">
        Recently <span className="uppercase font-bold">Viewed Products</span>
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
              <ProductCard product={product} />
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
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden px-0 max-sm:block">
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
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
