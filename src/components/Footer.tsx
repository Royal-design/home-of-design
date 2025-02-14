import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter
} from "react-icons/fa6";
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-[6rem] max-sm:px-[1rem]">
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-4">
        {/* Logo and Info Section */}
        <div className="flex flex-col items-center max-sm:items-start">
          <img src={logo} alt="HD" className="w-[3rem]" />
          <p className="text-sm text-gray-400 md:text-center">
            Elevate your living spaces with timeless designs and innovative
            furniture. Crafted for comfort, built to last.
          </p>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <p className="text-sm text-gray-400">
            123 Furniture Street, Lagos, Nigeria
          </p>
          <p className="text-sm text-gray-400 mt-2">Phone: +234 123 456 7890</p>
          <p className="text-sm text-gray-400 mt-2">
            Email: info@furniturehub.com
          </p>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li className="text-sm text-gray-400">
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <li className="text-sm text-gray-400">
              <Link to="/products" className="link">
                Shop
              </Link>
            </li>
            <li className="text-sm text-gray-400">
              <Link to="/blogs" className="link">
                Blogs
              </Link>
            </li>
            <li className="text-sm text-gray-400">
              <Link to="/about" className="link">
                About Us
              </Link>
            </li>
            <li className="text-sm text-gray-400">
              <Link to="/contact" className="link">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              to="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            >
              <FaTwitter />
            </Link>
            <Link
              to="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            >
              <FaInstagram />
            </Link>
            <Link
              to="#"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Emmanuel All rights reserved.
        </p>
      </div>
    </footer>
  );
};
