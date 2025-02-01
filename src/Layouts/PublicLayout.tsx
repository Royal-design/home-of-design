import { useAppSelector } from "@/redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (user) return <Navigate to="/" />;

  return <Outlet />;
};
