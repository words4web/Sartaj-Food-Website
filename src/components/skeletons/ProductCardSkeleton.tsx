import { Skeleton } from "./Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-lg border border-border p-4 flex flex-col h-full space-y-4">
      <Skeleton className="aspect-square w-full rounded-md" />
      <div className="space-y-2 flex-grow">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-5 w-3/4" />
      </div>
      <div className="space-y-3 pt-2">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
  columnsClass?: string;
  scrollable?: boolean;
}

export function ProductGridSkeleton({
  count = 5,
  columnsClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  scrollable = false,
}: ProductGridSkeletonProps) {
  if (scrollable) {
    return (
      <div className="flex gap-6 overflow-x-hidden pb-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="w-[240px] sm:w-[280px] shrink-0">
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${columnsClass} gap-6`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
