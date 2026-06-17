"use client";

import { TRUST_SIGNALS } from "@/data/homeData";
import { useTranslations } from "next-intl";

export function TrustSignals() {
  const t = useTranslations();

  return (
    <section className="bg-muted/50 py-6 sm:py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-8">
          {TRUST_SIGNALS?.map((signal, idx) => {
            const Icon = signal?.icon;
            return (
              <div key={idx} className="flex items-start gap-2.5 sm:gap-4 text-left w-full">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-green-100">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight">
                    {t(signal?.titleKey)}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-muted-foreground mt-1 leading-snug">
                    {signal?.subtitleKey ? t(signal?.subtitleKey) : signal?.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
