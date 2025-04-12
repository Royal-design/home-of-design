import BreadCrumbs from "@/components/BreadCrumbs";
import { TiLeaf } from "react-icons/ti";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaCouch } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollToTop } from "@/components/ScrollToTop";

export const AboutPage = () => {
  return (
    <div className="overflow-hidden">
      <section className="h-[20rem] relative font-Titillium-Web">
        <img
          src="https://images.unsplash.com/photo-1489269637500-aa0e75768394?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFib3V0JTIwdXMlMjBmdXJuaXR1cmV8ZW58MHx8MHx8fDA%3D"
          alt="hero"
          className="h-full w-full object-cover"
        />
        <article className="absolute flex-col inset-0 gap-4 px-4 bg-banner-overlay flex items-center justify-center">
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-300"
          >
            About{" "}
            <span
              style={{
                color: "#f5b955"
              }}
            >
              Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-white text-center max-sm:text-base max-w-3xl max-sm:w-full"
          >
            At Furniture Haven, we bring you the perfect blend of craftsmanship
            and modern design to transform your spaces into a sanctuary.
          </motion.p>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BreadCrumbs />
          </motion.div>
        </article>
      </section>

      <motion.section
        className="py-16 bg-banner"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1682089766121-1f999ad0c7fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlJTIwY3JhZnRpbmclMjBmdXJuaXR1cmV8ZW58MHx8MHx8fDA%3D"
              alt="Our Mission"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl dark:text-gray-100 max-sm:text-2xl font-bold text-gray-800">
              Our Mission
            </h2>
            <p className="mt-4 dark:text-gray-200 text-gray-600">
              Our mission is to craft premium furniture that inspires a
              lifestyle of comfort and elegance. We are committed to sustainable
              practices and bringing you timeless designs that last for
              generations.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 bg-background"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold dark:text-gray-100 text-gray-800 max-sm:text-2xl">
              Our Story
            </h2>
            <p className="mt-4 dark:text-gray-200 text-gray-600">
              Founded in 2010, Furniture Haven started as a small family
              business. Today, we have grown into a trusted brand, providing
              homes worldwide with bespoke furniture pieces that reflect
              individual tastes and styles.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcnklMjBvZiUyMGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Our Story"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 bg-banner"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl dark:text-gray-100 max-sm:text-2xl font-bold text-gray-800 text-center">
            Our Core Values
          </h2>
          <div className="grid  grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="text-center">
              <div className="bg-[#f5b955] p-4 rounded-full flex justify-center items-center w-16 h-16 mx-auto text-white">
                <TiLeaf size={30} />
              </div>
              <h3 className="text-xl font-semibold mt-4">Sustainability</h3>
              <p className="text-gray-600 dark:text-gray-200 mt-2">
                We use eco-friendly materials and processes to minimize our
                impact on the planet.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#f5b955] p-4 flex justify-center items-center rounded-full w-16 h-16 mx-auto text-white">
                <FaCouch size={30} />
              </div>
              <h3 className="text-xl font-semibold mt-4">Quality</h3>
              <p className="text-gray-600 dark:text-gray-200 mt-2">
                Every piece is designed and crafted with attention to detail for
                ultimate durability.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#f5b955] p-4 flex justify-center items-center rounded-full w-16 h-16 mx-auto text-white">
                <FaHandHoldingHeart size={30} />
              </div>
              <h3 className="text-xl font-semibold mt-4">Customer Focus</h3>
              <p className="text-gray-600 dark:text-gray-200 mt-2">
                We prioritize your satisfaction, delivering exceptional service
                and tailored solutions.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="py-16 bg-background"
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl max-sm:text-2xl dark:text-gray-100 font-bold text-gray-800">
            Meet Our Team
          </h2>
          <p className="text-lg dark:text-gray-200 text-gray-600 mt-4">
            Behind every masterpiece is a team of passionate artisans and
            designers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div>
              <img
                src="https://media.istockphoto.com/id/1316250494/photo/photographer-is-finishing-work-in-his-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=Woh5WI-TbeLgQxujVEef2CWTjgjlL8fiAODiqhpizVE="
                alt="Team Member"
                className="w-full h-64 rounded-xl object-cover shadow-md"
              />
              <h3 className="text-xl font-semibold mt-4">Jane Doe</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Creative Director
              </p>
            </div>
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1664910747098-9dd7b830d4cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhlYWQlMjBjYXJwZW50ZXJ8ZW58MHx8MHx8fDA%3D"
                alt="Team Member"
                className="w-full h-64 rounded-xl object-cover shadow-md"
              />
              <h3 className="text-xl font-semibold mt-4">John Smith</h3>
              <p className="text-gray-600 dark:text-gray-400">Head Carpenter</p>
            </div>
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1663047346199-9516fe33fce1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW50ZXJpb3IlMjBkZXNpZ25lcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Team Member"
                className="w-full h-64 rounded-xl object-cover shadow-md"
              />
              <h3 className="text-xl font-semibold mt-4">Alice Brown</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interior Designer
              </p>
            </div>
            <div>
              <img
                src="https://media.istockphoto.com/id/1336501054/photo/architect-making-a-video-call-with-clients.webp?a=1&b=1&s=612x612&w=0&k=20&c=2v1GMHpmfwfyUOhu42GXlsc1pm9cBjsmIdk4z0hSN5g="
                alt="Team Member"
                className="w-full h-64 rounded-xl object-cover shadow-md"
              />
              <h3 className="text-xl font-semibold mt-4">Michael Green</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Project Manager
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-10 bg-[#d7d7d7] dark:bg-[#1a1a1a]"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container flex flex-col gap-4 mx-auto px-6 lg:px-20 text-center text-white">
          <h2 className="text-2xl dark:text-gray-100 text-gray-800 font-bold max-sm:text-xl">
            Ready to Transform Your Space?
          </h2>
          <p className="dark:text-gray-200 text-gray-800 text-lg max-sm:text-base">
            Explore our collection and find furniture that fits your style and
            needs.
          </p>
          <Link to="/products">
            <Button className="">Shop Now</Button>
          </Link>
        </div>
      </motion.section>
      <ScrollToTop />
      <Footer />
    </div>
  );
};
