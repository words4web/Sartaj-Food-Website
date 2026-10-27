"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { X, Sparkles, Flame, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

const STORAGE_KEY = "sartaj_diwali_popup_last_shown";
const COOLDOWN_HOURS = 12;
const COOLDOWN_MS = COOLDOWN_HOURS * 60 * 60 * 1000;

export function DiwaliPopup() {
  const t = useTranslations("diwali");
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    try {
      const lastShown = localStorage.getItem(STORAGE_KEY);
      if (lastShown) {
        const elapsed = Date.now() - parseInt(lastShown, 10);
        if (elapsed < COOLDOWN_MS) {
          return;
        }
      }
    } catch {}

    const timer = setTimeout(() => {
      setIsRendered(true);
      requestAnimationFrame(() => setIsOpen(true));
      try {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      } catch {}
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsRendered(false), 300);
  };

  if (!isRendered) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="diwali-popup-title"
      className={`fixed inset-0 z-[999999] flex items-center justify-center p-2.5 sm:p-4 transition-all duration-300 ${
        isOpen
          ? "bg-black/75 backdrop-blur-md opacity-100"
          : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className={`relative w-full max-w-[340px] xs:max-w-[390px] sm:max-w-md md:max-w-lg max-h-[92vh] sm:max-h-[90vh] flex flex-col bg-card rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_25px_60px_-15px_rgba(245,158,11,0.35)] transition-all duration-300 transform ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          aria-label="Close dialog"
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all shadow-lg active:scale-95 shrink-0"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="overflow-y-auto overflow-x-hidden flex-1 no-scrollbar">
          <div className="pt-4 pb-3 px-3.5 sm:p-5 text-center bg-gradient-to-b from-amber-500/15 via-orange-500/5 to-transparent border-b border-amber-500/20">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-[10px] sm:text-xs font-black tracking-wider uppercase mb-1.5 sm:mb-2">
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{t("badge")}</span>
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
            </div>

            <h2
              id="diwali-popup-title"
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm leading-tight px-6 sm:px-0"
            >
              {t("popupHeading")}
            </h2>

            <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground mt-1 max-w-md mx-auto leading-snug sm:leading-relaxed">
              {t("popupSubtitle")}
            </p>
          </div>

          <Link
            href={ROUTES.DIWALI}
            onClick={handleClose}
            className="group block relative w-full h-[220px] xs:h-[240px] sm:h-[260px] overflow-hidden bg-gradient-to-br from-amber-500/15 via-background/60 to-orange-500/15 flex items-center justify-center p-2"
          >
            <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              {isOpen && (
                <DotLottieReact
                  src="/animations/Happy Diwali.json"
                  loop
                  autoplay
                  className="w-full h-full object-contain pointer-events-none"
                />
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-3 sm:p-4 pointer-events-none">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500 text-black text-[10px] sm:text-xs font-black uppercase tracking-wider w-fit shadow-md mb-1">
                <span>{t("discountBadge")}</span>
              </div>
              <p className="text-white text-[11px] sm:text-xs md:text-sm font-semibold opacity-95 line-clamp-1">
                {t("heroTitle")}
              </p>
            </div>
          </Link>
        </div>

        <div className="p-2.5 sm:p-4 bg-card flex flex-col sm:flex-row items-center gap-2 sm:gap-3 border-t border-border/50 shrink-0">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto order-2 sm:order-1 py-1.5 sm:py-2.5 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-center"
          >
            {t("popupDismiss")}
          </button>

          <Link
            href={ROUTES.DIWALI}
            onClick={handleClose}
            className="w-full sm:flex-1 order-1 sm:order-2 inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-4 sm:px-5 rounded-xl font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 hover:from-amber-300 hover:via-orange-300 hover:to-yellow-300 shadow-md hover:shadow-lg transition-all transform active:scale-95 text-center"
          >
            <span>{t("popupCta")}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
