import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FiHome } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { CiShop } from "react-icons/ci";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter
} from "react-icons/fa6";
export const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      const isAtBottom = currentScrollY + windowHeight >= fullHeight - 10;

      if (isAtBottom) {
        setShowFooter(true);
      } else if (currentScrollY > lastScrollY) {
        setShowFooter(false);
      } else {
        setShowFooter(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <div className="">
      <footer className="md:hidden pt-[5rem]">
        <div
          className={clsx(
            "fixed bottom-0 left-0 w-full z-10 bg-banner border-t rounded-t-[2rem] border-border-line shadow-md transition-transform duration-300",
            showFooter ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="flex justify-around py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col p-1 items-center text-sm transition-colors ${
                  isActive
                    ? "border border-border-line rounded-lg  transition-all duration-200"
                    : "text-light-color"
                }`
              }
            >
              <FiHome size={22} />
              <span className="text-lighter-color">Home</span>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `flex flex-col p-1 items-center text-sm transition-colors ${
                  isActive
                    ? "border border-border-line rounded-lg  transition-all duration-200"
                    : "text-light-color"
                }`
              }
            >
              <CiShop size={22} />
              <span className="text-lighter-color">Shop</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex flex-col p-1 items-center text-sm transition-colors ${
                  isActive
                    ? "border border-border-line rounded-lg  transition-all duration-200"
                    : "text-light-color"
                }`
              }
            >
              <CiCircleInfo size={22} />
              <span className="text-lighter-color">About</span>
            </NavLink>
            <NavLink
              to="/shopping-cart"
              className={({ isActive }) =>
                `flex flex-col p-1 items-center text-sm transition-colors ${
                  isActive
                    ? "border border-border-line rounded-lg  transition-all duration-200"
                    : "text-light-color"
                }`
              }
            >
              <CiShoppingCart size={22} />
              <span className="text-lighter-color">Cart</span>
            </NavLink>
          </div>
        </div>
      </footer>
      <footer className="bg-banner max-md:px-4 max-lg:px-8  text-black dark:text-white py-12 px-[6rem] max-sm:px-[1rem] max-sm:hidden">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4">
          {/* Logo and Info Section */}
          <div className="flex flex-col items-center max-md:items-start max-sm:items-start">
            <img src={logo} alt="HD" className="w-[3rem]" />
            <p className="text-sm max-w-4xl text-slate-700 leading-[150%] dark:text-slate-200">
              Elevate your living spaces with timeless designs and innovative
              furniture. Crafted for comfort, built to last.
            </p>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p className="text-sm text-slate-700 dark:text-slate-200 ">
              123 Furniture Street, Lagos, Nigeria
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-200  mt-2">
              Phone: +234 123 456 7890
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-200  mt-2">
              Email: info@furniturehub.com
            </p>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li className="text-sm text-slate-700 dark:text-slate-200 ">
                <Link to="/" className="link">
                  Home
                </Link>
              </li>
              <li className="text-sm text-slate-700 dark:text-slate-200 ">
                <Link to="/products" className="link">
                  Shop
                </Link>
              </li>
              <li className="text-sm text-slate-700 dark:text-slate-200 ">
                <Link to="/blogs" className="link">
                  Blogs
                </Link>
              </li>
              <li className="text-sm text-slate-700 dark:text-slate-200 ">
                <Link to="/about" className="link">
                  About Us
                </Link>
              </li>
              <li className="text-sm text-slate-700 dark:text-slate-200 ">
                <Link to="/contact" className="link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex dark:text-slate-700 text-slate-200  space-x-4">
              <Link
                to="#"
                className="p-2 rounded-full dark:bg-slate-200  bg-gray-700 hover:bg-gray-600"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-full dark:bg-slate-200  bg-gray-700 hover:bg-gray-600"
              >
                <FaTwitter />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-full dark:bg-slate-200  bg-gray-700 hover:bg-gray-600"
              >
                <FaInstagram />
              </Link>
              <Link
                to="#"
                className="p-2 rounded-full dark:bg-slate-200  bg-gray-700 hover:bg-gray-600"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 dark:border-white pt-4 text-center">
          <p className="text-sm text-slate-700 dark:text-slate-200">
            © {new Date().getFullYear()} Emmanuel All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
