import { Skeleton } from "./ui/skeleton";

export const BlogSkeleton = () => {
  return (
    <div className="flex gap-2 items-center space-y-3">
      <Skeleton className="h-[40px] w-[40px] rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-[100px]" />
        <Skeleton className="h-2 w-[200px]" />
      </div>
    </div>
  );
};
