import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./Layouts/RootLayout";
import { Suspense, lazy, useEffect } from "react";
import { SpinnerLoader } from "./components/SpinnerLoader";
import { checkAuthState, getUsers } from "./redux/slice/authSlice";
import { useAppDispatch } from "./redux/store";
import { PublicLayout } from "./Layouts/PublicLayout";
import { PrivateLayout } from "./Layouts/PrivateLayout";
import { setProducts } from "./redux/slice/productSlice";
import { data } from "./assets/data/data";
import { BlogDetailPage } from "./Pages/BlogDetailPage";
import { setBlogs } from "./redux/slice/blogSlice";
import { blogs } from "./assets/data/blogs";
import { ErrorPage } from "./Pages/ErrorPage";

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
const ProductPage = lazy(() =>
  import("./Pages/ProductPage").then(({ ProductPage }) => ({
    default: ProductPage
  }))
);
const CartPage = lazy(() =>
  import("./Pages/CartPage").then(({ CartPage }) => ({
    default: CartPage
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
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ShopPage /> },
      { path: "/products/:id", element: <ProductPage /> },
      { path: "/blogs", element: <BlogPage /> },
      { path: "/blogs/:id", element: <BlogDetailPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      {
        element: <PublicLayout />,
        children: [
          { path: "/register", element: <RegisterPage /> },
          { path: "/login", element: <LoginPage /> }
        ]
      },
      {
        element: <PrivateLayout />,
        children: [
          { path: "/profile", element: <ProfilePage /> },
          { path: "/shopping-cart", element: <CartPage /> },
          { path: "/profile/edit", element: <EditProfilepage /> }
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
    dispatch(setBlogs(blogs));
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
