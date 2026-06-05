"use client";

import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MOCK_ORDERS } from "@/data/ordersData";
import { getOrderStatusColor } from "@/lib/utils";

export default function OrdersPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t("orders.orderHistory")}</h1>

        {MOCK_ORDERS.length > 0 ? (
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                className="bg-card rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-foreground">{order.id}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{order.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items} {t("cart.items")}
                    </p>
                  </div>

                  <div className="mb-4 md:mb-0 text-center">
                    <p className="text-sm text-muted-foreground mb-1">{t("orders.status")}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="mb-4 md:mb-0 text-right">
                    <p className="text-sm text-muted-foreground mb-1">{t("cart.total")}</p>
                    <p className="text-xl font-bold text-foreground">{order.total}</p>
                  </div>

                  <Button size="sm">{t("orders.orderDetail")}</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-lg shadow p-12 text-center">
            <p className="text-muted-foreground mb-4">{t("orders.noOrders")}</p>
            <Button variant="link" asChild>
              <Link href={ROUTES.PRODUCTS}>{t("cart.continueShipping")}</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
