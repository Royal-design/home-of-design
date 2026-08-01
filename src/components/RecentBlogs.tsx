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
    <div className="card-surface flex w-full cursor-pointer flex-col gap-3 p-4">
      <div className="flex items-center border border-line bg-paper">
        <Input
          placeholder="Search..."
          className="h-9 w-full rounded-none border-0 bg-transparent px-3 font-mono text-xs text-ink placeholder:text-ink-3 focus-visible:ring-0 focus-visible:outline-none"
          value={searchValue}
          onChange={handleChange}
        />
        <Search size={15} className="mr-3 shrink-0 text-bronze" />
      </div>
      {loading ? (
        [...Array(3).keys()].map((id) => <BlogSkeleton key={id} />)
      ) : (
        <div className="mt-2">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-2">
            {filterBlogs.length > 0 ? "Recent Blogs" : "No recent blogs"}
          </p>
          {filterBlogs.map((blog) => (
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02, y: -1 }}
              key={blog.id}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleBlogClick(blog.id.toString())}
            >
              <div className="card-surface card-surface-hover mt-2 flex items-center gap-3 p-2">
                <img
                  src={blog.image}
                  alt={blog.author}
                  className="h-12 w-12 rounded-full border border-line object-cover"
                />
                <article className="flex min-w-0 flex-col gap-1">
                  <div className="flex items-center gap-2 text-ink-3">
                    <CalendarDays size={13} strokeWidth={1.5} />
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em]">
                      {blog.date}
                    </p>
                  </div>
                  <p className="truncate text-xs text-ink">{blog.title}</p>
                </article>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
