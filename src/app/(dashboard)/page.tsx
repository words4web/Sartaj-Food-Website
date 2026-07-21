"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ThemedProductZone } from "@/components/home/ThemedProductZone";
import { useGetAppConfig } from "@/services/config/config.hooks";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();
  const { data: appConfig } = useGetAppConfig();
  const [cachedConfig, setCachedConfig] = useState<{
    freeDeliveryThreshold?: number;
    frozenWeightThreshold?: number;
  }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("app_config_thresholds");
      if (stored) {
        try {
          setCachedConfig(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse cached config", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (
      appConfig?.freeDeliveryThreshold !== undefined &&
      appConfig?.frozenWeightThreshold !== undefined
    ) {
      const configToStore = {
        freeDeliveryThreshold: appConfig.freeDeliveryThreshold,
        frozenWeightThreshold: appConfig.frozenWeightThreshold,
      };
      localStorage.setItem("app_config_thresholds", JSON.stringify(configToStore));
      setCachedConfig(configToStore);
    }
  }, [appConfig]);

  const threshold = appConfig?.freeDeliveryThreshold ?? cachedConfig.freeDeliveryThreshold;
  const frozenThreshold = appConfig?.frozenWeightThreshold ?? cachedConfig.frozenWeightThreshold;
  const marqueeText =
    threshold !== undefined && frozenThreshold !== undefined
      ? `${t("common.appName") || "Sartaj Foods"}: ${t("common.freeDeliveryMsg", {
          dryAmount: threshold?.toLocaleString(),
          frozenWeight: frozenThreshold?.toString(),
        })}`
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
