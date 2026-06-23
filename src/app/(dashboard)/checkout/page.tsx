"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { ShoppingBag } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { CommonError } from "@/components/ui/common-error";
import { CheckoutSkeleton } from "@/components/skeletons/CheckoutSkeleton";

import { useGetAddresses } from "@/services/address/address.hooks";
import { useGetCart } from "@/services/cart/cart.hooks";
import { useGetCheckoutSummary, useCreateOrder } from "@/services/order/order.hooks";
import { useGetPublicCoupons } from "@/services/coupon/coupon.hooks";

import { CheckoutCartItems } from "@/components/checkout/CheckoutCartItems";
import { CheckoutAddressSelection } from "@/components/checkout/CheckoutAddressSelection";
import { CheckoutPaymentMethod } from "@/components/checkout/CheckoutPaymentMethod";
import { CheckoutPriceBreakdown } from "@/components/checkout/CheckoutPriceBreakdown";
import { CheckoutWalletSelection } from "@/components/checkout/CheckoutWalletSelection";
import { CheckoutCouponSelection } from "@/components/checkout/CheckoutCouponSelection";
import { CheckoutStatusOverlay } from "@/components/checkout/CheckoutStatusOverlay";
import { CheckoutOverlayState, CheckoutStatus } from "@/types/checkout/checkout.types";
import { generateIdempotencyKey } from "@/utils/common/common.utils";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const queryClient = useQueryClient();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [applyWallet, setApplyWallet] = useState<boolean>(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string>(() => generateIdempotencyKey());
  const [overlayState, setOverlayState] = useState<CheckoutOverlayState>(CheckoutStatus.IDLE);
  const [createdOrderId, setCreatedOrderId] = useState<string>("");
  const [dbOrderId, setDbOrderId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const status = searchParams?.get("status");
    const orderId = searchParams?.get("orderId");
    const id = searchParams?.get("id");
    const reason = searchParams?.get("reason");

    if (status === "success" && orderId) {
      setCreatedOrderId(orderId);
      if (id) {
        setDbOrderId(id);
      }
      setOverlayState(CheckoutStatus.SUCCESS);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(t("orderPlaced") || "Order placed successfully!");
    } else if (status === "cancelled") {
      setErrorMessage(reason || t("orderFailed") || "Failed to place order.");
      setOverlayState(CheckoutStatus.FAILED);
      toast.error(reason || t("orderFailed") || "Failed to place order.");
    }
  }, [searchParams, queryClient, t]);

  const {
    data: cart,
    isLoading: cartLoading,
    isError: cartError,
    refetch: refetchCart,
  } = useGetCart();
  const {
    data: addresses = [],
    isLoading: addressesLoading,
    isError: addressesError,
    refetch: refetchAddresses,
  } = useGetAddresses();
  const { data: publicCoupons = [], isLoading: couponsLoading } = useGetPublicCoupons();

  const createOrderMutation = useCreateOrder();

  const {
    data: summary,
    isLoading: summaryLoading,
    isFetching: summaryFetching,
    error: summaryError,
    refetch: refetchSummary,
  } = useGetCheckoutSummary({
    addressId: selectedAddressId || undefined,
    couponCode: appliedCoupon || undefined,
    applyWallet,
  });

  const handleApplyCoupon = (code: string) => {
    setAppliedCoupon(code);
    toast.success(t("couponApplied") || "Coupon code applied.");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon("");
    toast.success(t("couponRemoved") || "Coupon code removed.");
  };

  const handlePlaceOrder = () => {
    if (!selectedAddressId) {
      toast.error(t("selectAddressRequired") || "Please select a shipping address");
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error(t("selectPaymentRequired") || "Please select a payment method");
      return;
    }

    if (summaryLoading) {
      toast.error(t("calculatingCharges") || "Calculating charges, please wait...");
      return;
    }

    setOverlayState(CheckoutStatus.PENDING);
    setErrorMessage("");

    createOrderMutation.mutate(
      {
        data: {
          addressId: selectedAddressId,
          paymentMethod: selectedPaymentMethod,
          couponCode: appliedCoupon || undefined,
          applyWallet,
          platform: "web",
        },
        idempotencyKey,
      },
      {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          queryClient.invalidateQueries({ queryKey: ["products"] });
          queryClient.invalidateQueries({ queryKey: ["notifications"] });

          if (data?.approvalUrl) {
            window.location.replace(data?.approvalUrl);
          } else {
            setCreatedOrderId(data?.orderId || data?._id || "N/A");
            setDbOrderId(data?._id || "");
            setOverlayState(CheckoutStatus.SUCCESS);
            toast.success(t("orderPlaced") || "Order placed successfully!");
          }
        },
        onError: (err: any) => {
          const status = err?.response?.status;
          const errorCode = err?.response?.data?.meta?.code;

          const isInFlight = status === 409 && errorCode === "IDEMPOTENCY_KEY_IN_FLIGHT";

          if (!isInFlight) {
            setIdempotencyKey(generateIdempotencyKey());
          }

          const msg = err?.response?.data?.message || t("orderFailed") || "Failed to place order.";
          setErrorMessage(msg);
          setOverlayState(CheckoutStatus.FAILED);
          toast.error(msg);
        },
      },
    );
  };

  if (cartLoading || addressesLoading) {
    return <CheckoutSkeleton />;
  }

  if (cartError || addressesError) {
    const handleRetry = () => {
      refetchCart();
      refetchAddresses();
      if (selectedAddressId) {
        refetchSummary();
      }
    };
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <CommonError
          message="Failed to retrieve checkout details. Please try again."
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const hasStatusParam = !!searchParams?.get("status");

  if (cartItems?.length === 0 && !hasStatusParam && overlayState === CheckoutStatus.IDLE) {
    return (
      <main className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center bg-muted/30 px-6 text-center">
        <span className="text-5xl mb-4">📦</span>
        <h2 className="text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground max-w-sm mb-6">
          Add some delicious South Asian flavors to your cart before proceeding to checkout.
        </p>
        <Button asChild className="rounded-xl font-semibold shadow">
          <Link href={ROUTES.PRODUCTS()}>{tCommon("viewAll") || "View All Products"}</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="relative z-10 min-h-screen bg-muted/30 pb-16">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-6 sm:mb-8 flex items-center gap-2 tracking-tight">
          <ShoppingBag className="h-7 w-7 text-primary" />
          {t("checkout") || "Checkout"}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {/* Main Checkout Inputs Block */}
          <div className="lg:col-span-2 space-y-10">
            {/* A. Cart data confirmation */}
            <CheckoutCartItems />

            {/* B. Deliver Address Card Selector */}
            <CheckoutAddressSelection
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onSelectAddress={setSelectedAddressId}
            />
          </div>

          {/* Sticky Billing Sidebar Details */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
            <CheckoutPaymentMethod
              selectedPaymentMethod={selectedPaymentMethod}
              onSelectPaymentMethod={setSelectedPaymentMethod}
            />
            <CheckoutWalletSelection
              applyWallet={applyWallet}
              onToggleWallet={setApplyWallet}
              walletBalance={summary?.walletBalance || 0}
              maxWalletApplicable={summary?.maxWalletApplicable || 0}
            />
            <CheckoutCouponSelection
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              publicCoupons={publicCoupons}
              isAddressSelected={!!selectedAddressId}
            />
            <CheckoutPriceBreakdown
              summary={summary}
              summaryLoading={summaryLoading}
              summaryFetching={summaryFetching}
              appliedCoupon={appliedCoupon}
              isPlacingOrder={createOrderMutation.isPending}
              onPlaceOrder={handlePlaceOrder}
              isAddressSelected={!!selectedAddressId}
              cartSubtotal={cart?.subtotal || 0}
            />
          </div>
        </div>
      </div>

      <CheckoutStatusOverlay
        state={overlayState}
        orderId={createdOrderId}
        dbOrderId={dbOrderId}
        errorMessage={errorMessage}
      />
    </main>
  );
}
