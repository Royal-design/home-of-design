import advert from "../assets/adverts/advert.png";
export const Advert = () => {
  return (
    <div className="px-[6rem] mt-[2rem] h-[10rem] w-full">
      <div className=" px-[2rem] bg-banner">
        <div className="flex items-center gap-[1rem]  h-full">
          <figure className="h-[10rem] ">
            <img
              src={advert}
              alt="advert"
              className="w-full h-full object-cover"
            />
          </figure>
          <article className="ml-[10rem] flex flex-col gap-2 font-Titillium-Web">
            <h2 className="text-base">Big Savings Alert! 🛋️</h2>
            <h3 className="text-xl">
              Get up to <span className="text-2xl">30% OFF</span> on select
              furniture
            </h3>
            <p>Upgrade your space today!</p>
          </article>
        </div>
      </div>
    </div>
  );
};
