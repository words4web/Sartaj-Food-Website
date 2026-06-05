"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { SAMPLE_PRODUCTS } from "@/data/homeData";
import { useTranslations } from "next-intl";
import { ProductSectionProps } from "@/types/product.types";
import { Button } from "@/components/ui/button";

export function ProductSection({ title, showTabs = false }: ProductSectionProps) {
  const [activeTab, setActiveTab] = useState("all");
  const t = useTranslations();

  const displayTitle =
    title === "Popular Products"
      ? t("home.popularProducts")
      : title === "Featured Products"
        ? t("home.featuredProducts")
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
            {["All", "Featured", "Popular"].map((tab) => {
              const tabLabel =
                tab === "All"
                  ? t("common.all")
                  : tab === "Featured"
                    ? t("home.featuredProducts")
                    : t("home.popularProducts");
              return (
                <Button
                  key={tab}
                  variant={activeTab === tab.toLowerCase() ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`rounded-none border-b-2 ${
                    activeTab === tab.toLowerCase() ? "border-primary" : "border-transparent"
                  }`}
                >
                  {tabLabel}
                </Button>
              );
            })}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
