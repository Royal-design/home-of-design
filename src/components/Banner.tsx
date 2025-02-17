import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
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

  const textVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.7, ease: "easeOut" }
    })
  };

  return (
    <div>
      {/* Desktop Swiper */}
      <div className="swiper-cont max-sm:hidden max-md:hidden">
        <Swiper
          autoplay={{ delay: 4000 }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          loop
          navigation
          modules={[Navigation, Autoplay]}
          className="mySwiper h-[31rem] max-sm:hidden banner-swiper"
        >
          {bannerData.map((data, i) => (
            <SwiperSlide key={i}>
              <motion.div
                key={activeIndex}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="relative bg-banner font-Titillium-Web w-full h-full px-[6rem] max-lg:px-8 flex items-center"
              >
                <div className="flex flex-col h-full justify-center gap-4 p-2">
                  {/* Heading */}
                  <motion.h2
                    className="text-2xl font-bold"
                    variants={textVariant}
                    custom={0} // First element
                  >
                    {data.heading}
                  </motion.h2>

                  {/* Subheading */}
                  <motion.p
                    className="text-lg"
                    variants={textVariant}
                    custom={1} // Second element
                  >
                    {data.subHead}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    className="text-sm leading-[150%]"
                    variants={textVariant}
                    custom={2} // Third element
                  >
                    {data.text}
                  </motion.p>

                  {/* Button */}
                  <motion.div variants={textVariant} custom={3}>
                    <Button
                      className="border dark:hover:bg-transparent hover:bg-button-hover transition-all duration-200 dark:hover:border-yellow-400 border-black mt-4"
                      variant="ghost"
                    >
                      Shop Now
                      <FaArrowRight />
                    </Button>
                  </motion.div>
                </div>

                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 1 }
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.5 }
                  }}
                  className="flex justify-end items-center h-full"
                >
                  <figure className="w-[20rem]">
                    <img
                      src={data.img}
                      alt={data.heading}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>

      {/* Mobile Banner */}
      <div className="hidden max-sm:block swiper-cont max-md:block">
        <MobileBanner />
      </div>
    </div>
  );
};
