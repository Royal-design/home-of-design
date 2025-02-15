import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { Search } from "./Search";
import { Theme } from "./Theme";
import { IoCloseOutline } from "react-icons/io5";

const NavbarSheet = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {!open ? (
          <div>
            <HiMiniBars3BottomLeft onClick={() => setOpen(!open)} size={20} />
          </div>
        ) : (
          <div>
            <IoCloseOutline size={20} />
          </div>
        )}
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle />
        <SheetDescription />
        <div className=" flex w-full mt-4 flex-col justify-between gap-4 h-full">
          <div className="flex flex-col gap-4">
            <div className="">
              <Search />
            </div>
            <div className="flex flex-col gap-4">
              <NavLink
                className=""
                onClick={() => {
                  setOpen(!open);
                  window.scrollTo({ top: 0 });
                }}
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className=""
                onClick={() => {
                  setOpen(!open);
                  window.scrollTo({ top: 0 });
                }}
                to="/products"
              >
                Shop
              </NavLink>
              <NavLink
                className=""
                onClick={() => {
                  setOpen(!open);
                  window.scrollTo({ top: 0 });
                }}
                to="/blogs"
              >
                Blog
              </NavLink>
              <NavLink
                className=""
                onClick={() => {
                  setOpen(!open);
                  window.scrollTo({ top: 0 });
                }}
                to="/about"
              >
                About Us
              </NavLink>
              <NavLink
                className=""
                onClick={() => {
                  setOpen(!open);
                  window.scrollTo({ top: 0 });
                }}
                to="/contact"
              >
                Contact Us
              </NavLink>
            </div>
          </div>
          <div className="">
            <Theme />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
