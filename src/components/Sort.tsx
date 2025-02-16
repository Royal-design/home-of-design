import { setFilterProducts, setLoading } from "@/redux/slice/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { Button } from "./ui/button";

export const Sort = () => {
  const [selectedTab, setSelectedTab] = useState<
    "recommended" | "bestSelling" | "topProduct" | "featured" | null
  >(null);

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const tabActions: {
    id: number;
    text: string;
    selectedTab: "recommended" | "bestSelling" | "topProduct" | "featured";
  }[] = [
    { id: 1, text: "Recommended", selectedTab: "recommended" },
    { id: 2, text: "Best Selling", selectedTab: "bestSelling" },
    { id: 3, text: "Top Products", selectedTab: "topProduct" },
    { id: 4, text: "Feautured", selectedTab: "featured" }
  ];

  const handleTabChange = (
    tab: "recommended" | "bestSelling" | "topProduct" | "featured"
  ) => {
    dispatch(setLoading(true));
    setSelectedTab(tab);
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
    setTimeout(() => {
      let filteredProducts;

      filteredProducts = products.filter((product) => {
        if (
          tab === "recommended" ||
          tab === "bestSelling" ||
          tab === "featured" ||
          tab === "topProduct"
        ) {
          return product[tab];
        }
        return false;
      });

      dispatch(setFilterProducts(filteredProducts));
      dispatch(setLoading(false));
    }, 500);
  };
  return (
    <div className="grid grid-cols-2 gap-2">
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
  );
};
