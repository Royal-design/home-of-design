import { toggleTheme } from "@/redux/slice/themeSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";

export const Theme = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-2 transition-all duration-300 hover:bg-paper-2 hover:text-bronze"
    >
      <span className={cn("transition-transform duration-500", isDark && "rotate-[360deg]")}>
        {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
      </span>
    </button>
  );
};
