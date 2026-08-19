"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useGetAllProducts, useGetProductsByIds } from "@/services/product/product.hooks";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useCachedSkeletonCount } from "@/hooks/useCachedSkeletonCount";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { IProduct } from "@/types/product/product.types";
import { ArrowLeft, Sparkles, Filter } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { BundleSection } from "@/components/sale/BundleSection";
import { RakshaBandhanBanner } from "@/components/home/RakshaBandhanBanner";
import rakhiSaleData from "@/data/rakhi-sale.json";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

export default function SalePage() {
  const tCommon = useTranslations("common");
  const tSale = useTranslations("sale");
  const isDesktop = useIsDesktop();
  const [activeTab, setActiveTab] = useState("All Offers");

  const {
    data: productsByIds,
    isLoading: isIdsLoading,
    isError: isIdsError,
    refetch: refetchIds,
  } = useGetProductsByIds(rakhiSaleData.RAKHI_PRODUCT_IDS);

  const {
    data: searchProducts,
    isLoading: isSearchLoading,
    isError: isSearchError,
    refetch: refetchSearch,
  } = useGetAllProducts({ limit: 64, search: "rakhi" });

  const isLoading = isIdsLoading || isSearchLoading;
  const isError = isIdsError || isSearchError;
  const refetch = () => {
    refetchIds();
    refetchSearch();
  };

  const inStockProducts: IProduct[] = [];
  const outOfStockProducts: IProduct[] = [];
  const seenIds = new Set<string>();

  const rawProducts = [...(searchProducts || []), ...(productsByIds || [])];
  for (const product of rawProducts) {
    const id = product?._id || product?.id;
    if (id && !seenIds.has(id)) {
      seenIds.add(id);
      if (product?.stockStatus === "out_of_stock") {
        outOfStockProducts.push(product);
      } else {
        inStockProducts.push(product);
      }
    }
  }

  const productsToRender = [...inStockProducts, ...outOfStockProducts];

  const skeletonCount = useCachedSkeletonCount(
    "sartaj_products_count_sale_page",
    productsToRender?.length,
    8,
  );

  const filteredProducts = productsToRender.filter((product) => {
    if (activeTab === "All Offers") return true;
    const categoriesMap = rakhiSaleData.CATEGORIES_MAP as Record<string, string>;
    const id = product?._id || product?.id || "";
    const cat = categoriesMap[id] || "Rakhi Collection";
    return cat === activeTab;
  });

  return (
    <main className="min-h-screen bg-card pb-16 sm:pb-24">
      <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-background to-rose-500/10 py-12 md:py-16 border-b border-border/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute -left-20 top-[-20%] w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute -right-20 bottom-[-20%] w-[350px] h-[350px] rounded-full bg-rose-500/10 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {tCommon("backToHome") || "Back to Home"}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4 bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent animate-text-shimmer">
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
                {tSale("celebrate") || "Celebrate"}{" "}
                <span>{tSale("independenceDay") || "Raksha Bandhan"}</span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium max-w-xl">
                {tSale("heroSubtitle")}
              </p>
            </div>

            <div className="md:col-span-4 flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px] flex items-center justify-center bg-amber-500/5 dark:bg-amber-500/10 rounded-full border border-amber-500/20 p-2 shadow-inner shadow-amber-500/10 hover:scale-105 transition-transform duration-500">
                <DotLottieReact
                  src="/animations/Rakhi - Happy Raksha Bandhan.json"
                  loop
                  autoplay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <RakshaBandhanBanner onSalePage={true} />
      </div>

      <BundleSection products={productsToRender} isLoading={isLoading} />

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border/40 pb-6 mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
              {tSale("sectionTitle") || "Rakhi Special Offers"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {tSale("sectionSubtitle") ||
                "Browse hand-picked imported products for your celebrations."}
            </p>
          </div>
          <span className="text-sm font-semibold text-muted-foreground bg-muted px-4 py-2 rounded-full border border-border/50 self-start md:self-center">
            {tSale("offersCount", { count: filteredProducts?.length }) ||
              `${filteredProducts?.length} Offers Available`}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-border/20">
          <div className="flex-shrink-0 flex items-center gap-1.5 text-muted-foreground text-sm font-bold mr-2">
            <Filter className="h-4 w-4" />
            <span>Filter:</span>
          </div>
          {rakhiSaleData.TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/15 border-transparent"
                  : "bg-muted/40 hover:bg-muted/80 text-muted-foreground border border-border/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading ? (
          <ProductGridSkeleton
            count={skeletonCount}
            columnsClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          />
        ) : isError ? (
          <CommonError onRetry={refetch} message="Could not load special offers." />
        ) : filteredProducts?.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 border border-dashed border-border/60 rounded-2xl max-w-xl mx-auto">
            <span className="text-4xl block mb-4">🛒</span>
            <h3 className="text-lg font-bold text-foreground mb-1">
              {tSale("noOffersTitle") || "No Items Available"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {tSale("noOffersSubtitle") || "Please check back shortly as we prepare fresh stock!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredProducts.map((product: IProduct, idx: number) => (
              <div
                key={product?._id || product?.id}
                className={`relative z-10 ${isDesktop ? "animate-fade-in-up-card" : ""}`}
                style={{ animationDelay: isDesktop ? `${idx * 40}ms` : undefined }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
