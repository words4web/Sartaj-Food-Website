import { Skeleton } from "./Skeleton";

export function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-full border border-border bg-card shrink-0 w-[150px] h-[150px] p-4">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-3.5 w-16 rounded" />
      <Skeleton className="h-3 w-10 rounded" />
    </div>
  );
}

export function CategoryCarouselSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="flex gap-6 overflow-x-hidden pb-4">
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}
