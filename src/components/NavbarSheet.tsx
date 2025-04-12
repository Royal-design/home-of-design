import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search } from "./Search";
import { Theme } from "./Theme";
import { IoCloseOutline } from "react-icons/io5";
import { useAppSelector } from "@/redux/store";
import { ProfileMenu } from "./ProfileMenu";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";

const NavbarSheet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {!open ? (
          <div>
            <div onClick={() => setOpen(!open)}>
              <HiOutlineBars3BottomLeft size={40} />
            </div>
          </div>
        ) : (
          <div>
            <IoCloseOutline size={20} />
          </div>
        )}
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-r border-border-line overflow-auto scrollbar-hidden"
      >
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
          <div className="w-full">
            <div className="flex shadow-sm border border-border-line items-center px-2 justify-between w-full">
              <Theme />
              {user && <ProfileMenu />}
            </div>
            <p className="text-xs text-center mt-1 text-slate-700 dark:text-slate-200">
              © {new Date().getFullYear()} Emmanuel All rights reserved.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
