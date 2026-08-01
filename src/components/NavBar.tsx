import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/store";
import { cn } from "@/lib/utils";
import { Search } from "./Search";
import { Theme } from "./Theme";
import { ProfileMenu } from "./ProfileMenu";
import NavbarSheet from "./NavbarSheet";
import CartSheet from "./CartSheet";
import WishlistSheet from "./WishlistSheet";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/blogs", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setVisible(y < 320 || y < lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrolled(false);
    setVisible(true);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-line bg-paper transition-transform duration-500",
        scrolled && "shadow-[0_10px_30px_-18px_rgba(27,23,18,0.4)]",
        !visible && "-translate-y-full"
      )}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <div className="lg:hidden">
            <NavbarSheet />
          </div>
          <Link
            to="/"
            className="flex items-center gap-3"
            aria-label="Home of Design — home"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-bronze font-display text-[0.95rem] tracking-tight text-ink">
              H·D
            </span>
            <span className="hidden font-display text-xl leading-none tracking-tight text-ink md:block">
              Home of Design<span className="text-bronze">.</span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="group relative py-2"
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      "font-mono text-[0.62rem] uppercase tracking-[0.22em] transition-colors duration-300",
                      isActive
                        ? "text-bronze"
                        : "text-ink-2 group-hover:text-ink"
                    )}
                  >
                    {link.label}
                  </span>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-bronze transition-all duration-500 ease-expo-out",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden md:block">
            <Search />
          </div>
          <Theme />
          {user ? (
            <div className="hidden sm:block">
              <ProfileMenu />
            </div>
          ) : (
            <Link to="/login" className="hidden sm:block" aria-label="Sign in">
              <Button
                variant="ghost"
                className="h-10 rounded-full border border-line px-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:border-bronze hover:bg-transparent hover:text-bronze"
              >
                Sign in
              </Button>
            </Link>
          )}
          <div className="hidden sm:block">
            <WishlistSheet />
          </div>
          <CartSheet />
        </div>
      </div>
    </header>
  );
}
