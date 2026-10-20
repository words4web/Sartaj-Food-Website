"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useGetAllProducts } from "@/services/product/product.hooks";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useCachedSkeletonCount } from "@/hooks/useCachedSkeletonCount";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { IProduct } from "@/types/product/product.types";
import { ArrowLeft, Sparkles, Filter, ChevronRight, Flame, Percent } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

const HALDIRAM_PAGE_LIMIT = 100;

export default function DiwaliPage() {
  const tCommon = useTranslations("common");
  const tDiwali = useTranslations("diwali");
  const isDesktop = useIsDesktop();
  const [activeTab, setActiveTab] = useState("all");

  const {
    data: haldiramProducts,
    isLoading,
    isError,
    refetch,
  } = useGetAllProducts({
    limit: HALDIRAM_PAGE_LIMIT,
    manufacturers: "6a27c6e3343e0d539bf4620a",
    page: 1,
  });

  const rawProducts = (haldiramProducts || []) as IProduct[];

  const inStockProducts: IProduct[] = [];
  const outOfStockProducts: IProduct[] = [];
  const seenIds = new Set<string>();

  for (const product of rawProducts) {
    const id = (product?._id || product?.id) as string;
    if (id && !seenIds.has(id)) {
      seenIds.add(id);
      if (
        product?.stockStatus === "out_of_stock" ||
        product?.stockStatus === "OUT_OF_STOCK" ||
        (product?.stockQuantity !== undefined && product?.stockQuantity <= 0)
      ) {
        outOfStockProducts.push(product);
      } else {
        inStockProducts.push(product);
      }
    }
  }

  const allSortedProducts = [...inStockProducts, ...outOfStockProducts];

  const skeletonCount = useCachedSkeletonCount(
    "sartaj_products_count_diwali_page",
    allSortedProducts?.length,
    12,
  );

  const TAB_KEYWORDS: Record<string, string[]> = {
    sweets: ["cham cham", "rasgulla", "gulab jamun", "ladoo", "soan papdi"],
    namkeen: ["bhujia", "mixture", "mix", "dal", "chana", "boondi", "khatta meetha", "all-in-one"],
    snacks: ["toast", "bhel puri", "murukku", "papad", "kaju", "ghee"],
  };

  const filteredProducts = allSortedProducts.filter((product) => {
    if (activeTab === "all") return true;
    const name = (
      typeof product?.name === "string" ? product.name : product?.name?.en || ""
    ).toLowerCase();
    const keywords = TAB_KEYWORDS[activeTab];
    return keywords ? keywords.some((kw) => name.includes(kw)) : true;
  });

  const tabs = [
    { id: "all", label: tDiwali("filterAll") || "All Products" },
    { id: "sweets", label: tDiwali("filterSweets") || "Sweets & Mithai" },
    { id: "namkeen", label: tDiwali("filterNamkeen") || "Namkeens & Bhujia" },
    { id: "snacks", label: tDiwali("filterSnacks") || "Snacks & Quick Bites" },
  ];

  const exploreCategories = [
    {
      badge: tDiwali("categorySweetsBadge") || "Diwali Sweets",
      title: tDiwali("categorySweets") || "Traditional Indian Sweets",
      href: "/products?search=sweets",
      emoji: "🍬",
    },
    {
      badge: tDiwali("categoryPujaBadge") || "Diwali Puja & Decor",
      title: tDiwali("categoryPuja") || "Diwali Diyas & Puja Needs",
      href: "/products?category=non-food",
      emoji: "🪔",
    },
  ];

  return (
    <main className="min-h-screen bg-card pb-12 sm:pb-20">
      <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400" />

      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/20 via-background to-orange-600/20 py-6 sm:py-12 md:py-16 border-b border-border/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute -left-20 top-[-20%] w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full bg-amber-500/20 blur-[80px] sm:blur-[100px] pointer-events-none" />
        <div className="absolute -right-20 bottom-[-20%] w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full bg-orange-600/20 blur-[80px] sm:blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 relative z-10">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-4 sm:mb-6 group"
          >
            <ArrowLeft
              size={14}
              className="sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform"
            />
            {tCommon("backToHome") || "Back to Home"}
          </Link>

          <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-7 lg:col-span-8 max-w-3xl space-y-3 sm:space-y-4 text-center md:text-left w-full">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2.5">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm">
                  <Flame
                    className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-amber-500 animate-pulse"
                    style={{ animationDuration: "1.5s" }}
                  />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-black text-amber-700 dark:text-amber-400">
                    {tDiwali("badge") || "Diwali Dhamaka Special"}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md animate-pulse">
                  <Percent className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                  <span>{tDiwali("discountBadge") || "Flat 10% OFF Haldiram's"}</span>
                </div>
              </div>

              <h1 className="text-2xl min-[420px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 dark:from-amber-300 dark:via-orange-300 dark:to-yellow-200 bg-clip-text text-transparent animate-text-shimmer">
                {tDiwali("heroTitle") || "Light Up Your Diwali With Haldiram's Sweets & Snacks"}
              </h1>

              <p className="text-xs sm:text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed">
                {tDiwali("heroSubtitle") ||
                  "Celebrate the Festival of Lights in Japan with authentic Haldiram's mithai, namkeens, and festive essentials. Enjoy a flat 10% discount across our entire Haldiram's collection!"}
              </p>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-yellow-500/15 border border-amber-500/30 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm font-semibold text-amber-900 dark:text-amber-200 text-left">
                <span>{tDiwali("flatDiscountNotice")}</span>
              </div>
            </div>

            <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end shrink-0">
              <div className="relative w-36 h-36 min-[420px]:w-44 min-[420px]:h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-[340px] lg:h-[340px] flex items-center justify-center bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-yellow-500/20 rounded-full border border-amber-500/30 p-2 sm:p-4 shadow-inner shadow-amber-500/25 hover:scale-105 transition-transform duration-500">
                <DotLottieReact
                  src="/animations/Happy Diwali.json"
                  loop
                  autoplay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-6 sm:mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4 sm:pb-6 mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 sm:h-6 w-5 sm:w-6 text-amber-500 animate-pulse shrink-0" />
              <span>{tDiwali("sectionTitle") || "Haldiram's Festive Collection"}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {tDiwali("sectionSubtitle") ||
                "Crispy namkeens, divine festive sweets, and savory snacks for family and friends."}
            </p>
          </div>
          {!isLoading && !isError && filteredProducts?.length > 0 && (
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground bg-muted px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/50 self-start sm:self-center">
              {tDiwali("offersCount", { count: filteredProducts.length }) ||
                `${filteredProducts.length} Haldiram's Products Available`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 scrollbar-none border-b border-border/20 -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex-shrink-0 flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm font-bold mr-1 sm:mr-2">
            <Filter className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-amber-500 shrink-0" />
            <span>{tCommon("filter") || "Filter:"}</span>
          </div>
          {tabs?.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white shadow-md shadow-orange-500/25 border-transparent"
                    : "bg-muted/40 hover:bg-muted/80 text-muted-foreground border border-border/40"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {isLoading ? (
          <ProductGridSkeleton
            count={skeletonCount}
            columnsClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 md:gap-8"
          />
        ) : isError ? (
          <CommonError
            onRetry={refetch}
            message={
              tDiwali("errorMessage") || "Could not load Haldiram's products. Please try again."
            }
          />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-muted/20 border border-dashed border-border/60 rounded-2xl max-w-xl mx-auto px-4">
            <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">🪔</span>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
              {tDiwali("noOffersTitle") || "No Haldiram's Products Available"}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
              {tDiwali("noOffersSubtitle") ||
                "Please check back shortly as we restock fresh Haldiram's goods."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 md:gap-8">
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

      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-12 sm:mt-20">
        <div className="border-t border-border/40 pt-8 sm:pt-10">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-2xl font-bold text-foreground">
              {tDiwali("exploreMoreTitle") || "Explore More Diwali Categories"}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {tDiwali("exploreMoreSubtitle") ||
                "Complete your Diwali celebrations with sweets, dry fruits, and puja essentials"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
            {exploreCategories?.map((category) => (
              <Link
                key={category?.href}
                href={category?.href}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-muted/30 to-background p-4 sm:p-8 hover:border-amber-500/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-1.5 sm:space-y-2">
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-amber-500/20">
                      {category?.badge}
                    </span>
                    <h4 className="text-base sm:text-xl font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {category?.title}
                    </h4>
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors pt-0.5 sm:pt-1">
                      {tDiwali("shopNow") || "Shop Collection"}
                      <ChevronRight className="h-3.5 sm:h-4 w-3.5 sm:w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform shadow-inner shrink-0">
                    {category.emoji}
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
