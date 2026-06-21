"use client";

import { useTranslations } from "next-intl";
import { BadgeCheck } from "lucide-react";
import { TRUST_SIGNALS } from "@/data/homeData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useEffect, useRef, useState, memo } from "react";

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty("--x", `${x}px`);
  e.currentTarget.style.setProperty("--y", `${y}px`);
};

const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  e.currentTarget.style.setProperty("--x", `${x}px`);
  e.currentTarget.style.setProperty("--y", `${y}px`);
};

const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.setProperty("--mouse-opacity", "1");
};

const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.setProperty("--mouse-opacity", "0");
};

const TrustCard = memo(function TrustCard({
  signal,
  idx,
  isVisible,
  t,
}: {
  signal: any;
  idx: number;
  isVisible: boolean;
  t: any;
}) {
  const Icon = signal?.icon;
  const isEven = idx % 2 === 0;
  const transformValue = isVisible ? "translateX(0)" : `translateX(${isEven ? "-100vw" : "100vw"})`;

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        transform: transformValue,
        opacity: isVisible ? 1 : 0,
        transitionDelay: isVisible ? `${idx * 100}ms` : "0ms",
      }}
      className="trust-card bg-[var(--trust-card-bg)] border border-[var(--trust-card-border)] backdrop-blur-xl rounded-2xl p-6 sm:p-8 hover:bg-[var(--trust-card-hover-bg)] hover:border-[var(--trust-card-hover-border)] flex flex-col gap-6 text-left w-full h-full group relative overflow-hidden transition-all duration-1000 ease-out transform"
    >
      {/* Spotlight glow tracking pointer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(250px circle at var(--x, 50%) var(--y, 50%), var(--trust-glow-1) 0%, transparent 100%)`,
        }}
      />

      {/* Corner light shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Icon Container */}
      <div
        className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10 ${
          signal?.isPrimary
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-muted text-foreground border border-border group-hover:bg-primary group-hover:text-primary-foreground"
        }`}
      >
        <Icon className={`h-6 w-6 transition-all duration-300 ${signal?.animationClass}`} />
      </div>

      {/* Text Details */}
      <div className="space-y-2 relative z-10">
        <h3 className="text-lg font-bold text-foreground transition-colors duration-300">
          {t(signal?.titleKey)}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
          {t(signal?.descKey)}
        </p>
      </div>
    </div>
  );
});

export function TrustSignals() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const getObserver = () => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const index = entry.target.getAttribute("data-index");
            if (index !== null) {
              setVisibleElements((prev) => ({
                ...prev,
                [index]: entry.isIntersecting,
              }));
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -100px 0px" },
      );
    }
    return observerRef.current;
  };

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const elementRefCallback = (el: HTMLDivElement | null) => {
    if (el) {
      getObserver().observe(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-x-hidden trust-signals-section text-foreground py-16 sm:py-24 group/section mt-8 sm:mt-12 md:mt-16"
    >
      {/* Large Ambient Theme-Integrated Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          opacity: "var(--mouse-opacity, 0)",
          background: `radial-gradient(800px circle at var(--x, 50%) var(--y, 50%), var(--trust-glow-1) 0%, var(--trust-glow-2) 40%, transparent 70%)`,
        }}
      />

      {/* Animated SVG Concentric Orbits and Glowing Dots */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bg-glow-left" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--trust-glow-1)" />
            <stop offset="100%" stopColor="var(--trust-glow-1)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bg-glow-right" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--trust-glow-2)" />
            <stop offset="100%" stopColor="var(--trust-glow-2)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glowing Orbs */}
        <circle cx="15%" cy="75%" r="350" fill="url(#bg-glow-left)" />
        <circle cx="85%" cy="25%" r="300" fill="url(#bg-glow-right)" />

        {/* Orbit Group 1 (Bottom Left) */}
        <g className="animate-spin-slow origin-[15%_75%]">
          <circle
            cx="15%"
            cy="75%"
            r="200"
            fill="none"
            stroke="rgba(0,0,0,0.03)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <circle cx="15%" cy="75%" r="350" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
          <circle
            cx="15%"
            cy="75%"
            r="500"
            fill="none"
            stroke="rgba(0,0,0,0.02)"
            strokeWidth="1.5"
            strokeDasharray="8 12"
          />
          {/* Orbital traveling dots */}
          <circle
            cx="15%"
            cy="75%"
            r="4"
            fill="var(--primary)"
            className="animate-pulse"
            style={{ transform: "translate(350px, 0)" }}
          />
        </g>

        {/* Orbit Group 2 (Top Right) */}
        <g className="animate-spin-reverse-slow origin-[85%_25%]">
          <circle
            cx="85%"
            cy="25%"
            r="150"
            fill="none"
            stroke="rgba(0,0,0,0.03)"
            strokeWidth="1.2"
          />
          <circle
            cx="85%"
            cy="25%"
            r="300"
            fill="none"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="1"
            strokeDasharray="5 10"
          />
          <circle cx="85%" cy="25%" r="450" fill="none" stroke="rgba(0,0,0,0.02)" strokeWidth="1" />
          {/* Orbital traveling dots */}
          <circle
            cx="85%"
            cy="25%"
            r="3.5"
            fill="var(--primary)"
            className="animate-pulse"
            style={{ transform: "translate(-300px, 0)" }}
          />
        </g>
      </svg>

      {/* Decorative Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline and CTA (Slides in from Left) */}
          <div ref={elementRefCallback} data-index="left" className="w-full">
            <div
              className="flex flex-col text-left space-y-6 transition-all duration-1000 ease-out transform"
              style={{
                transform: visibleElements["left"] ? "translateX(0)" : "translateX(-100vw)",
                opacity: visibleElements["left"] ? 1 : 0,
              }}
            >
              {/* Checked Shield Badge Icon with Outer Pulsing Rings */}
              <div className="relative flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-inner">
                <div className="absolute inset-[-6px] rounded-2xl border border-primary/15 animate-pulse-ring" />
                <div
                  className="absolute inset-[-12px] rounded-3xl border border-primary/5 animate-pulse-ring"
                  style={{ animationDelay: "1s" }}
                />
                <BadgeCheck className="h-6 w-6 relative z-10" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-foreground">
                  {t("home.trustedByProfessionalsTitle")}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                  {t("home.trustedByProfessionalsDesc")}
                </p>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-8 py-6 rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-lg active:scale-95 cursor-pointer relative overflow-hidden group/btn"
                >
                  <Link href={ROUTES.ABOUT}>
                    {/* Sheen effect on button hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.2s_infinite]" />
                    <span className="relative z-10">{t("home.readOurStory")}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TRUST_SIGNALS?.map((signal, idx) => {
              const isVisible = visibleElements[`card-${idx}`];

              return (
                <div
                  key={idx}
                  ref={elementRefCallback}
                  data-index={`card-${idx}`}
                  className="w-full h-full"
                >
                  <TrustCard signal={signal} idx={idx} isVisible={isVisible} t={t} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
