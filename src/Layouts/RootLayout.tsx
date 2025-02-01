import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, useLocation } from "react-router-dom";

export const RootLayout = () => {
  const location = useLocation();

  const loginPage = location.pathname === "/login";
  const registerPage = location.pathname === "/register";
  return (
    <div>
      <Toaster />
      {!loginPage && !registerPage && <NavBar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
