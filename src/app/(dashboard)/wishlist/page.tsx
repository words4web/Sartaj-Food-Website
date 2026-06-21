"use client";

import Link from "next/link";
import { useGetWishlist } from "@/services/wishlist/wishlist.hooks";
import { Heart, Inbox, ArrowLeft, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/common/ProductCard";
import { WishlistSkeleton } from "@/components/skeletons/WishlistSkeleton";
import { CommonError } from "@/components/ui/common-error";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { IProduct } from "@/types/product/product.types";

export default function WishlistPage() {
  const t = useTranslations();
  const { data: wishlist, isLoading, isError, refetch } = useGetWishlist();

  const products: IProduct[] = wishlist?.products || [];

  return (
    <main className="min-h-screen bg-muted/30 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("common.backToHome") || "Back to Home"}
          </Link>
        </div>

        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
              <Heart className="h-8 w-8 sm:h-9 sm:w-9 text-red-500 fill-red-500 animate-pulse duration-1000" />
              {t("wishlist.title") || "My Wishlist"}
            </h1>
            {products?.length > 0 && (
              <p className="text-sm sm:text-base text-muted-foreground mt-2 font-medium">
                {t("wishlist.itemsCount", { count: products?.length })}
              </p>
            )}
          </div>
          {products?.length > 0 && (
            <Button
              asChild
              variant="outline"
              className="rounded-xl font-semibold gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all self-start md:self-auto"
            >
              <Link href={ROUTES.PRODUCTS()}>
                <ShoppingBag className="h-4 w-4" />
                {t("cart.continueShipping") || "Continue Shopping"}
              </Link>
            </Button>
          )}
        </div>

        {/* Content Area */}
        {isLoading ? (
          <WishlistSkeleton />
        ) : isError ? (
          <div className="bg-card border border-border/60 rounded-2xl p-6 sm:p-12 shadow-sm">
            <CommonError
              message={
                t("wishlist.loadError") || "Failed to load wishlist items. Please try again."
              }
              onRetry={() => refetch()}
              className="py-6"
            />
          </div>
        ) : products?.length === 0 ? (
          /* Premium Empty Wishlist State */
          <div className="bg-card border border-border/50 rounded-3xl py-16 px-4 sm:px-8 text-center shadow-sm max-w-xl mx-auto flex flex-col items-center gap-6 mt-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

            <div className="h-20 w-20 rounded-2xl bg-red-50/80 dark:bg-red-950/20 border border-red-100 dark:border-red-950/50 flex items-center justify-center shadow-inner relative group">
              <Heart className="h-9 w-9 text-red-500 fill-red-200/50 dark:fill-red-900/10 group-hover:scale-110 transition-transform duration-300" />
            </div>

            <div className="space-y-2 max-w-sm relative z-10">
              <h3 className="font-bold text-2xl text-foreground">
                {t("wishlist.emptyWishlist") || "Your wishlist is empty"}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t("wishlist.emptyDescription") ||
                  "Explore our product catalog and tap the heart icon to save products for later!"}
              </p>
            </div>

            <Button
              asChild
              className="rounded-xl px-8 py-6 font-bold shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer relative z-10"
            >
              <Link href={ROUTES.PRODUCTS()}>
                {t("wishlist.exploreProducts") || "Explore Products"}
              </Link>
            </Button>
          </div>
        ) : (
          /* Grid list direct rendering */
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products?.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
