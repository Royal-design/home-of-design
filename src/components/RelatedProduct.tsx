import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { data } from "@/assets/data/data";
import { RelatedProductCard } from "./RelatedProductCard";

interface CategoryType {
  category: string;
}
export const RelatedProduct = ({ category }: CategoryType) => {
  const relatedProducts = data.products.filter(
    (product) => product.category === category
  );

  return (
    <div className="related-swiper  px-[6rem] max-sm:px-[1rem] max-md:px-[1rem] h-[20rem]  my-[1rem]">
      <p className="text-2xl my-4">
        Related <span className="uppercase font-bold">Products</span>{" "}
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
          {relatedProducts.map((product, i) => (
            <SwiperSlide key={i}>
              <RelatedProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden max-sm:block">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {relatedProducts.map((product, i) => (
            <SwiperSlide key={i}>
              <RelatedProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="max-md:block hidden">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {relatedProducts.map((product, i) => (
            <SwiperSlide key={i}>
              <RelatedProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
