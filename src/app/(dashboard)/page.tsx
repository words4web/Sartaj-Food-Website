"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { ThemedProductZone } from "@/components/home/ThemedProductZone";
import { useGetAppConfig } from "@/services/config/config.hooks";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();
  const { data: appConfig } = useGetAppConfig();
  const threshold = appConfig?.freeDeliveryThreshold;
  const marqueeText = threshold
    ? `${t("common.appName") || "Sartaj Foods"}: ${t("common.freeDeliveryMsg", { amount: threshold.toLocaleString() })}`
    : "✨ Free delivery options available! Secure your delivery slots early. ✨";

  return (
    <main className="min-h-screen bg-card">
      <HeroSection />

      {/* Dynamic Free Delivery Marquee Bar */}
      <div className="w-full bg-primary text-primary-foreground py-2.5 overflow-hidden border-y border-primary/20 text-xs font-black uppercase tracking-wider select-none">
        <div className="flex animate-marquee-slow gap-12">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      <ThemedProductZone />
    </main>
  );
}
