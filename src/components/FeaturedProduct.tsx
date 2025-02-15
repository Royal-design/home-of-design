import { ProductType } from "@/types";
import { ProductCard } from "./ProductCard";
import { Separator } from "./ui/separator";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart } from "@/redux/slice/cartSlice";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";
import { motion } from "framer-motion";

export const FeaturedProduct = () => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const favourites = useAppSelector((state) => state.favourite.items);
  const toggleFavorite = (product: ProductType) => {
    if (favourites.find((item: ProductType) => item.id === product.id)) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const addToCartClick = (product: ProductType) => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 1
      }}
    >
      <div className="px-[6rem] leading-[150%] max-sm:px-[1rem] max-md:px-4 max-lg:px-8 mt-[8rem] max-sm:mt-[2rem]">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 w-full justify-between">
            <Separator className="flex-1" />
            <h1 className="text-3xl max-sm:text-2xl font-bold text-center">
              Featured Product
            </h1>
            <Separator className="flex-1" />
          </div>
          <p className="text-base max-sm:text-sm text-center ">
            Handpicked designs to elevate your living space with elegance and
            functionality
          </p>
        </div>

        <div className="grid [@media(min-width:400px)_and_(max-width:700px)]:grid-cols-2 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-md:grid-cols-3 mt-[2rem] max-sm:mt-[2rem]  gap-4">
          {products
            .filter((product) => product.featured)
            .map((product) => (
              <ProductCard
                key={product.id}
                favourites={favourites}
                toggleFavorite={toggleFavorite}
                product={product}
                addToCartClick={addToCartClick}
              />
            ))}
        </div>
      </div>
    </motion.div>
  );
};
