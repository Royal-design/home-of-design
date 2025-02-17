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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../assets/logo.png";
import { useAppDispatch } from "@/redux/store";
import { loginUser, loginWithGoogle } from "@/redux/slice/authSlice";
import { FormEvent } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

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

  return (
    <div className=" bg-background max-sm:p-4  max-sm:w-full text-primary justify-center flex  items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-sm:w-full"
        >
          <Card className="p-0 py-2 bg-background max-sm:shadow-none max-sm:border-none text-primary w-[25rem]  max-sm:w-full ">
            <CardHeader className=" p-0 flex items-center my-8 justify-center">
              <img src={logo} className="w-[3rem] " />
              <CardTitle className="text-xl text-center">Login </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="focus:border-green-400 focus:border-1 border-primary duration-150"
                        placeholder="Enter a valid email"
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
                    <FormLabel className="require">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className=" focus:border-green-400 border-primary focus:border-1 duration-150"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col w-full gap-3 items-center">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full text-white dark:text-primary bg-slate-600 hover:bg-slate-700 duration-200 hover:outline-green-500 hover:outline-1 outline outline-1"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  `Sign in`
                )}
              </Button>

              <div className="flex items-center justify-center gap-6 w-full">
                <Separator className="w-[100px] max-sm:w-[60px]" />
                <p className="text-center text-sm mb-2">Or With</p>
                <Separator className="w-[100px] max-sm:w-[60px]" />
              </div>

              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                onClick={handleGoogleLogin}
                variant="ghost"
                className="w-full  border-2"
              >
                <div className="items-center  flex text-black">
                  <img src={googleImage} className="w-[2rem]" />
                  <p>Google</p>
                </div>
              </Button>
              <p className="text-center text-sm mt-2">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-500 transition"
                >
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
