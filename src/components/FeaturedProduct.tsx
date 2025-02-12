import { ProductType } from "@/types";
import { ProductCard } from "./ProductCard";
import { Separator } from "./ui/separator";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addToCart } from "@/redux/slice/cartSlice";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";

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
    <div className="px-[6rem] max-sm:px-[1rem] mt-[8rem]">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 w-full justify-between">
          <Separator className="w-[400px]  border" />
          <h1 className="text-2xl font-bold text-center">Featured Product</h1>
          <Separator className="w-[400px] border" />
        </div>
        <p className="text-sm">
          Handpicked designs to elevate your living space with elegance and
          functionality
        </p>
      </div>

      <div className="grid grid-cols-4 max-md:grid-cols-3  max-sm:grid-cols-2 mt-[2rem] max-sm:mt-[2rem]  gap-4">
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
  );
};
