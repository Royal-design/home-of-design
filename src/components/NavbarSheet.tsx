import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

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
          <CgClose size={20} onClick={() => setOpen(!open)} />
        )}
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle />
        <SheetDescription />
        <div className=" flex flex-col justify-center items-center gap-4">
          <NavLink
            className="link"
            onClick={() => {
              setOpen(!open);
              window.scrollTo({ top: 0 });
            }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="link"
            onClick={() => {
              setOpen(!open);
              window.scrollTo({ top: 0 });
            }}
            to="/product"
          >
            Shop
          </NavLink>
          <NavLink
            className="link"
            onClick={() => {
              setOpen(!open);
              window.scrollTo({ top: 0 });
            }}
            to="/blog"
          >
            Blog
          </NavLink>
          <NavLink
            className="link"
            onClick={() => {
              setOpen(!open);
              window.scrollTo({ top: 0 });
            }}
            to="/about"
          >
            About Us
          </NavLink>
          <NavLink
            className="link"
            onClick={() => {
              setOpen(!open);
              window.scrollTo({ top: 0 });
            }}
            to="/contact"
          >
            Contact Us
          </NavLink>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
