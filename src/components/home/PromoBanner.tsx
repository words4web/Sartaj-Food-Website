"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PromoBannerSkeleton } from "@/components/skeletons/PromoBannerSkeleton";
import { useIsDesktop } from "@/hooks/useIsDesktop";

export function PromoBanner() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();

  // Simulate skeleton loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (isLoading || !isDesktop) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, isDesktop]);

  if (isLoading) {
    return <PromoBannerSkeleton />;
  }

  const showSection = !isDesktop || isVisible;

  return (
    <section
      ref={sectionRef}
      style={{
        boxShadow: isDesktop ? "var(--promo-glow)" : "none",
      }}
      className={`relative my-8 rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] md:min-h-[480px] lg:min-h-[520px] flex items-center justify-center border border-border/10 ${
        isDesktop
          ? `transition-all duration-1000 transform ${showSection ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 scale-[0.98]"}`
          : "opacity-100 translate-y-0"
      }`}
    >
      {/* Background Image with Dark Vignette/Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/authentic_indian_flavours.png"
          alt="Authentic Indian Flavours Background"
          fill
          priority
          sizes="(max-w-1200px) 100vw, 1200px"
          className={`object-cover ${isDesktop ? "transition-transform duration-10000 ease-out lg:hover:scale-105" : ""}`}
        />
        <div className="absolute inset-0 bg-black/65 sm:bg-black/55 backdrop-blur-[1px] z-10" />
      </div>

      {/* Decorative Blur Orbs - Hidden on mobile/tablet */}
      <div
        style={{
          backgroundColor: "var(--promo-accent-orb)",
        }}
        className="hidden lg:block absolute top-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none z-20 transition-all duration-700"
      />
      <div
        style={{
          backgroundColor: "var(--promo-accent-orb)",
        }}
        className="hidden lg:block absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] rounded-full blur-3xl pointer-events-none z-20 transition-all duration-700"
      />

      {/* Foreground Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-8">
        <h2
          style={{
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
          }}
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight uppercase ${
            isDesktop
              ? `transform-gpu transition-all duration-700 delay-200 ${showSection ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`
              : "translate-y-0 opacity-100"
          }`}
        >
          {t.rich("home.promoBannerTitle", {
            highlight: (chunks) => (
              <span
                style={{
                  color: "var(--promo-highlight-text)",
                }}
                className="transition-colors duration-300"
              >
                {chunks}
              </span>
            ),
          })}
        </h2>

        <div
          className={
            isDesktop
              ? `transition-all duration-700 delay-400 transform ${showSection ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`
              : "translate-y-0 opacity-100"
          }
        >
          <Link href={ROUTES.PRODUCTS()} className="no-underline">
            <Button
              style={{
                backgroundColor: "var(--promo-btn-bg)",
                color: "var(--promo-btn-text)",
              }}
              className="h-11 sm:h-13 px-6 sm:px-8 text-xs sm:text-sm font-bold rounded-2xl cursor-pointer lg:hover:shadow-xl hover:opacity-90 lg:transition-all lg:duration-300 group flex items-center gap-2"
            >
              {t("wishlist.exploreProducts")}
              <ChevronRight className="h-4 w-4 lg:transition-transform lg:duration-300 lg:group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
