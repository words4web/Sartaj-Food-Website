import { useTranslations } from "next-intl";
import { ArrowDownLeft, ArrowUpRight, Calendar, Receipt } from "lucide-react";
import { WalletTransactionListProps } from "@/types/wallet.types";

export function WalletTransactionList({
  transactions = [],
  isTxLoading = false,
}: WalletTransactionListProps) {
  const t = useTranslations();

  const TRANSACTION_TYPE_LABELS: Record<string, string> = {
    ORDER_REWARD: t("wallet.orderReward") || "Order Reward",
    ORDER_PAYMENT: t("wallet.orderPayment") || "Order Payment",
    ORDER_PAYMENT_REFUND: t("wallet.paymentRefund") || "Payment Refund",
    ORDER_REWARD_CLAWBACK: t("wallet.rewardClawback") || "Reward Clawback",
    MANUAL_CREDIT: t("wallet.manualCredit") || "Manual Credit",
    MANUAL_DEBIT: t("wallet.manualDebit") || "Manual Debit",
  };

  if (!isTxLoading && transactions?.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center gap-3">
        <Receipt className="h-8 w-8 text-muted-foreground/30" />
        <p className="text-xs text-muted-foreground font-medium">
          {t("wallet.noTransactionsDesc") || "No transactions recorded in this wallet yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/40">
      {transactions?.map((tx: any, index: number) => {
        const isCredit = tx?.direction === "CREDIT";
        const amountStr = `${isCredit ? "+" : "-"}¥${tx?.amount?.toLocaleString()}`;
        const desc =
          tx?.description ||
          (isCredit
            ? t("wallet.refundRewardCredit") || "Refund/Reward Credit"
            : t("wallet.orderSettlement") || "Order Settlement");
        const dateStr = tx?.createdAt ? new Date(tx?.createdAt)?.toLocaleDateString() : "";
        const badgeLabel =
          TRANSACTION_TYPE_LABELS[tx?.type] ||
          tx?.type?.replace(/_/g, " ") ||
          (isCredit ? t("wallet.credit") || "Credit" : t("wallet.debit") || "Debit");

        return (
          <div
            key={tx?._id || index}
            className="px-6 py-4.5 flex items-center justify-between gap-4 hover:bg-muted/10 transition-colors duration-150"
          >
            <div className="flex items-center gap-4 min-w-0">
              {/* Direction Icon Badge */}
              <div
                className={`h-9 w-9 rounded-full shrink-0 flex items-center justify-center border ${
                  isCredit
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
                }`}
              >
                {isCredit ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </div>

              {/* Details Info */}
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <p className="text-sm font-semibold text-foreground truncate">{badgeLabel}</p>
                  {tx?.orderDisplayId && (
                    <span className="text-[10px] font-mono font-bold bg-muted border border-border/80 text-muted-foreground px-1.5 py-0.5 rounded-md">
                      {t("wallet.orderNo", { orderId: tx.orderDisplayId }) ||
                        `Order #${tx.orderDisplayId}`}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate max-w-sm sm:max-w-md">
                  {desc}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground/80 font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                    <span>{dateStr}</span>
                  </div>
                  <span className="text-border/85">•</span>
                  <span>
                    {t("wallet.before", { amount: tx?.balanceBefore?.toLocaleString() }) ||
                      `Before: ¥${tx?.balanceBefore?.toLocaleString()}`}
                  </span>
                  <span className="text-border/85">•</span>
                  <span>
                    {t("wallet.after", { amount: tx?.balanceAfter?.toLocaleString() }) ||
                      `After: ¥${tx?.balanceAfter?.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span
                className={`text-base font-semibold tracking-tight ${
                  isCredit
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {amountStr}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
