import { data } from "@/assets/data/data";
import { motion } from "framer-motion";

export const Category = () => {
  const categories = data.categories;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="h-auto px-[6rem] max-md:px-4 max-md:-mt-8 max-lg:px-8 absolute max-sm:static max-sm:px-[1rem] mt-[-4rem] max-sm:mt-0  w-full flex justify-center">
        <div className=" bg-background w-full">
          <div className="flex gap-4 p-6 max-sm:p-2 w-full justify-between items-center">
            {categories.map((category) => (
              <motion.div
                whileHover={{ scale: 1.1, border: "1px solid yellow" }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className=" h-[6rem] max-sm:h-[3rem] max-sm:w-[8rem] w-[8rem] "
                key={category.id}
              >
                <div className="relative bg-banner  h-full w-full">
                  <figure className="h-full p-2  w-full justify-center flex items-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </figure>

                  <div className="absolute flex justify-center items-center h-full w-full top-0">
                    <div className="bg-banner opacity-[0.8] px-2 max-sm:px-1">
                      <p className="text-center text-[10px] text-primary">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
