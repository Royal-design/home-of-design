import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { bannerData } from "./Banner";

export const MobileBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.7, ease: "easeOut" }
    })
  };

  return (
    <Swiper
      autoplay={{ delay: 4000 }}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      loop
      navigation
      modules={[Navigation, Autoplay]}
      className="mySwiper h-full banner-swiper"
    >
      {bannerData.map((data, i) => (
        <SwiperSlide key={i}>
          <motion.div
            key={activeIndex} // Restart animation on slide change
            initial="hidden"
            animate="visible"
            className="relative bg-banner font-Titillium-Web w-full h-full p-4 flex flex-col items-center text-center"
          >
            {/* Heading */}
            <motion.h2
              className="text-xl font-bold"
              variants={textVariant}
              custom={0}
            >
              {data.heading}
            </motion.h2>

            {/* Image */}
            <motion.figure
              className="h-[12rem] w-full flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            >
              <img
                src={data.img}
                alt={data.heading}
                className="w-auto h-full object-contain"
              />
            </motion.figure>

            {/* Text Content */}
            <motion.p className="text-base" variants={textVariant} custom={1}>
              {data.subHead}
            </motion.p>
            <motion.p
              className="text-sm leading-[150%]"
              variants={textVariant}
              custom={2}
            >
              {data.text}
            </motion.p>

            {/* Button */}
            <motion.div variants={textVariant} custom={3}>
              <Button className="border border-black mt-4" variant="ghost">
                Shop Now <FaArrowRight />
              </Button>
            </motion.div>
          </motion.div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
};
