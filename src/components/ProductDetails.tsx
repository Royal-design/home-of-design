import BreadCrumbs from "./BreadCrumbs";
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { data } from "@/assets/data/data";
import { formatter } from "@/features/formatter";
import { useEffect } from "react";

type ProductType = (typeof data.products)[0];
interface ProductDetailsProps {
  product: ProductType;
}
export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const addToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const viewedProducts = JSON.parse(
      localStorage.getItem("recentProducts") || "[]"
    );

    // Remove duplicate if it exists
    const updatedProducts = viewedProducts.filter(
      (p: ProductType) => p.id !== product.id
    );

    // Add current product to the beginning of the list
    updatedProducts.unshift(product);

    // Store max 5 products
    localStorage.setItem(
      "recentProducts",
      JSON.stringify(updatedProducts.slice(0, 5))
    );
  }, [product]);

  return (
    <div className="p-4 max-sm:p-0">
      <div className="max-sm:hidden">
        <BreadCrumbs />
      </div>
      <div className="font-titanium mt-4">
        <p className="text-2xl max-sm:text-lg font-bold">{product.name}</p>
        <div className="items-center flex my-2 gap-4">
          {product.rating && (
            <p className="text-yellow-500">
              {"★".repeat(product.rating)} {"☆".repeat(5 - product.rating)}
            </p>
          )}
          <p className="text-slate-400 text-sm">
            - {product.reviews.length} Reviews
          </p>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <p className="text-lg max-sm:text-base line-through text-gray-500 font-semibold">
            {formatter.format(product.price.oldPrice)}
          </p>
          <p className="text-lg font-semibold">
            {" "}
            {formatter.format(product.price.newPrice)}
          </p>
        </div>
        <p className="text-sm mt-4">{product.description}</p>
        <form>
          <div className="items-center flex gap-[2rem]  mt-6">
            <div className="w-[5rem] flex h-[3rem] justify-around dark:bg-transparent items-center bg-white border">
              <Button
                variant="ghost"
                onClick={handleDecrement}
                className="cursor-pointer dark:bg-transparent hover:bg-white"
              >
                -
              </Button>
              <p>1</p>
              <Button
                variant="ghost"
                onClick={handleIncrement}
                className="cursor-pointer  hover:bg-white dark:bg-transparent"
              >
                +
              </Button>
            </div>
            <Button type="submit" onClick={addToCartClick}>
              ADD TO CART
            </Button>
          </div>
        </form>
        <div className="flex items-center gap-[2rem] mt-4">
          <div className="flex items-center gap-4 ">
            <motion.button
              transition={{
                type: "spring",
                stiffness: 1000,
                damping: 10
              }}
              className={`text-red-400 `}
            ></motion.button>
            <p className="text-xs">ADD TO WISHLIST</p>
          </div>

          <div className="flex items-center gap-4 ">
            <Share2 size={12} />
            <p className="text-xs">SHARE</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-xs mt-[2rem] text-gray-400">
          <p>
            SKU: <span className="">{product.id}</span>
          </p>
          <p>
            CATEGORY: <span className="">{product.category}</span>
          </p>
          <div className="flex items-center gap-2">
            <p>TAGS:</p>
            <div className="text-black flex gap-2 flex-wrap ">
              {product.tags.map((tag, i) => (
                <Button
                  className="dark:bg-slate-700 h-[1.5rem] px-2 py-1 text-xs dark:text-white dark:hover:bg-slate-600 rounded-md"
                  key={i}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
