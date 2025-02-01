import { SpinnerLoader } from "@/components/SpinnerLoader";
import { useAppSelector } from "@/redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user) return <SpinnerLoader />;
  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
};
