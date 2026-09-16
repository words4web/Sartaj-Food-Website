import Link from "next/link";
import { Crown, Truck, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ILoyaltyStatus } from "@/types/loyalty/loyalty.types";
import { formatYen } from "@/utils/format/format.utils";
import { Button } from "@/components/ui/button";
import { VipMembershipCard } from "./VipMembershipCard";

export function LoyaltyHeroCard({ loyalty }: { loyalty: ILoyaltyStatus }) {
  const t = useTranslations("loyalty");
  const {
    isActive,
    cumulativeSpend,
    qualificationThreshold,
    spendNeeded,
    progressPercentage,
    qualifiedAt,
  } = loyalty;

  if (isActive) {
    return <VipMembershipCard loyalty={loyalty} />;
  }

  return (
    <div className="mt-6 max-w-xl mx-auto bg-card rounded-2xl sm:rounded-3xl border border-amber-500/30 p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-5 text-left relative overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-1.5 sm:gap-2">
            <Crown className="h-4 w-4 text-amber-500 shrink-0" />
            <span>{t("yourVipProgress")}</span>
          </h3>
          <p className="text-[11px] sm:text-xs text-muted-foreground">
            {t("accumulatedSpendNote")}
          </p>
        </div>
        <span className="text-2xl sm:text-3xl font-black text-primary shrink-0">
          {progressPercentage}%
        </span>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex justify-between text-[11px] sm:text-xs font-bold">
          <span className="text-foreground">
            {t("amountSpent", { amount: formatYen(cumulativeSpend) })}
          </span>
          <span className="text-muted-foreground font-semibold">
            {t("thresholdTarget", { amount: formatYen(qualificationThreshold) })}
          </span>
        </div>
        <div className="h-2.5 sm:h-3 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border/60">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${Math.max(4, progressPercentage)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] sm:text-[11px] font-semibold text-muted-foreground pt-0.5">
          <span>{t("currentProgress")}</span>
          <span className="text-amber-600 dark:text-amber-400 font-bold">
            {t("vipStatusLabel")}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <Truck className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground font-medium leading-tight">
            {t.rich("spendMoreToUnlock", {
              amount: formatYen(spendNeeded),
              strong: (chunks) => <strong className="text-primary font-bold">{chunks}</strong>,
            })}
          </p>
        </div>
        <Button
          asChild
          size="default"
          className="w-full sm:w-auto rounded-xl font-bold gap-2 shrink-0 bg-primary hover:bg-primary/90 shadow-md justify-center"
        >
          <Link href="/products">
            <span>{t("shopAndEarn")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
