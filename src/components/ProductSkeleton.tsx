import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="card-surface flex h-full flex-col p-3 sm:p-4">
      <Skeleton className="card-media aspect-[4/5] w-full rounded-none" />
      <div className="mt-4 space-y-3 px-1 pb-1 sm:px-0.5">
        <Skeleton className="h-2.5 w-24 rounded-none bg-ink-3/25" />
        <Skeleton className="h-4 w-3/4 rounded-none bg-ink-3/25" />
        <Skeleton className="h-3 w-16 rounded-none bg-ink-3/25" />
      </div>
    </div>
  );
};
