import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/Footer";

import { useAppSelector } from "@/redux/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { toast } from "sonner";
import BreadCrumbs from "@/components/BreadCrumbs";
import { ScrollToTop } from "@/components/ScrollToTop";
import { motion } from "framer-motion";
export const ContactPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const commentSchema = z.object({
    name: z.string().min(3, { message: "name must be at least 3 characters" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    email: z
      .string({ invalid_type_error: "Must be a valid email" })
      .email({ message: "It must be a valid email" }),

    message: z.string().min(1, { message: "Message is required" })
  });

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      email: "",
      name: "",
      subject: "",
      message: ""
    }
  });

  const handleSubmit = async (userData: z.infer<typeof commentSchema>) => {
    if (user) {
      const docRef = collection(db, "messages");
      await addDoc(docRef, {
        userId: user.id,
        name: userData.name,
        subject: userData.subject,
        email: userData.email,
        message: userData.message,
        createdAt: serverTimestamp()
      });
    }
    toast.success("Message has been sent");
    window.scrollTo({ top: 0 });
    form.reset();
    try {
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <section className="h-[20rem] max-sm:h-full relative font-Titillium-Web">
        <img
          src="https://images.unsplash.com/photo-1499159058454-75067059248a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D"
          alt="hero"
          className="h-full w-full object-cover"
        />
        <article className="absolute max-sm:px-4 gap-4 inset-0 bg-banner-overlay flex-col flex items-center justify-center">
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-300 "
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg max-sm:text-base text-white max-w-3xl text-center"
          >
            We’d love to hear from you! Whether you have questions, feedback, or
            just want to say hello, feel free to reach out.
          </motion.p>
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BreadCrumbs />
          </motion.div>
        </article>
      </section>

      {/* Contact Form Section */}
      <section className="px-[6rem] py-6 max-sm:px-4  bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl mb-6 max-sm:text-2xl font-semibold space-y-4 text-center">
              Get in Touch
            </h2>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="require">Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="focus:text-lighter-color  placeholder:text-light-color border-border-line focus:border-1 duration-150"
                          placeholder="Enter your name"
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
                          className="focus:text-lighter-color  placeholder:text-light-color border-border-line  focus:border-1 duration-150"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="require">Subject</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="focus:text-lighter-color  placeholder:text-light-color border-border-line focus:border-1 duration-150"
                          placeholder="Write your query"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="require">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className=" focus:text-lighter-color h-[5rem]  placeholder:text-light-color border-border-line focus:border-1 duration-150"
                          placeholder="Leave your message..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-full text-primary transition  bg-button hover:bg-button-hover duration-200"
                >
                  {form.formState.isSubmitting
                    ? "Sending Message"
                    : "Send Message"}
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4  pb-6"
          >
            <h2 className="text-3xl mb-6 max-sm:text-2xl text-center font-semibold">
              Contact Details
            </h2>

            <div className="flex items-start gap-4">
              <FaPhoneAlt color="#f5b955" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  +234 123 456 7890
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope color="#f5b955" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  support@furniturestore.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt color="#f5b955" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  12, Victoria Island, Lagos, Nigeria
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <ScrollToTop />
      <Footer />
    </div>
  );
};
