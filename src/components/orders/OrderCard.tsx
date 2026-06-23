"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { getOrderStatusColor, formatOrderStatus } from "@/utils/common/common.utils";
import { ThemedImage } from "@/components/common";
import { Calendar, CreditCard, Download, ChevronRight } from "lucide-react";
import type { OrderCardProps } from "@/types/order.types";

export function OrderCard({ order }: OrderCardProps) {
  const t = useTranslations();

  const getProductName = (name: any) => {
    if (typeof name === "object") {
      return name?.en || name?.ja || name?.hi || name?.bn || name?.ne || "Product";
    }
    return name || "Product";
  };

  return (
    <div className="bg-card border border-border/60 p-6 rounded-3xl shadow-sm hover:shadow-md hover:border-primary/25 transition-all duration-300 flex flex-col gap-5">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <h3 className="font-extrabold text-foreground text-base tracking-tight font-mono">
            #{order?.orderId || order?._id}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
            <Calendar className="h-3.5 w-3.5" />
            {t("orders.orderDate") || "Order Date"}:{" "}
            {new Date(order?.createdAt)?.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <span
          className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider self-start sm:self-auto ${getOrderStatusColor(
            order?.status,
          )}`}
        >
          {formatOrderStatus(order?.status)}
        </span>
      </div>

      <div className="border-t border-border/40" />

      {/* Order Items Preview */}
      <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
        <div className="flex -space-x-3 overflow-hidden shrink-0">
          {order?.items?.slice(0, 4)?.map((item, pIdx) => (
            <div
              key={item?.product?._id || pIdx}
              className="relative h-12 w-12 rounded-xl ring-2 ring-background shrink-0 border border-border/40 bg-muted/20 flex items-center justify-center p-1.5 overflow-hidden"
            >
              <ThemedImage
                src={item?.product?.images?.[0]}
                alt={getProductName(item?.product?.name)}
                className="max-h-full max-w-full object-contain"
                fallbackType="product"
              />
            </div>
          ))}
          {order?.items?.length > 4 && (
            <div className="relative h-12 w-12 rounded-xl ring-2 ring-background shrink-0 bg-muted border border-border/40 flex items-center justify-center text-xs font-black text-muted-foreground">
              +{order?.items?.length - 4}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-foreground text-sm truncate">
            {getProductName(order?.items?.[0]?.product?.name)}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            {order?.items?.length === 1
              ? t("cart.item") || "1 item"
              : `${order?.items?.length} ${t("cart.items") || "items"}`}
          </p>
        </div>
      </div>

      <div className="border-t border-border/40" />

      {/* Order Footer / Pricing & Actions */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-1">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="text-sm">
            <span className="text-xs text-muted-foreground font-semibold block mb-0.5">
              {t("checkout.paymentMethod") || "Payment Method"}
            </span>
            <div className="flex items-center gap-1.5 font-extrabold text-foreground text-xs sm:text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="uppercase">
                {t(`checkout.${order?.paymentMethod}Label`) || order?.paymentMethod}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  order?.paymentStatus === "paid"
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                    : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                }`}
              >
                {t(`orders.${order?.paymentStatus}`) || order?.paymentStatus}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground font-semibold block mb-0.5">
              {t("cart.total") || "Total"}
            </span>
            <span className="text-lg sm:text-xl font-black text-primary">
              ¥{order?.totalAmount?.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {order?.invoiceURL && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl flex-1 sm:flex-initial h-10 px-4 gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground border-border/80"
              asChild
            >
              <a href={order?.invoiceURL} target="_blank" rel="noopener noreferrer">
                <Download className="h-3.5 w-3.5" />
                {t("orders.downloadInvoice") || "Invoice"}
              </a>
            </Button>
          )}
          <Button
            size="sm"
            className="rounded-xl flex-1 sm:flex-initial h-10 px-5 gap-1.5 text-xs font-bold shadow-sm hover:shadow transition-all"
            asChild
          >
            <Link href={ROUTES.ORDERS(order?._id)}>
              {t("orders.orderDetail") || "View Details"}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
