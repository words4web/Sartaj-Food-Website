"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Wallet, ChevronRight, Check } from "lucide-react";
import { CheckoutWalletSelectionProps } from "@/types/checkout/checkout.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function CheckoutWalletSelection({
  applyWallet,
  onToggleWallet,
  walletBalance = 0,
  maxWalletApplicable = 0,
}: CheckoutWalletSelectionProps) {
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);

  const isWalletEmpty = walletBalance <= 0;

  return (
    <>
      <div className="bg-card rounded-2xl border border-border/60 shadow-sm p-4 space-y-2.5 transition-all duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Wallet className="h-4.5 w-4.5 text-primary shrink-0" />
            <h2 className="text-sm font-bold text-foreground">
              {t("walletBalance") || "Wallet Balance"}
            </h2>
          </div>
        </div>

        {isWalletEmpty ? (
          <div className="w-full border border-dashed border-border/60 rounded-xl p-3 flex items-center justify-between gap-3 bg-muted/5 opacity-50 cursor-not-allowed select-none">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                <Wallet className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-muted-foreground text-xs leading-normal">
                  {t("wallet") || "Use Wallet Balance"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal font-medium">
                  Available: ¥{walletBalance?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ) : applyWallet ? (
          <div
            onClick={() => setIsOpen(true)}
            className="group border border-primary/20 bg-primary/[0.01] hover:bg-primary/[0.02] rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
                <Check className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground text-xs leading-normal">
                  {t("useWallet") || "Wallet Applied"}
                </p>
                <p className="text-muted-foreground text-[10px] mt-0.5 truncate leading-normal font-medium">
                  ¥{maxWalletApplicable?.toLocaleString()} applied to this order
                </p>
              </div>
            </div>

            <span className="text-primary group-hover:text-primary/80 text-[10px] font-bold shrink-0 select-none whitespace-nowrap">
              {tCommon("edit") || "Change"}
            </span>
          </div>
        ) : (
          /* Empty Placeholder Card View as a Button */
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full text-left group border border-dashed border-border/80 hover:border-primary/40 hover:bg-primary/[0.01] rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
                <Wallet className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground text-xs leading-normal">
                  {t("wallet") || "Use Wallet Balance"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal font-medium">
                  Available: ¥{walletBalance?.toLocaleString()}
                </p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors shrink-0" />
          </button>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md flex flex-col p-6 overflow-hidden rounded-2xl">
          <DialogHeader className="pb-4 border-b border-border/40 shrink-0">
            <DialogTitle className="text-base font-bold text-foreground">
              {t("wallet") || "Use Wallet Balance"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
              <Wallet className="h-7 w-7" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground font-semibold">
                Available Wallet Balance
              </p>
              <p className="text-3xl font-black text-foreground mt-1">
                ¥{walletBalance?.toLocaleString()}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                Max applicable for this order:{" "}
                <span className="text-foreground font-semibold">
                  ¥{maxWalletApplicable?.toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          <div className="py-2">
            <div
              onClick={() => onToggleWallet(!applyWallet)}
              className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200 select-none ${
                applyWallet
                  ? "border-primary bg-primary/[0.02] ring-1 ring-primary"
                  : "border-border/60 hover:border-muted-foreground/25 hover:bg-muted/5 bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={applyWallet}
                  readOnly
                  className="h-4.5 w-4.5 cursor-pointer accent-primary rounded-md shrink-0"
                />
                <div className="text-xs">
                  <p className="font-bold text-foreground">
                    {applyWallet ? "Wallet Applied" : "Apply Wallet Balance"}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                    {applyWallet
                      ? `¥${maxWalletApplicable?.toLocaleString()} applied to this order`
                      : `Use up to ¥${maxWalletApplicable?.toLocaleString()} from your wallet`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/40 shrink-0 flex justify-end">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl text-xs font-semibold px-6"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
