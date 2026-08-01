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
      <SheetContent side="left" className="overflow-auto scrollbar-hidden">
        <SheetTitle />
        <SheetDescription />
        <section className="mt-4">
          <RecentBlogs handleBlogClick={handleBlogClick} />
          <div className="my-[1rem]">
            <h2>Top Products</h2>
            {topProducts.map((product) => (
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.02, y: -1 }}
                key={product.id}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  navigate(`/products/${product.id}`);
                }}
                className="cursor-pointer"
              >
                <div className="card-surface card-surface-hover flex items-center gap-3 rounded-none p-2">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="card-media h-12 w-12 rounded-full border border-line object-cover"
                  />
                  <article className="flex min-w-0 flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <p className="text-sm text-bronze">
                        {"★".repeat(product.rating)}{" "}
                        {"☆".repeat(5 - product.rating)}
                      </p>
                    </div>
                    <p className="truncate text-xs text-ink-2">
                      {product.name}
                    </p>
                  </article>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="card-surface mt-6 flex flex-col gap-3 p-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-2">
              Blog Category
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {blogCategory.map((category, i) => (
                <li
                  key={i}
                  className="flex w-full items-center justify-between border border-line bg-paper px-2 py-1.5 text-xs text-ink-2 transition-colors hover:border-bronze hover:text-bronze"
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
