import { Skeleton } from "./Skeleton";

export function ManufacturerCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-card border border-border/80 rounded-2xl w-full h-full animate-pulse">
      <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-full mb-2" />
      <Skeleton className="h-4 w-20 rounded" />
    </div>
  );
}

export function ManufacturerGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="flex items-center gap-6 sm:gap-8 overflow-x-hidden py-4 px-2 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex-shrink-0 w-36 sm:w-44 h-28 sm:h-32">
          <ManufacturerCardSkeleton />
        </div>
      ))}
    </div>
  );
}
