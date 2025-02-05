import { useAppSelector } from "@/redux/store";
import { BlogCard } from "./BlogCard";
import { Separator } from "./ui/separator";

export const Blogs = () => {
  const { blogs } = useAppSelector((state) => state.blogs);
  const displayBlogs = blogs.slice(0, 4);
  return (
    <div className="px-[6rem] mt-[2rem]">
      <div className=" max-sm:px-4 max-sm:mt-[2rem]  mt-[2rem]">
        <div className="">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 w-full justify-between">
              <Separator className="w-[400px]  border" />
              <h1 className="text-2xl font-bold text-center">Blogs</h1>
              <Separator className="w-[400px] border" />
            </div>
            <p className="text-center text-sm">
              Explore design inspiration, expert tips, and the latest trends in
              furniture and home decor. Our blog is your go-to resource for
              creating spaces you’ll love.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 max-md:grid-cols-3 h-full  max-sm:grid-cols-2 mt-[2rem] max-sm:mt-[2rem]  gap-4">
        {displayBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
