import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import banner1 from "../assets/banner/hero1.png";
import banner2 from "../assets/banner/hero2.png";
import banner3 from "../assets/banner/hero3.png";
import { FaArrowRight } from "react-icons/fa6";
import { MobileBanner } from "./MobileBanner";

export const bannerData = [
  {
    img: banner1,
    heading: "Modern Elegance Redefined",
    subHead:
      "Transform Your Home into a Stylish Haven with Furniture Designed for Modern Living",
    text: "Our carefully crafted pieces blend functionality with timeless aesthetics to elevate every room in your home. Whether it's a sleek sofa or a sophisticated coffee table, find the perfect fit for your space today."
  },
  {
    img: banner2,
    heading: "Luxury Living Starts Here",
    subHead:
      "Experience the Perfect Fusion of Craftsmanship, Comfort, and Style in Every Piece",
    text: "From exquisitely designed dining sets to plush, cozy sofas, we offer premium furniture that brings warmth and elegance to your living spaces. Elevate your everyday experience with furniture built to inspire."
  },
  {
    img: banner3,
    heading: "Seasonal Refresh Sale",
    subHead:
      "Redefine Your Living Spaces with Elegant Furniture at Unmatched Prices",
    text: "Take advantage of exclusive discounts on top-quality pieces, from modern minimalist designs to timeless classics. This is your chance to transform your space without breaking the bank. Limited-time offer!"
  }
];
export const Banner = () => {
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
    <div className="">
      <div className="swiper-cont max-sm:hidden max-md:hidden ">
        <Swiper
          autoplay={{ delay: 4000 }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          initialSlide={1}
          loop
          navigation
          modules={[Navigation, Autoplay]}
          className="mySwiper h-[31rem] max-sm:hidden banner-swiper"
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
                  className="relative bg-banner font-Titillium-Web  w-full h-full px-[6rem] max-lg:px-8 gap-2 flex max-sm:hidden items-center"
                >
                  <div className=" flex   flex-col h-full justify-center gap-4  p-2">
                    <h2 className="text-2xl font-bold ">{data.heading}</h2>
                    <p className="text-lg ">{data.subHead}</p>
                    <p className="text-sm leading-[150%]">{data.text}</p>
                    <div className="">
                      <Button
                        className="border border-black mt-4"
                        variant="ghost"
                      >
                        Shop Now
                        <span>
                          <FaArrowRight />
                        </span>
                      </Button>
                    </div>
                  </div>
                  <div className=" flex justify-end items-center h-full ">
                    <figure className="w-[20rem]">
                      <img
                        src={data.img}
                        alt={data.heading}
                        className="w-full h-full object-cover"
                      />
                    </figure>
                  </div>
                </motion.div>
              </AnimatePresence>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
      <div className="hidden max-sm:block swiper-cont max-md:block ">
        <MobileBanner />
      </div>
    </div>
  );
};
