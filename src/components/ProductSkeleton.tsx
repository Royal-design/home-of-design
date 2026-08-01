import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="aspect-[4/5] w-full rounded-none bg-paper-2" />
      <div className="mt-4 space-y-3">
        <Skeleton className="h-2.5 w-24 rounded-none bg-paper-2" />
        <Skeleton className="h-4 w-3/4 rounded-none bg-paper-2" />
        <Skeleton className="h-3 w-16 rounded-none bg-paper-2" />
      </div>
    </div>
  );
};
