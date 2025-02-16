import { useAppSelector } from "@/redux/store";
import { BlogCard } from "./BlogCard";
import { Separator } from "./ui/separator";
import { motion } from "framer-motion";

export const Blogs = () => {
  const { blogs } = useAppSelector((state) => state.blogs);
  const displayBlogs = blogs.slice(0, 4);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 1
      }}
    >
      <div className="px-[6rem] max-md:px-4 max-lg:px-8 max-sm:mt-[1rem] my-[2rem] max-sm:px-[1rem] pb-12">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 w-full justify-between">
            <Separator className="flex-1" />
            <h1 className="text-3xl max-sm:text-2xl font-bold text-center">
              Blogs
            </h1>
            <Separator className="flex-1" />
          </div>
          <p className="text-center max-sm:text-sm leading-[150%] text-base">
            Explore design inspiration, expert tips, and the latest trends in
            furniture and home decor. Our blog is your go-to resource for
            creating spaces you’ll love.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))]  max-md:grid-cols-3 h-full  [@media(min-width:380px)_and_(max-width:700px)]:grid-cols-2 mt-[2rem] max-sm:mt-[2rem]  gap-4">
          {displayBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
