import advert from "../assets/adverts/advert.png";
export const Advert = () => {
  return (
    <div className="px-[6rem] max-md:px-4 max-lg:px-8 max-sm:px-[1rem] mt-[2rem]  h-[10rem] max-sm:h-full w-full">
      <div className=" px-[2rem] bg-banner">
        <div className="flex items-center gap-[1rem]  h-full">
          <figure className="h-[10rem] max-sm:w-full max-sm:h-full">
            <img
              src={advert}
              alt="advert"
              className="w-full h-full object-cover"
            />
          </figure>
          <article className="ml-[10rem] max-sm:ml-0 max-md:ml-16 max-lg:ml-16 flex flex-col gap-2 font-Titillium-Web">
            <h2 className="text-base max-sm:text-sm">Big Savings Alert! 🛋️</h2>
            <h3 className="text-xl max-sm:text-base">
              Get up to <span className="text-2xl max-sm:text-lg">30% OFF</span>{" "}
              on select furniture
            </h3>
            <p className="max-sm:text-sm">Upgrade your space today!</p>
          </article>
        </div>
      </div>
    </div>
  );
};
