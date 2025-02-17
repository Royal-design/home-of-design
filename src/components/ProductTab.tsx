import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { data } from "@/assets/data/data";

interface PropsType {
  product: (typeof data.products)[0];
}
export const ProductTab = ({ product }: PropsType) => {
  const [rating, setRating] = useState(0);

  const handleClick = (index: number) => {
    setRating(index + 1);
    console.log(rating);
  };
  return (
    <Tabs
      defaultValue="description"
      className="w-full max-sm:p-[1rem] px-[6rem] max-lg:p-8 max-md:p-4  my-[4rem] "
    >
      <TabsList className="w-full bg-banner max-sm:flex max-sm:justify-between">
        <TabsTrigger value="description" className="w-full max-sm:text-sm">
          Description
        </TabsTrigger>
        <TabsTrigger value="additionalinfo" className="w-full max-sm:text-sm">
          Additional Information
        </TabsTrigger>
        <TabsTrigger
          value="review"
          className="w-full max-sm:text-sm"
        >{`Reviews [${product.reviews.length}]`}</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <Card className="bg-banner">
          <CardHeader className="py-2">
            <CardTitle className="text-lg max-sm:text-base">
              {product.name}
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="">
              <p className="mb-2">{product.description}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="additionalinfo">
        <Card className="bg-banner">
          <CardHeader className="py-2">
            <CardTitle className="text-lg max-sm:text-base">
              Additional Information
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="">
            {product.additionalInformation ? (
              <ul className="flex flex-col gap-4">
                {Object.entries(product.additionalInformation).map(
                  ([key, value]) => (
                    <div key={key}>
                      {Array.isArray(value) ? (
                        <div className="flex gap-2">
                          <strong>{key}:</strong>{" "}
                          <ul className="flex gap-2">
                            {value.map((item, index) => (
                              <div key={index} className="flex gap-2">
                                <li>{item} </li>
                                {index < value.length - 1 && (
                                  <Separator
                                    orientation="vertical"
                                    className=""
                                  />
                                )}
                              </div>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="">
                          <strong>{key}: </strong> <span>{value}</span>
                        </div>
                      )}
                    </div>
                  )
                )}
              </ul>
            ) : (
              <p>No additional information available.</p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="review">
        <p className="text-lg mb-2 max-sm:text-base">Reviews</p>
        {product.reviews.map((review, index) => (
          <Card key={index} className="border p-2 bg-banner  mb-2  shadow-sm">
            <CardHeader className="py-0">
              <CardTitle />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <img
                  src={review.image}
                  alt={review.user}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{review.user}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <p className="mt-2 text-sm">{review.comment}</p>
              <p className="text-yellow-500">
                {"★".repeat(review.rating)} {"☆".repeat(5 - review.rating)}
              </p>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-banner">
          <CardHeader className="py-0">
            <CardTitle />
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="">
            <div className="">
              <p className="font-bold">Be the first to review</p>
              <div className="flex gap-2 mb-2">
                <p>Your rating</p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleClick(index)}
                      className={`text-lg ${
                        index < rating ? "text-yellow-500" : "text-gray-300"
                      } focus:outline-none`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <form className="flex flex-col gap-2">
                <div className="gap-4 grid mb-4">
                  <Label htmlFor="description" className="require">
                    Description
                  </Label>
                  <Textarea id="description" className="h-[10rem]" />
                </div>
                <div className="gap-4 grid mb-4">
                  <Label htmlFor="name" className="require">
                    Name
                  </Label>
                  <Input id="name" placeholder="Name" />
                </div>
                <div className="gap-4 grid">
                  <Label htmlFor="email" className="require">
                    Email Address
                  </Label>
                  <Input id="email" placeholder="Email" />
                </div>
                <div className="gap-2 mt-4 items-center flex">
                  <Checkbox id="check" />
                  <Label htmlFor="check">
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </Label>
                </div>
                <Button className="w-[5rem] mt-4">Submit</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
