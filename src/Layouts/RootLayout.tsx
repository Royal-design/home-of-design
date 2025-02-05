import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const RootLayout: FC = () => {
  const location = useLocation();

  const loginPage = location.pathname === "/login";
  const registerPage = location.pathname === "/register";
  return (
    <div className="w-full">
      <Toaster />
      {!loginPage && !registerPage && <NavBar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
