import { AllProducts } from "@/components/AllProducts";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { ProductsFilter } from "@/components/ProductsFilter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PiPhoneCallLight } from "react-icons/pi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiSecurePaymentLine } from "react-icons/ri";
import { ProductFilterSheet } from "@/components/ProductFilterSheet";
import { useEffect } from "react";
import { ScrollToTop } from "@/components/ScrollToTop";

export const ShopPage = () => {
  const deliveryInfo = [
    {
      id: 1,
      icon: <LiaShippingFastSolid size={30} />,
      heading: "Free Shipping",
      text: "Fast and reliable delivery at no extra cost"
    },
    {
      id: 2,
      icon: <PiPhoneCallLight size={30} />,
      heading: "Customer Support",
      text: "24/7 friendly and professional assistance"
    },
    {
      id: 3,
      icon: <RiSecurePaymentLine size={30} />,
      heading: "Secure Payment",
      text: "Safe and encrypted transactions guaranteed"
    }
  ];
  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);
  return (
    <div>
      <main className="w-full">
        <section className="h-[20rem] max-sm:h-auto relative font-Titillium-Web">
          <img
            src="https://images.unsplash.com/photo-1680946496238-5272d3c407fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZ1cm5pdHVyZSUyMGRhcmt8ZW58MHx8MHx8fDA%3D"
            alt="hero"
            className="h-full w-full object-cover"
          />
          <article className="absolute h-full gap-4 w-full flex flex-col max-sm:px-4 items-center justify-center top-0 bg-banner-overlay ">
            <h1 className="text-3xl text-center font-bold max-sm:text-lg max-md:text-xl text-white dark:text-gray-100">
              Redefine Comfort, Redefine Style
            </h1>

            <p className="text-lg max-sm:text-base leading-[150%] text-gray-300 dark:text-gray-300  max-sm:w-full w-[60%] text-center">
              Discover expertly crafted furniture that blends luxury,
              functionality, and timeless design. Whether you're furnishing your
              living room, dining area, or workspace, we have everything you
              need to create a space you'll love for years to come.
            </p>
            <div className="">
              <BreadCrumbs />
            </div>
          </article>
        </section>

        <div className="mt-[2rem] px-[5rem] max-md:px-4 max-lg:px-8 max-sm:px-[1rem] gap-8 grid grid-cols-[repeat(4,1fr)] max-md:flex max-md:flex-col max-sm:flex max-sm:flex-col  w-full">
          <div className="pr-2 col-span-1 w-full max-md:hidden max-sm:hidden h-[55rem]">
            <ProductsFilter />
          </div>
          <div className="hidden max-md:block max-sm:block">
            <ProductFilterSheet />
          </div>
          <div className="w-full col-span-3">
            <AllProducts />
          </div>
        </div>
      </main>
      <div className="flex max-md:px-4 max-lg:px-8 max-sm:flex-col gap-2 items-center justify-between w-full my-[4rem] px-[6rem] max-sm:px-[1rem] ">
        {deliveryInfo.map((info) => (
          <Card
            key={info.id}
            className="h-auto max-sm:h-full max-sm:w-[18rem] hover:scale-[1.1] transition-all hover:border-orange-200 hover:skew-x-2  hover:skew-y-2 duration-200 bg-background p-0 rounded-sm"
          >
            <CardHeader className="p-0" />
            <CardContent className="flex gap-2 p-2 items-center">
              <div className="">{info.icon}</div>
              <div className="flex flex-col gap-1">
                <h1 className="font-bold">{info.heading}</h1>
                <p className="text-sm">{info.text}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
};
