import { useAppSelector } from "@/redux/store";
import { useParams } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductTab } from "@/components/ProductTab";
import { RelatedProduct } from "@/components/RelatedProduct";
import { RecentlyViewed } from "@/components/recentlyViewed";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Reveal } from "@/components/Reveal";

export const ProductPage = () => {
  const { id } = useParams();
  const { products } = useAppSelector((state) => state.products);
  const product = products.find((product) => product.id.toString() === id);

  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-5">
        <p className="font-display text-2xl text-ink">
          We couldn’t find that piece.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-shell px-5 pb-10 pt-28 sm:px-6 sm:pt-32">
        <Reveal className="hidden sm:block">
          <p className="eyebrow text-ink-3">The collection</p>
        </Reveal>

        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <ProductGallery product={product} />
          </Reveal>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal delay={0.08}>
                <ProductDetails product={product} />
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-shell px-5 py-16 sm:px-6 sm:py-20">
        <ProductTab product={product} />
      </div>

      <RelatedProduct category={product.category} />
      <RecentlyViewed />
      <ScrollToTop />
      <Footer />
    </div>
  );
};
