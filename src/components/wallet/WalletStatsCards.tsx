import { useTranslations } from "next-intl";
import { Wallet2, TrendingUp, TrendingDown } from "lucide-react";
import { WalletStatsCardsProps } from "@/types/wallet.types";

export function WalletStatsCards({
  balance = 0,
  total = 0,
  transactionsCount = 0,
  isBalanceLoading = false,
  isTxLoading = false,
}: WalletStatsCardsProps) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Available Balance Card */}
      <div className="sm:col-span-1 overflow-hidden rounded-2xl border-0 shadow bg-gradient-to-br from-primary to-primary/80 p-5 text-white">
        <span className="text-[11px] font-medium text-white/80 flex items-center gap-2">
          <Wallet2 className="w-4 h-4" />
          {t("wallet.currentBalance") || "Current Balance"}
        </span>
        <div className="mt-3">
          {isBalanceLoading ? (
            <div className="h-9 w-28 bg-white/20 rounded animate-pulse" />
          ) : (
            <p className="text-2xl font-bold tracking-tight text-white">
              ¥{balance?.toLocaleString()}
            </p>
          )}
          <p className="text-[10px] text-white/60 mt-1">
            {t("wallet.availableCoins") || "Available coins"}
          </p>
        </div>
      </div>

      {/* Total Transactions Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
        <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          {t("wallet.totalTransactions") || "Total Transactions"}
        </span>
        <div className="mt-3">
          {isTxLoading ? (
            <div className="h-9 w-16 bg-muted rounded animate-pulse" />
          ) : (
            <p className="text-2xl font-bold text-foreground">{total}</p>
          )}
          <p className="text-[10px] text-muted-foreground mt-1">
            {t("wallet.allTime") || "All time"}
          </p>
        </div>
      </div>

      {/* Showing Items Card */}
      <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
        <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-primary" />
          {t("wallet.showing") || "Showing"}
        </span>
        <div className="mt-3">
          {isTxLoading ? (
            <div className="h-9 w-16 bg-muted rounded animate-pulse" />
          ) : (
            <p className="text-2xl font-bold text-foreground">{transactionsCount}</p>
          )}
          <p className="text-[10px] text-muted-foreground mt-1">
            {t("wallet.recentLogs") || "Recent logs"}
          </p>
        </div>
      </div>
    </div>
  );
}
