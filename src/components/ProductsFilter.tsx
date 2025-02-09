import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { CategoryCommand } from "./CategoryCommand";
import { PriceSlider } from "./PriceSlider";
import { Sort } from "./Sort";
// import { BrandsCommand } from "./BrandsCommand";

export const ProductsFilter = () => {
  const sizes = ["Large", "Medium", "Small"];
  return (
    <Accordion
      type="multiple"
      defaultValue={["item-1", "item-2", "item-3", "item-4"]}
      className="w-full  font-rajdhani flex flex-col gap-2 "
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg ">
          PRODUCT CATEGORIES
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 text-[16px]">
          <CategoryCommand />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-lg ">Colors</AccordionTrigger>
        <AccordionContent className="flex gap-3">
          <div className="bg-[#000000] w-6 h-6 rounded-full"></div>
          <div className="bg-[#e4181a] w-6 h-6 rounded-full"></div>
          <div className="bg-[#a9a9a9] w-6 h-6 rounded-full"></div>
          <div className="bg-[#f4a529] w-6 h-6 rounded-full"></div>
          <div className="bg-[#25bd04] w-6 h-6 rounded-full"></div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-lg ">Sizes</AccordionTrigger>
        <AccordionContent className="flex gap-2 flex-wrap">
          {sizes.map((size, i) => (
            <Button
              variant="ghost"
              key={i}
              className=" px-4 py-2 text-xs p-1 h-6 focus:bg-slate-400 focus:text-white  border-2 border-solid"
            >
              {size}
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-lg ">Price</AccordionTrigger>
        <AccordionContent className="flex ml-3  gap-2 justify-start w-full  mt-6 flex-wrap">
          <PriceSlider />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-lg ">Sort</AccordionTrigger>
        <AccordionContent className=" justify-start w-full  mt-2 ">
          <Sort />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
