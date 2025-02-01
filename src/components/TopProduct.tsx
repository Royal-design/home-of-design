import { data } from "@/assets/data/data";
import { ProductCard } from "./ProductCard";
import { Separator } from "./ui/separator";

export const TopProduct = () => {
  return (
    <div className="px-[6rem] max-sm:px-[1rem] mt-[4rem]">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 w-full justify-between">
          <Separator className="w-[400px]  " />
          <h1 className="text-2xl font-bold text-center">Top Product</h1>
          <Separator className="w-[400px]  " />
        </div>
        <p className="text-sm">
          Discover our most loved furniture pieces, carefully crafted for
          comfort and style.
        </p>
      </div>

      <div className="grid grid-cols-4 max-md:grid-cols-3  max-sm:grid-cols-2 mt-[2rem] max-sm:mt-[2rem]  gap-4">
        {data.products
          .filter((product) => product.topProduct)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
