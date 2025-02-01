import { Label } from "./ui/label";
import { ChangeEvent, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilterProducts, setLoading } from "@/redux/slice/productSlice";

export const CategoryCommand = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector((state) => state.products.products);
  const [categories, setCategories] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string[]>([]);

  // Fetch unique categories
  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(allProducts.map((product) => product.category))
    );
    setFilterCategory(uniqueCategories);
  }, [allProducts]);

  // Handle category filter change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    const updatedCategories = checked
      ? [...categories, value]
      : categories.filter((category) => category !== value);

    setCategories(updatedCategories);

    // Trigger loading state
    dispatch(setLoading(true));

    // Filter products by selected categories
    setTimeout(() => {
      const filteredProducts =
        updatedCategories.length === 0
          ? allProducts
          : allProducts.filter((product) =>
              updatedCategories.includes(product.category)
            );
      dispatch(setFilterProducts(filteredProducts));
      dispatch(setLoading(false));
    }, 700); // Simulated delay for UX
  };

  // Handle category search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.trim().toLowerCase();

    const filteredCategories = allProducts
      .map((product) => product.category)
      .filter((category, index, self) => self.indexOf(category) === index)
      .filter((category) => category.toLowerCase().includes(searchValue));

    setFilterCategory(filteredCategories);
  };

  return (
    <div>
      <div className="search-group relative mb-3">
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Search categories..."
          className="h-[2rem] dark:bg-transparent overflow-hidden focus:border-none border px-2 w-full pl-7"
        />
        <Search
          size={15}
          className="absolute top-[25%] left-2 hover:text-gray-400"
        />
      </div>

      {filterCategory.map((category: string) => (
        <div
          className="checkbox-group flex items-center gap-2 mb-2"
          key={category}
        >
          <Label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id={category.toLowerCase()}
              value={category}
              onChange={handleChange}
              checked={categories.includes(category)}
              className="peer sr-only"
            />

            <span className="inline-block w-4 h-4 border-2 relative cursor-pointer after:content-[''] after:absolute after:top-2/4 after:left-2/4 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[10px] after:h-[10px] dark:after:bg-white after:bg-[#333] after:rounded-[2px] after:opacity-0 peer-checked:after:opacity-100"></span>

            <span>{category}</span>
          </Label>
        </div>
      ))}
    </div>
  );
};
