import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { CategoryCommand } from "./CategoryCommand";
import { PriceSlider } from "./PriceSlider";
import { Sort } from "./Sort";

export const ProductsFilter = () => {
  return (
    <Accordion type="multiple" defaultValue={["cat", "price", "sort"]} className="flex w-full flex-col gap-1">
      <AccordionItem value="cat" className="border-b border-line">
        <AccordionTrigger className="py-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink">
          Rooms
        </AccordionTrigger>
        <AccordionContent className="pb-5 pt-1">
          <CategoryCommand />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sort" className="border-b border-line">
        <AccordionTrigger className="py-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink">
          Curate
        </AccordionTrigger>
        <AccordionContent className="pb-5 pt-1">
          <Sort />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="price" className="border-b border-line">
        <AccordionTrigger className="py-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink">
          Price
        </AccordionTrigger>
        <AccordionContent className="pb-5 pt-1">
          <PriceSlider />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
