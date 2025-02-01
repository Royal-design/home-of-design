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
      <div className="px-[6rem] max-sm:px-4 max-sm:mt-[2rem]  mt-[2rem]">
        <div className="">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 w-full justify-between">
              <Separator className="w-[400px]  border" />
              <h1 className="text-2xl font-bold text-center">Our Partners</h1>
              <Separator className="w-[400px] border" />
            </div>
            <p className="text-center text-sm">
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
