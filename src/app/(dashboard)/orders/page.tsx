"use client";

import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetOrders } from "@/services/order/order.hooks";
import { CommonError } from "@/components/ui/common-error";
import { OrderListSkeleton } from "@/components/skeletons/OrderListSkeleton";
import { ShoppingBag, ClipboardList } from "lucide-react";
import { OrderTab } from "@/types/order.types";
import { OrderTabs } from "@/components/orders/OrderTabs";
import { OrderCard } from "@/components/orders/OrderCard";

export default function OrdersPage() {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<OrderTab>(OrderTab.ACTIVE);
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetOrders({
    orderTab: activeTab,
    page,
    limit,
  });

  const orders = response?.orders || [];
  const meta = response?.meta || { total: 0, page: 1, limit: 10, totalPages: 1 };

  const handleTabChange = (tab: OrderTab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <main className="relative z-10 min-h-screen bg-muted/30 pb-16">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight flex items-center gap-2.5">
              <ClipboardList className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
              {t("orders.orderHistory") || "Order History"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {activeTab === OrderTab.ACTIVE &&
                `${meta?.total} active order${meta?.total === 1 ? "" : "s"}`}
              {activeTab === OrderTab.COMPLETED &&
                `${meta?.total} completed order${meta?.total === 1 ? "" : "s"}`}
              {activeTab === OrderTab.CANCELLED &&
                `${meta?.total} cancelled order${meta?.total === 1 ? "" : "s"}`}
            </p>
          </div>
        </div>

        <OrderTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {isLoading ? (
          <OrderListSkeleton />
        ) : isError ? (
          <div className="bg-card border border-border/60 rounded-3xl p-10 text-center shadow-sm">
            <CommonError message="Failed to retrieve order history." onRetry={refetch} />
          </div>
        ) : orders?.length === 0 ? (
          /* Empty State */
          <div className="bg-card border border-border/60 rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto my-8">
            <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-black text-foreground mb-2">
              {t("orders.noOrders") || "No orders yet"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {activeTab === OrderTab.ACTIVE
                ? "You don't have any active orders right now."
                : activeTab === OrderTab.COMPLETED
                  ? "You haven't completed any orders yet."
                  : "You don't have any cancelled orders."}
            </p>
            <Button asChild className="rounded-xl px-6 h-11 font-bold shadow-md hover:shadow-lg">
              <Link href={ROUTES.PRODUCTS()}>{t("cart.continueShipping") || "Start Shopping"}</Link>
            </Button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {orders?.map((order) => (
              <OrderCard key={order?._id} order={order} />
            ))}

            {/* Pagination Controls */}
            {meta?.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="rounded-xl font-bold h-9 px-3"
                >
                  Previous
                </Button>

                {Array.from({ length: meta?.totalPages })?.map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className={`w-9 h-9 rounded-xl p-0 font-bold ${
                        page === pageNum
                          ? "shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((prev) => Math.min(prev + 1, meta?.totalPages))}
                  disabled={page === meta?.totalPages}
                  className="rounded-xl font-bold h-9 px-3"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
