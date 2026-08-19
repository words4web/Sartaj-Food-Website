import { Skeleton } from "./Skeleton";

export function BundleCardSkeleton() {
  return (
    <div className="flex flex-col bg-card border border-border/40 rounded-2xl overflow-hidden animate-pulse h-full shadow-sm">
      <div className="p-4 bg-muted/20 border-b border-border/40 flex items-center justify-between gap-3">
        <div className="flex flex-col items-center flex-1">
          <Skeleton className="w-16 h-16 rounded-xl" />
          <Skeleton className="h-3 w-16 mt-2 rounded" />
          <Skeleton className="h-4 w-10 mt-1 rounded" />
        </div>

        <div className="text-muted-foreground/30 font-bold text-lg shrink-0">+</div>

        <div className="flex flex-col items-center flex-1">
          <Skeleton className="w-16 h-16 rounded-xl" />
          <Skeleton className="h-3 w-16 mt-2 rounded" />
          <Skeleton className="h-4 w-10 mt-1 rounded" />
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-grow">
        <div className="space-y-2">
          <Skeleton className="h-4.5 w-3/4 rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-5/6 rounded" />
        </div>

        <div className="flex items-center justify-between bg-muted/30 rounded-xl px-3 py-2.5 border border-border/40">
          <div className="space-y-1.5">
            <Skeleton className="h-2.5 w-8 rounded" />
            <Skeleton className="h-4 w-12 rounded" />
          </div>
          <div className="w-px h-8 bg-border/60 mx-2" />
          <div className="space-y-1.5 flex flex-col items-end">
            <Skeleton className="h-2.5 w-16 rounded" />
            <Skeleton className="h-4.5 w-14 rounded" />
          </div>
        </div>

        <Skeleton className="h-10 w-full rounded-xl mt-auto" />
      </div>
    </div>
  );
}

export function BundleSectionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BundleCardSkeleton key={i} />
      ))}
    </div>
  );
}
