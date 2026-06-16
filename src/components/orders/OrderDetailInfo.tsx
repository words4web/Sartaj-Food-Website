"use client";

import { Calendar, CreditCard, MapPin, Truck, StickyNote, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { OrderDetailInfoProps } from "@/types/order.types";

export function OrderDetailInfo({
  createdAt,
  paymentMethod = "",
  paymentStatus = "",
  shippingAddress,
  trackOrder,
  notes,
  cancelReason,
}: OrderDetailInfoProps) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="md:col-span-2 bg-card border border-border/80 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold">
                {t("orders.orderDate") || "Order Date"}
              </p>
              <p className="font-bold text-foreground">
                {createdAt &&
                  new Date(createdAt)?.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground font-semibold">
                {t("checkout.paymentMethod") || "Payment Method"}
              </p>
              <p className="font-bold text-foreground uppercase">
                {t(`checkout.${paymentMethod}Label`) || paymentMethod}
                <span className="ml-2 text-xs font-normal text-muted-foreground capitalize">
                  ({paymentStatus})
                </span>
              </p>
            </div>
          </div>

          {trackOrder && (
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground font-semibold">
                  {t("orders.trackingNumber") || "Tracking Number"}
                </p>
                <p className="font-bold text-foreground font-mono">{trackOrder}</p>
              </div>
            </div>
          )}

          {notes && (
            <div className="flex items-start gap-3 text-sm">
              <StickyNote className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground font-semibold">
                  {t("orders.notes") || "Notes"}
                </p>
                <p className="text-foreground">{notes}</p>
              </div>
            </div>
          )}

          {cancelReason && (
            <div className="flex items-start gap-3 text-sm">
              <XCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="text-xs text-destructive font-semibold">
                  {t("orders.cancelReason") || "Cancellation Reason"}
                </p>
                <p className="text-destructive/80">{cancelReason}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card border border-border/80 p-6 rounded-3xl shadow-sm">
        <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          {t("orders.deliveryAddress") || "Delivery Address"}
        </h3>
        {shippingAddress ? (
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="font-bold text-foreground">{shippingAddress.fullName}</p>
            <p>{shippingAddress.phone}</p>
            <p className="mt-2 text-xs font-mono">〒{shippingAddress.postalCode}</p>
            <p className="text-xs leading-relaxed">
              {shippingAddress.prefecture} {shippingAddress.city} {shippingAddress.streetAddress}
              {shippingAddress.building && ` ${shippingAddress.building}`}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">No shipping address recorded</p>
        )}
      </div>
    </div>
  );
}
