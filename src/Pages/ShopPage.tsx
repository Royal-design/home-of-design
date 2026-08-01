import { AllProducts } from "@/components/AllProducts";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { ProductsFilter } from "@/components/ProductsFilter";
import { ProductFilterSheet } from "@/components/ProductFilterSheet";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Reveal } from "@/components/Reveal";
import { Truck, PhoneCall, ShieldCheck } from "lucide-react";
import shopHeader from "@/assets/banner/shop-header.webp";

export const ShopPage = () => {
  const services = [
    { icon: <Truck size={17} strokeWidth={1.25} />, heading: "White-glove delivery", text: "Delivered, placed and unwrapped" },
    { icon: <PhoneCall size={17} strokeWidth={1.25} />, heading: "Design advice", text: "A real person, seven days a week" },
    { icon: <ShieldCheck size={17} strokeWidth={1.25} />, heading: "Secure payment", text: "Encrypted checkout, always" }
  ];

  return (
    <main className="bg-paper">
      <section className="relative flex h-[52vh] min-h-[24rem] items-end overflow-hidden">
        <img
          src={shopHeader}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/15" />
        <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-14 sm:px-6">
          <Reveal>
            <p className="eyebrow text-paper/70">The shop</p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-paper sm:text-7xl">
              The collection
            </h1>
            <div className="mt-6 text-paper/70">
              <BreadCrumbs />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
          <div className="hidden lg:block">
            <div className="sticky top-28 border-t border-line pt-8">
              <ProductsFilter />
            </div>
          </div>

          <div>
            <div className="mb-8 flex items-center justify-between border-b border-line pb-5 lg:hidden">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-2">
                Filter & sort
              </p>
              <ProductFilterSheet />
            </div>
            <AllProducts />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 pb-24 sm:px-6">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-3">
          {services.map((s) => (
            <div key={s.heading} className="flex items-center gap-4 bg-paper px-6 py-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-bronze">
                {s.icon}
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{s.heading}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-2">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </main>
  );
};
