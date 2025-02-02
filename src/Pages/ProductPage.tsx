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
import BreadCrumbs from "@/components/BreadCrumbs";
import { ProductDetails } from "@/components/ProductDetails";

export const ProductPage = () => {
  const { id } = useParams();
  const { products } = useAppSelector((state) => state.products);
  const product = products.find((product) => product.id.toString() === id);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="px-[6rem]">
      <div className="flex w-full mt-6   max-sm:flex-col ">
        <div className="product-swiper flex w-[40rem] max-sm:w-full max-md:w-[25rem] max-sm:hidden">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className=" swiper-thumb"
          >
            <SwiperSlide>
              <figure className="w-full flex items-center justify-center h-full overflow-hidden dark:bg-slate-900 bg-gray-300">
                <img
                  src={product?.mainImage}
                  className="w-[5rem] object-cover"
                />
              </figure>
            </SwiperSlide>
            {product?.images.map((image, i) => (
              <SwiperSlide key={i}>
                <figure className="w-full flex items-center justify-center h-full dark:bg-slate-900 overflow-hidden bg-gray-300">
                  <img src={image} className="w-[5rem] object-cover" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff"
              } as React.CSSProperties
            }
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 flex-1 h-auto"
          >
            <SwiperSlide>
              <figure className="w-full flex items-center justify-center h-full dark:bg-slate-900 overflow-hidden bg-gray-300">
                <img
                  src={product?.mainImage}
                  className="w-[20rem] max-md:w-[15rem] object-cover"
                />
              </figure>
            </SwiperSlide>
            {product?.images.map((image, i) => (
              <SwiperSlide key={i}>
                <figure className="w-full flex items-center justify-center h-full overflow-hidden dark:bg-slate-900 bg-gray-300">
                  <img src={image} className=" w-[20rem] object-cover" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="product-swiper hidden max-sm:block">
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff"
              } as React.CSSProperties
            }
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2  w-full flex items-center justify-center h-full dark:bg-slate-900 overflow-hidden bg-gray-300"
          >
            <SwiperSlide>
              <figure className="w-full flex items-center  justify-center h-full dark:bg-slate-900 overflow-hidden bg-gray-300">
                <img
                  src={product?.mainImage}
                  className="h-full w-full object-cover"
                />
              </figure>
            </SwiperSlide>
            {product?.images.map((image, i) => (
              <SwiperSlide key={i}>
                <figure className="w-full flex items-center justify-center h-full overflow-hidden dark:bg-slate-900 bg-gray-300">
                  <img src={image} className=" w-full h-full object-cover" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className=" swiper-thumb w-full"
          >
            <SwiperSlide>
              <figure className="w-full flex flex-col items-center justify-center h-full overflow-hidden dark:bg-slate-900 bg-gray-300">
                <img
                  src={product?.mainImage}
                  className="w-[5rem] object-cover"
                />
              </figure>
            </SwiperSlide>
            {product?.images.map((image, i) => (
              <SwiperSlide key={i}>
                <figure className="w-full flex items-center justify-center h-full dark:bg-slate-900 overflow-hidden bg-gray-300">
                  <img src={image} className="object-cover" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="product-content w-full  ">
          {product && <ProductDetails product={product} />}
        </div>
      </div>
    </div>
  );
};
