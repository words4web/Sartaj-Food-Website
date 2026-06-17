"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/data/homeData";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const t = useTranslations();

  const slides = HERO_SLIDES;

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides?.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0]?.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
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
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const slide = slides[activeSlide];

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[340px] sm:h-96 md:h-[500px] overflow-hidden bg-gray-900"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${slide?.image}')`,
          opacity: 0.3,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-gray-900/40" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-4 w-full">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-block bg-primary text-primary-foreground px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              {t(slide?.badgeKey)}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
              {t(slide?.titleKey)}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-4 sm:mb-8 leading-relaxed max-w-md">
              {t(slide?.subtitleKey)}
            </p>

            {/* CTA Button */}
            <Button size="sm" className="sm:h-11 sm:px-8 sm:text-sm rounded-lg sm:rounded-xl">
              {t("home.shopEssentials")}
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 bg-card/20 hover:bg-card/40 text-white z-10 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 bottom-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 bg-card/20 hover:bg-card/40 text-white z-10 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === activeSlide ? "w-8 bg-card" : "w-2 bg-card/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
