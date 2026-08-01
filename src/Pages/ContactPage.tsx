import contactHero from "@/assets/banner/contact-hero.webp";
import BreadCrumbs from "@/components/BreadCrumbs";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ScrollToTop } from "@/components/ScrollToTop";
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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ContactPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const commentSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    email: z
      .string({ invalid_type_error: "Must be a valid email" })
      .email({ message: "It must be a valid email" }),
    message: z.string().min(1, { message: "Message is required" }),
  });

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      email: "",
      name: "",
      subject: "",
      message: "",
    },
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
        createdAt: serverTimestamp(),
      });
    }
    toast.success("Message has been sent");
    form.reset();
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const details = [
    {
      icon: <Phone size={18} strokeWidth={1.25} />,
      label: "Phone",
      value: "+234 123 456 7890",
    },
    {
      icon: <Mail size={18} strokeWidth={1.25} />,
      label: "Email",
      value: "atelier@homeofdesign.com",
    },
    {
      icon: <MapPin size={18} strokeWidth={1.25} />,
      label: "Studio",
      value: "1 Design District, Lagos",
    },
  ];

  return (
    <div className="bg-paper">
      <section className="relative flex h-[52vh] min-h-[24rem] items-end overflow-hidden">
        <img
          src={contactHero}
          alt="A calm, naturally lit interior"
          className="fade-img absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="page-scrim" />
        <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-14 sm:px-6">
          <Reveal>
            <p className="eyebrow text-white">Contact</p>
            <h1 className="mt-4 font-display text-5xl tracking-tight text-[#f9d171] sm:text-7xl">
              Let’s talk.
            </h1>
            <div className="mt-6 text-paper/70">
              <BreadCrumbs />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-ink-3">Write to us</p>
              <h2 className="mt-5 font-display text-4xl tracking-tight text-ink">
                Questions, commissions,{" "}
                <em className="italic text-bronze">hello.</em>
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-2">
                Whether you’re planning a room, commissioning a piece, or just
                curious about how we work — we answer everything ourselves.
              </p>

              <div className="mt-12 space-y-8">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-bronze text-bronze">
                      {d.icon}
                    </span>
                    <div>
                      <p className="eyebrow text-ink-3">{d.label}</p>
                      <p className="mt-1 text-sm text-ink">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-12 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-3">
                Tues — Sat, 10:00 — 18:00
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <Form {...form}>
                <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="eyebrow text-ink-2">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              className="h-12 rounded-none border-line bg-paper-2/50 px-4 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0"
                              placeholder="Your name"
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
                              className="h-12 rounded-none border-line bg-paper-2/50 px-4 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0"
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="eyebrow text-ink-2">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="h-12 rounded-none border-line bg-paper-2/50 px-4 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0"
                            placeholder="How can we help?"
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
                        <FormLabel className="eyebrow text-ink-2">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[10rem] rounded-none border-line bg-paper-2/50 px-4 py-4 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0"
                            placeholder="Tell us about your space…"
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
                    className="btn-primary w-full sm:w-auto"
                  >
                    {form.formState.isSubmitting ? "Sending…" : "Send message"}
                    <ArrowRight size={14} />
                  </button>
                </form>
              </Form>
            </Reveal>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <Footer />
    </div>
  );
};
