import { Label } from "./ui/label";
import { ChangeEvent, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilterProducts, setLoading } from "@/redux/slice/productSlice";
import { cn } from "@/lib/utils";

export const CategoryCommand = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);
  const [categories, setCategories] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(allProducts.map((product) => product.category))
    );
    setFilterCategory(uniqueCategories);
  }, [allProducts]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const updatedCategories = checked
      ? [...categories, value]
      : categories.filter((category) => category !== value);

    setCategories(updatedCategories);
    dispatch(setLoading(true));

    setTimeout(() => {
      const filteredProducts =
        updatedCategories.length === 0
          ? allProducts
          : allProducts.filter((product) =>
              updatedCategories.includes(product.category)
            );
      dispatch(setFilterProducts(filteredProducts));
      dispatch(setLoading(false));
    }, 500);
  };

  const visible = filterCategory.filter((category) =>
    category.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-4">
        <Search
          size={13}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find a room…"
          aria-label="Search rooms"
          className="h-9 w-full border border-line bg-transparent pl-9 pr-3 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:outline-none"
        />
      </div>

      {visible.length === 0 ? (
        <p className="py-2 text-xs text-ink-3">No rooms found.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {visible.map((category: string) => {
            const checked = categories.includes(category);
            return (
              <li key={category}>
                <Label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-ink-2 transition-colors hover:text-ink">
                  <input
                    type="checkbox"
                    value={category}
                    onChange={handleChange}
                    checked={checked}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "relative h-[15px] w-[15px] shrink-0 border transition-all duration-300",
                      checked
                        ? "border-bronze bg-bronze"
                        : "border-line bg-transparent"
                    )}
                    aria-hidden="true"
                  >
                    {checked && (
                      <svg
                        viewBox="0 0 10 8"
                        className="absolute inset-0 m-auto h-2 w-2.5"
                        fill="none"
                        stroke="var(--paper)"
                        strokeWidth="1.8"
                        strokeLinecap="square"
                      >
                        <path d="M1 4l3 3 5-6" />
                      </svg>
                    )}
                  </span>
                  <span className="capitalize">{category}</span>
                </Label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
