"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useGetProductsByIds } from "@/services/product/product.hooks";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useCachedSkeletonCount } from "@/hooks/useCachedSkeletonCount";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { IProduct } from "@/types/product/product.types";
import { ArrowLeft, Sparkles, Filter, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import navratriData from "@/data/navratri-sale.json";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

export default function NavratriPage() {
  const tCommon = useTranslations("common");
  const tNavratri = useTranslations("navratri");
  const isDesktop = useIsDesktop();
  const [activeTab, setActiveTab] = useState("All Offers");

  const {
    data: productsByIds,
    isLoading,
    isError,
    refetch,
  } = useGetProductsByIds(navratriData.PRODUCT_IDS);

  const inStockProducts: IProduct[] = [];
  const outOfStockProducts: IProduct[] = [];
  const seenIds = new Set<string>();

  const rawProducts = (productsByIds || []) as IProduct[];
  for (const product of rawProducts) {
    const id = (product?._id || product?.id) as string;
    if (id && !seenIds.has(id)) {
      seenIds.add(id);
      if (product?.stockStatus === "out_of_stock") {
        outOfStockProducts.push(product);
      } else {
        inStockProducts.push(product);
      }
    }
  }

  const allSortedProducts = [...inStockProducts, ...outOfStockProducts];

  const skeletonCount = useCachedSkeletonCount(
    "sartaj_products_count_navratri_page",
    allSortedProducts?.length,
    8,
  );

  const filteredProducts = allSortedProducts.filter((product) => {
    if (activeTab === "All Offers") return true;
    const categoriesMap = navratriData.CATEGORIES_MAP as Record<string, string>;
    const id = (product?._id || product?.id || "") as string;
    const cat = categoriesMap[id];
    return cat === activeTab;
  });

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case "All Offers":
        return tNavratri("filterAll") || "All Offers";
      case "Vrat & Fasting":
        return tNavratri("tabVrat") || "Vrat & Fasting";
      case "Puja Samagri":
        return tNavratri("tabPuja") || "Puja Samagri";
      case "Sweets & Snacks":
        return tNavratri("tabSweets") || "Sweets & Snacks";
      case "Beverages & Juices":
        return tNavratri("tabBeverages") || "Beverages & Juices";
      default:
        return tab;
    }
  };

  return (
    <main className="min-h-screen bg-card pb-16 sm:pb-24">
      <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/15 via-background to-orange-500/15 py-12 md:py-16 border-b border-border/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute -left-20 top-[-20%] w-[380px] h-[380px] rounded-full bg-amber-500/15 blur-[90px] pointer-events-none" />
        <div className="absolute -right-20 bottom-[-20%] w-[380px] h-[380px] rounded-full bg-rose-500/15 blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {tCommon("backToHome") || "Back to Home"}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 lg:col-span-8 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2.5 bg-amber-500/15 border border-amber-500/30 px-4 py-1.5 rounded-full shadow-sm">
                <Sparkles
                  className="h-4 w-4 text-amber-600 dark:text-amber-400 animate-spin"
                  style={{ animationDuration: "6s" }}
                />
                <span className="text-xs uppercase tracking-widest font-black text-amber-700 dark:text-amber-400">
                  {tNavratri("badge") || "Navratri Mahotsav Special"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent animate-text-shimmer">
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                  @keyframes textShimmer {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                  .animate-text-shimmer {
                    background-size: 200% auto;
                    animation: textShimmer 4s ease infinite;
                  }
                `,
                  }}
                />
                {tNavratri("heroTitle") || "Celebrate Navratri with Purity & Devotion"}
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
                {tNavratri("heroSubtitle") ||
                  "Explore authentic Vrat & Fasting essentials, sacred Puja Samagri kits, divine sweets, snacks, and refreshing juices delivered across Japan."}
              </p>
            </div>

            <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[360px] flex items-center justify-center bg-amber-500/10 dark:bg-amber-500/15 rounded-full border border-amber-500/25 p-4 shadow-inner shadow-amber-500/20 hover:scale-105 transition-transform duration-500">
                <DotLottieReact
                  src={navratriData.ANIMATION_PATH}
                  loop
                  autoplay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border/40 pb-6 mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2.5">
              <Sparkles className="h-6 w-6 text-amber-500 animate-pulse" />
              {tNavratri("sectionTitle") || "Navratri Festive Collection"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {tNavratri("sectionSubtitle") ||
                "Hand-picked essentials for your fast, daily puja, and festive feast."}
            </p>
          </div>
          {!isLoading && !isError && filteredProducts?.length > 0 && (
            <span className="text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full border border-border/50 self-start md:self-center">
              {tNavratri("offersCount", { count: filteredProducts.length }) ||
                `${filteredProducts.length} Items Available`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-border/20">
          <div className="flex-shrink-0 flex items-center gap-1.5 text-muted-foreground text-sm font-bold mr-2">
            <Filter className="h-4 w-4 text-amber-500" />
            <span>{tCommon("filter") || "Filter:"}</span>
          </div>
          {navratriData.TABS.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20 border-transparent"
                    : "bg-muted/40 hover:bg-muted/80 text-muted-foreground border border-border/40"
                }`}
              >
                {getTabLabel(tab)}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <ProductGridSkeleton
            count={skeletonCount}
            columnsClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          />
        ) : isError ? (
          <CommonError
            onRetry={refetch}
            message="Could not load festive products. Please try again."
          />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 border border-dashed border-border/60 rounded-2xl max-w-xl mx-auto">
            <span className="text-4xl block mb-4">🪔</span>
            <h3 className="text-lg font-bold text-foreground mb-1">
              {tNavratri("noOffersTitle") || "No Festive Items Available Right Now"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {tNavratri("noOffersSubtitle") ||
                "Please check back shortly as we prepare fresh stock for the festival."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredProducts.map((product: IProduct, idx: number) => (
              <div
                key={product?._id || product?.id}
                className={`relative z-10 ${isDesktop ? "animate-fade-in-up-card" : ""}`}
                style={{ animationDelay: isDesktop ? `${idx * 35}ms` : undefined }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 sm:mt-20">
        <div className="border-t border-border/40 pt-10">
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              {tNavratri("categoryExploreTitle") || "Explore More Festive Categories"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {tNavratri("categoryExploreSubtitle") ||
                "Browse dedicated collections for all your prayer and dietary needs"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {navratriData.CATEGORY_LINKS.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-muted/30 to-background p-6 sm:p-8 hover:border-amber-500/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                      {tNavratri("categoryCollection") || "Category Collection"}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {category.slug === "non-food"
                        ? tNavratri("nonFoodCategory") || category.name
                        : category.slug === "pulp-juice"
                          ? tNavratri("pulpJuiceCategory") || category.name
                          : category.name}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors pt-1">
                      {tNavratri("shopNow") || "Shop Collection"}
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner">
                    {category.slug === "non-food" ? "🪔" : "🍹"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
