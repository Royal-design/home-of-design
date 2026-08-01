import { setFilterProducts, setLoading } from "@/redux/slice/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SortTab = "recommended" | "bestSelling" | "topProduct" | "featured";

export const Sort = () => {
  const [selectedTab, setSelectedTab] = useState<SortTab | null>(null);

  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const tabActions: { id: number; text: string; value: SortTab }[] = [
    { id: 1, text: "Recommended", value: "recommended" },
    { id: 2, text: "Best sellers", value: "bestSelling" },
    { id: 3, text: "Top pieces", value: "topProduct" },
    { id: 4, text: "Signature", value: "featured" }
  ];

  const handleTabChange = (tab: SortTab) => {
    dispatch(setLoading(true));
    setSelectedTab(tab);
    setTimeout(() => {
      const filteredProducts = products.filter((product) => product[tab]);
      dispatch(setFilterProducts(filteredProducts));
      dispatch(setLoading(false));
    }, 400);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {tabActions.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => handleTabChange(tab.value)}
          aria-pressed={selectedTab === tab.value}
          className={cn(
            "cursor-pointer border px-3 py-2 text-left font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-all duration-300",
            selectedTab === tab.value
              ? "border-bronze bg-bronze text-paper"
              : "border-line text-ink-2 hover:border-bronze hover:text-bronze"
          )}
        >
          {tab.text}
        </button>
      ))}
    </div>
  );
};
