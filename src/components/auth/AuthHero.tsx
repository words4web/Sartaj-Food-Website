"use client";

import { Typography } from "@/components/common";
import { useTranslations } from "next-intl";

export function AuthHero() {
  const t = useTranslations("auth");

  return (
    <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-primary via-primary/95 to-primary/85 relative overflow-hidden flex-col items-center justify-center p-12 text-white">
      {/* Floating background decorative blobs/circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl animate-pulse duration-[10000ms]" />
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-white/10 blur-2xl animate-bounce duration-[15000ms] opacity-30" />

      {/* Brand Card Content Container */}
      <div className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center text-center">
        <div className="mb-8 relative group">
          {/* Soft pulsing glow behind logo */}
          <div className="absolute inset-0 bg-white/25 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 scale-105" />
          <img
            src="/sartaj_logo.svg"
            className="w-32 h-32 relative z-10 drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)] group-hover:scale-105 transition-transform duration-300"
            alt="Sartaj Foods Logo"
          />
        </div>

        <Typography
          variant="h1"
          className="text-white font-extrabold text-3xl md:text-4xl tracking-tight mb-3"
        >
          Sartaj Foods
        </Typography>

        <Typography
          variant="lead"
          className="text-white/80 font-medium text-lg max-w-sm mb-6 leading-relaxed"
        >
          {t("heroTagline")}
        </Typography>

        <div className="w-16 h-1 bg-white/30 rounded-full mb-6" />

        <Typography variant="muted" className="text-white/60 text-sm max-w-sm leading-relaxed">
          {t("heroDescription")}
        </Typography>
      </div>
    </div>
  );
}
