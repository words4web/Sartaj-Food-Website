"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Wallet, AlertCircle } from "lucide-react";
import { CheckoutWalletSelectionProps } from "@/types/checkout/checkout.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

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
  const applicableAmount = Math.min(walletBalance, maxWalletApplicable);
  const canUseWallet = applicableAmount > 0;

  const handleToggle = (checked: boolean) => {
    if (!canUseWallet) return;
    if (checked) {
      setIsOpen(true);
    } else {
      onToggleWallet(false);
    }
  };

  const handleConfirm = () => {
    onToggleWallet(true);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`bg-card rounded-2xl border border-border/60 shadow-sm p-4 space-y-2.5 transition-all duration-300 ${!canUseWallet ? "opacity-60" : ""}`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <Wallet className="h-4.5 w-4.5 text-primary shrink-0" />
            <h2 className="text-sm font-bold text-foreground">
              {t("walletBalance") || "Wallet Balance"}
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 select-none ${applyWallet ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
            >
              <Wallet className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0 text-left">
              <p className="font-bold text-foreground text-xs leading-normal">
                {applyWallet
                  ? t("useWallet") || "Wallet Applied"
                  : t("wallet") || "Use Wallet Balance"}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal font-medium">
                {isWalletEmpty
                  ? "Available: ¥0"
                  : applyWallet
                    ? `¥${applicableAmount?.toLocaleString()} applied to this order`
                    : maxWalletApplicable <= 0
                      ? `Available: ¥${walletBalance?.toLocaleString()} (Not applicable)`
                      : `Available: ¥${walletBalance?.toLocaleString()} (Max: ¥${applicableAmount?.toLocaleString()})`}
              </p>
            </div>
          </div>

          <Switch
            checked={applyWallet}
            onCheckedChange={handleToggle}
            disabled={!canUseWallet}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Wallet Enable Confirmation Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="max-w-md flex flex-col p-6 overflow-hidden rounded-2xl"
        >
          <DialogHeader className="pb-4 border-b border-border/40 shrink-0">
            <DialogTitle className="text-base font-bold text-foreground">
              {t("useWallet") || "Use Wallet"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
              <Wallet className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-semibold">
                Available Wallet Balance
              </p>
              <p className="text-3xl font-black text-foreground">
                ¥{walletBalance?.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground font-medium max-w-xs pt-2">
                Are you sure you want to use your wallet balance?
                <span className="text-foreground font-bold">
                  ¥{applicableAmount?.toLocaleString()}
                </span>
                will be applied to this order.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border/40 shrink-0 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="rounded-xl text-xs font-semibold px-5 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {tCommon("cancel") || "Cancel"}
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="rounded-xl text-xs font-semibold px-6 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {tCommon("confirm") || "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
