import BreadCrumbs from "./BreadCrumbs";
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { formatter } from "@/features/formatter";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { decrement, increment } from "@/redux/slice/quantitySlice";
import { addToCart } from "@/redux/slice/cartSlice";
import { ProductType } from "@/types";

interface ProductDetailsProps {
  product: ProductType;
}
export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(
    (state) => state.quantity.quantity[product.id] || 0
  );
  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(increment({ productId: product.id }));
  };
  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(decrement({ productId: product.id }));
  };

  const addToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: quantity }));
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
              <p>{quantity}</p>
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
        <div className="flex flex-col gap-3 text-xs mt-[2rem] text-gray-400">
          <p>
            SKU: <span className="">{product.id}</span>
          </p>
          <p>
            CATEGORY: <span className="">{product.category}</span>
          </p>
          <p>
            IN STOCK:{" "}
            <span className="">{product.inStock ? "True" : "False"}</span>
          </p>
          <div className="flex items-center gap-2">
            <p>TAGS:</p>
            <div className="text-black flex gap-2 flex-wrap ">
              {product.tags.map((tag, i) => (
                <Button
                  className=" h-[1.5rem] px-2 py-1 text-xs text-primary bg-button hover:bg-button-hover duration-200 rounded-md"
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
