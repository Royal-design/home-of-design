import { Button } from "@/components/ui/button";
import { getUserData, logoutUser } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LazyLoad from "react-lazyload";
import { ArrowRight, LogOut, UserRound } from "lucide-react";

export const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOut = async () => {
    const response = await dispatch(logoutUser());
    if (response.success) {
      toast.success("User logged out successfully");
      navigate("/login");
    } else {
      toast.error(response.message || "Logout failed");
    }
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5 py-24">
      <div className="w-full max-w-lg border border-line bg-paper-2/40 p-8 sm:p-12">
        <p className="eyebrow text-ink-3">My account</p>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink">
          Welcome back{user?.firstname ? `, ${user.firstname}` : ""}.
        </h1>

        <div className="mt-8 flex items-center gap-6">
          {user?.photo ? (
            <LazyLoad height={96}>
              <img
                src={user.photo}
                alt={user?.firstname || "Profile"}
                className="h-24 w-24 rounded-full border border-line object-cover"
              />
            </LazyLoad>
          ) : (
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-line text-ink-3">
              <UserRound size={36} strokeWidth={1.25} />
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-medium text-ink">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="mt-1 text-sm text-ink-2">{user?.email}</p>
            {user?.description && (
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                {user.description}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-8">
          <Link to="edit" className="btn-outline inline-flex">
            Edit profile <ArrowRight size={14} />
          </Link>
          <Button
            type="button"
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              signOut();
              navigate("/");
            }}
            className="inline-flex cursor-pointer items-center gap-2 px-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-2 transition-colors hover:text-destructive"
          >
            <LogOut size={14} />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};
