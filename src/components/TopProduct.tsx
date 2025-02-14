import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProductCard } from "./ProductCard";
import { Separator } from "./ui/separator";
import { ProductType } from "@/types";
import { addToCart } from "@/redux/slice/cartSlice";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";

export const TopProduct = () => {
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
    <div className="px-[6rem] max-sm:px-[1rem] mt-[4rem]  max-sm:mt-[2rem]">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 w-full justify-between">
          <Separator className="flex-1" />
          <h1 className="text-2xl max-sm:text-lg font-bold text-center">
            Top Product
          </h1>
          <Separator className="flex-1" />
        </div>
        <p className="text-sm max-sm:text-xs text-center leading-[150%]">
          Discover our most loved furniture pieces, carefully crafted for
          comfort and style.
        </p>
      </div>

      <div className="grid grid-cols-4 max-md:grid-cols-3  max-sm:grid-cols-2 mt-[2rem] max-sm:mt-[2rem]  gap-4">
        {products
          .filter((product) => product.topProduct)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              toggleFavorite={toggleFavorite}
              favourites={favourites}
              addToCartClick={addToCartClick}
            />
          ))}
      </div>
    </div>
  );
};
