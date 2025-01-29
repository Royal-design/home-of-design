import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./Layouts/RootLayout";

import { Suspense, lazy } from "react";
import { SpinnerLoader } from "./components/SpinnerLoader";

const HomePage = lazy(() =>
  import("./Pages/HomePage").then(({ HomePage }) => ({ default: HomePage }))
);
const ShopPage = lazy(() =>
  import("./Pages/ShopPage").then(({ ShopPage }) => ({ default: ShopPage }))
);
const BlogPage = lazy(() =>
  import("./Pages/BlogPage").then(({ BlogPage }) => ({ default: BlogPage }))
);
const AboutPage = lazy(() =>
  import("./Pages/AboutPage").then(({ AboutPage }) => ({ default: AboutPage }))
);
const ContactPage = lazy(() =>
  import("./Pages/ContactPage").then(({ ContactPage }) => ({
    default: ContactPage
  }))
);
const ErrorPage = lazy(() =>
  import("./Pages/ErrorPage").then(({ ErrorPage }) => ({
    default: ErrorPage
  }))
);

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<SpinnerLoader />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<SpinnerLoader />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/shop",
        element: <ShopPage />
      },
      {
        path: "/blog",
        element: <BlogPage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "/contact",
        element: <ContactPage />
      }
    ]
  }
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
