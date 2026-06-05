"use client";

import { TRUST_SIGNALS } from "@/data/homeData";
import { useTranslations } from "next-intl";

export function TrustSignals() {
  const t = useTranslations();
  const signals = TRUST_SIGNALS;

  return (
    <section className="bg-muted/50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {signals.map((signal, idx) => {
            const Icon = signal.icon;
            return (
              <div key={idx} className="flex items-start gap-4 text-center md:text-left">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{t(signal.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {signal.subtitleKey ? t(signal.subtitleKey) : signal.subtitle}
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
