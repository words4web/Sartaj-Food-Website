"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { RootState } from "@/lib/store";
import { addOrUpdateItem, updateItemQuantity, removeItem } from "@/lib/store/cartSlice";
import { cartService } from "@/services/cart/cart.service";
import { IProduct } from "@/types/product/product.types";
import { debounce } from "@/utils/debounce/debounce.utils";
import { STOCK_STATUSES } from "@/constants/product.constants";
import { debouncedGlobalSync, setPendingSync, abortActiveSync } from "./cartSync";

export function useCartActions(product: IProduct) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const pendingOpsRef = useRef(0);

  const dispatchRef = useRef(dispatch);
  const queryClientRef = useRef(queryClient);
  const tRef = useRef(t);
  dispatchRef.current = dispatch;
  queryClientRef.current = queryClient;
  tRef.current = t;

  const productId = String(product?._id || product?.id || "");

  const cartItems = useSelector((state: RootState) => state.cart.cart?.items || []);
  const cartItem = cartItems?.find((i) => String(i?.productId) === productId);
  const quantityInCart = cartItem?.quantity || 0;
  const isInCart = quantityInCart > 0;

  const isOutOfStock =
    product?.stockStatus === STOCK_STATUSES.OUT_OF_STOCK ||
    (product?.stockQuantity !== undefined && product?.stockQuantity <= 0);
  const maxStock = product?.stockQuantity ?? 99;

  const guardedSyncRef = useRef(() => {});
  guardedSyncRef.current = () => {
    const hasPendingTimer = debouncedUpdate.current.pending() || debouncedAdd.current.pending();

    if (pendingOpsRef.current === 0 && !hasPendingTimer) {
      setPendingSync({ dispatch: dispatchRef.current, queryClient: queryClientRef.current });
      debouncedGlobalSync();
    }
  };

  const debouncedUpdate = useRef(
    debounce(async (qty: number) => {
      pendingOpsRef.current += 1;
      try {
        await cartService.updateCartItem({ productId, quantity: qty });
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message || tRef.current("common.error") || "Failed to update cart",
        );
      } finally {
        pendingOpsRef.current -= 1;
        guardedSyncRef.current();
      }
    }, 800),
  );

  const debouncedAdd = useRef(
    debounce(async (qty: number) => {
      pendingOpsRef.current += 1;
      try {
        await cartService.addToCart({ productId, quantity: qty });
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message || tRef.current("common.error") || "Failed to add to cart",
        );
      } finally {
        pendingOpsRef.current -= 1;
        guardedSyncRef.current();
      }
    }, 800),
  );

  useEffect(() => {
    const add = debouncedAdd.current;
    const update = debouncedUpdate.current;
    return () => {
      add.cancel();
      update.cancel();
    };
  }, []);

  const performImmediateRemove = () => {
    debouncedUpdate.current.cancel();
    debouncedAdd.current.cancel();

    debouncedGlobalSync.cancel();
    abortActiveSync();

    // Capture stable refs for the promise callback before unmount
    const dispatch = dispatchRef.current;
    const queryClient = queryClientRef.current;

    cartService
      .removeCartItem(productId)
      .then(() => {
        setPendingSync({ dispatch, queryClient });
        debouncedGlobalSync();
      })
      .catch((err: any) => {
        toast.error(
          err?.response?.data?.message || tRef.current("common.error") || "Failed to remove item",
        );
        setPendingSync({ dispatch, queryClient });
        debouncedGlobalSync();
      });
  };

  const handleIncrement = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (quantityInCart >= maxStock) {
      toast.error(`Max stock is ${maxStock}`);
      return;
    }
    const newQty = quantityInCart + 1;
    debouncedGlobalSync.cancel();
    abortActiveSync();
    dispatch(updateItemQuantity({ productId, quantity: newQty }));
    debouncedAdd.current.cancel();
    debouncedUpdate.current(newQty);
  };

  const handleDecrement = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newQty = quantityInCart - 1;
    if (newQty <= 0) {
      // Optimistic UI update
      dispatch(removeItem({ productId }));
      performImmediateRemove();
    } else {
      debouncedGlobalSync.cancel();
      abortActiveSync();
      dispatch(updateItemQuantity({ productId, quantity: newQty }));
      debouncedUpdate.current(newQty);
    }
  };

  const processAdd = () => {
    debouncedGlobalSync.cancel();
    abortActiveSync();
    dispatch(addOrUpdateItem({ productId, quantity: 1, product }));
    debouncedAdd.current(1);
  };

  const handleRemove = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    // Optimistic UI update
    dispatch(removeItem({ productId }));
    performImmediateRemove();
  };

  return {
    quantityInCart,
    isInCart,
    isOutOfStock,
    maxStock,
    handleIncrement,
    handleDecrement,
    processAdd,
    handleRemove,
  };
}
