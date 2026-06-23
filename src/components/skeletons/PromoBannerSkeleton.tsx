import { Skeleton } from "./Skeleton";

export function PromoBannerSkeleton() {
  return (
    <div className="relative my-8 h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] overflow-hidden rounded-3xl bg-muted/30 border border-border/10 flex items-center justify-center animate-pulse">
      {/* Decorative Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[250px] h-[250px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      {/* Content Skeleton */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6 w-full">
        {/* Big Text Skeleton */}
        <div className="space-y-3 w-full flex flex-col items-center">
          <Skeleton className="h-8 sm:h-12 md:h-14 w-4/5 max-w-[650px] rounded-xl" />
          <Skeleton className="h-8 sm:h-12 md:h-14 w-3/5 max-w-[450px] rounded-xl" />
        </div>

        {/* Button Skeleton */}
        <div className="pt-2">
          <Skeleton className="h-10 sm:h-12 w-36 sm:w-44 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
