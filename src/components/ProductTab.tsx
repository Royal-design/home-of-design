import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { data } from "@/assets/data/data";
import { cn } from "@/lib/utils";

interface PropsType {
  product: (typeof data.products)[0];
}

export const ProductTab = ({ product }: PropsType) => {
  const [rating, setRating] = useState(0);

  const handleClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="flex w-full justify-start gap-8 border-b border-line bg-transparent">
        {[
          ["description", "Description"],
          ["additionalinfo", "Details"],
          ["review", `Reviews (${product.reviews.length})`]
        ].map(([value, label]) => (
          <TabsTrigger
            key={value}
            value={value}
            className="relative pb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-3 data-[state=active]:text-ink"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="description">
        <Card className="border-0 border-b border-line bg-transparent shadow-none">
          <CardContent className="px-0 py-10">
            <p className="max-w-3xl text-[15px] leading-relaxed text-ink-2">
              {product.description}
            </p>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-2">
              Designed in-house and built to outlive trends, this piece is
              finished by hand and ready to be lived on.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="additionalinfo">
        <Card className="border-0 border-b border-line bg-transparent shadow-none">
          <CardContent className="px-0 py-10">
            {product.additionalInformation ? (
              <dl className="max-w-3xl">
                {Object.entries(product.additionalInformation).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-8"
                    >
                      <dt className="eyebrow w-44 shrink-0 capitalize text-ink-3">
                        {key.replace(/([A-Z])/g, " $1")}
                      </dt>
                      <dd className="text-sm text-ink">
                        {Array.isArray(value) ? value.join(" · ") : value}
                      </dd>
                    </div>
                  )
                )}
              </dl>
            ) : (
              <p className="text-sm text-ink-3">No additional information.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="review">
        <div className="grid gap-10 py-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl text-ink">
              What people say
            </h3>
            <ul className="mt-6 space-y-5">
              {product.reviews.map((review, index) => (
                <li
                  key={index}
                  className="border border-line bg-paper-2/50 p-5"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={review.image}
                      alt={review.user}
                      className="h-9 w-9 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm font-medium text-ink">{review.user}</p>
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink-3">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    {review.comment}
                  </p>
                  <p className="mt-2 text-sm text-bronze">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-line bg-paper-2/50 p-7">
            <p className="font-display text-2xl text-ink">
              Leave a review
            </p>
            <div className="mt-4 flex items-center gap-3">
              <p className="eyebrow text-ink-3">Your rating</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleClick(index)}
                    aria-label={`Rate ${index + 1} star${index === 0 ? "" : "s"}`}
                    className={cn(
                      "cursor-pointer text-lg transition-colors",
                      index < rating ? "text-bronze" : "text-ink-3/40"
                    )}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <form className="mt-6 flex flex-col gap-5">
              <div className="grid gap-4">
                <Label htmlFor="review-desc" className="eyebrow text-ink-2">
                  Description
                </Label>
                <Textarea
                  id="review-desc"
                  className="min-h-[8rem] rounded-none border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="review-name" className="eyebrow text-ink-2">
                  Name
                </Label>
                <Input
                  id="review-name"
                  placeholder="Your name"
                  className="h-11 rounded-none border-line bg-paper px-4 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0"
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="review-email" className="eyebrow text-ink-2">
                  Email
                </Label>
                <Input
                  id="review-email"
                  placeholder="you@example.com"
                  type="email"
                  className="h-11 rounded-none border-line bg-paper px-4 text-sm text-ink placeholder:text-ink-3 focus:border-bronze focus:ring-0"
                />
              </div>
              <label className="flex items-start gap-3 text-xs text-ink-2">
                <Checkbox id="review-save" className="mt-0.5" />
                Save my details for next time.
              </label>
              <button type="button" className="btn-primary w-full sm:w-auto">
                Submit review
              </button>
            </form>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};
