import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-sm" />
      <div className="space-y-4">
        <Skeleton className="h-2 w-[200px]" />
        <Skeleton className="h-2 w-[200px]" />
        <Skeleton className="h-2 w-[250px]" />
      </div>
    </div>
  );
};
