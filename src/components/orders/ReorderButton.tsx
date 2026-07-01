"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { RefreshCw, Loader2 } from "lucide-react";
import { useReorderToCart } from "@/services/order/order.hooks";

interface ReorderButtonProps {
  orderId: string;
  itemsCount: number;
}

export function ReorderButton({ orderId, itemsCount }: ReorderButtonProps) {
  const t = useTranslations();
  const router = useRouter();
  const reorderMutation = useReorderToCart();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleReorder = () => {
    setIsConfirmOpen(false);
    reorderMutation.mutate(orderId, {
      onSuccess: (data) => {
        toast.success(data?.message || "Items merged into cart successfully!");
        router.push(ROUTES.CART);
      },
      onError: (err: any) => {
        const apiMsg = err?.response?.data?.message || err?.message;
        toast.error(apiMsg || "Failed to reorder items to cart.");
      },
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={reorderMutation.isPending}
        onClick={() => setIsConfirmOpen(true)}
        className="rounded-xl flex-1 sm:flex-initial h-10 px-4 gap-1.5 text-xs font-bold border-primary/30 text-primary hover:bg-primary/5 hover:text-primary transition-all duration-200 hover:cursor-pointer"
      >
        {reorderMutation.isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <RefreshCw className="h-3.5 w-3.5" />
        )}
        {t("orders.reorder") || "Reorder"}
      </Button>

      <ConfirmModal
        open={isConfirmOpen}
        title={t("orders.reorderConfirmTitle") || "Reorder Products"}
        description={
          <div className="whitespace-pre-line">
            {t("orders.reorderProceed", { count: itemsCount })}
          </div>
        }
        confirmLabel={t("orders.proceed") || "Proceed"}
        cancelLabel={t("common.cancel") || "Cancel"}
        isLoading={reorderMutation.isPending}
        onConfirm={handleReorder}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
