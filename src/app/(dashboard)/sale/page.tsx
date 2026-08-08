"use client";

import { useTranslations } from "next-intl";
import { useGetDiscountedProducts } from "@/services/product/product.hooks";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { useCachedSkeletonCount } from "@/hooks/useCachedSkeletonCount";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { IProduct } from "@/types/product/product.types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { BundleSection } from "@/components/sale/BundleSection";

export default function SalePage() {
  const tCommon = useTranslations("common");
  const tSale = useTranslations("sale");
  const isDesktop = useIsDesktop();

  const {
    data: discountedProducts,
    isLoading,
    isError,
    refetch,
  } = useGetDiscountedProducts({ limit: 100 });

  const productsToRender = discountedProducts || [];

  const skeletonCount = useCachedSkeletonCount(
    "sartaj_products_count_sale_page",
    productsToRender?.length,
    8,
  );

  return (
    <main className="min-h-screen bg-card pb-16 sm:pb-24">
      {/* Decorative Top Accent */}
      <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-500" />

      {/* Hero Header Area */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 via-background to-emerald-500/10 py-12 md:py-16 border-b border-border/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        {/* Glow Spheres */}
        <div className="absolute -left-20 top-[-20%] w-[350px] h-[350px] rounded-full bg-orange-500/10 blur-[80px] pointer-events-none" />
        <div className="absolute -right-20 bottom-[-20%] w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {tCommon("backToHome") || "Back to Home"}
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4">
              {tSale("celebrate") || "Celebrate"}{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                {tSale("independenceDay") || "Independence Day"}
              </span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium mb-8 max-w-xl">
              {tSale("heroSubtitle")}
            </p>
          </div>

          {/* Countdown timer widget */}
          <div className="w-full">
            <CountdownTimer targetDate="2026-08-10T00:00:00+09:00" />
          </div>
        </div>
      </div>

      {/* Pair & Save Bundles Section */}
      <BundleSection products={productsToRender} />

      {/* Products Grid Area */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-6 mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{tSale("sectionTitle")}</h2>
            <p className="text-sm text-muted-foreground mt-1">{tSale("sectionSubtitle")}</p>
          </div>
          <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1.5 rounded-full border border-border/50 self-start sm:self-center">
            {tSale("offersCount", { count: productsToRender?.length })}
          </span>
        </div>

        {isLoading ? (
          <ProductGridSkeleton
            count={skeletonCount}
            columnsClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          />
        ) : isError ? (
          <CommonError onRetry={refetch} message="Could not load special offers." />
        ) : productsToRender?.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 border border-dashed border-border/60 rounded-2xl max-w-xl mx-auto">
            <span className="text-4xl block mb-4">🛒</span>
            <h3 className="text-lg font-bold text-foreground mb-1">{tSale("noOffersTitle")}</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {tSale("noOffersSubtitle")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {productsToRender?.map((product: IProduct, idx: number) => (
              <div
                key={product?._id || product?.id}
                className={isDesktop ? "animate-fade-in-up-card" : ""}
                style={{ animationDelay: isDesktop ? `${idx * 50}ms` : undefined }}
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
