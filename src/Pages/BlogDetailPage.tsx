import { useAppSelector } from "@/redux/store";
import { useParams } from "react-router-dom";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { motion } from "framer-motion";
import { CalendarDays, MessageCircle, Tag } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { db } from "@/firebase/firebaseConfig";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { blogs } from "@/assets/data/blogs";
import { RecentBlogs } from "@/components/RecentBlogs";
import { Footer } from "@/components/Footer";

type BlogType = (typeof blogs)[0];
export const BlogDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blogs } = useAppSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id.toString() === id);
  const { products } = useAppSelector((state) => state.products);
  const { user } = useAppSelector((state) => state.auth);
  const topProducts = products.filter((product) => product.topProduct);
  const blogCategory = blogs.map((blog) => blog.category);
  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  const commentSchema = z.object({
    firstname: z
      .string()
      .min(3, { message: "Firstname must be at least 3 characters" }),
    lastname: z
      .string()
      .min(3, { message: "Lastname must be at least 3 characters" }),
    address: z.string().min(1, { message: "Address is required" }),
    email: z
      .string({ invalid_type_error: "Must be a valid email" })
      .email({ message: "It must be a valid email" }),

    comment: z
      .string()
      .min(3, { message: "Comment must be at least 3 characters" })
  });
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      email: "",
      comment: "",
      firstname: "",
      lastname: "",
      address: ""
    }
  });

  const handleSubmit = async (userData: z.infer<typeof commentSchema>) => {
    if (user) {
      try {
        const docRef = collection(db, "comments");
        await addDoc(docRef, {
          userId: user.id,
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          blogId: blog?.id,
          content: userData.comment,
          image: user.photo,
          date: new Date().toISOString() // Standard date format
        });

        toast.success("New comment added");
        form.reset();
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error adding comment: ", error.message);
        }
      }
    }
  };

  useEffect(() => {
    if (!blog || !user) return;

    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      where("userId", "==", user.id),
      where("blogId", "==", blog.id)
    );

    // Listen for real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: `${data.firstname} ${data.lastname}`,
          date: new Date(data.date).toLocaleDateString(),
          avatar: data.image,
          comment: data.content
        };
      });

      // Update local storage with the latest comments
      localStorage.setItem(
        `hdcomments-${blog.id}`,
        JSON.stringify(fetchedComments)
      );
    });

    return () => unsubscribe();
  }, [blog, user]);

  const storedComments = JSON.parse(
    localStorage.getItem(`hdcomments-${blog?.id}`) || "[]"
  );
  const updateComments = [...(blog?.comments || []), ...storedComments];

  const handleBlogClick = (id: string) => {
    navigate(`/blogs/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (blog) {
      const viewedBlogs = JSON.parse(
        localStorage.getItem("recentBlogs") || "[]"
      );
      const updatedBlogs = viewedBlogs.filter(
        (item: BlogType) => item.id !== blog.id
      );
      updatedBlogs.unshift(blog);
      localStorage.setItem(
        "recentBlogs",
        JSON.stringify(updatedBlogs.slice(0, 5))
      );
    }
  }, [blog]);

  return (
    <div>
      <header className="h-[22rem] font-Titillium-Web relative w-full">
        <img
          src={blog?.backgroundImage}
          alt={blog?.author}
          className="h-full w-full object-cover"
        />
        <article className="absolute h-full w-full top-0 bg-banner-overlay ">
          <div className="h-full w-full flex flex-col max-sm:px-2 items-center justify-center">
            <h1 className="text-4xl max-sm:text-2xl max-sm:text-center text-white dark:text-gray-100">
              {blog?.title}
            </h1>
            <p className="text-lg text-center max-sm:px-2 text-gray-300 dark:text-gray-300 mt-4">
              {blog?.shortDescription}
            </p>
            <div className="bg-background-banner max-sm:mt-4 rounded-full px-2">
              <BreadCrumbs />
            </div>
          </div>
        </article>
      </header>
      <main className="main my-[2rem] px-8 max-sm:px-4">
        <div className="flex max-md:flex-col max-sm:flex-col gap-8">
          <section className="w-[70%] max-md:w-full max-sm:w-full flex flex-col gap-4 h-auto">
            <div className="h-[15rem] w-full">
              <img
                src={blog?.image}
                alt={blog?.author}
                className="w-full h-full object-cover"
              />
            </div>
            <article className="w-full justify-between my-[1rem] flex gap-3">
              <div className=" items-center flex   gap-2">
                <img
                  src={blog?.authorImage}
                  alt={blog?.author}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <p className="text-xs w-full">{blog?.author}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 ">
                  <CalendarDays size={20} />
                  <p className="text-xs">{blog?.date}</p>
                </div>
                <Separator
                  orientation="vertical"
                  className="border-[1px]  h-full"
                />

                <div className="flex items-center gap-2">
                  <Tag size={20} />
                  <p className="text-xs">{blog?.category}</p>
                </div>
                <Separator
                  orientation="vertical"
                  className="border-[1px] h-full"
                />

                <div className="flex items-center gap-2">
                  <MessageCircle size={20} />
                  <p className="text-xs">{updateComments.length}</p>
                </div>
              </div>
            </article>
            <div className="my-[1rem] flex flex-col gap-2">
              <h1 className="text-xl font-bold dark:text-slate-300 text-slate-700">
                {blog?.title}
              </h1>
              <Separator className="border-[1px] my-[1rem] dark:border-slate-800 border-black" />
              <p className="text-sm text-slate-700  dark:text-slate-300">
                {blog?.shortDescription}
              </p>

              <p className="leading-[2rem] text-sm text-slate-700 dark:text-slate-300">
                {blog?.longDescription}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p>TAGS:</p>
              <div className="text-black flex gap-2 flex-wrap ">
                {blog?.tags.map((tag, i) => (
                  <Button
                    className="dark:bg-slate-700 h-[1.5rem] px-2 py-1 text-xs dark:text-white dark:hover:bg-slate-600 rounded-md"
                    key={i}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
            <div className=" flex my-[1rem] gap-2 w-full h-full items-center">
              <p className="text-slate-700 dark:text-slate-300">Comments </p>
              <p className="h-5 w-5 bg-background-card text-slate-700 dark:text-slate-300 rounded-full p-2 flex items-center justify-center">
                {updateComments.length}
              </p>
            </div>
            <div className="flex flex-col gap-[1rem] w-full">
              {updateComments.length >= 1 &&
                updateComments.map((comment, i) => (
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{
                      scale: 1.01,
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-auto p-2 flex flex-col gap-2 w-full bg-transparent border-slate-700 border rounded-lg"
                    key={i}
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        src={comment.avatar}
                        alt={comment.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <article>
                        <div className="flex flex-col text-slate-700 dark:text-slate-400">
                          <p className="text-sm font-bold">{comment.name}</p>{" "}
                          <p className="text-xs">{comment.date}</p>
                        </div>
                      </article>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300">
                      {" "}
                      {comment.comment}
                    </p>
                  </motion.div>
                ))}
            </div>
            <div className="w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <Card className="bg-background overflow-hidden text-primary max-sm:w-full w-[25rem]">
                    <CardHeader>
                      <CardTitle className=" text-lg">
                        Leave a comment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1">
                      <div className="flex w-full gap-5">
                        <FormField
                          control={form.control}
                          name="firstname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="require">
                                First Name
                              </FormLabel>
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
                              <FormLabel className="require">
                                Last Name
                              </FormLabel>
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
                      </div>
                      <div className="flex w-full gap-5">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="require">Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  className="focus:border-green-400 border-primary focus:border-1 duration-150"
                                  placeholder="Enter your address"
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
                      </div>

                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="require">Comment</FormLabel>
                            <FormControl>
                              <Textarea
                                className=" focus:border-green-400 h-[5rem] border-primary focus:border-1 duration-150"
                                placeholder="Leave a comment..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter className="flex flex-col bg-background justify-center items-center">
                      <Button
                        disabled={form.formState.isLoading}
                        type="submit"
                        className="w-full text-white dark:text-primary transition  bg-slate-600 hover:bg-slate-700 duration-200"
                      >
                        Post
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </div>
          </section>
          <section className="max-sm:hidden max-md:hidden px-4">
            <RecentBlogs handleBlogClick={handleBlogClick} />
            <div className="my-[1rem]">
              <h2>Top Products</h2>
              {topProducts.map((product) => (
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                  }}
                  key={product.id}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    navigate(`/products/${product.id}`);
                  }}
                  className=""
                >
                  <div className="flex rounded-md p-2 items-center bg-background gap-2 h-auto">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="h-[3rem] rounded-full bg-banner w-[3rem] object-cover"
                    />
                    <article className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <p className="text-yellow-500">
                          {"★".repeat(product.rating)}{" "}
                          {"☆".repeat(5 - product.rating)}
                        </p>
                      </div>
                      <p className="text-xs dark:text-slate-400">
                        {product.name}
                      </p>
                    </article>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col gap-1 mt-6 bg-background-card p-1">
              <p className="dark:text-slate-300 text-lg">Blog Category</p>
              <ul className="grid grid-cols-2  gap-2 ">
                {blogCategory.map((category, i) => (
                  <li
                    key={i}
                    className="flex p-1 rounded-md bg-slate-500 text-xs text-slate-200 hover:bg-slate-600 justify-between items-center w-full"
                  >
                    <p>{category}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
