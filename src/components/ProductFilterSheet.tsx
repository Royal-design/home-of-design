import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { CiSliderHorizontal } from "react-icons/ci";
import { useState } from "react";
import { ProductsFilter } from "./ProductsFilter";

export const ProductFilterSheet = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {!open ? (
          <div
            className="cursor-pointer flex gap-4 items-center"
            onClick={() => setOpen(!open)}
          >
            <CiSliderHorizontal size={15} />
            <p>Filter</p>
          </div>
        ) : (
          <div
            className="flex gap-4 items-center"
            onClick={() => setOpen(!open)}
          >
            <CiSliderHorizontal size={15} />
            <p>Filter</p>
          </div>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="">
        <SheetTitle />
        <SheetDescription />
        <ProductsFilter />
      </SheetContent>
    </Sheet>
  );
};
