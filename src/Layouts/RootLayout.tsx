import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div>
      <Toaster />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
