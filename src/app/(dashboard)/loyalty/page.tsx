"use client";

import { useState } from "react";
import { Crown, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerLoyaltyStatus } from "@/services/loyalty/loyalty.hooks";
import { CommonError } from "@/components/ui/common-error";
import { LoyaltySkeleton } from "@/components/skeletons/LoyaltySkeleton";
import { LoyaltyHeroCard } from "@/components/loyalty/LoyaltyHeroCard";
import { LoyaltyActivePerksSummary } from "@/components/loyalty/LoyaltyActivePerksSummary";
import { LOYALTY_FAQS, LOYALTY_BENEFITS } from "@/data/loyaltyData";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedValue } from "@/utils/product/product.utils";

export default function LoyaltyPage() {
  const locale = useLocale();
  const t = useTranslations("loyalty");
  const { isAuthenticated } = useAuth();
  const { data: loyalty, isLoading, isError, refetch } = useCustomerLoyaltyStatus(isAuthenticated);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (isLoading) {
    return <LoyaltySkeleton />;
  }

  if (isError || !loyalty) {
    return <CommonError message="Could not load loyalty program details." onRetry={refetch} />;
  }

  return (
    <main className="relative z-10 min-h-screen bg-muted/30 pb-16">
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-10 pb-12 border-b border-border/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-sm">
            <Crown className="h-4 w-4 text-amber-500" />
            <span>{t("vipBadge")}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight max-w-2xl mx-auto leading-tight">
            {t("heroTitle")}
          </h1>

          <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>

          <LoyaltyHeroCard loyalty={loyalty} />
        </div>
      </div>

      <LoyaltyActivePerksSummary loyalty={loyalty} />

      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
            {t("benefitsTitle")}
          </h2>
          <p className="text-muted-foreground text-xs">{t("benefitsSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {LOYALTY_BENEFITS?.map((benefit, index) => {
            const Icon = benefit?.icon;
            const badgeText = getLocalizedValue(benefit?.badge, locale);
            const titleText = getLocalizedValue(benefit?.title, locale);
            const descText = getLocalizedValue(benefit?.description, locale);

            return (
              <div
                key={index}
                className="bg-card rounded-2xl border border-border/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                      {badgeText}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{titleText}</h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {descText}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-12 space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-foreground">{t("faqTitle")}</h2>
          <p className="text-muted-foreground text-xs">{t("faqSubtitle")}</p>
        </div>

        <div className="bg-card rounded-2xl border border-border/80 divide-y divide-border/60 overflow-hidden shadow-sm">
          {LOYALTY_FAQS?.map((faq, index) => {
            const questionText = getLocalizedValue(faq?.q, locale);
            const answerText = getLocalizedValue(faq?.a, locale);
            const isOpen = openFaq === index;

            return (
              <div key={index} className="p-4 sm:p-5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex items-center justify-between w-full text-left gap-4 font-bold text-sm text-foreground hover:text-primary transition-colors py-1 cursor-pointer"
                >
                  <span className="text-sm font-semibold">{questionText}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed animate-in fade-in duration-200">
                    {answerText}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
