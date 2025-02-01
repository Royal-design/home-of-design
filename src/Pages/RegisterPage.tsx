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
import { registerUser } from "@/redux/slice/authSlice";
import { toast } from "sonner";

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
    try {
      await dispatch(
        registerUser(
          userData.email,
          userData.password,
          userData.firstname,
          userData.lastname
        )
      );
      form.reset();
      navigate("/");
      toast.success("User registered successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="bg-background max-sm:px-4 flex justify-center w-full items-center h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-sm:w-full"
        >
          <Card className="bg-background max-sm:shadow-none max-sm:border-none overflow-hidden max-sm:w-full text-primary w-[25rem]">
            <CardHeader className="flex items-center justify-center">
              <img src={logo} className="w-[2rem]" />
              <CardTitle className="text-center text-base">
                Create your account
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:border-green-400 border-primary focus:border-1 duration-150"
                        placeholder="Enter your firstname"
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
                    <FormLabel className="require">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:border-green-400 border-primary focus:border-1 duration-150"
                        placeholder="Enter your lastname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="focus:border-green-400 border-primary focus:border-1 duration-150"
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
            <CardFooter className="flex flex-col bg-background  justify-center items-center">
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="w-full text-white dark:text-primary transition  bg-slate-600 hover:bg-slate-700 duration-200"
              >
                Register
              </Button>
              <p className="text-primary text-sm mt-2">
                {" "}
                You have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 text-sm hover:text-blue-500 transition"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};
