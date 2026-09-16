import { Skeleton } from "./Skeleton";

export function LoyaltySkeleton() {
  return (
    <main className="min-h-screen bg-muted/30 pb-16">
      <div className="bg-background pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3 sm:space-y-4 flex flex-col items-center">
          <Skeleton className="h-6 sm:h-7 w-32 sm:w-36 rounded-full" />
          <Skeleton className="h-8 sm:h-10 w-full sm:w-3/4 max-w-lg rounded-xl" />
          <Skeleton className="h-3.5 sm:h-4 w-5/6 sm:w-1/2 max-w-sm rounded-lg" />

          <div className="mt-4 sm:mt-6 w-full max-w-xl bg-card rounded-2xl sm:rounded-3xl border border-border p-4 sm:p-6 space-y-4 sm:space-y-5 text-left">
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1.5 sm:space-y-2">
                <Skeleton className="h-4 sm:h-5 w-32 sm:w-40 rounded-md" />
                <Skeleton className="h-3 sm:h-3.5 w-44 sm:w-56 rounded-md" />
              </div>
              <Skeleton className="h-7 sm:h-9 w-12 sm:w-16 rounded-xl shrink-0" />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex justify-between gap-2">
                <Skeleton className="h-3 sm:h-3.5 w-16 sm:w-20" />
                <Skeleton className="h-3 sm:h-3.5 w-20 sm:w-24" />
              </div>
              <Skeleton className="h-2.5 sm:h-3 w-full rounded-full" />
              <div className="flex justify-between gap-2 pt-0.5">
                <Skeleton className="h-2.5 sm:h-3 w-20 sm:w-24" />
                <Skeleton className="h-2.5 sm:h-3 w-16 sm:w-20" />
              </div>
            </div>

            <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                <Skeleton className="h-3.5 w-full sm:w-64" />
              </div>
              <Skeleton className="h-9 sm:h-10 w-full sm:w-28 rounded-xl shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 sm:mt-12 space-y-4 sm:space-y-6">
        <div className="text-center space-y-1.5 flex flex-col items-center">
          <Skeleton className="h-6 sm:h-7 w-48 sm:w-56 rounded-lg" />
          <Skeleton className="h-3.5 sm:h-4 w-full max-w-xs sm:max-w-sm rounded-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-card rounded-2xl border border-border p-4 sm:p-5 space-y-3 sm:space-y-4"
            >
              <div className="flex justify-between items-center">
                <Skeleton className="h-9 sm:h-10 w-9 sm:w-10 rounded-xl" />
                <Skeleton className="h-3.5 sm:h-4 w-14 sm:w-16 rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 sm:h-5 w-3/4" />
                <Skeleton className="h-3 sm:h-3.5 w-full" />
                <Skeleton className="h-3 sm:h-3.5 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
