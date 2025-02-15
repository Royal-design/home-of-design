import { IoIosSearch } from "react-icons/io";
import { Input } from "./ui/input";
import { FormEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setFilterProducts, setLoading } from "@/redux/slice/productSlice";

export const Search = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const { products } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    dispatch(setLoading(true));
    const value = e.currentTarget.value.toLowerCase();
    setSearchTerm(value);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const filteredProducts = products.filter(
        (product) =>
          product.category.toLowerCase().includes(value) ||
          product.name.toLowerCase().includes(value)
      );

      dispatch(setFilterProducts(filteredProducts));
      dispatch(setLoading(false));
    }, 500);
  };

  return (
    <div className="flex items-center">
      <Input
        className={`transition-all max-sm:hidden ${
          inputVisible ? "w-[20rem] opacity-100" : "w-0 opacity-0"
        } duration-150 overflow-hidden`}
        style={{ visibility: inputVisible ? "visible" : "hidden" }}
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <Input
        className="transition-all hidden max-sm:block  w-full duration-150 overflow-hidden"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />

      <div className="relative cursor-pointer ml-2">
        <IoIosSearch size={20} onClick={() => setInputVisible(!inputVisible)} />
      </div>
    </div>
  );
};
