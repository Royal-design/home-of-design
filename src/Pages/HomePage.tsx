import { Advert } from "@/components/Advert";
import { Adverts } from "@/components/Adverts";
import { Banner } from "@/components/Banner";
import { Blogs } from "@/components/Blogs";
import { Category } from "@/components/Category";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { Footer } from "@/components/Footer";
import { PartnerInfiniteCard } from "@/components/PartnerInfiniteCard";
import { Products } from "@/components/Products";
import { TopProduct } from "@/components/TopProduct";

export const HomePage = () => {
  return (
    <div className="bg-background">
      <Banner />
      <Category />
      <FeaturedProduct />
      <Adverts />
      <TopProduct />
      <Products />
      <Advert />
      <PartnerInfiniteCard />
      <Blogs />
      <Footer />
    </div>
  );
};
