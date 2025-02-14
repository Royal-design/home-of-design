import { useAppSelector } from "@/redux/store";
import { BlogCard } from "./BlogCard";
import { Separator } from "./ui/separator";

export const Blogs = () => {
  const { blogs } = useAppSelector((state) => state.blogs);
  const displayBlogs = blogs.slice(0, 4);
  return (
    <div className="px-[6rem] max-sm:mt-[1rem] my-[2rem] max-sm:px-[1rem] pb-12">
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 w-full justify-between">
          <Separator className="flex-1" />
          <h1 className="text-2xl max-sm:text-lg font-bold text-center">
            Blogs
          </h1>
          <Separator className="flex-1" />
        </div>
        <p className="text-center max-sm:text-xs leading-[150%] text-sm">
          Explore design inspiration, expert tips, and the latest trends in
          furniture and home decor. Our blog is your go-to resource for creating
          spaces you’ll love.
        </p>
      </div>
      <div className="grid grid-cols-4 max-md:grid-cols-3 h-full  max-sm:grid-cols-2 mt-[2rem] max-sm:mt-[2rem]  gap-4">
        {displayBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
