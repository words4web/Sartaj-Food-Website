"use client";

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useLocale } from "next-intl";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialsData, testimonialsHeader } from "@/data/testimonials";
import { TestimonialSliderSkeleton } from "@/components/skeletons/TestimonialSkeleton";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export function Testimonials() {
  const locale = useLocale();
  const currentTheme = useSelector((state: RootState) => state.locale.theme);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();

  // Get active translation objects based on current locale
  const header = testimonialsHeader?.[locale] || testimonialsHeader?.en;
  const list = testimonialsData?.[locale] || testimonialsData?.en;

  // Simulate skeleton loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations of the section
  useEffect(() => {
    if (!isDesktop) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isDesktop]);

  const nextSlide = () => {
    if (list.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % list.length);
  };

  const prevSlide = () => {
    if (list.length === 0) return;
    setActiveSlide((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0]?.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || list.length === 0) return;
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

  // Auto slide timer
  useEffect(() => {
    if (isLoading || isHovered || list.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isLoading, isHovered, list.length, activeSlide]);

  // Theme-specific styles
  const themeCardStyles: Record<
    string,
    { border: string; glow: string; text: string; bg: string }
  > = {
    sakura: {
      border: "border-pink-200/55 dark:border-pink-900/40",
      glow: "hover:shadow-[0_12px_30px_-8px_rgba(249,168,212,0.22)]",
      text: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    snowfall: {
      border: "border-blue-200/55 dark:border-blue-900/40",
      glow: "hover:shadow-[0_12px_30px_-8px_rgba(147,197,253,0.22)]",
      text: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    diwali: {
      border: "border-amber-200/55 dark:border-amber-900/40",
      glow: "hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.22)]",
      text: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    default: {
      border: "border-border/60",
      glow: "hover:shadow-[0_12px_30px_-8px_rgba(36,59,135,0.12)]",
      text: "text-primary",
      bg: "bg-primary/10",
    },
  };

  const themeDotStyles: Record<string, string> = {
    sakura: "bg-pink-500",
    snowfall: "bg-blue-500",
    diwali: "bg-amber-500",
    default: "bg-primary",
  };

  const style = themeCardStyles[currentTheme] || themeCardStyles.default;
  const activeDotColor = themeDotStyles[currentTheme] || themeDotStyles.default;

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-muted/5 relative z-10 overflow-hidden border-b border-border/10 ${
        isDesktop
          ? `transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`
          : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            {header.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-medium">
            {header.subtitle}
          </p>
        </div>

        {/* Testimonials Slider */}
        {isLoading ? (
          <TestimonialSliderSkeleton />
        ) : (
          <div
            className="w-full max-w-6xl mx-auto px-4 md:px-8 relative group/slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Absolute Stacking Slider viewport */}
            <div className="relative min-h-[380px] min-[480px]:min-h-[340px] sm:min-h-[310px] md:min-h-[290px] w-full overflow-hidden">
              {list?.map((item, idx) => {
                const isActive = idx === activeSlide;
                const isPast = idx < activeSlide;

                return (
                  <div
                    key={item?.id}
                    className={`absolute inset-0 w-full h-full ${
                      isDesktop
                        ? `transition-all duration-700 ease-in-out ${
                            isActive
                              ? "opacity-100 translate-x-0 scale-100 pointer-events-auto z-10"
                              : `opacity-0 pointer-events-none z-0 ${
                                  isPast ? "-translate-x-12 scale-95" : "translate-x-12 scale-95"
                                }`
                          }`
                        : `transition-opacity duration-300 ${
                            isActive
                              ? "opacity-100 pointer-events-auto z-10"
                              : "opacity-0 pointer-events-none z-0"
                          }`
                    }`}
                  >
                    <div
                      className={`w-full h-full bg-card border ${style.border} rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col justify-between shadow-lg ${
                        isDesktop
                          ? style.glow + " hover:-translate-y-1 transition-all duration-300"
                          : ""
                      } relative group`}
                    >
                      {/* Decorative quote mark */}
                      <Quote
                        className={`absolute top-6 right-6 sm:top-8 sm:right-8 h-24 w-24 ${style.text} opacity-[0.03] dark:opacity-[0.05] pointer-events-none ${isDesktop ? "lg:group-hover:scale-110 lg:transition-transform lg:duration-500" : ""}`}
                      />

                      <div>
                        {/* Customer Profile Header */}
                        <div className="flex items-center gap-4 mb-5 sm:mb-6">
                          <div
                            className={`w-14 h-14 rounded-2xl ${style.bg} ${style.text} font-bold text-lg flex items-center justify-center tracking-wider shadow-sm ${isDesktop ? "lg:group-hover:scale-105 lg:transition-transform lg:duration-300" : ""}`}
                          >
                            {item?.initials}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-foreground text-base sm:text-lg leading-snug">
                              {item?.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground font-semibold">
                              {item?.role}
                            </p>
                          </div>
                        </div>

                        {/* Review Text */}
                        <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-medium italic relative z-10">
                          "{item?.text}"
                        </p>
                      </div>

                      {/* Ratings */}
                      <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-auto">
                        <div className="flex gap-0.5">
                          {Array.from({ length: item?.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4.5 w-4.5 fill-amber-400 text-amber-400 ${isDesktop ? "lg:group-hover:scale-110 lg:transition-transform" : ""}`}
                              style={{ transitionDelay: isDesktop ? `${i * 30}ms` : "0ms" }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Navigation Arrows (only if multiple items) */}
            {list?.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className={`absolute left-0 sm:-left-2 md:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border ${style.border} ${style.text} hidden md:flex items-center justify-center shadow-md opacity-0 group-hover/slider:opacity-100 md:opacity-100 transition-all z-20 lg:hover:scale-110 lg:active:scale-95 cursor-pointer`}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className={`absolute right-0 sm:-right-2 md:-right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border ${style.border} ${style.text} hidden md:flex items-center justify-center shadow-md opacity-0 group-hover/slider:opacity-100 md:opacity-100 transition-all z-20 lg:hover:scale-110 lg:active:scale-95 cursor-pointer`}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Slide Indicators */}
            {list?.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {list?.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeSlide
                        ? `w-6 ${activeDotColor} shadow-sm`
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
