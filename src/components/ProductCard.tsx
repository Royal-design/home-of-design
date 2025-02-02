import { data } from "@/assets/data/data";
import { FaRegHeart } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import { formatter } from "@/features/formatter";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: (typeof data.products)[0];
}
export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  return (
    <Card className="w-[220px]  bg-background border h-[250px] shadow-none  overflow-hidden rounded-none">
      <CardHeader className="p-0">
        <CardTitle />
      </CardHeader>
      <CardContent className="bg-banner p-0 relative">
        <figure className="h-[150px] w-full">
          <img
            src={product.mainImage}
            alt={product.name}
            className="h-full w-full "
          />
        </figure>
        <div className="position h-full w-full absolute bottom-[-2rem] opacity-0 flex hover:opacity-100  hover:bottom-0 duration-200 items-center justify-center ">
          <div className="bg-black flex gap-2 backdrop-filter backdrop-blur-sm bg-opacity-20 p-2 ">
            <FaRegHeart className="text-white cursor-pointer" />
            <IoIosEye
              className="text-white cursor-pointer"
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex px-2 flex-col gap-1 justify-start items-start">
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
        <p className="text-sm font-bold">{product.name}</p>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-2 items-center">
            <p className="text-xs line-through text-gray-400">
              {formatter.format(product.price.oldPrice)}
            </p>
            <p className="text-base">
              {formatter.format(product.price.newPrice)}
            </p>
          </div>
          <FaCirclePlus
            size={20}
            className="text-orange-400 cursor-pointer max-sm:hidden"
          />
        </div>

        <div className="hidden max-sm:flex w-full justify-between  items-center">
          <FaCirclePlus className=" cursor-pointer" />

          <div className="flex gap-2">
            <FaRegHeart className=" cursor-pointer" />
            <IoIosEye
              className=" cursor-pointer"
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
