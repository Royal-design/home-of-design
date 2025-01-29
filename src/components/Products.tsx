import { Separator } from "@radix-ui/react-separator";
import { ProductCard } from "./ProductCard";
import { data } from "@/assets/data/data";
import { useState } from "react";
import { Button } from "./ui/button";

export const Products = () => {
  const tabActions: {
    selectedTab: "recommended" | "bestSelling" | "all";
    text: string;
  }[] = [
    {
      text: "Recommended",
      selectedTab: "recommended"
    },
    {
      text: "Best Selling",
      selectedTab: "bestSelling"
    },
    {
      text: "All Products",
      selectedTab: "all"
    }
  ];
  const [selectedTab, setSelectedTab] = useState<
    "recommended" | "bestSelling" | "all"
  >("all");
  const filteredProducts =
    selectedTab === "all"
      ? data.products.slice(3, 11)
      : data.products.filter((product) => product[selectedTab]);

  return (
    <div className="mt-[4rem] px-[6rem]">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 w-full justify-between">
          <Separator className="w-[400px]  " />
          <h1 className="text-2xl font-bold text-center">All Products</h1>
          <Separator className="w-[400px]  " />
        </div>
        <p>
          Explore our full range of stylish, functional furniture for every room
          in your home.
        </p>
      </div>
      <div className="mt-[2rem] flex gap-2">
        {tabActions.map((tab) => (
          <Button
            variant="ghost"
            onClick={() => setSelectedTab(tab.selectedTab)}
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
      <div className="grid grid-cols-4 max-md:grid-cols-3  max-sm:grid-cols-2 mt-[1rem] max-sm:mt-[2rem]  gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-4">
        <Button className="border-2" variant="ghost">
          Show More
        </Button>
      </div>
    </div>
  );
};
