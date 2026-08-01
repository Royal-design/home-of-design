import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Category } from "@/components/Category";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { CraftStatement } from "@/components/CraftStatement";
import { TopProduct } from "@/components/TopProduct";
import { Products } from "@/components/Products";
import { Adverts } from "@/components/Adverts";
import { Advert } from "@/components/Advert";
import { Blogs } from "@/components/Blogs";
import { Footer } from "@/components/Footer";

export const HomePage = () => {
  return (
    <div className="bg-paper">
      <Hero />
      <Marquee />
      <Category />
      <FeaturedProduct />
      <CraftStatement />
      <TopProduct />
      <Products />
      <Adverts />
      <Advert />
      <Blogs />
      <Footer />
    </div>
  );
};
