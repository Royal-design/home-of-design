import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { data } from "@/assets/data/data";
import { ProductCard } from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ProductType } from "@/types";
import { addToCart } from "@/redux/slice/cartSlice";
import { addFavorite, removeFavorite } from "@/redux/slice/favouriteSlice";
import { Reveal } from "./Reveal";

export const RelatedProduct = ({ category }: { category: string }) => {
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

  if (relatedProducts.length === 0) return null;

  return (
    <section className="border-t border-line bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-shell px-5 sm:px-6">
        <Reveal>
          <div className="border-b border-line pb-8">
            <p className="eyebrow text-ink-3">Continue browsing</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              You may also like
            </h2>
          </div>
        </Reveal>

        <div className="swiper-free-navigation mt-10">
          <Swiper
            slidesPerView={1.15}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4.2 }
            }}
            navigation
            modules={[Navigation]}
          >
            {relatedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard
                  product={product}
                  favourites={favourites}
                  toggleFavorite={toggleFavorite}
                  addToCartClick={addToCartClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
