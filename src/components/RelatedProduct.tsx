import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { data } from "@/assets/data/data";
import { RelatedProductCard } from "./RelatedProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProductType } from "@/types";
import { addToCart } from "@/redux/slice/cartSlice";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";

interface CategoryType {
  category: string;
}
export const RelatedProduct = ({ category }: CategoryType) => {
  const relatedProducts = data.products.filter(
    (product) => product.category === category
  );

  const dispatch = useAppDispatch();

  const favourites = useAppSelector((state) => state.favourite.items);
  const toggleFavorite = (product: ProductType) => {
    if (favourites.find((item: ProductType) => item.id === product.id)) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };
  const addToCartClick = (product: ProductType) => {
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <div className="related-swiper  px-[6rem] max-sm:px-[1rem] max-lg:px-8 max-md:px-[1rem] h-[20rem]  my-[1rem]">
      <p className="text-2xl max-sm:text-lg my-4">
        Related <span className="uppercase font-bold">Products</span>{" "}
      </p>
      <div className="max-sm:hidden max-md:hidden">
        <Swiper
          slidesPerView={4}
          loop={true}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {relatedProducts.map((product, i) => (
            <SwiperSlide key={i}>
              <RelatedProductCard
                favourites={favourites}
                toggleFavorite={toggleFavorite}
                product={product}
                addToCartClick={addToCartClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden [@media(min-width:400px)_and_(max-width:700px)]:block">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {relatedProducts.map((product, i) => (
            <SwiperSlide key={i}>
              <RelatedProductCard
                favourites={favourites}
                toggleFavorite={toggleFavorite}
                product={product}
                addToCartClick={addToCartClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden [@media(max-width:399px)]:block">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {relatedProducts.map((product, i) => (
            <SwiperSlide key={i}>
              <RelatedProductCard
                favourites={favourites}
                toggleFavorite={toggleFavorite}
                product={product}
                addToCartClick={addToCartClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="max-md:block hidden">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-full w-full"
        >
          {relatedProducts.map((product, i) => (
            <SwiperSlide key={i}>
              <RelatedProductCard
                favourites={favourites}
                toggleFavorite={toggleFavorite}
                product={product}
                addToCartClick={addToCartClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
