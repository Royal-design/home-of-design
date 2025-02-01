import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { Separator } from "./ui/separator";
export const Footer = () => {
  return (
    <footer className="mt-[2rem] bg-slate-600 py-2 font-Titillium-Web">
      <div className="px-[6rem] grid items-center text-white font-Titillium-Web grid-cols-7">
        <figure className="w-[120px] flex flex-col items-center  justify-center">
          <img src={logo} alt="HD" className="w-[3rem]" />
          <figcaption className="text-sm text">Home of Designs</figcaption>
        </figure>
        <Separator
          orientation="vertical"
          className=" h-[50px] border-slate-500 border"
        />
        <div className="">
          <h2 className="text-sm">INFO</h2>
          <div className="text-xs flex flex-col gap-1">
            <Link to="/blog">Blog</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">About Us</Link>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className=" h-[50px] border-slate-500 border"
        />
        <div className="">
          <h2 className="text-sm">CONNECT</h2>
          <div className="text-xs flex flex-col gap-1">
            <Link to="/contact">Contact Us</Link>
            <Link to="/partners">Affiliates</Link>
            <Link to="/contact">Service</Link>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className=" h-[50px] border-slate-500 border"
        />
        <div className="">
          <h2 className="text-sm">FOLLOW US</h2>
          <div className="flex gap-4">
            <CiTwitter />
            <CiInstagram />
            <CiFacebook />
          </div>
        </div>
      </div>
      <Separator className="border-slate-500 border mt-4" />
      <div className="px-[6rem]">
        <div className="flex justify-between text-white">
          <p className="text-xs"> &copy; Emmanuel 2025 . All rights reserved</p>
          <p className="text-xs">Unauthorized use prohibited</p>
        </div>
      </div>
    </footer>
  );
};
