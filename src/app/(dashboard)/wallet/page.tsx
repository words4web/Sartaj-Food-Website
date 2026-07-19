"use client";

import { useTranslations } from "next-intl";
import { useSearchParams, usePathname } from "next/navigation";
import { useGetWalletBalance, useGetWalletTransactions } from "@/services/wallet/wallet.hooks";
import { Wallet2, Receipt } from "lucide-react";
import { WalletStatsCards } from "@/components/wallet/WalletStatsCards";
import { WalletTransactionList } from "@/components/wallet/WalletTransactionList";
import { WalletSkeleton } from "@/components/wallet/WalletSkeleton";
import { PaginationControls } from "@/components/common/PaginationControls";

const LIMIT = 20;

export default function WalletPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams?.get("page") ?? 1);

  const { data: walletData, isLoading: isBalanceLoading } = useGetWalletBalance();
  const { data: transactionsData, isLoading: isTxLoading } = useGetWalletTransactions({
    page,
    limit: LIMIT,
  });

  const balance = walletData?.balance ?? 0;

  const transactions = transactionsData?.data ?? [];
  const meta = transactionsData?.meta ?? {};
  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 0;

  if (isBalanceLoading && page === 1) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
        <WalletSkeleton />
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 min-h-screen space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Wallet2 className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">{t("wallet.wallet") || "My Wallet"}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("wallet.description") || "Wallet balance and transaction history logs"}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <WalletStatsCards
        balance={balance}
        total={total}
        transactionsCount={transactions?.length}
        isBalanceLoading={isBalanceLoading}
        isTxLoading={isTxLoading}
      />

      {/* Transaction History List */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-6 py-4.5 border-b border-border/50">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Receipt className="w-4 h-4 text-muted-foreground" />
            {t("wallet.transactionHistory") || "Transaction History"}
          </h3>
        </div>

        <WalletTransactionList transactions={transactions} isTxLoading={isTxLoading} />

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border/40 flex justify-center sm:justify-between items-center flex-wrap gap-4 bg-muted/5">
            <p className="text-xs text-muted-foreground font-medium">
              {t("wallet.showingTransactions", { count: transactions?.length, total: total }) ||
                `Showing ${transactions?.length} of ${total} transactions`}
            </p>
            <PaginationControls
              currentPage={page}
              totalPages={totalPages}
              createPageUrl={(pageNum) => {
                const params = new URLSearchParams(searchParams?.toString() ?? "");
                params.set("page", pageNum.toString());
                return `${pathname}?${params.toString()}`;
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
