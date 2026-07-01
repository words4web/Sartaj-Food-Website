"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useGetCart } from "@/services/cart/cart.hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSkeleton } from "@/components/skeletons/CartSkeleton";
import { useGetDiscountedProducts } from "@/services/product/product.hooks";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductGridSkeleton } from "@/components/skeletons/ProductCardSkeleton";

export default function CartPage() {
  const router = useRouter();
  const t = useTranslations();

  const { isLoading } = useGetCart(true);
  const { data: offers, isLoading: isOffersLoading } = useGetDiscountedProducts({ limit: 4 });

  const cart = useSelector((state: RootState) => state.cart?.cart);
  const cartItems = cart?.items || [];

  const subtotal = cart?.subtotal || 0;

  if (isLoading) {
    return <CartSkeleton />;
  }

  return (
    <main className="relative z-10 min-h-screen bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3">
          <ShoppingBag className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
          {t("cart.cart")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              {cartItems?.length > 0 ? (
                <div className="divide-y divide-border">
                  {cartItems?.map((item) => (
                    <CartItemRow key={item?.productId} item={item} />
                  ))}
                </div>
              ) : (
                <div className="p-10 sm:p-16 text-center flex flex-col items-center gap-4">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
                  <p className="text-muted-foreground text-base">{t("cart.emptyCart")}</p>
                  <Button variant="default" asChild className="rounded-xl">
                    <Link href={ROUTES.PRODUCTS()}>{t("cart.continueShipping")}</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-sm border border-border p-5 sm:p-6 sticky top-4">
              <h2 className="text-xl font-bold text-foreground mb-4 sm:mb-6">
                {t("checkout.orderSummary")}
              </h2>

              <div className="flex justify-between mb-6">
                <span className="text-base sm:text-lg font-bold text-foreground">
                  {t("cart.subtotal")}
                </span>
                <span className="text-base sm:text-lg font-bold text-primary">
                  ¥{subtotal?.toLocaleString()}
                </span>
              </div>

              <Button
                className="w-full rounded-xl font-bold"
                size="lg"
                disabled={cartItems?.length === 0}
                onClick={() => router.push(ROUTES.CHECKOUT)}
              >
                {t("cart.proceedToCheckout")}
              </Button>

              <Button variant="link" className="w-full mt-2 text-sm" asChild>
                <Link href={ROUTES.PRODUCTS()}>{t("cart.continueShipping")}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Special Offers Section */}
        {(!isOffersLoading && offers && offers.length > 0) || isOffersLoading ? (
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
              {t("home.bestPrices")}
            </h2>
            {isOffersLoading ? (
              <ProductGridSkeleton
                count={4}
                columnsClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {offers?.map((product: any) => (
                  <ProductCard key={product?._id || product?.id} product={product} />
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}
