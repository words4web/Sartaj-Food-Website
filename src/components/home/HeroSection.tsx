"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useGetActiveBanners } from "@/services/banner/banner.hooks";
import { BannerSkeleton } from "@/components/skeletons/BannerSkeleton";
import { ThemedImage } from "@/components/common";
import Link from "next/link";

export function HeroSection() {
  const { data: banners, isLoading, error } = useGetActiveBanners();
  const t = useTranslations();
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const slides = banners || [];

  const nextSlide = () => {
    if (slides.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0]?.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || slides.length === 0) return;
    const touchEnd = e.changedTouches[0]?.clientX;
    const diff = touchStart - touchEnd;
    const threshold = 50;

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }
    setTouchStart(null);
  };

  useEffect(() => {
    if (slides?.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide, slides.length]);

  // Show skeleton if loading, or if banners list is empty/missing
  if (isLoading || slides?.length === 0) {
    return <BannerSkeleton />;
  }
  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative mt-4 sm:mt-6 md:mt-8 h-[260px] sm:h-[380px] md:h-[480px] lg:h-[560px] xl:h-[600px] overflow-hidden bg-gradient-to-br from-primary/8 to-accent/12 lg:transition-all lg:duration-700 lg:ease-in-out border-b border-border/20"
    >
      {/* ── Full-width background slide image layer ── */}
      {slides?.map((slide, idx) => {
        const isActive = idx === activeSlide;
        return (
          <div
            key={`bg-${slide?.id || idx}`}
            className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none lg:transition-all lg:duration-1000 lg:ease-in-out ${
              isActive ? "opacity-100 lg:scale-100 z-10" : "opacity-0 lg:scale-105 z-0"
            }`}
          >
            <ThemedImage
              src={slide?.image}
              alt={slide?.title}
              className="w-full h-full object-contain mix-blend-multiply lg:transition-all lg:duration-1000"
              emoji="🌾"
              fallbackType="product"
            />
          </div>
        );
      })}

      {/* ── Ambient Background Glow Orbs (Theme-Aware) - Hidden on Mobile/Tablet for Performance ── */}
      <div className="hidden lg:block absolute top-[-10%] left-[-5%] w-[550px] h-[550px] rounded-full bg-primary/15 blur-[130px] pointer-events-none lg:animate-orb-drift mix-blend-multiply dark:mix-blend-screen z-10" />
      <div className="hidden lg:block absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-accent/12 blur-[100px] pointer-events-none lg:animate-orb-drift lg:animation-delay-500 mix-blend-multiply dark:mix-blend-screen z-10" />

      {/* Subtle Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent pointer-events-none z-15" />

      {/* Foreground Content Container */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {slides?.map((slide, idx) => {
          const isActive = idx === activeSlide;

          return (
            <div
              key={`fg-${slide?.id || idx}`}
              className={`absolute left-4 bottom-4 sm:left-8 sm:bottom-8 w-[calc(100%-2rem)] sm:w-auto max-w-lg md:max-w-xl text-left z-20 pointer-events-auto lg:transition-all lg:duration-1000 lg:ease-in-out ${
                isActive
                  ? "opacity-100 lg:scale-100 lg:translate-y-0"
                  : "opacity-0 lg:scale-95 lg:translate-y-4"
              }`}
            >
              {/* Title */}
              <h1
                className={`text-xs min-[375px]:text-sm min-[480px]:text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-sans font-bold tracking-tight text-blue-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] leading-tight normal-case lg:transition-all lg:duration-700 lg:delay-300 lg:transform ${
                  isActive ? "opacity-100 lg:translate-y-0" : "opacity-0 lg:translate-y-4"
                }`}
              >
                {slide?.title}
              </h1>

              {/* CTA Button */}
              <div
                className={`mt-2.5 min-[375px]:mt-3 sm:mt-4 md:mt-5 w-fit lg:transition-all lg:duration-700 lg:delay-500 lg:transform ${
                  isActive ? "opacity-100 lg:translate-y-0" : "opacity-0 lg:translate-y-4"
                }`}
              >
                {slide?.link ? (
                  <Link
                    href={slide?.link}
                    target={slide?.link?.startsWith("http") ? "_blank" : "_self"}
                  >
                    <Button
                      size="default"
                      className="h-7 min-[375px]:h-8 min-[480px]:h-9 sm:h-10 md:h-11 px-3 min-[375px]:px-4 min-[480px]:px-5 sm:px-5 md:px-6 text-[9px] min-[375px]:text-[10px] min-[480px]:text-xs sm:text-xs md:text-sm font-bold rounded-lg min-[375px]:rounded-xl sm:rounded-2xl cursor-pointer hover:shadow-xl lg:hover:shadow-primary/25 transition-all group flex items-center gap-1 min-[375px]:gap-1.5 sm:gap-2"
                    >
                      {t("home.shopEssentials")}
                      <ChevronRight className="h-3 w-3 min-[375px]:h-3.5 min-[375px]:w-3.5 sm:h-4 sm:w-4 lg:transition-transform lg:group-hover:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="default"
                    className="h-7 min-[375px]:h-8 min-[480px]:h-9 sm:h-10 md:h-11 px-3 min-[375px]:px-4 min-[480px]:px-5 sm:px-5 md:px-6 text-[9px] min-[375px]:text-[10px] min-[480px]:text-xs sm:text-xs md:text-sm font-bold rounded-lg min-[375px]:rounded-xl sm:rounded-2xl cursor-pointer hover:shadow-xl lg:hover:shadow-primary/25 transition-all group flex items-center gap-1 min-[375px]:gap-1.5 sm:gap-2"
                  >
                    {t("home.shopEssentials")}
                    <ChevronRight className="h-3 w-3 min-[375px]:h-3.5 min-[375px]:w-3.5 sm:h-4 sm:w-4 lg:transition-transform lg:group-hover:translate-x-1" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons (Only shown if multiple slides exist) */}
      {slides?.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-card/60 hover:bg-card/90 text-foreground border border-border/40 z-30 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer shadow-md backdrop-blur-sm transition-all lg:hover:scale-105"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-card/60 hover:bg-card/90 text-foreground border border-border/40 z-30 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer shadow-md backdrop-blur-sm transition-all lg:hover:scale-105"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </>
      )}

      {/* Slide Indicators (Only shown if multiple slides exist) */}
      {slides?.length > 1 && (
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
          {slides?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeSlide
                  ? "w-6 bg-primary shadow-sm"
                  : "w-1.5 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
