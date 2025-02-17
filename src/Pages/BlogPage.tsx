import { BlogCard } from "@/components/BlogCard";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { useAppSelector } from "@/redux/store";

export const BlogPage = () => {
  const { blogs } = useAppSelector((state) => state.blogs);
  return (
    <div>
      <main className="pb-12">
        {/* Hero Section */}
        <section className="h-[20rem] max-sm:h-full relative font-Titillium-Web">
          <img
            src="https://media.istockphoto.com/id/1483031614/photo/modern-interior-design-of-living-room-black-sofa-and-empty-mockup-wall-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=ohYw9BMs6WOt0ajHLwP2Zn401FR5vwi-96gDr4qiwjE="
            alt="hero"
            className="h-full w-full object-cover"
          />
          <article className="absolute  max-sm:px-4 inset-0 bg-banner-overlay flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl  text-center max-sm:text-lg max-md:text-2xl font-bold text-white">
              Transform Your Space with Inspiration & Ideas
            </h1>

            <p className="text-gray-300 max-w-3xl  max-sm:w-full text-center max-sm:text-base dark:text-gray-300 text-lg leading-[150%]">
              Dive into a world of furniture trends, interior design tips, and
              expert advice to help you craft spaces that reflect your unique
              style. Whether you're looking for modern minimalism, rustic charm,
              or timeless elegance, we’ve got you covered.
            </p>

            <BreadCrumbs />
          </article>
        </section>

        {/* Blog Section */}
        <section className="mt-6 px-[6rem] max-md:px-4 max-sm:px-4 max-lg:px-8">
          <article>
            <p className="text-lg font-semibold my-4">Recent Blog Posts</p>
          </article>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]  [@media(min-width:380px)_and_(max-width:700px)]:grid-cols-2 max-md:grid-cols-3 max-sm:gap-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard blog={blog} key={blog.id} />
            ))}
          </div>
        </section>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};
