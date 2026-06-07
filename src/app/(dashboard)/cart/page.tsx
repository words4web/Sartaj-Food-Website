"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";
import { MOCK_CART_ITEMS } from "@/data/cartData";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const t = useTranslations();
  const cartItems = MOCK_CART_ITEMS;

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">{t("cart.cart")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow overflow-hidden">
              {cartItems.length > 0 ? (
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-foreground">{item.name}</h3>
                        <p className="text-muted-foreground">
                          {t("cart.quantity")}: {item.qty}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">
                          ¥{item.total.toFixed(2)}
                        </p>
                        <Button variant="danger" size="sm" className="mt-2">
                          {t("cart.removeItem")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">{t("cart.emptyCart")}</p>
                  <Button variant="link" asChild>
                    <Link href={ROUTES.PRODUCTS()}>{t("cart.continueShipping")}</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold text-foreground mb-6">
                {t("checkout.orderSummary")}
              </h2>

              <div className="space-y-4 mb-6 border-b pb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span className="font-medium text-foreground">¥{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.shipping")}</span>
                  <span className="font-medium text-foreground">¥{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("cart.tax")}</span>
                  <span className="font-medium text-foreground">¥{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-foreground">{t("cart.total")}</span>
                <span className="text-lg font-bold text-primary">¥{total.toFixed(2)}</span>
              </div>

              <Button className="w-full" size="lg" onClick={() => router.push(ROUTES.CHECKOUT)}>
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
