import blogHero from "@/assets/banner/blog-hero.webp";
import { BlogCard } from "@/components/BlogCard";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useAppSelector } from "@/redux/store";

export const BlogPage = () => {
  const { blogs } = useAppSelector((state) => state.blogs);

  return (
    <div className="bg-paper">
      <section className="relative flex h-[52vh] min-h-[24rem] items-end overflow-hidden">
        <img
          src={blogHero}
          alt="A calm interior in warm natural light"
          className="fade-img absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        />
        <div className="page-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-14 sm:px-6">
          <Reveal>
            <p className="eyebrow text-white">Journal</p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-[#f9d171] sm:text-7xl">
              Notes from the house
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white">
              Ideas, material notes and room essays from the Home of Design
              studio — written by the people who make and place the furniture.
            </p>
            <div className="mt-6 text-paper/70">
              <BreadCrumbs />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, i) => (
            <Reveal key={blog.id} delay={(i % 3) * 0.08}>
              <BlogCard blog={blog} />
            </Reveal>
          ))}
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};
