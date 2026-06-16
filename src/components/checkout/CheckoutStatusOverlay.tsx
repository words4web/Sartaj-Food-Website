"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { CheckoutStatusOverlayProps, CheckoutStatus } from "@/types/checkout/checkout.types";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false },
);

export function CheckoutStatusOverlay({
  state,
  orderId,
  dbOrderId,
  errorMessage,
}: CheckoutStatusOverlayProps) {
  const router = useRouter();
  const tCheckout = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const tOrders = useTranslations("orders");
  const tCart = useTranslations("cart");

  if (state === CheckoutStatus.IDLE) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 bg-background/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-card/75 border border-border/80 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center backdrop-blur-2xl animate-in zoom-in-95 duration-500">
        {/* Lottie Animation */}
        <div className="w-48 h-48 md:w-56 md:h-56 mb-4 flex items-center justify-center">
          <DotLottieReact
            src={
              state === CheckoutStatus.PENDING
                ? "/animations/pending_lottie.json"
                : state === CheckoutStatus.SUCCESS
                  ? "/animations/success_lottie.json"
                  : "/animations/failed_lottie.json"
            }
            loop={state === CheckoutStatus.PENDING}
            autoplay
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black tracking-tight text-foreground mb-3">
          {state === CheckoutStatus.PENDING &&
            (tCheckout("calculatingCharges") || "Processing Your Order")}
          {state === CheckoutStatus.SUCCESS &&
            (tCheckout("orderConfirmedTitle") || "Order Confirmed!")}
          {state === CheckoutStatus.FAILED && (tCommon("error") || "Order Failed")}
        </h2>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-8 max-w-xs leading-relaxed">
          {state === CheckoutStatus.PENDING &&
            "We are processing your secure transaction. Please do not close or refresh this page."}
          {state === CheckoutStatus.SUCCESS &&
            `${tCheckout("orderConfirmedDesc") || "Thank you for your purchase!"} ${tCheckout("orderIdLabel") || "Order ID:"} #${orderId}`}
          {state === CheckoutStatus.FAILED &&
            (errorMessage ||
              tCheckout("orderFailed") ||
              "Something went wrong while placing your order. Please try again.")}
        </p>

        {/* Action Button */}
        {state === CheckoutStatus.SUCCESS && (
          <Button
            onClick={() => router.replace(ROUTES.ORDERS(dbOrderId || orderId || ""))}
            size="lg"
            className="w-full rounded-2xl font-bold bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {tOrders("orderDetail") || "View Order Details"}
            <ArrowRight className="h-5 w-5" />
          </Button>
        )}

        {state === CheckoutStatus.FAILED && (
          <Button
            onClick={() => router.replace(ROUTES.CART)}
            variant="destructive"
            size="lg"
            className="w-full rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            {tCommon("tryAgain") || "Return to Cart"}
          </Button>
        )}
      </div>
    </div>
  );
}
