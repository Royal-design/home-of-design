import { useEffect, useState } from "react";
import Headroom from "react-headroom";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { Theme } from "./Theme";
import { useAppSelector } from "@/redux/store";
import { Button } from "./ui/button";
import { ProfileMenu } from "./ProfileMenu";
import NavbarSheet from "./NavbarSheet";
import { Search } from "./Search";
import CartSheet from "./CartSheet";
import WishlistSheet from "./WishlistSheet";

export const NavBar = () => {
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const totalFavourite = useAppSelector(
    (state) => state.favourite.totalFavourite
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Headroom
        onPin={() => setIsPinned(true)}
        onUnpin={() => setIsPinned(false)}
      >
        <nav
          className={`duration-200 text-primary bg-background  font-Titillium-Web max-lg:px-8 max-md:px-4  h-[4rem]  max-sm:px-[1rem] w-full max-sm:justify-between flex items-center justify-between px-[6rem]  ${
            isPinned && scrolled ? " shadow-md" : ""
          }`}
        >
          <div className="flex gap-2 items-center">
            <div className="hidden  max-sm:block ">
              <NavbarSheet />
            </div>
            <img src={logo} alt="logo" className="w-[3rem] max-sm:w-[2rem]" />
          </div>

          <div className="flex gap-6 max-sm:hidden">
            <NavLink to="/" className="link">
              Home
            </NavLink>
            <NavLink to="/products" className="link">
              Shop
            </NavLink>
            <NavLink to="/blogs" className="link">
              Blog
            </NavLink>
            <NavLink to="/about" className="link">
              About
            </NavLink>
            <NavLink to="/contact" className="link">
              Contact
            </NavLink>
          </div>

          <div className="actions items-center flex gap-6">
            <div className="max-sm:hidden max-md:hidden flex items-center gap-6">
              <Search />
              <Theme />
            </div>
            {user ? (
              <ProfileMenu />
            ) : (
              <div className="flex gap-2 items-center">
                <NavLink to="/login" className="">
                  <Button
                    variant="ghost"
                    className="bg-button hover:bg-button-hover"
                  >
                    Sign in
                  </Button>
                </NavLink>
              </div>
            )}
            <div className=" relative cursor-pointer">
              <CartSheet />
              <p className="text-xs circle">{totalQuantity}</p>
            </div>
            <div className=" relative cursor-pointer">
              <WishlistSheet />
              <p className="text-xs circle">{totalFavourite}</p>
            </div>
          </div>
        </nav>
      </Headroom>
    </div>
  );
};
