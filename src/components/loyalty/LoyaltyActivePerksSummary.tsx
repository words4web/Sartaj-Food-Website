import Link from "next/link";
import { Truck, Coins, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { ILoyaltyStatus } from "@/types/loyalty/loyalty.types";
import { Button } from "@/components/ui/button";

export function LoyaltyActivePerksSummary({ loyalty }: { loyalty: ILoyaltyStatus }) {
  const t = useTranslations("loyalty");
  const { isActive, freeDeliveriesRemaining, isDoublePointsWeekendActive } = loyalty;

  if (!isActive) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 -mt-4 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-card rounded-2xl border border-border/80 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">
                  {t("freeDeliveryVouchersTitle")}
                </h4>
                <p className="text-xs text-muted-foreground">{t("annualAllowanceReset")}</p>
              </div>
            </div>
            <span className="text-2xl font-black text-primary">{freeDeliveriesRemaining} / 4</span>
          </div>
          <Button asChild className="w-full rounded-xl font-bold gap-1" size="sm">
            <Link href="/products">{t("useFreeDeliveryVoucher")}</Link>
          </Button>
        </div>

        <div className="bg-card rounded-2xl border border-border/80 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Coins className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">{t("doublePointsStatus")}</h4>
                <p className="text-xs text-muted-foreground">{t("weekendCoinBonusRate")}</p>
              </div>
            </div>
            {isDoublePointsWeekendActive ? (
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> {t("doublePointsActive")}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                {t("standardRate")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
