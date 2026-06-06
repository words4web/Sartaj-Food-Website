"use client";

import { useState } from "react";
import { ProductCard } from "@/components/common/ProductCard";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { ProductSectionProps } from "@/types/product/product.types";
import { Button } from "@/components/ui/button";
import { useGetFilteredProducts } from "@/services/product/product.hooks";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";

export function ProductSection({ title, badge, showTabs = false }: ProductSectionProps) {
  const [activeTab, setActiveTab] = useState("all");
  const t = useTranslations();

  const {
    data: apiProducts,
    isLoading,
    isError,
    refetch,
  } = useGetFilteredProducts(badge ? { badge } : undefined);

  const productsToRender = apiProducts || [];

  const displayTitle =
    title === "Popular Products"
      ? t("home.popularProducts")
      : title === "Featured Products"
        ? t("home.featuredProducts")
        : title === "Hot Products"
          ? t("home.hotProducts")
          : title === "New Arrivals"
            ? t("home.newArrivals")
            : title;

  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">{displayTitle}</h2>
          <Link
            href={ROUTES.PRODUCTS}
            className="text-primary hover:text-primary font-medium text-sm"
          >
            {t("common.viewAll")}
          </Link>
        </div>

        {/* Tabs */}
        {showTabs && (
          <div className="flex gap-6 mb-8 border-b border-border">
            {["All", "Featured", "Popular"]?.map((tab) => {
              const tabLabel =
                tab === "All"
                  ? t("common.all")
                  : tab === "Featured"
                    ? t("home.featuredProducts")
                    : t("home.popularProducts");
              return (
                <Button
                  key={tab}
                  variant={activeTab === tab?.toLowerCase() ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab?.toLowerCase())}
                  className={`rounded-none border-b-2 ${
                    activeTab === tab?.toLowerCase() ? "border-primary" : "border-transparent"
                  }`}
                >
                  {tabLabel}
                </Button>
              );
            })}
          </div>
        )}

        {/* Products Grid / Loading State */}
        {isLoading ? (
          <ProductGridSkeleton count={5} />
        ) : isError ? (
          <CommonError onRetry={refetch} message="Could not load products." />
        ) : productsToRender?.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center bg-card rounded-xl border border-dashed border-border p-8">
            <span className="text-4xl mb-3">📦</span>
            <p className="text-muted-foreground text-sm font-medium">{t("common.noResults")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {productsToRender?.map((product) => (
              <ProductCard
                key={product?._id || product?.id}
                product={product}
                badgeOverride={badge}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
