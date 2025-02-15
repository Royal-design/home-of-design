import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

import { FaArrowRight } from "react-icons/fa6";
import { bannerData } from "./Banner";

export const MobileBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const banner = {
    initial: { x: -10 },
    animate: { x: 0, transition: { duration: 0.5 } }
  };
  const title = {
    initial: { x: 10, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  };
  const heading1 = {
    initial: { y: 10, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1 }
    }
  };
  return (
    <Swiper
      autoplay={{ delay: 4000 }}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      initialSlide={1}
      loop
      navigation
      modules={[Navigation, Autoplay]}
      className="mySwiper h-full banner-swiper"
    >
      {bannerData.map((data, i) => (
        <SwiperSlide key={i}>
          <AnimatePresence>
            <motion.div
              key={activeIndex === i ? "active" : "inactive"}
              animate="animate"
              initial="initial"
              exit="exit"
              variants={banner}
              className="relative bg-banner  font-Titillium-Web  w-full h-full p-[1rem] gap-2 flex flex-col items-center"
            >
              <h2 className="text-xl font-bold ">{data.heading}</h2>
              <figure className="h-[10rem]">
                <img
                  src={data.img}
                  alt={data.heading}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className=" flex text-center  w-full  flex-col items-center h-full justify-center gap-4  p-2">
                <p className="text-base ">{data.subHead}</p>
                <p className="text-sm leading-[150%]">{data.text}</p>
                <div className="">
                  <Button className="border border-black mt-4" variant="ghost">
                    Shop Now
                    <span>
                      <FaArrowRight />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
};
