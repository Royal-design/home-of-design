import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/redux/store";
import { registerUser } from "@/redux/slice/authSlice";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const userSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Firstname must be at least 3 characters" }),
  lastname: z
    .string()
    .min(3, { message: "Lastname must be at least 3 characters" }),
  email: z
    .string({ invalid_type_error: "Must be a valid email" })
    .email({ message: "It must be a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
});

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    }
  });

  const handleSubmit = async (userData: z.infer<typeof userSchema>) => {
    const response = await dispatch(
      registerUser(
        userData.email,
        userData.password,
        userData.firstname,
        userData.lastname
      )
    );

    if (response.success) {
      form.reset();
      navigate("/");
      toast.success("User registered successfully");
    } else {
      toast.error(response.message || "Registration failed");
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
          <p className="eyebrow text-bronze">Join the house</p>
          <h1 className="mt-6 max-w-md font-display text-5xl leading-[1.05] tracking-tight">
            An account, for the pieces <em className="italic text-bronze">you keep.</em>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/70">
            Save to your wishlist, revisit recently viewed pieces and move
            through checkout in seconds.
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
            Create your account
          </h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="mt-10 space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="eyebrow text-ink-2">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className={fieldClass}
                          placeholder="Jane"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="eyebrow text-ink-2">
                        Last name
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className={fieldClass}
                          placeholder="Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        placeholder="6+ characters"
                        autoComplete="new-password"
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
                {form.formState.isSubmitting ? "Creating…" : "Create account"}
                <ArrowRight size={14} />
              </button>
            </form>
          </Form>

          <p className="mt-8 text-center text-sm text-ink-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-bronze underline underline-offset-4 transition-colors hover:text-bronze-2"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
