"use client";

import { useRef, useEffect } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/store";
import { setCart, addOrUpdateItem, updateItemQuantity, removeItem } from "@/lib/store/cartSlice";
import { cartService } from "@/services/cart/cart.service";
import { CartActionsProps } from "@/types/product/product.types";
import { ICartItem } from "@/types/cart.types";
import { debounce } from "@/utils/debounce/debounce.utils";
import { STOCK_STATUSES } from "@/constants/product.constants";

async function syncCartFromServer(dispatch: ReturnType<typeof useDispatch>, queryClient?: any) {
  try {
    const response = await cartService.getCart();
    const data = response?.data?.data;
    if (!data) return;

    const items: ICartItem[] = (data?.items || [])?.map((item: any) => ({
      productId: item?.product?._id || item?.product?.id,
      quantity: item?.quantity,
      product: item?.product,
    }));

    const cartData = {
      items,
      totalItems: items?.reduce((s, i) => s + i?.quantity, 0),
      totalPrice: data?.grandTotal || 0,
      subtotal: data?.grandTotal || 0,
      tax: 0,
      shipping: 0,
      discount: 0,
    };

    dispatch(setCart(cartData));

    if (queryClient) {
      queryClient.setQueryData(["cart"], cartData);
      queryClient.invalidateQueries({ queryKey: ["order", "checkout-summary"] });
    }
  } catch {}
}

export function CartActions({ product, mode = "card" }: CartActionsProps) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // ── Derive product ID and cart state
  const productId = String(product?._id || product?.id || "");
  const cartItems = useSelector((state: RootState) => state.cart.cart?.items || []);
  const cartItem = cartItems?.find((i) => String(i?.productId) === productId);
  const quantityInCart = cartItem?.quantity || 0;
  const isInCart = quantityInCart > 0;

  // ── Stock checks
  const isOutOfStock =
    product?.stockStatus === STOCK_STATUSES.OUT_OF_STOCK ||
    (product?.stockQuantity !== undefined && product?.stockQuantity <= 0);
  const maxStock = product?.stockQuantity ?? 99;

  // ── Debounced API calls

  const debouncedUpdate = useRef(
    debounce(async (qty: number) => {
      try {
        await cartService.updateCartItem({ productId, quantity: qty });
        syncCartFromServer(dispatch, queryClient);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || t("common.error") || "Failed to update cart");
        syncCartFromServer(dispatch, queryClient);
      }
    }, 800),
  );

  const debouncedAdd = useRef(
    debounce(async (qty: number) => {
      try {
        await cartService.addToCart({ productId, quantity: qty });
        syncCartFromServer(dispatch, queryClient);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || t("common.error") || "Failed to add to cart");
        syncCartFromServer(dispatch, queryClient);
      }
    }, 800),
  );

  const debouncedRemove = useRef(
    debounce(async () => {
      try {
        await cartService.removeCartItem(productId);
        syncCartFromServer(dispatch, queryClient);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || t("common.error") || "Failed to remove item");
        syncCartFromServer(dispatch, queryClient);
      }
    }, 800),
  );

  // Cancel all pending debounced calls on unmount
  useEffect(() => {
    const add = debouncedAdd.current;
    const update = debouncedUpdate.current;
    const remove = debouncedRemove.current;
    return () => {
      add.cancel();
      update.cancel();
      remove.cancel();
    };
  }, []);

  // ── Shared Action Handlers
  const handleIncrement = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (quantityInCart >= maxStock) {
      toast.error(`Max stock is ${maxStock}`);
      return;
    }
    const newQty = quantityInCart + 1;
    dispatch(updateItemQuantity({ productId, quantity: newQty }));
    debouncedUpdate.current(newQty);
  };

  const handleDecrement = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newQty = quantityInCart - 1;
    if (newQty <= 0) {
      dispatch(removeItem({ productId }));
      debouncedUpdate.current.cancel();
      debouncedAdd.current.cancel();
      debouncedRemove.current();
    } else {
      dispatch(updateItemQuantity({ productId, quantity: newQty }));
      debouncedUpdate.current(newQty);
    }
  };

  const handleAdd = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!productId) return;
    dispatch(addOrUpdateItem({ productId, quantity: 1, product }));
    debouncedAdd.current(1);
  };

  // ── Out of stock
  if (isOutOfStock) {
    return (
      <Button
        className="w-full rounded-xl"
        size={mode === "detail" ? "default" : "sm"}
        variant="outline"
        disabled
      >
        {t("products.outOfStock") || "Out of Stock"}
      </Button>
    );
  }

  // ── CARD MODE
  if (mode === "card") {
    if (isInCart) {
      return (
        <div
          className="flex items-center justify-between w-full bg-primary text-primary-foreground rounded-xl h-8 px-1 shadow-sm transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleDecrement}
            className="h-6 w-6 rounded-lg cursor-pointer text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground active:scale-90 transition-all"
          >
            <Minus className="h-3 w-3 stroke-[2.5]" />
          </Button>

          <span className="text-xs font-extrabold tabular-nums min-w-[16px] text-center select-none">
            {quantityInCart}
          </span>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleIncrement}
            disabled={quantityInCart >= maxStock}
            className="h-6 w-6 rounded-lg cursor-pointer text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground active:scale-90 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            <Plus className="h-3 w-3 stroke-[2.5]" />
          </Button>
        </div>
      );
    }

    return (
      <Button
        className="w-full cursor-pointer rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold h-8 active:scale-95 transition-all shadow-sm"
        size="sm"
        variant="default"
        onClick={handleAdd}
      >
        <ShoppingCart className="h-3.5 w-3.5" />
        <span className="truncate">{t("common.add") || "Add"}</span>
      </Button>
    );
  }

  // ── DETAIL MODE
  if (isInCart) {
    return (
      /* Stepper */
      <div className="flex items-center justify-between border border-border rounded-xl bg-muted/40 h-11 px-1 w-fit">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDecrement()}
          className="h-9 w-9 rounded-lg cursor-pointer active:scale-90 transition-all"
        >
          <Minus className="h-4 w-4 stroke-[2]" />
        </Button>
        <span className="w-12 text-center text-sm font-extrabold tabular-nums select-none">
          {quantityInCart}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleIncrement()}
          disabled={quantityInCart >= maxStock}
          className="h-9 w-9 rounded-lg cursor-pointer active:scale-90 transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          <Plus className="h-4 w-4 stroke-[2]" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => handleAdd()}
      className="w-fit px-8 h-11 rounded-xl cursor-pointer font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
    >
      <ShoppingCart className="h-4 w-4" />
      <span>{t("products.addToCart") || "Add to Cart"}</span>
    </Button>
  );
}
