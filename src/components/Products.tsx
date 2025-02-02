import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilterProducts, setLoading } from "@/redux/slice/productSlice";
import { ProductSkeleton } from "./ProductSkeleton";

export const Products = () => {
  const [selectedTab, setSelectedTab] = useState<
    "recommended" | "bestSelling" | "all"
  >("all");

  const dispatch = useAppDispatch();
  const { filterProducts, loading, products } = useAppSelector(
    (state) => state.products
  );

  const tabActions: {
    id: number;
    text: string;
    selectedTab: "recommended" | "bestSelling" | "all";
  }[] = [
    { id: 1, text: "Recommended", selectedTab: "recommended" },
    { id: 2, text: "Best Selling", selectedTab: "bestSelling" },
    { id: 3, text: "All Products", selectedTab: "all" }
  ];

  const handleTabChange = (tab: "recommended" | "bestSelling" | "all") => {
    dispatch(setLoading(true));
    setSelectedTab(tab);
    setTimeout(() => {
      let filteredProducts;
      if (tab === "all") {
        filteredProducts = products.slice(3, 11); // Assuming you want a range of 3 to 11 for all products
      } else {
        filteredProducts = products.filter((product) => {
          if (tab === "recommended" || tab === "bestSelling") {
            return product[tab];
          }
          return false;
        });
      }
      dispatch(setFilterProducts(filteredProducts));
      dispatch(setLoading(false));
    }, 500);
  };

  return (
    <div className="mt-[4rem] px-[6rem]">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 w-full justify-between">
          <Separator className="w-[400px]  border" />
          <h1 className="text-2xl font-bold text-center">All Products</h1>
          <Separator className="w-[400px]  border" />
        </div>
        <p className="text-sm">
          Explore our full range of stylish, functional furniture for every room
          in your home.
        </p>
      </div>
      <div className="mt-[2rem] flex gap-2">
        {tabActions.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            onClick={() => handleTabChange(tab.selectedTab)}
            className={`px-4 py-2 text-xs p-1 h-6 ${
              selectedTab === tab.selectedTab
                ? "bg-slate-400 text-white"
                : "border-2"
            }  mr-2`}
          >
            {tab.text}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))]  max-md:grid-cols-3  max-sm:grid-cols-2 mt-[1rem] max-sm:mt-[2rem]  gap-4">
        {loading
          ? [...Array(6).keys()].map((index) => <ProductSkeleton key={index} />)
          : filterProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        {filterProducts.length === 0 && (
          <p className="mt-4 text-slate-500 text-center">
            No products found. Check back later :)
          </p>
        )}
      </div>
      <div className="w-full flex justify-center mt-4">
        <Button className="border-2" variant="ghost">
          Show More
        </Button>
      </div>
    </div>
  );
};
