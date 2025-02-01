import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { LogOut, User, UserPen, UserRound } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);
  const signOut = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("User logged out successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          {user?.photo ? (
            <img
              src={user.photo}
              className="w-6 h-6 rounded-full bg-background-banner shadow-sm"
            />
          ) : (
            <UserRound strokeWidth={1.5} />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          <NavLink
            onClick={() => setOpen(!open)}
            to={user ? "/profile" : "/login"}
          >
            Profile
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserPen />
          <NavLink
            onClick={() => setOpen(!open)}
            to={user ? "/profile/edit" : "/login"}
          >
            Edit Profile
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          <span
            onClick={() => {
              signOut();
              navigate("/");
            }}
          >
            Log out
          </span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
