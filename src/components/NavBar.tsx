import { useEffect, useState } from "react";
import Headroom from "react-headroom";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { Theme } from "./Theme";

export const NavBar = () => {
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

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
          className={`duration-200 text-primary bg-background dark:bg-slate-400   h-[4rem]  max-sm:px-[1rem] w-full max-sm:justify-between flex items-center justify-between px-[6rem]  ${
            isPinned && scrolled ? " shadow-md" : ""
          }`}
        >
          <figure>
            <img src={logo} className="w-[3rem]" />
          </figure>
          <div className="flex gap-4 ">
            <NavLink to="/" className="link">
              Home
            </NavLink>
            <NavLink to="/shop" className="link">
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
