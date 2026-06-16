"use client";

import Link from "next/link";
import { ArrowLeft, Package, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/constants/routes";
import { getOrderStatusColor, formatOrderStatus } from "@/utils/common/common.utils";
import type { OrderDetailHeaderProps } from "@/types/order.types";

export function OrderDetailHeader({
  orderId,
  id,
  status = "",
  invoiceURL,
}: OrderDetailHeaderProps) {
  const t = useTranslations();

  return (
    <div className="space-y-6 mb-8">
      <Link
        href={ROUTES.ORDERS()}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("orders.orderHistory") || "Order History"}
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            {t("orders.orderDetail") || "Order Details"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">#{orderId || id}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${getOrderStatusColor(status)}`}
          >
            {formatOrderStatus(status)}
          </span>
          {invoiceURL && (
            <a
              href={invoiceURL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              {t("orders.downloadInvoice") || "Invoice"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
