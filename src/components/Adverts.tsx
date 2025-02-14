import { Card } from "./ui/card";
import advert1 from "../assets/adverts/advert1.png";
import advert2 from "../assets/adverts/advert2.webp";
import { Button } from "./ui/button";

const advertData = [
  {
    id: 1,
    title: "Modern Elegance Chairs",
    description:
      "Upgrade your space with our sleek and comfortable modern living room set. Limited time 30% discount!",
    imageUrl: advert1,
    ctaText: "Shop Now!",
    backgroundColor: "#eed362"
  },
  {
    id: 2,
    title: "Stylish Office Chairs",
    description:
      "Experience all-day comfort and style with our ergonomic office chairs. Buy one, get 10% off your next purchase!",
    imageUrl: advert2,
    ctaText: "Shop Now!",
    backgroundColor: "#aaf9fe"
  }
];
export const Adverts = () => {
  return (
    <div className="px-[6rem] h-auto max-sm:px-[1rem] w-full mt-[3rem]">
      <div className="grid grid-cols-2 gap-4 max-sm:gap-3 w-full h-full max-sm:grid-cols-1  ">
        {advertData.map((advert) => (
          <Card
            key={advert.id}
            style={{ backgroundColor: advert.backgroundColor }}
            className={`p-0 border-none w-[520px] max-sm:h-[200px]  h-[250px] max-sm:w-full shadow-none  overflow-hidden rounded-none`}
          >
            <div className="flex p-3 w-full h-full">
              <div className="flex flex-col gap-2 w-full justify-center p-4 max-sm:p-2">
                <h1 className="text-lg max-sm:text-base  font-bold">
                  {advert.title}
                </h1>
                <p className="text-sm max-sm:text-xs">{advert.description}</p>
                <div className="">
                  <Button className="bg-slate-600 hover:bg-slate-700 duration-200 text-white mt-4 px-4 py-2">
                    {advert.ctaText}
                  </Button>
                </div>
              </div>

              <figure className="h-full w-full">
                <img
                  src={advert.imageUrl}
                  alt={advert.title}
                  className="h-full w-full"
                />
              </figure>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
