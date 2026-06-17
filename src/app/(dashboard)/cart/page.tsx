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
import { CartActions } from "@/components/cart/CartActions";
import { CartSkeleton } from "@/components/skeletons/CartSkeleton";
import { ThemedImage } from "@/components/common";

export default function CartPage() {
  const router = useRouter();
  const t = useTranslations();

  const { isLoading } = useGetCart(true);

  const cart = useSelector((state: RootState) => state.cart?.cart);
  const cartItems = cart?.items || [];

  const subtotal = cart?.subtotal || 0;

  if (isLoading) {
    return <CartSkeleton />;
  }

  return (
    <main className="min-h-screen bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2.5 sm:gap-3">
          <ShoppingBag className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
          {t("cart.cart")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              {cartItems?.length > 0 ? (
                <div className="divide-y divide-border">
                  {cartItems?.map((item) => {
                    const product = item?.product;
                    const name =
                      typeof product?.name === "object" ? product?.name?.en : product?.name;
                    const price = product?.unitPrice ?? product?.price ?? 0;
                    const imageSrc = product?.images?.[0] || product?.image;

                    return (
                      <div key={item?.productId} className="p-4 sm:p-5 flex gap-4">
                        {/* Image */}
                        <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 overflow-hidden border border-border">
                          <ThemedImage
                            src={imageSrc}
                            alt={typeof name === "string" ? name : "Product"}
                            emoji={product?.emoji}
                            className="h-full w-full object-contain p-1"
                            fallbackType="product"
                          />
                        </div>

                        {/* Content area: Name + Price + Controls */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                            <div className="min-w-0">
                              <Link
                                href={ROUTES.PRODUCTS(item.productId)}
                                className="font-semibold text-foreground text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors"
                              >
                                {typeof name === "string" ? name : "Product"}
                              </Link>
                              <p className="text-xs text-muted-foreground mt-1">
                                ¥{price?.toLocaleString()} / unit
                              </p>
                            </div>

                            {/* Line total on desktop */}
                            <div className="hidden sm:block text-right shrink-0">
                              <p className="font-bold text-foreground text-base">
                                ¥{(price * item?.quantity)?.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3 sm:mt-auto">
                            {/* Quantity stepper */}
                            {product && (
                              <div className="w-20 sm:w-28 shrink-0">
                                <CartActions product={product} mode="card" />
                              </div>
                            )}

                            {/* Line total on mobile */}
                            <div className="sm:hidden text-right">
                              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                {t("cart.total")}
                              </p>
                              <p className="font-bold text-foreground text-sm">
                                ¥{(price * item?.quantity)?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
      </div>
    </main>
  );
}
