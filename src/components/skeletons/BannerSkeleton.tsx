import { Skeleton } from "./Skeleton";

export function BannerSkeleton() {
  return (
    <div className="relative mt-4 sm:mt-6 md:mt-8 h-[260px] sm:h-[380px] md:h-[480px] lg:h-[560px] xl:h-[600px] overflow-hidden flex items-center bg-gradient-to-br from-primary/5 via-card to-accent/10 animate-pulse">
      {/* Ambient background glows matching active theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      {/* Large Image Placeholder Shape in the Background/Right */}
      <div className="absolute right-6 sm:right-12 md:right-24 top-1/2 -translate-y-1/2 w-[40%] sm:w-[50%] h-[60%] sm:h-[70%] bg-muted/40 rounded-3xl border border-border/10 flex items-center justify-center">
        {/* Subtle icon/image shape inside */}
        <div className="h-12 w-12 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground/30 font-bold text-xl sm:text-2xl select-none">
          🌾
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-4 z-20 pointer-events-none">
        <div className="absolute left-3 min-[375px]:left-4 sm:left-6 md:left-8 bottom-3 min-[375px]:bottom-4 sm:bottom-6 md:bottom-8 w-[calc(100%-1.5rem)] min-[375px]:w-[calc(100%-2rem)] sm:w-auto max-w-lg md:max-w-xl text-left bg-background/20 backdrop-blur-sm p-2 min-[375px]:p-2.5 min-[480px]:p-3 sm:p-4 md:p-5 rounded-xl min-[375px]:rounded-2xl sm:rounded-3xl border border-white/5 shadow-sm space-y-2.5 min-[375px]:space-y-4 sm:space-y-6">
          <div className="space-y-1.5 sm:space-y-3">
            <Skeleton className="h-4 min-[375px]:h-5 min-[480px]:h-6 sm:h-8 md:h-9 w-full max-w-[160px] sm:max-w-[280px]" />
            <Skeleton className="h-4 min-[375px]:h-5 min-[480px]:h-6 sm:h-8 md:h-9 w-2/3 max-w-[110px] sm:max-w-[180px]" />
          </div>
          <div>
            <Skeleton className="h-7 min-[375px]:h-8 min-[480px]:h-9 sm:h-10 md:h-11 w-20 min-[375px]:w-24 sm:w-32 rounded-lg min-[375px]:rounded-xl sm:rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
