import { IoIosEye } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import { formatter } from "@/features/formatter";
import { useNavigate } from "react-router-dom";
import { ProductType } from "@/types";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: ProductType;
  favourites: ProductType[];
  toggleFavorite: (product: ProductType) => void;
  addToCartClick: (product: ProductType) => void;
}

export const RelatedProductCard = ({
  product,
  favourites,
  toggleFavorite,
  addToCartClick
}: ProductCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${product.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Card className="w-full hover:border-e-yellow-300 hover:scale-[1.02] duration-200 bg-background border h-full shadow-none  overflow-hidden rounded-none">
      <CardHeader className="p-0">
        <CardTitle />
      </CardHeader>
      <CardContent
        onClick={handleClick}
        className="bg-banner cursor-pointer p-0 relative"
      >
        <figure className="h-[150px] w-full">
          <img
            src={product.mainImage}
            alt={product.name}
            className="h-full w-full "
          />
        </figure>
      </CardContent>
      <CardFooter className="flex px-2 max-sm:h-full pb-2 flex-col gap-2 justify-start items-start">
        <div className="flex gap-1 items-center">
          <p className="text-yellow-500">
            {"★".repeat(product.rating)} {"☆".repeat(5 - product.rating)}
          </p>
          {product.reviews.length > 1 ? (
            <p className="text-xs">- {product.reviews.length} Reviews</p>
          ) : (
            <p className="text-xs">- {product.reviews.length} Review</p>
          )}
        </div>
        <p className="text-sm h-8 font-bold">{product.name}</p>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2  items-center">
            <p className="text-xs line-through text-gray-400">
              {formatter.format(product.price.oldPrice)}
            </p>
            <p className="text-base">
              {formatter.format(product.price.newPrice)}
            </p>
          </div>
        </div>

        <div className="flex  w-full justify-between  items-center">
          <FaCirclePlus
            size="25"
            className="text-orange-400 cursor-pointer"
            onClick={() => addToCartClick(product)}
          />

          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: favourites.find((item) => item.id === product.id)
                  ? 1.1
                  : 1
              }}
              transition={{
                type: "spring",
                stiffness: 1000,
                damping: 10
              }}
              className="text-orange-400"
              onClick={() => toggleFavorite(product)}
            >
              {favourites.some((item) => item.id === product.id) ? (
                <Heart size="20" className="fill-orange-400 max-sm:w-[1rem]" />
              ) : (
                <Heart size="20" className=" max-sm:w-[1rem]" />
              )}
            </motion.div>
            <IoIosEye
              size="25"
              className="text-orange-400 cursor-pointer"
              onClick={handleClick}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
