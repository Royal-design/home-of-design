import { useEffect, useState } from "react";
import Headroom from "react-headroom";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { Theme } from "./Theme";
import { useAppSelector } from "@/redux/store";
import { Button } from "./ui/button";
import { ProfileMenu } from "./ProfileMenu";
import NavbarSheet from "./NavbarSheet";

export const NavBar = () => {
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

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
          className={`duration-200 text-primary bg-background dark:bg-slate-400 font-Titillium-Web   h-[4rem]  max-sm:px-[1rem] w-full max-sm:justify-between flex items-center justify-between px-[6rem]  ${
            isPinned && scrolled ? " shadow-md" : ""
          }`}
        >
          <div className="flex gap-2 items-center">
            <div className="hidden  max-sm:block ">
              <NavbarSheet />
            </div>
            <img src={logo} alt="logo" className="w-[3rem] max-sm:w-[2rem]" />
          </div>

          <div className="flex gap-4 max-sm:hidden">
            <NavLink to="/" className="link">
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className="link"
              onClick={() => {
                window.scrollTo({
                  top: 0
                });
              }}
            >
              Shop
            </NavLink>
            <NavLink to="/blog" className="link">
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
            <Theme />
            {user ? (
              <ProfileMenu />
            ) : (
              <div className="flex gap-2 items-center">
                <NavLink to="/login" className="">
                  <Button variant="ghost" className="border">
                    Sign in
                  </Button>
                </NavLink>
              </div>
            )}
            <div className=" relative cursor-pointer ">
              <IoIosSearch size={20} />
            </div>
            <div className=" relative cursor-pointer">
              <IoCartSharp size={20} />
              <p className=" circle">2</p>
            </div>
            <div className=" relative cursor-pointer">
              <FiHeart size={20} />
              <p className=" circle">5</p>
            </div>
          </div>
        </nav>
      </Headroom>
    </div>
  );
};
