import Link from "next/link";
import { Crown, CreditCard, Truck, ArrowRight } from "lucide-react";
import { ILoyaltyStatus } from "@/types/loyalty/loyalty.types";
import { formatYen } from "@/utils/format/format.utils";
import { Button } from "@/components/ui/button";

export function LoyaltyHeroCard({ loyalty }: { loyalty: ILoyaltyStatus }) {
  const {
    isActive,
    cumulativeSpend,
    qualificationThreshold,
    spendNeeded,
    progressPercentage,
    qualifiedAt,
  } = loyalty;

  if (isActive) {
    return (
      <div className="mt-6 max-w-xl mx-auto bg-gradient-to-r from-amber-500/20 via-primary/20 to-amber-500/20 border border-amber-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl backdrop-blur-xl space-y-4 relative overflow-hidden text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-300 shrink-0">
              <Crown className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-foreground">
                Welcome, Sartaj Family VIP!
              </h3>
              <p className="text-xs text-muted-foreground">
                Qualified on{" "}
                {qualifiedAt
                  ? new Date(qualifiedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Member"}
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm shrink-0">
            VIP Active
          </span>
        </div>
        <div className="pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium">
            <CreditCard className="h-3.5 w-3.5 text-amber-500 shrink-0" /> Digital VIP Membership
            Activated
          </span>
          <span className="font-bold text-primary font-mono text-[11px] sm:text-xs">
            SARTAJ-VIP-{qualifiedAt ? new Date(qualifiedAt).getFullYear() : "MEMBER"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-xl mx-auto bg-card rounded-2xl sm:rounded-3xl border border-amber-500/30 p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-5 text-left relative overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-1.5 sm:gap-2">
            <Crown className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Your VIP Progress</span>
          </h3>
          <p className="text-[11px] sm:text-xs text-muted-foreground">
            Accumulated spend from all delivered orders
          </p>
        </div>
        <span className="text-2xl sm:text-3xl font-black text-primary shrink-0">
          {progressPercentage}%
        </span>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex justify-between text-[11px] sm:text-xs font-bold">
          <span className="text-foreground">{formatYen(cumulativeSpend)} spent</span>
          <span className="text-muted-foreground font-semibold">
            {formatYen(qualificationThreshold)} threshold
          </span>
        </div>
        <div className="h-2.5 sm:h-3 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border/60">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${Math.max(4, progressPercentage)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] sm:text-[11px] font-semibold text-muted-foreground pt-0.5">
          <span>Current Progress</span>
          <span className="text-amber-600 dark:text-amber-400 font-bold">VIP Status</span>
        </div>
      </div>

      <div className="pt-3 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <Truck className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground font-medium leading-tight">
            Spend <strong className="text-primary font-bold">{formatYen(spendNeeded)}</strong> more
            to unlock 4 Free Shipping Vouchers.
          </p>
        </div>
        <Button
          asChild
          size="default"
          className="w-full sm:w-auto rounded-xl font-bold gap-2 shrink-0 bg-primary hover:bg-primary/90 shadow-md justify-center"
        >
          <Link href="/products">
            <span>Shop & Earn</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
