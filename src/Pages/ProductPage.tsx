import { useAppSelector } from "@/redux/store";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import { Swiper as SwiperClass } from "swiper/types";
import { Footer } from "@/components/Footer";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductSwiperMobile } from "@/components/ProductSwiperMobile";
import { ProductTab } from "@/components/ProductTab";
import { RelatedProduct } from "@/components/RelatedProduct";
import { RecentlyViewed } from "@/components/recentlyViewed";

export const ProductPage = () => {
  const { id } = useParams();
  const { products } = useAppSelector((state) => state.products);
  const product = products.find((product) => product.id.toString() === id);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="">
      <div className="flex h-[30rem] px-[6rem]  max-sm:hidden max-md:hidden w-full mt-6 gap-6">
        <div className="product-swiper h-full w-[50%] max-sm:w-full">
          {/* Thumbnail Swiper */}
          <Swiper
            onSwiper={setThumbsSwiper}
            loop
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Navigation, Thumbs]}
            className=""
          >
            <SwiperSlide>
              <figure className="flex w-full h-full overflow-hidden items-center justify-center bg-gray-300 dark:bg-slate-900">
                <img
                  src={product?.mainImage}
                  className="w-[4rem] object-contain"
                />
              </figure>
            </SwiperSlide>
            {product?.images.map((image, i) => (
              <SwiperSlide key={i}>
                <figure className="flex w-full h-full overflow-hidden  items-center justify-center bg-gray-300 dark:bg-slate-900">
                  <img src={image} className="w-[4rem] object-contain" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Main Image Swiper */}
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff"
              } as React.CSSProperties
            }
            loop
            spaceBetween={10}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 w-full"
          >
            <SwiperSlide>
              <figure className="flex h-[30rem] w-full  items-center justify-center bg-gray-300 dark:bg-slate-900">
                <img
                  src={product?.mainImage}
                  className="w-[20rem]  object-contain"
                />
              </figure>
            </SwiperSlide>
            {product?.images.map((image, i) => (
              <SwiperSlide key={i}>
                <figure className="flex h-[35rem] w-full items-center justify-center bg-gray-300 dark:bg-slate-900">
                  <img src={image} className="w-[20rem]  object-contain" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Content */}
        <div className="product-content w-full h-full ">
          {product && <ProductDetails product={product} />}
        </div>
      </div>
      <ProductSwiperMobile />
      {product && <ProductTab product={product} />}
      {product && <RelatedProduct category={product.category} />}
      <RecentlyViewed />

      <Footer />
    </div>
  );
};
