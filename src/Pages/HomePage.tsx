import { Advert } from "@/components/Advert";
import { Adverts } from "@/components/Adverts";
import { Banner } from "@/components/Banner";
import { Blogs } from "@/components/Blogs";
import { Category } from "@/components/Category";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { Footer } from "@/components/Footer";
import { PartnerInfiniteCard } from "@/components/PartnerInfiniteCard";
import { Products } from "@/components/Products";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TopProduct } from "@/components/TopProduct";
import { useEffect } from "react";

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);
  return (
    <div className="bg-background font-Titillium-Web">
      <Banner />
      <Category />
      <FeaturedProduct />
      <Adverts />
      <TopProduct />
      <Products />
      <Advert />
      <PartnerInfiniteCard />
      <Blogs />
      <ScrollToTop />
      <Footer />
    </div>
  );
};
