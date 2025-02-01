import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./Layouts/RootLayout";

import { Suspense, lazy, useEffect } from "react";
import { SpinnerLoader } from "./components/SpinnerLoader";
import { checkAuthState, getUsers } from "./redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { PublicLayout } from "./Layouts/PublicLayout";
import { PrivateLayout } from "./Layouts/PrivateLayout";
import { setProducts } from "./redux/slice/productSlice";
import { data } from "./assets/data/data";

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
const LoginPage = lazy(() =>
  import("./Pages/LoginPage").then(({ LoginPage }) => ({
    default: LoginPage
  }))
);
const RegisterPage = lazy(() =>
  import("./Pages/RegisterPage").then(({ RegisterPage }) => ({
    default: RegisterPage
  }))
);
const ProfilePage = lazy(() =>
  import("./Pages/ProfilePage").then(({ ProfilePage }) => ({
    default: ProfilePage
  }))
);
const EditProfilepage = lazy(() =>
  import("./Pages/EditProfilepage").then(({ EditProfilepage }) => ({
    default: EditProfilepage
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
      },
      {
        element: <PublicLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />
          },
          {
            path: "/login",
            element: <LoginPage />
          }
        ]
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />
          },
          {
            path: "/profile/edit",
            element: <EditProfilepage />
          }
        ]
      }
    ]
  }
]);
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
    dispatch(getUsers());
    dispatch(setProducts(data.products));
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
