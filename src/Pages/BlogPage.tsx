import { BlogCard } from "@/components/BlogCard";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { useAppSelector } from "@/redux/store";

export const BlogPage = () => {
  const { blogs } = useAppSelector((state) => state.blogs);
  return (
    <div>
      <main>
        <section className="h-[29rem] relative font-Titillium-Web">
          <img
            src="https://media.istockphoto.com/id/1483031614/photo/modern-interior-design-of-living-room-black-sofa-and-empty-mockup-wall-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=ohYw9BMs6WOt0ajHLwP2Zn401FR5vwi-96gDr4qiwjE="
            alt="hero"
            className="h-full w-full object-cover"
          />
          <article className="absolute h-full w-full top-0 bg-banner-overlay ">
            <div className="h-full w-full flex flex-col max-sm:px-2 items-center justify-center">
              <h1 className="text-2xl font-bold max-sm:text-2xl max-md:text-2xl text-white dark:text-gray-100">
                Transform Your Space with Inspiration & Ideas
              </h1>

              <p className="text-lg max-sm:text-sm text-gray-300 dark:text-gray-300 mt-4 max-sm:w-full w-[60%] text-center">
                Dive into a world of furniture trends, interior design tips, and
                expert advice to help you craft spaces that reflect your unique
                style. Whether you're looking for modern minimalism, rustic
                charm, or timeless elegance, we’ve got you covered. Explore our
                guides, how-tos, and curated ideas to transform your home into a
                place you’ll love to live in.
              </p>
              <div className="mt-8 ">
                <BreadCrumbs />
              </div>
            </div>
          </article>
        </section>
        <section className="mt-6 px-[6rem] max-sm:px-4">
          <article>
            <p className="text-lg my-2">Recent blog posts</p>
          </article>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] max-sm:grid-cols-2  max-md:grid-cols-3  gap-4">
            {blogs.map((blog) => (
              <BlogCard blog={blog} key={blog.id} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
