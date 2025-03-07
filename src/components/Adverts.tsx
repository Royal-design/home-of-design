import { Card } from "./ui/card";
import advert1 from "../assets/adverts/advert1.png";
import advert2 from "../assets/adverts/advert2.webp";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const advertData = [
  {
    id: 1,
    title: "Modern Elegance Chairs",
    description:
      "Upgrade your space with our sleek and comfortable modern living room set. Limited time 30% discount!",
    imageUrl: advert1,
    ctaText: "Shop Now!",
    backgroundColor: "#eed362"
  },
  {
    id: 2,
    title: "Stylish Office Chairs",
    description:
      "Experience all-day comfort and style with our ergonomic office chairs. Buy one, get 10% off your next purchase!",
    imageUrl: advert2,
    ctaText: "Shop Now!",
    backgroundColor: "#aaf9fe"
  }
];
export const Adverts = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 1
      }}
    >
      <div className="px-[6rem] h-full max-sm:px-[1rem] max-md:px-[1rem] max-lg:px-8  w-full mt-[3rem]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 max-sm:gap-3 w-full h-full max-sm:grid-cols-1   ">
          {advertData.map((advert) => (
            <Card
              key={advert.id}
              style={{ backgroundColor: advert.backgroundColor }}
              className={`p-0 border-none w-full dark:text-black h-full shadow-none  overflow-hidden rounded-none`}
            >
              <div className="flex p-3 w-full h-full">
                <div className="flex flex-col gap-2 w-full justify-center p-4 max-sm:p-2">
                  <h1 className="text-lg max-sm:text-base  font-bold">
                    {advert.title}
                  </h1>
                  <p className="text-sm">{advert.description}</p>

                  <Link to="/products">
                    <Button className="bg-button hover:bg-button-hover duration-200 text-primary mt-4 px-4 ">
                      {advert.ctaText}
                    </Button>
                  </Link>
                </div>

                <figure className="h-full w-full">
                  <img
                    src={advert.imageUrl}
                    alt={advert.title}
                    className="h-full w-full"
                  />
                </figure>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
