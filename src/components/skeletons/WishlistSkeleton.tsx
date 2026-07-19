import { Skeleton } from "./Skeleton";

export function WishlistSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-lg border border-border p-4 flex flex-col h-full space-y-4"
          >
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
        ))}
      </div>
    </div>
  );
}
