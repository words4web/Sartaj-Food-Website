"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { TimeRemaining, CountdownTimerProps } from "@/types/common.types";

export function IndiaFlagIcon({
  className = "w-6 h-4",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="900" height="200" fill="#FF9933" />
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      <rect y="400" width="900" height="200" fill="#128807" />
      <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="8" />
      <circle cx="450" cy="300" r="15" fill="#000080" />
      {[...Array(24)].map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1="450"
            y1="300"
            x2={450 + 80 * Math.cos(angle)}
            y2={300 + 80 * Math.sin(angle)}
            stroke="#000080"
            strokeWidth="4"
          />
        );
      })}
    </svg>
  );
}

export function CountdownTimer({ targetDate, title, subTitle }: CountdownTimerProps) {
  const t = useTranslations("countdown");
  const pathname = usePathname();
  const displayTitle = title || t("timerTitle");
  const displaySubTitle = subTitle || t("timerSubTitle");

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      setTimeRemaining({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timeBlocks = [
    { label: t("days"), value: timeRemaining.days },
    { label: t("hours"), value: timeRemaining.hours },
    { label: t("mins"), value: timeRemaining.minutes },
    { label: t("secs"), value: timeRemaining.seconds },
  ];

  if (!mounted) {
    return (
      <div className="w-full h-56 rounded-3xl bg-gradient-to-r from-orange-500/10 via-white/5 to-emerald-500/10 animate-pulse border border-border/40" />
    );
  }

  if (timeRemaining?.isExpired) {
    return (
      <div className="relative overflow-hidden w-full rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-orange-500/15 via-background/40 to-emerald-500/15 p-8 md:p-12 text-center shadow-xl backdrop-blur-md transition-all duration-500 animate-tricolor-glow-expired">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes shimmerGlow {
            0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 5px rgba(249,115,22,0.4)); }
            50% { opacity: 1; filter: drop-shadow(0 0 15px rgba(16,185,129,0.6)); }
          }
          .animate-shimmer-glow {
            animation: shimmerGlow 3s infinite ease-in-out;
          }
          @keyframes tricolorGlowExpired {
            0%, 100% { box-shadow: 0 0 0 2px rgba(255,153,51,0.55), 0 24px 48px rgba(255,153,51,0.12); }
            33%  { box-shadow: 0 0 0 2px rgba(255,255,255,0.25), 0 24px 48px rgba(255,255,255,0.05); }
            66%  { box-shadow: 0 0 0 2px rgba(19,136,7,0.55),  0 24px 48px rgba(19,136,7,0.12); }
          }
          .animate-tricolor-glow-expired {
            animation: tricolorGlowExpired 3.5s infinite ease-in-out;
          }
          @keyframes flagBounce {
            0%, 100% { transform: translateY(0) rotate(-2deg); }
            50% { transform: translateY(-5px) rotate(2deg); }
          }
          .animate-flag-bounce {
            animation: flagBounce 2.5s infinite ease-in-out;
          }
        `,
          }}
        />
        {/* Glow Effects */}
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div
          className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        <h3 className="text-2xl md:text-4xl font-black uppercase tracking-wider bg-gradient-to-r from-orange-500 via-foreground to-emerald-500 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-4 animate-shimmer-glow">
          <IndiaFlagIcon className="w-20 h-14 shrink-0 shadow-xl rounded-sm animate-flag-bounce" />
          <span>{title || t("liveTitle")}</span>
          <IndiaFlagIcon
            className="w-20 h-14 shrink-0 shadow-xl rounded-sm animate-flag-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </h3>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-semibold">
          {subTitle || t("liveSubTitle")}
        </p>

        {pathname !== ROUTES.SALE && (
          <div className="mt-6 flex justify-center">
            <Link
              href={ROUTES.SALE}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-emerald-600 hover:from-orange-600 hover:to-emerald-700 text-white font-extrabold text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <IndiaFlagIcon className="w-8 h-5.5 rounded-sm shadow-sm" />
              <span>{t("goToSale")}</span>
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full rounded-3xl border border-orange-500/25 bg-gradient-to-br from-orange-500/15 via-background/50 to-emerald-500/15 p-5 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-md transition-all duration-500 animate-tricolor-glow-countdown">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floatTimer {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes pulseAmbient {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.18; }
        }
        @keyframes tricolorGlowCountdown {
          0%, 100% { box-shadow: 0 0 0 1.5px rgba(255,153,51,0.45), 0 20px 40px rgba(255,153,51,0.08); }
          33%  { box-shadow: 0 0 0 1.5px rgba(255,255,255,0.18), 0 20px 40px rgba(255,255,255,0.03); }
          66%  { box-shadow: 0 0 0 1.5px rgba(19,136,7,0.45),  0 20px 40px rgba(19,136,7,0.08); }
        }
        .animate-tricolor-glow-countdown {
          animation: tricolorGlowCountdown 4s infinite ease-in-out;
        }
        .animate-float-timer {
          animation: floatTimer 4s infinite ease-in-out;
        }
        .animate-pulse-ambient {
          animation: pulseAmbient 5s infinite ease-in-out;
        }
      `,
        }}
      />

      {/* Decorative Ashoka Chakra element in background with slow spin and pulsing glow */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none hidden lg:block animate-pulse-ambient">
        <svg
          className="w-56 h-56 animate-[spin_80s_linear_infinite] text-blue-900/40"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="50" cy="50" r="45" strokeWidth="1.5" />
          {[...Array(24)].map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 45 * Math.cos(angle)}
                y2={50 + 45 * Math.sin(angle)}
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 relative z-10">
        <div className="space-y-2 sm:space-y-3 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2.5">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <span className="text-[10px] sm:text-sm uppercase tracking-widest font-extrabold text-orange-500">
              {t("celebrationCountdown")}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground flex items-center justify-center lg:justify-start gap-3">
            <IndiaFlagIcon className="w-14 h-10 shrink-0 rounded-sm shadow-lg" />
            <span>{displayTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-semibold max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {displaySubTitle}
          </p>
        </div>

        {/* Countdown Numbers Grid - Optimized for Mobile Spacing */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-5 select-none animate-float-timer self-center lg:self-auto w-full lg:w-auto">
          {timeBlocks?.map((block, idx) => (
            <div key={block?.label} className="flex items-center">
              <div className="flex flex-col items-center">
                {/* Adaptive digit cards from mobile-width 62px up to desktop-width 108px */}
                <div className="relative min-w-[62px] sm:min-w-[96px] md:min-w-[108px] h-16 sm:h-24 md:h-28 bg-background/90 border border-border/60 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-orange-500/30">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 sm:h-1.5 ${
                      idx === 0
                        ? "bg-orange-500 animate-pulse"
                        : idx === 3
                          ? "bg-emerald-500 animate-pulse"
                          : "bg-blue-900/60"
                    }`}
                  />
                  <span className="text-xl sm:text-4xl md:text-5xl font-black tabular-nums tracking-tighter text-foreground bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text">
                    {String(block?.value)?.padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[9px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-2 sm:mt-2.5">
                  {block?.label}
                </span>
              </div>
              {idx < 3 && (
                <span className="text-base sm:text-3xl font-extrabold text-muted-foreground/30 px-0.5 sm:px-2 pb-5 sm:pb-7 animate-pulse">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
