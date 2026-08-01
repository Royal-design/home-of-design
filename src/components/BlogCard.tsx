import { blogs } from "@/assets/data/blogs";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  blog: (typeof blogs)[0];
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <article className="group">
      <Link
        to={`/blogs/${blog.id}`}
        data-cursor="view"
        data-cursor-label="Read"
        aria-label={`Read: ${blog.title}`}
        className="block overflow-hidden bg-paper-2"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            loading="lazy"
            decoding="async"
            className="fade-img h-full w-full object-cover transition-transform duration-[1.3s] ease-expo-out group-hover:scale-[1.06]"
          />
        </div>
      </Link>

      <div className="mt-5">
        <div className="flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink-3">
          <span>{blog.category}</span>
          <span className="text-bronze">·</span>
          <span>{blog.date}</span>
        </div>
        <Link
          to={`/blogs/${blog.id}`}
          className="mt-2.5 block font-display text-2xl leading-snug text-ink transition-colors duration-300 group-hover:text-bronze"
        >
          {blog.title}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-2">
          {blog.shortDescription}
        </p>
        <Link
          to={`/blogs/${blog.id}`}
          className="link-underline mt-4 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-2 transition-colors hover:text-bronze"
        >
          Read the story <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  );
};
