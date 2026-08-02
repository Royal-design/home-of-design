import { blogs } from "@/assets/data/blogs";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { RecentBlogs } from "@/components/RecentBlogs";
import { Reveal } from "@/components/Reveal";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BlogFilter } from "@/components/ui/BlogFilter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase/firebaseConfig";
import { useAppSelector } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { CalendarDays, MessageCircle, Tag } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

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
      .min(3, { message: "Comment must be at least 3 characters" }),
  });

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      email: "",
      comment: "",
      firstname: "",
      lastname: "",
      address: "",
    },
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
          date: new Date().toISOString(),
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
      where("blogId", "==", blog.id),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: `${data.firstname} ${data.lastname}`,
          date: new Date(data.date).toLocaleDateString(),
          avatar: data.image,
          comment: data.content,
        };
      });
      localStorage.setItem(
        `hdcomments-${blog.id}`,
        JSON.stringify(fetchedComments),
      );
    });

    return () => unsubscribe();
  }, [blog, user]);

  const storedComments = JSON.parse(
    localStorage.getItem(`hdcomments-${blog?.id}`) || "[]",
  );
  const updateComments = [...(blog?.comments || []), ...storedComments];

  const handleBlogClick = (id: string) => {
    navigate(`/blogs/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (blog) {
      const viewedBlogs = JSON.parse(
        localStorage.getItem("recentBlogs") || "[]",
      );
      const updatedBlogs = viewedBlogs.filter(
        (item: BlogType) => item.id !== blog.id,
      );
      updatedBlogs.unshift(blog);
      localStorage.setItem(
        "recentBlogs",
        JSON.stringify(updatedBlogs.slice(0, 5)),
      );
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-paper px-5">
        <div className="text-center">
          <p className="font-display text-3xl text-ink">Note not found</p>
          <Link to="/blogs" className="btn-outline mt-6 inline-flex">
            Back to the journal
          </Link>
        </div>
      </div>
    );
  }

  const fieldClass =
    "h-11 rounded-none border-line bg-paper px-4 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0";

  return (
    <div className="bg-paper">
      <header className="relative flex min-h-[60vh] items-end overflow-hidden">
        <img
          src={blog.backgroundImage}
          alt=""
          aria-hidden="true"
          className="fade-img absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="page-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-12 sm:px-6">
          <Reveal>
            <p className="eyebrow text-[#f9d171]">{blog.category}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl">
              {blog.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#f9d171]">
              {blog.shortDescription}
            </p>
            <div className="mt-6 text-[#f9d171]">
              <BreadCrumbs />
            </div>
          </Reveal>
        </div>
      </header>

      <main className="mx-auto max-w-shell px-5 py-14 sm:px-6 sm:py-20">
        <div className="lg:hidden">
          <BlogFilter
            blogCategory={blogCategory}
            handleBlogClick={handleBlogClick}
            topProducts={topProducts}
          />
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <article>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line pb-6">
              <div className="flex items-center gap-3">
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <p className="text-sm text-ink">{blog.author}</p>
              </div>
              <div className="flex items-center gap-2 text-ink-3">
                <CalendarDays size={15} strokeWidth={1.5} />
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em]">
                  {blog.date}
                </p>
              </div>
              <div className="flex items-center gap-2 text-ink-3">
                <Tag size={15} strokeWidth={1.5} />
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em]">
                  {blog.category}
                </p>
              </div>
              <div className="flex items-center gap-2 text-ink-3">
                <MessageCircle size={15} strokeWidth={1.5} />
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em]">
                  {updateComments.length}
                </p>
              </div>
            </div>

            <div className="card-media mt-8 aspect-[16/9] overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="fade-img h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <p className="mt-8 text-lg leading-[1.9] text-ink-2">
              {blog.shortDescription}
            </p>
            <p className="mt-6 text-[15px] leading-[1.9] text-ink-2">
              {blog.longDescription}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
              <p className="eyebrow text-ink-3">Tags</p>
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="border border-line px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            <section className="mt-14">
              <h2 className="font-display text-3xl text-ink">
                Comments{" "}
                <span className="font-mono text-base text-ink-3">
                  ({updateComments.length})
                </span>
              </h2>

              <div className="mt-8 space-y-5">
                {updateComments.map((comment, i) => (
                  <div key={i} className="card-surface p-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={comment.avatar}
                        alt={comment.name}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-ink">
                          {comment.name}
                        </p>
                        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-3">
                          {comment.date}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>

              <div className="card-surface mt-12 p-7 sm:p-9">
                <h3 className="font-display text-2xl text-ink">
                  Leave a comment
                </h3>
                {!user && (
                  <p className="mt-3 text-sm text-ink-2">
                    Please{" "}
                    <Link
                      to="/login"
                      className="text-bronze underline underline-offset-4"
                    >
                      sign in
                    </Link>{" "}
                    to join the conversation.
                  </p>
                )}
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Card className="border-0 bg-transparent shadow-none">
                      <CardContent className="space-y-5 p-0">
                        <div className="grid gap-5 sm:grid-cols-2">
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
                        <div className="grid gap-5 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="eyebrow text-ink-2">
                                  Address
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    className={fieldClass}
                                    placeholder="Your address"
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
                                <FormLabel className="eyebrow text-ink-2">
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    className={fieldClass}
                                    placeholder="you@example.com"
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
                              <FormLabel className="eyebrow text-ink-2">
                                Comment
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  className="min-h-[8rem] rounded-none border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0"
                                  placeholder="Your thoughts…"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                      <CardFooter className="px-0 pt-6">
                        <button
                          type="submit"
                          disabled={form.formState.isSubmitting}
                          className="btn-primary w-full sm:w-auto"
                        >
                          {form.formState.isSubmitting
                            ? "Posting…"
                            : "Post comment"}
                        </button>
                      </CardFooter>
                    </Card>
                  </form>
                </Form>
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-10">
              <RecentBlogs handleBlogClick={handleBlogClick} />
              <div>
                <p className="eyebrow text-ink-3">Top pieces</p>
                <div className="mt-5 space-y-3">
                  {topProducts.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="card-surface group flex w-full cursor-pointer items-center gap-3 p-3 text-left transition-colors hover:border-bronze"
                    >
                      <span className="card-media flex h-14 w-14 shrink-0 items-center justify-center">
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-ink">
                          {product.name}
                        </span>
                        <span className="eyebrow mt-1 block text-bronze">
                          {product.category}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
};
