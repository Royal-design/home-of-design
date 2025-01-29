import { Adverts } from "@/components/Adverts";
import { Banner } from "@/components/Banner";
import { Category } from "@/components/Category";
import { FeaturedProduct } from "@/components/FeaturedProduct";
import { Products } from "@/components/Products";
import { TopProduct } from "@/components/TopProduct";
import { FC } from "react";

export const HomePage: FC = () => {
  return (
    <div className="bg-background">
      <Banner />
      <Category />
      <FeaturedProduct />
      <Adverts />
      <TopProduct />
      <Products />
    </div>
  );
};
