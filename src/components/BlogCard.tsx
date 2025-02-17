import { blogs } from "@/assets/data/blogs";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";
import { CiCalendar } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  blog: (typeof blogs)[0];
}
export const BlogCard = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blogs/${blog.id}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, border: "1px solid yellow" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1
      }}
    >
      <Card className="max-w-sm w-full bg-background border h-full shadow-none  overflow-hidden rounded-none">
        <CardHeader className="p-0">
          <CardTitle />
        </CardHeader>
        <CardContent className="bg-banner p-0">
          <figure className="h-[150px] w-full">
            <img src={blog.image} alt={blog.title} className="h-full w-full " />
          </figure>
        </CardContent>
        <CardFooter className="flex px-2 max-sm:px-1 flex-col pb-2 gap-2 items-start">
          <div className="flex gap-2 h-[2rem] justify-between w-full items-center ">
            <div className="flex gap-1 mt-1 items-center">
              <CiCalendar size={12} />
              <p className="text-xs max-sm:text-[10px] text-slate-400">
                {blog.date}
              </p>
            </div>

            <div className="flex gap-1 items-center">
              <p className="size-1 rounded-full bg-slate-400"></p>
              <p className="text-xs max-sm:text-[10px] text-slate-400">
                {blog.category}
              </p>
            </div>
          </div>
          <div className="h-[3rem] max-sm:h-auto">
            <p className="text-sm max-sm:text-xs font-bold">{blog.title}</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <FaRegCommentDots size={12} className="text-slate-500" />
              <p className="text-xs text-slate-500">{blog.comments.length}</p>
            </div>
            <div className="flex  items-center gap-1">
              <img
                src={blog.authorImage}
                className="size-4 rounded-full"
                alt={blog.author}
              />
              <p className="text-xs text-slate-500">{blog.author}</p>
            </div>
          </div>
          <Button
            className="h-[30px] max-sm:w-full bg-button text-primary hover:bg-button-hover duration-200 max-sm:mt-5"
            onClick={handleClick}
          >
            Read More
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
