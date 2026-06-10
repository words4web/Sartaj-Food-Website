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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          {t("cart.cart")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl shadow border border-border overflow-hidden">
              {cartItems?.length > 0 ? (
                <div className="divide-y divide-border">
                  {cartItems?.map((item) => {
                    const product = item?.product;
                    const name =
                      typeof product?.name === "object" ? product?.name?.en : product?.name;
                    const price = product?.unitPrice ?? product?.price ?? 0;
                    const imageSrc = product?.images?.[0] || product?.image;

                    return (
                      <div key={item?.productId} className="p-5 flex items-center gap-4">
                        <div className="h-20 w-20 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 overflow-hidden border border-border">
                          <ThemedImage
                            src={imageSrc}
                            alt={typeof name === "string" ? name : "Product"}
                            emoji={product?.emoji}
                            className="h-full w-full object-contain p-1"
                            fallbackType="product"
                          />
                        </div>

                        {/* Name + price */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={ROUTES.PRODUCTS(item.productId)}
                            className="font-semibold text-foreground text-sm line-clamp-2 hover:text-primary transition-colors"
                          >
                            {typeof name === "string" ? name : "Product"}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">
                            ¥{price?.toLocaleString()} / unit
                          </p>
                        </div>

                        {/* Quantity stepper (CartActions card mode) */}
                        {product && (
                          <div className="w-28 shrink-0">
                            <CartActions product={product} mode="card" />
                          </div>
                        )}

                        {/* Line total */}
                        <div className="text-right shrink-0 w-20">
                          <p className="font-bold text-foreground text-sm">
                            ¥{(price * item?.quantity)?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-16 text-center flex flex-col items-center gap-4">
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
            <div className="bg-card rounded-xl shadow border border-border p-6 sticky top-4">
              <h2 className="text-xl font-bold text-foreground mb-6">
                {t("checkout.orderSummary")}
              </h2>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-foreground">{t("cart.subtotal")}</span>
                <span className="text-lg font-bold text-primary">
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

              <Button variant="link" className="w-full mt-2" asChild>
                <Link href={ROUTES.PRODUCTS()}>{t("cart.continueShipping")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
