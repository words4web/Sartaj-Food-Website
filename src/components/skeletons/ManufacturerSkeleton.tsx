import { Skeleton } from "./Skeleton";

export function ManufacturerCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-2xl w-full h-[120px] animate-pulse">
      <Skeleton className="h-16 w-16 rounded-full mb-2 bg-muted-foreground/10" />
      <Skeleton className="h-4 w-20 rounded bg-muted-foreground/10" />
    </div>
  );
}

export function ManufacturerGridSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center w-full">
      {Array.from({ length: count }).map((_, index) => (
        <ManufacturerCardSkeleton key={index} />
      ))}
    </div>
  );
}
