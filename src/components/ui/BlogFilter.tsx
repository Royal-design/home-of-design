import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { CiSliderHorizontal } from "react-icons/ci";
import { useState } from "react";
import { RecentBlogs } from "../RecentBlogs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { data } from "@/assets/data/data";
interface PropsType {
  topProducts: typeof data.products;
  handleBlogClick: (id: string) => void;
  blogCategory: string[];
}
export const BlogFilter = ({
  topProducts,
  handleBlogClick,
  blogCategory
}: PropsType) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {!open ? (
          <div
            className="cursor-pointer flex gap-4 items-center"
            onClick={() => setOpen(!open)}
          >
            <CiSliderHorizontal size={15} />
            <p>Filter</p>
          </div>
        ) : (
          <div
            className="flex gap-4 items-center"
            onClick={() => setOpen(!open)}
          >
            <CiSliderHorizontal size={15} />
            <p>Filter</p>
          </div>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="">
        <SheetTitle />
        <SheetDescription />
        <section className="mt-4">
          <RecentBlogs handleBlogClick={handleBlogClick} />
          <div className="my-[1rem]">
            <h2>Top Products</h2>
            {topProducts.map((product) => (
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                }}
                key={product.id}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  navigate(`/products/${product.id}`);
                }}
                className="cursor-pointer"
              >
                <div className="flex rounded-md p-2 items-center bg-background gap-2 h-auto">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="h-[3rem] rounded-full bg-banner w-[3rem] object-cover"
                  />
                  <article className="flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      <p className="text-yellow-500">
                        {"★".repeat(product.rating)}{" "}
                        {"☆".repeat(5 - product.rating)}
                      </p>
                    </div>
                    <p className="text-xs dark:text-slate-400">
                      {product.name}
                    </p>
                  </article>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col gap-1 mt-6 bg-background-card p-1">
            <p className="dark:text-slate-300 text-lg">Blog Category</p>
            <ul className="grid grid-cols-2  gap-2 ">
              {blogCategory.map((category, i) => (
                <li
                  key={i}
                  className="flex p-1 rounded-md bg-slate-500 text-xs text-slate-200 hover:bg-slate-600 justify-between items-center w-full"
                >
                  <p>{category}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};
