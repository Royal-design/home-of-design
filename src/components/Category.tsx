import { data } from "@/assets/data/data";
export const Category = () => {
  const categories = data.categories;
  console.log(categories);

  return (
    <div className="h-auto px-[6rem] absolute mt-[-4rem]  w-full flex justify-center">
      <div className=" bg-background w-full">
        <div className="flex gap-4 p-6 w-full justify-between items-center">
          {categories.map((category) => (
            <div className="  h-[6rem] w-[8rem] " key={category.id}>
              <div className="relative bg-banner  h-full w-full">
                <figure className="h-full p-2  w-full justify-center flex items-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </figure>

                <div className="absolute flex justify-center items-center h-full w-full top-0">
                  <div className="bg-white opacity-[0.6] px-2">
                    <p className="text-center text-xs text-black">
                      {category.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
