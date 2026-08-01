import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import googleImage from "../assets/google.webp";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/store";
import { loginUser, loginWithGoogle } from "@/redux/slice/authSlice";
import { FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const userSchema = z.object({
  email: z
    .string({ invalid_type_error: "Must be a valid email" })
    .email({ message: "It must be a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmit = async (userData: z.infer<typeof userSchema>) => {
    const response = await dispatch(
      loginUser(userData.email, userData.password)
    );
    if (response.success) {
      toast.success("User logged in successfully");
      navigate("/");
      form.reset();
    } else {
      toast.error(response.message || "Login failed");
    }
  };

  const handleGoogleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const response = await dispatch(loginWithGoogle());

    if (response.success) {
      toast.success("User logged in successfully");
      navigate("/");
    } else {
      toast.error(response.message || "Google login failed");
    }
  };

  const fieldClass =
    "h-12 rounded-none border-line bg-paper-2/50 px-4 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0";

  return (
    <div className="grid min-h-screen bg-paper lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-forest p-12 text-paper lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center border border-bronze font-display text-sm">
            H·D
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-paper/70">
            Home of Design
          </span>
        </Link>
        <div>
          <p className="eyebrow text-bronze">Members</p>
          <h1 className="mt-6 max-w-md font-display text-5xl leading-[1.05] tracking-tight">
            Welcome back to the <em className="italic text-bronze">house.</em>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/70">
            Sign in to track orders, save pieces to your wishlist and manage
            your account.
          </p>
        </div>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/40">
          Furniture & objects for living
        </p>
      </div>

      <div className="flex items-center justify-center px-5 py-16 sm:px-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-bronze font-display text-sm text-ink">
                H·D
              </span>
            </Link>
          </div>

          <p className="eyebrow text-ink-3">Account</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight text-ink">
            Sign in
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="mt-10 space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="eyebrow text-ink-2">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className={fieldClass}
                        placeholder="you@example.com"
                        autoComplete="email"
                        spellCheck={false}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="eyebrow text-ink-2">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className={fieldClass}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="btn-primary w-full"
              >
                {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
                <ArrowRight size={14} />
              </button>
            </form>
          </Form>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-3">
              or continue with
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={form.formState.isSubmitting}
            className="flex w-full cursor-pointer items-center justify-center gap-3 border border-line px-6 py-3.5 text-sm text-ink transition-all duration-300 hover:border-bronze hover:text-bronze disabled:cursor-not-allowed disabled:opacity-50"
          >
            <img src={googleImage} alt="" className="h-5 w-5" />
            Google
          </button>

          <p className="mt-8 text-center text-sm text-ink-2">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-bronze underline underline-offset-4 transition-colors hover:text-bronze-2"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
