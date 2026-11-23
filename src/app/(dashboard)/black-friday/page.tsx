"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetAllProducts } from "@/services/product/product.hooks";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { useCachedSkeletonCount } from "@/hooks/useCachedSkeletonCount";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { IProduct } from "@/types/product/product.types";
import { ArrowLeft, Sparkles, Filter, ChevronRight, Flame, Percent, Tag, Zap } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const HALDIRAM_PAGE_LIMIT = 100;

export default function BlackFridayPage() {
  const tCommon = useTranslations("common");
  const tBF = useTranslations("blackfriday");
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
    "sartaj_products_count_black_friday_page",
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
    { id: "all", label: tBF("filterAll") || "All Products" },
    { id: "sweets", label: tBF("filterSweets") || "Sweets & Mithai" },
    { id: "namkeen", label: tBF("filterNamkeen") || "Namkeens & Bhujia" },
    { id: "snacks", label: tBF("filterSnacks") || "Snacks & Quick Bites" },
  ];

  const exploreCategories = [
    {
      badge: tBF("categorySpicesBadge") || "Spices & Masalas",
      title: tBF("categorySpices") || "Pure Spices & Blends",
      href: "/products?search=spices",
      icon: Zap,
    },
    {
      badge: tBF("categorySnacksBadge") || "Snacks & Savories",
      title: tBF("categorySnacks") || "Crispy Namkeen & Snacks",
      href: "/products?search=snacks",
      icon: Tag,
    },
  ];

  return (
    <main className="min-h-screen bg-card pb-12 sm:pb-20">
      {/* Top Accent Strip */}
      <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-[#ff6a00] via-[#ff8c33] to-[#ffa500]" />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#1f242d] text-white py-8 sm:py-14 md:py-18 border-b border-[#ff6a00]/30">
        <div className="absolute inset-0 bg-[radial-gradient(#ff6a00_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute -left-20 top-[-20%] w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full bg-[#ff6a00]/20 blur-[80px] sm:blur-[100px] pointer-events-none" />
        <div className="absolute -right-20 bottom-[-20%] w-[260px] sm:w-[420px] h-[260px] sm:h-[420px] rounded-full bg-[#ff8c33]/15 blur-[80px] sm:blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 relative z-10">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-colors mb-4 sm:mb-6 group"
          >
            <ArrowLeft
              size={14}
              className="sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform"
            />
            {tCommon("backToHome") || "Back to Home"}
          </Link>

          <div className="flex flex-col-reverse md:grid md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-7 lg:col-span-8 max-w-3xl space-y-3 sm:space-y-4 text-center md:text-left w-full">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <div className="inline-flex items-center gap-1.5 bg-[#ff6a00]/15 border border-[#ff6a00]/40 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm">
                  <Flame
                    className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#ff6a00] animate-pulse"
                    style={{ animationDuration: "1.5s" }}
                  />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-black text-[#ff8c33]">
                    {tBF("badge") || "Black Friday Mega Sale"}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 bg-[#ff6a00] text-black text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-md animate-pulse">
                  <Percent className="h-3 sm:h-3.5 w-3 sm:w-3.5 stroke-[2.5]" />
                  <span>{tBF("discountBadge") || "Mega Deals"}</span>
                </div>
              </div>

              <h1 className="text-3xl min-[420px]:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white">
                <span className="text-[#ff6a00] drop-shadow-[0_2px_14px_rgba(255,106,0,0.45)]">BLACK FRIDAY</span>{" "}
                MEGA SALE
              </h1>

              <p className="text-xs sm:text-base md:text-lg text-gray-300 font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed">
                {tBF("heroSubtitle") ||
                  "Don't miss the biggest sale of the season! Stock up on your favorite spices, snacks, sweets, and pantry essentials with exclusive limited-time Black Friday discounts."}
              </p>

              <div className="inline-flex items-center gap-2 bg-[#ff6a00]/10 border border-[#ff6a00]/30 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-sm font-semibold text-[#ff8c33] text-left">
                <span>{tBF("flatDiscountNotice")}</span>
              </div>
            </div>

            {/* Poster / Badge Component */}
            <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6a00] to-amber-500 rounded-3xl blur opacity-35 group-hover:opacity-70 transition duration-500" />
                
                <div className="relative w-48 min-[420px]:w-56 sm:w-64 h-48 min-[420px]:h-56 sm:h-64 rounded-3xl bg-[#161b22] border-2 border-[#ff6a00]/60 p-5 flex flex-col items-center justify-center text-center shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-500">
                  <div className="absolute -right-12 -top-12 w-28 h-28 bg-[#ff6a00]/20 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute -left-12 -bottom-12 w-28 h-28 bg-[#ff8c33]/20 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="bg-[#ff6a00] text-black text-[11px] sm:text-xs font-black px-3.5 py-0.5 rounded-full uppercase tracking-widest mb-2 shadow">
                    MEGA DEALS
                  </div>

                  <div className="flex items-center justify-center gap-1 text-[#ff6a00] my-1">
                    <Zap className="h-5 w-5 fill-[#ff6a00]" />
                    <span className="text-xl sm:text-2xl font-black tracking-tighter">EXCLUSIVE</span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(255,106,0,0.5)] my-1">
                    MEGA <span className="text-[#ff6a00]">DEALS</span>
                  </div>

                  <div className="mt-3 text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider border-t border-white/10 pt-2 w-full text-center">
                    DO NOT MISS OUT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Categories Highlights */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-6 sm:mt-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ff6a00] mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Black Friday Highlights</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-foreground tracking-tight">
              {tBF("exploreMoreTitle") || "Explore More Sale Categories"}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
            {tBF("exploreMoreSubtitle") ||
              "Browse through our best-selling categories with hot discounts"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          {exploreCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.href}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl border border-[#ff6a00]/25 bg-gradient-to-br from-[#ff6a00]/[0.06] via-card to-[#1f242d]/[0.06] hover:from-[#ff6a00]/[0.12] hover:to-[#1f242d]/[0.12] p-4 sm:p-6 hover:border-[#ff6a00]/60 shadow-sm hover:shadow-xl hover:shadow-[#ff6a00]/10 transition-all duration-300 transform active:scale-[0.99] flex items-center justify-between gap-4"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6a00]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#ff6a00]/20 transition-all duration-500" />

                <div className="relative z-10 space-y-1.5 sm:space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-[#ff6a00]/20 text-[#ff6a00] border border-[#ff6a00]/30">
                      {category.badge}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-foreground group-hover:text-[#ff6a00] transition-colors truncate">
                    {category.title}
                  </h4>

                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#ff6a00] group-hover:underline transition-all">
                    <span>{tBF("shopNow") || "Shop Collection"}</span>
                    <ChevronRight className="h-3.5 sm:h-4 w-3.5 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                <div className="relative z-10 h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-[#ff6a00]/20 via-[#ff8c33]/15 to-transparent border border-[#ff6a00]/30 flex items-center justify-center text-2xl sm:text-3xl shadow-inner shadow-[#ff6a00]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0 text-[#ff6a00]">
                  <Icon className="h-7 w-7" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-10 sm:mt-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-4 sm:pb-6 mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 sm:h-6 w-5 sm:w-6 text-[#ff6a00] animate-pulse shrink-0" />
              <span>{tBF("sectionTitle") || "Black Friday Exclusive Deals"}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {tBF("sectionSubtitle") ||
                "Handpicked deals and special prices across all our top products."}
            </p>
          </div>
          {!isLoading && !isError && filteredProducts?.length > 0 && (
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground bg-muted px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/50 self-start sm:self-center">
              {tBF("offersCount", { count: filteredProducts.length }) ||
                `${filteredProducts.length} Black Friday Deals Available`}
            </span>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 scrollbar-none border-b border-border/20 -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex-shrink-0 flex items-center gap-1.5 text-muted-foreground text-xs sm:text-sm font-bold mr-1 sm:mr-2">
            <Filter className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-[#ff6a00] shrink-0" />
            <span>{tCommon("filter") || "Filter:"}</span>
          </div>
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-[#ff6a00] to-[#ff8c33] text-white shadow-md shadow-[#ff6a00]/25 border-transparent"
                    : "bg-muted/40 hover:bg-muted/80 text-muted-foreground border border-border/40"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <ProductGridSkeleton
            count={skeletonCount}
            columnsClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 md:gap-8"
          />
        ) : isError ? (
          <CommonError
            onRetry={refetch}
            message={
              tBF("errorMessage") || "Could not load Black Friday deals. Please try again."
            }
          />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-muted/20 border border-dashed border-border/60 rounded-2xl max-w-xl mx-auto px-4">
            <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">🏷️</span>
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
              {tBF("noOffersTitle") || "No Black Friday Deals Available Right Now"}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs mx-auto">
              {tBF("noOffersSubtitle") ||
                "Please check back shortly as we add more exclusive Black Friday deals!"}
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
    </main>
  );
}
