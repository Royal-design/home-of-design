import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getUserData, logoutUser } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LazyLoad from "react-lazyload";

export const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signOut = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <div className="w-full max-sm:p-2 h-screen  flex justify-center items-center object-cover">
      <Card className="w-[40rem] max-sm:w-full">
        <div className="flex max-sm:flex-col max-sm:items-center max-sm:w-full gap-4 items-center mb-4 p-3">
          {user?.photo && (
            <LazyLoad height={200}>
              <img
                src={user.photo}
                className="w-[10rem] h-full rounded-full bg-background-banner shadow-sm"
              />
            </LazyLoad>
          )}
          <CardContent>
            <p className="font-bold text-lg max-sm:text-base mb-2">
              Welcome back {user?.firstname}!
            </p>
            <p className="max-sm:text-sm">{user?.description}</p>
          </CardContent>
        </div>

        <CardFooter className=" flex gap-4">
          <Link to="edit">
            <Button>Edit Profile</Button>
          </Link>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              signOut();
              navigate("/");
            }}
          >
            Log out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
