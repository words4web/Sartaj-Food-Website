import { useCallback } from "react";

function buildGtmItems(items: any[]): any[] {
  return (items ?? []).map((item: any) => {
    const productInfo = item?.productSnapshot ?? item?.product ?? {};
    const nameObj = productInfo?.name ?? "";
    const productName = typeof nameObj === "string" ? nameObj : (nameObj?.en ?? nameObj?.ja ?? "");
    return {
      item_id: item?.productId ?? productInfo?._id ?? productInfo?.id ?? "",
      item_name: productName,
      price: item?.price ?? productInfo?.price ?? productInfo?.unitPrice ?? 0,
      quantity: item?.quantity ?? 1,
    };
  });
}

export const useOrderTracking = () => {
  const isAlreadyTracked = useCallback((transactionId: string): boolean => {
    try {
      const tracked = sessionStorage.getItem("tracked_transactions");
      const list = tracked ? JSON.parse(tracked) : [];
      return Array.isArray(list) && list?.includes?.(transactionId);
    } catch {
      return false;
    }
  }, []);

  const markAsTracked = useCallback((transactionId: string) => {
    try {
      const tracked = sessionStorage.getItem("tracked_transactions");
      const list = tracked ? JSON.parse(tracked) : [];
      if (Array.isArray(list)) {
        if (!list.includes(transactionId)) {
          list.push(transactionId);
          sessionStorage.setItem("tracked_transactions", JSON.stringify(list));
        }
      } else {
        sessionStorage.setItem("tracked_transactions", JSON.stringify([transactionId]));
      }
    } catch {}
  }, []);

  const trackPurchase = useCallback(
    (orderData: any, summaryData?: any, fallbackItems?: any[]) => {
      try {
        const transactionId = orderData?.orderId ?? orderData?._id;
        if (!transactionId) {
          console.warn("Purchase tracking skipped: missing transaction ID");
          return;
        }

        if (isAlreadyTracked(transactionId)) {
          console.info(
            `Purchase event for transaction ${transactionId} already tracked. Skipping.`,
          );
          return;
        }

        const purchasePayload = {
          event: "purchase",
          ecommerce: {
            transaction_id: transactionId,
            value: orderData?.totalAmount ?? summaryData?.totalAmount ?? 0,
            currency: "JPY",
            items: buildGtmItems(orderData?.items ?? fallbackItems ?? []),
          },
        };

        (window as any).dataLayer = (window as any)?.dataLayer || [];
        (window as any)?.dataLayer.push(purchasePayload);
        markAsTracked(transactionId);
      } catch (e) {
        console.warn("Failed to track purchase in GTM:", e);
      }
    },
    [isAlreadyTracked, markAsTracked],
  );

  const prepareRedirectPurchase = useCallback(
    (orderData: any, summaryData?: any, fallbackItems?: any[]) => {
      try {
        const transactionId = orderData?.orderId ?? orderData?._id;
        if (!transactionId) {
          console.warn("Redirect purchase tracking skipped: missing transaction ID");
          return;
        }

        const purchasePayload = {
          event: "purchase",
          ecommerce: {
            transaction_id: transactionId,
            value: orderData?.totalAmount ?? summaryData?.totalAmount ?? 0,
            currency: "JPY",
            items: buildGtmItems(orderData?.items ?? fallbackItems ?? []),
          },
        };

        sessionStorage.setItem("pending_purchase_tracking", JSON.stringify(purchasePayload));
      } catch (e) {
        console.warn("Failed to prepare redirect purchase in GTM:", e);
      }
    },
    [],
  );

  const trackRedirectPurchase = useCallback(
    (orderId: string) => {
      try {
        if (isAlreadyTracked(orderId)) {
          console.info(
            `Redirect purchase event for transaction ${orderId} already tracked. Skipping.`,
          );
          return;
        }

        const storedPayload = sessionStorage.getItem("pending_purchase_tracking");
        if (storedPayload) {
          const parsedPayload = JSON.parse(storedPayload);
          if (parsedPayload?.ecommerce) {
            parsedPayload.ecommerce.transaction_id = orderId;
          }
          (window as any).dataLayer = (window as any)?.dataLayer || [];
          (window as any)?.dataLayer.push(parsedPayload);
          sessionStorage.removeItem("pending_purchase_tracking");
          markAsTracked(orderId);
        }
      } catch (e) {
        console.warn("Failed to track redirect purchase in GTM:", e);
      }
    },
    [isAlreadyTracked, markAsTracked],
  );

  const clearRedirectPurchase = useCallback(() => {
    try {
      sessionStorage.removeItem("pending_purchase_tracking");
    } catch (e) {
      console.warn("Failed to clear redirect purchase in GTM:", e);
    }
  }, []);

  return {
    trackPurchase,
    prepareRedirectPurchase,
    trackRedirectPurchase,
    clearRedirectPurchase,
  };
};
