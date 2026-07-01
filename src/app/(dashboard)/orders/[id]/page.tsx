"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommonError } from "@/components/ui/common-error";
import { useGetOrderById, useCancelOrder } from "@/services/order/order.hooks";
import { ROUTES } from "@/constants/routes";
import { OrderDetailPageProps } from "@/types/order.types";
import { OrderDetailSkeleton } from "@/components/skeletons/OrderDetailSkeleton";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { OrderDetailHeader } from "@/components/orders/OrderDetailHeader";
import { OrderDetailInfo } from "@/components/orders/OrderDetailInfo";
import { OrderDetailItems } from "@/components/orders/OrderDetailItems";
import { OrderDetailSummary } from "@/components/orders/OrderDetailSummary";
import { OrderCancelAlert } from "@/components/orders/OrderCancelAlert";

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const t = useTranslations();
  const { data: order, isLoading, isError, refetch } = useGetOrderById(id);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const cancelOrderMutation = useCancelOrder();

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (isError || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <CommonError
          message="Failed to retrieve order details or order not found."
          onRetry={refetch}
        />
        <div className="mt-6 text-center">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href={ROUTES.ORDERS()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Order History
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const isWithin1Hour = order?.createdAt
    ? Date.now() - new Date(order.createdAt)?.getTime() < 60 * 60 * 1000
    : false;

  const isReasonValid = cancelReason?.trim()?.length >= 10 && cancelReason?.trim()?.length <= 500;

  const handleCancelOrder = async () => {
    if (!isReasonValid) return;

    try {
      await cancelOrderMutation.mutateAsync({
        id: String(id),
        cancelReason: cancelReason?.trim(),
      });
      toast.success(t("orders.cancelSuccess") || "Order cancelled successfully");
      setIsCancelModalOpen(false);
      setCancelReason("");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || t("orders.cancelFailed") || "Failed to cancel order",
      );
    }
  };

  return (
    <main className="relative z-10 min-h-screen bg-muted/30 pb-16">
      <div className="max-w-4xl mx-auto px-2 py-6 sm:py-8">
        <OrderDetailHeader
          orderId={order?.orderId}
          id={id}
          status={order?.status}
          invoiceURL={order?.invoiceURL}
        />

        <OrderDetailInfo
          createdAt={order?.createdAt}
          paymentMethod={order?.paymentMethod}
          paymentStatus={order?.paymentStatus}
          shippingAddress={order?.shippingAddress}
          trackOrder={order?.trackOrder}
          notes={order?.notes}
          cancelReason={order?.cancelReason}
          deliveryDate={order?.deliveryDate}
          deliverySlot={order?.deliverySlot}
        />

        <OrderDetailSummary
          subtotal={order?.subtotal}
          priceBreakdown={order?.priceBreakdown}
          totalAmount={order?.totalAmount}
          couponCode={order?.couponCode}
        />

        <OrderDetailItems items={order?.items} />

        <OrderCancelAlert
          status={order?.status}
          isWithin1Hour={isWithin1Hour}
          onCancelClick={() => setIsCancelModalOpen(true)}
        />

        {/* Cancellation Form Modal */}
        <Dialog open={isCancelModalOpen} onOpenChange={setIsCancelModalOpen}>
          <DialogContent
            aria-describedby={undefined}
            className="max-w-md flex flex-col p-6 overflow-hidden rounded-2xl"
          >
            <DialogHeader className="pb-4 border-b border-border/40 shrink-0">
              <DialogTitle className="text-base font-bold text-foreground">
                {t("orders.cancelOrder") || "Cancel Order"}
              </DialogTitle>
            </DialogHeader>

            <div className="py-4 flex flex-col space-y-4">
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                {t("orders.cancelReasonHelp") ||
                  "Please let us know the reason for cancelling this order. This helps us improve our services."}
              </p>
              <div>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder={
                    t("orders.cancelReasonPlaceholder") ||
                    "Write your cancellation reason here (minimum 10 characters)..."
                  }
                  maxLength={500}
                  rows={4}
                  className="w-full p-3.5 text-sm rounded-xl border border-border/80 bg-background text-foreground focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/60 resize-none font-medium"
                />
                <div className="flex justify-between items-center mt-1.5 px-0.5">
                  <span className="text-[10px] text-rose-500 font-extrabold">
                    {!isReasonValid &&
                      cancelReason?.trim()?.length > 0 &&
                      (cancelReason?.trim()?.length < 10
                        ? t("orders.cancelReasonMinLength") || "Minimum 10 characters required"
                        : t("orders.cancelReasonMaxLength") || "Maximum 500 characters allowed")}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      isReasonValid ? "text-emerald-500" : "text-muted-foreground"
                    }`}
                  >
                    {cancelReason?.length} / 500 {t("orders.characters") || "characters"}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/40 shrink-0 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setCancelReason("");
                }}
                className="rounded-xl text-xs font-semibold px-5"
                disabled={cancelOrderMutation.isPending}
              >
                {t("common.cancel") || "Cancel"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleCancelOrder}
                className="rounded-xl text-xs font-semibold px-6 shadow-sm"
                disabled={!isReasonValid || cancelOrderMutation.isPending}
              >
                {cancelOrderMutation.isPending
                  ? t("orders.cancelling") || "Cancelling..."
                  : t("orders.cancelOrderConfirm") || "Confirm Cancellation"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
