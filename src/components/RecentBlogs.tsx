import { blogs } from "@/assets/data/blogs";
import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Search } from "lucide-react";
import { Input } from "./ui/input";
import { BlogSkeleton } from "./BlogSkeleton";

type BlogType = (typeof blogs)[0];
interface PropsType {
  handleBlogClick: (id: string) => void;
}
export const RecentBlogs = ({ handleBlogClick }: PropsType) => {
  const [recentBlogs, setRecentBlogs] = useState<BlogType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterBlogs, setFilterBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("recentBlogs") || "[]");
    setRecentBlogs(recent);
    setFilterBlogs(recent);
  }, []);
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setLoading(true);
    const value = e.currentTarget.value.toLowerCase();
    setSearchValue(value);
    setTimeout(() => {
      const filterBlog = recentBlogs.filter(
        (blog) =>
          blog.author.toLowerCase().includes(value) ||
          blog.shortDescription.toLowerCase().includes(value) ||
          blog.longDescription.toLowerCase().includes(value)
      );
      setFilterBlogs(filterBlog);
      setLoading(false);
    }, 500);
  };

  if (recentBlogs.length === 0) return null;

  return (
    <div className="flex cursor-pointer flex-col gap-2 w-full bg-background-card ">
      <div className="flex items-center  bg-background">
        <Input
          placeholder="Search..."
          className="h-[2rem] w-full rounded-none "
          value={searchValue}
          onChange={handleChange}
        />
        <Search className="bg-slate-400 text-white h-[2.1rem] w-[2rem] px-1 " />
      </div>
      {loading ? (
        [...Array(3).keys()].map((id) => <BlogSkeleton key={id} />)
      ) : (
        <div className="mt-4">
          <p className="dark:text-slate-300  text-lg">
            {filterBlogs.length > 0 ? "Recent Blogs" : "No recent blogs"}
          </p>
          {filterBlogs.map((blog) => (
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              }}
              key={blog.id}
              transition={{ duration: 0.3 }}
              onClick={() => handleBlogClick(blog.id.toString())}
              className=""
            >
              <div className="flex rounded-md p-2 items-center bg-background gap-2 h-auto">
                <img
                  src={blog.image}
                  alt={blog.author}
                  className="h-[3rem] rounded-full w-[3rem] object-cover"
                />
                <article className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <CalendarDays size={15} />
                    <p className="text-xs dark:text-slate-100">{blog.date}</p>
                  </div>
                  <p className="text-xs dark:text-slate-400">{blog.title}</p>
                </article>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
