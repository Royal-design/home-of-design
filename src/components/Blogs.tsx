import { useAppSelector } from "@/redux/store";
import { BlogCard } from "./BlogCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export const Blogs = () => {
  const { blogs } = useAppSelector((state) => state.blogs);
  const displayBlogs = blogs.slice(0, 4);

  return (
    <section className="border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-ink-3">07 — Journal</p>
              <h2 className="mt-5 font-display text-4xl tracking-tight text-ink sm:text-6xl">
                Notes from the house
              </h2>
            </div>
            <Link
              to="/blogs"
              className="link-underline self-start font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-2 transition-colors hover:text-bronze sm:self-auto"
            >
              All notes <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {displayBlogs.map((blog, i) => (
            <Reveal key={blog.id} delay={(i % 4) * 0.08}>
              <BlogCard blog={blog} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
