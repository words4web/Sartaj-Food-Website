import { Skeleton } from "./Skeleton";

export function TestimonialCardSkeleton() {
  return (
    <div className="bg-card border border-border/40 rounded-3xl p-6 sm:p-8 space-y-6 animate-pulse">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-2xl bg-muted-foreground/10" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-28 bg-muted-foreground/10" />
          <Skeleton className="h-3 w-36 bg-muted-foreground/10" />
        </div>
      </div>
      <div className="space-y-2.5">
        <Skeleton className="h-3 w-full bg-muted-foreground/10" />
        <Skeleton className="h-3 w-[90%] bg-muted-foreground/10" />
        <Skeleton className="h-3 w-[85%] bg-muted-foreground/10" />
      </div>
      <div className="flex gap-1 pt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-4.5 h-4.5 rounded-full bg-muted-foreground/10" />
        ))}
      </div>
    </div>
  );
}

export function TestimonialGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <TestimonialCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function TestimonialSliderSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-card border border-border/40 rounded-3xl p-6 sm:p-10 md:p-12 space-y-6 animate-pulse relative">
        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-2xl bg-muted-foreground/10" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-36 bg-muted-foreground/10" />
            <Skeleton className="h-3.5 w-48 bg-muted-foreground/10" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-full bg-muted-foreground/10" />
          <Skeleton className="h-4 w-[92%] bg-muted-foreground/10" />
          <Skeleton className="h-4 w-[85%] bg-muted-foreground/10" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-border/40">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-4.5 h-4.5 rounded-full bg-muted-foreground/10" />
            ))}
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-8 h-8 rounded-full bg-muted-foreground/10" />
            <Skeleton className="w-8 h-8 rounded-full bg-muted-foreground/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
