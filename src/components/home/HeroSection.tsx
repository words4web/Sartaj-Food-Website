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

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides?.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const slide = slides[activeSlide];

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden bg-gray-900">
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
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
              {t(slide?.badgeKey)}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {t(slide?.titleKey)}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-md">
              {t(slide?.subtitleKey)}
            </p>

            {/* CTA Button */}
            <Button size="lg" className="mt-2">
              {t("home.shopEssentials")}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/20 hover:bg-card/40 text-white z-10 rounded-full"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/20 hover:bg-card/40 text-white z-10 rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === activeSlide ? "w-8 bg-card" : "w-2 bg-card/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
