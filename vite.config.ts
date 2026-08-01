import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("/gsap/") || id.includes("lenis") || id.includes("split-type"))
            return "vendor-motion";
          if (id.includes("framer-motion") || id.includes("/motion/"))
            return "vendor-motion";
          if (id.includes("@mui/") || id.includes("@emotion/"))
            return "vendor-mui";
          if (id.includes("/firebase/"))
            return "vendor-firebase";
          if (id.includes("@stripe/") || id.includes("stripe"))
            return "vendor-stripe";
          if (id.includes("/swiper/"))
            return "vendor-swiper";
          if (id.includes("@reduxjs/") || id.includes("react-redux"))
            return "vendor-redux";
          if (id.includes("react-router"))
            return "vendor-router";
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/")
          )
            return "vendor-react";
        }
      }
    }
  }
});
