import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import partner1 from "../assets/partners/partner1.png";
import partner2 from "../assets/partners/partner2.png";
import partner3 from "../assets/partners/partner3.png";
import partner4 from "../assets/partners/partner4.png";
import partner5 from "../assets/partners/partner5.png";
import { Separator } from "./ui/separator";

const partners = [
  { image: <img src={partner1} className="w-[5rem] max-sm:w-[3rem]" /> },
  { image: <img src={partner2} className="w-[5rem] max-sm:w-[3rem]" /> },
  { image: <img src={partner3} className="w-[5rem] max-sm:w-[3rem]" /> },
  { image: <img src={partner4} className="w-[5rem] max-sm:w-[3rem]" /> },
  { image: <img src={partner5} className="w-[5rem] max-sm:w-[3rem]" /> }
];
export const PartnerInfiniteCard = () => {
  return (
    <div className="">
      <div className="px-[6rem] max-md:px-4 max-lg:px-8 max-sm:px-[1rem] my-[2rem] max-sm:mb-[1rem]">
        <div className="">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 w-full justify-between">
              <Separator className="flex-1" />
              <h1 className="text-3xl max-sm:text-2xl font-bold text-center">
                Our Partners
              </h1>
              <Separator className="flex-1" />
            </div>
            <p className="text-center text-base max-sm:text-sm leading-[150%]">
              Collaborating with the best to bring you quality and style. Our
              trusted partners share our commitment to craftsmanship,
              sustainability, and exceptional design.
            </p>
          </div>
        </div>
      </div>
      <div className=" rounded-md flex flex-col antialiased bg-background  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards items={partners} direction="right" speed="slow" />
      </div>
    </div>
  );
};
