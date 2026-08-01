import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import { Cursor } from "@/components/Cursor";
import { ScrollManager } from "@/components/ScrollManager";
import { BrandLoader } from "@/components/BrandLoader";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { FC, Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SpinnerLoader } from "@/components/SpinnerLoader";

function useImageReveal() {
  useEffect(() => {
    const apply = () => {
      document
        .querySelectorAll<HTMLImageElement>("img.fade-img")
        .forEach((img) => {
          if (img.complete && img.naturalWidth > 0) {
            img.classList.add("loaded");
          }
        });
    };
    apply();
    const onLoad = (e: Event) => {
      const t = e.target;
      if (t instanceof HTMLImageElement && t.classList.contains("fade-img")) {
        t.classList.add("loaded");
      }
    };
    document.addEventListener("load", onLoad, true);
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      document.removeEventListener("load", onLoad, true);
      observer.disconnect();
    };
  }, []);
}

export const RootLayout: FC = () => {
  const location = useLocation();

  const loginPage = location.pathname === "/login";
  const registerPage = location.pathname === "/register";

  useSmoothScroll(!loginPage && !registerPage);
  useImageReveal();

  return (
    <div className="w-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-bronze focus:px-4 focus:py-2 focus:font-mono focus:text-[0.65rem] focus:uppercase focus:tracking-[0.18em] focus:text-paper"
      >
        Skip to content
      </a>
      <Toaster position="top-right" />
      <Cursor />
      <ScrollManager />
      <BrandLoader />
      {!loginPage && !registerPage && <NavBar />}
      <main id="main-content">
        <Suspense fallback={<SpinnerLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
