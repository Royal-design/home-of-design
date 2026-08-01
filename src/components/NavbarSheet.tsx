import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search } from "./Search";
import { Theme } from "./Theme";
import { ProfileMenu } from "./ProfileMenu";
import { Menu, X } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { cn } from "@/lib/utils";

const MOBILE_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/blogs", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

const NavbarSheet = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-ml-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-paper-2"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[86%] overflow-y-auto border-line bg-paper p-0 sm:max-w-sm"
      >
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>

        <div className="flex min-h-full flex-col px-6 pb-10 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-ink-2">
              Home&nbsp;of&nbsp;Design
            </span>
            <Theme />
          </div>

          <div className="mt-14">
            <p className="eyebrow text-ink-3">Menu</p>
            <nav className="mt-4 flex flex-col" aria-label="Mobile navigation">
              {MOBILE_LINKS.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-baseline gap-4 border-b border-line py-5",
                      isActive ? "text-bronze" : "text-ink"
                    )
                  }
                >
                  <span className="font-mono text-[0.6rem] text-ink-3">
                    0{i + 1}
                  </span>
                  <span className="font-display text-3xl transition-transform duration-500 ease-expo-out group-hover:translate-x-2">
                    {link.label}
                  </span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mt-auto flex flex-col gap-6 pt-14">
            <div className="border border-line px-4 py-3">
              <Search />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user ? (
                  <ProfileMenu />
                ) : (
                  <button
                    type="button"
                    onClick={() => go("/login")}
                    className="cursor-pointer border border-line px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink transition-all hover:border-bronze hover:text-bronze"
                  >
                    Sign in
                  </button>
                )}
              </div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-ink-3">
                Est. 2014
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarSheet;
