"use client";

import { Typography } from "@/components/common";
import { useLocale } from "next-intl";
import {
  Gavel,
  ShoppingCart,
  Truck,
  Lock,
  RotateCcw,
  Cookie,
  AlertTriangle,
  FileText,
  Mail,
} from "lucide-react";
import termsData from "@/data/terms-and-conditions.json";

export default function TermsOfServicePage() {
  const locale = useLocale() as "en" | "ja" | "hi" | "bn" | "ne";
  const terms = termsData[locale] || termsData.en;

  const getIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Gavel className="w-6 h-6" />;
      case 2:
        return <ShoppingCart className="w-6 h-6" />;
      case 3:
        return <Truck className="w-6 h-6" />;
      case 4:
        return <Lock className="w-6 h-6" />;
      case 5:
        return <RotateCcw className="w-6 h-6" />;
      case 6:
        return <Cookie className="w-6 h-6" />;
      case 7:
        return <AlertTriangle className="w-6 h-6" />;
      case 8:
        return <FileText className="w-6 h-6" />;
      default:
        return <Gavel className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background text-foreground pb-20 relative overflow-hidden">
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />

      <div className="relative border-b border-border/40 py-16 md:py-24 text-center overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <Typography
            variant="overline"
            className="text-primary font-bold text-sm tracking-wider uppercase mb-3 block"
          >
            {terms?.legalAgreement}
          </Typography>
          <Typography
            variant="h1"
            className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-6"
          >
            {terms?.title}
          </Typography>
          <Typography
            variant="muted"
            className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            {terms?.description}
          </Typography>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        <div className="space-y-12">
          <div className="bg-card border border-border/80 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] rounded-3xl p-5 sm:p-10 md:p-16 space-y-10 relative">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
              {terms?.lastUpdatedLabel}: 2026/07/18
            </div>

            <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
              <p className="text-foreground font-medium text-lg leading-relaxed">
                {terms?.welcome}
              </p>
            </div>

            <hr className="border-border/60" />

            <div className="space-y-12">
              {terms?.sections?.map((section) => (
                <div
                  key={section?.id}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-border/40 last:border-0 pb-8 last:pb-0"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    {getIcon(section?.id)}
                  </div>
                  <div className="space-y-4 flex-1">
                    <h3 className="text-xl font-bold text-foreground">{section?.title}</h3>

                    {section?.items && (
                      <ul className="list-disc pl-5 space-y-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {section.items.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {section?.commercialDetails && (
                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 bg-muted/30 border border-border/60 rounded-2xl p-6">
                        {section.commercialDetails.map((detail, idx) => (
                          <div key={idx} className="space-y-1">
                            <span className="text-xs text-muted-foreground block">
                              {detail.label}
                            </span>
                            <span className="text-sm font-semibold text-foreground block">
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {section?.liquorDetails && (
                      <div className="mt-6 border border-border/80 rounded-2xl overflow-hidden bg-muted/10">
                        <div className="bg-primary/5 border-b border-border/80 px-6 py-4">
                          <h4 className="text-sm font-bold text-primary tracking-wider uppercase">
                            {section.liquorDetails.title}
                          </h4>
                        </div>
                        <div className="divide-y divide-border/40 px-6 py-2">
                          {section.liquorDetails.rows.map((row, idx) => (
                            <div
                              key={idx}
                              className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4"
                            >
                              <span className="text-xs sm:text-sm text-muted-foreground">
                                {row.label}
                              </span>
                              <span className="text-sm font-semibold text-foreground text-left sm:text-right">
                                {row.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border/60 rounded-3xl p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center mx-auto mb-2">
              <Mail className="w-5 h-5" />
            </div>
            <Typography
              variant="body"
              className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed"
            >
              {terms?.footerText}
            </Typography>
            <Typography
              variant="small"
              className="text-lg font-bold text-primary block hover:underline cursor-pointer transition-all duration-200"
            >
              <a href="mailto:info@sartajfoods.jp">info@sartajfoods.jp</a>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
