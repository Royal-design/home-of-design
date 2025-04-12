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
    const response = await dispatch(logoutUser());
    if (response.success) {
      toast.success("User logged out successfully");
    } else {
      toast.error(response.message || "Logout failed");
    }
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          {user?.photo ? (
            <img
              src={user.photo}
              className="w-6 h-6 rounded-full border border-lighter-color p-[2px] bg-background-banner shadow-sm"
            />
          ) : (
            <UserRound strokeWidth={1.5} />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background border-border-line">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-border-line border" />
        <DropdownMenuItem className="hover:bg-button-hover">
          <User />
          <NavLink
            onClick={() => setOpen(!open)}
            to={user ? "/profile" : "/login"}
          >
            Profile
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-button-hover">
          <UserPen />
          <NavLink
            onClick={() => setOpen(!open)}
            to={user ? "/profile/edit" : "/login"}
          >
            Edit Profile
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="border-border-line border" />
        <DropdownMenuItem className="hover:bg-button-hover">
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
