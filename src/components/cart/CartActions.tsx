"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CartActionsProps } from "@/types/product/product.types";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { useCartActions } from "./useCartActions";

export function CartActions({ product, mode = "card", showRemoveButton = false }: CartActionsProps) {
  const t = useTranslations();
  const [showAgeConfirm, setShowAgeConfirm] = useState(false);

  const {
    quantityInCart,
    isInCart,
    isOutOfStock,
    maxStock,
    handleIncrement,
    handleDecrement,
    processAdd,
    handleRemove,
  } = useCartActions(product);

  const handleAdd = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (product?.restrictions?.age20Plus) {
      setShowAgeConfirm(true);
      return;
    }
    processAdd();
  };

  const ageModal = (
    <ConfirmModal
      open={showAgeConfirm}
      title={t("products.ageRestrictionTitle") || "Age Restriction"}
      description={t("products.ageRestrictionMessage")}
      confirmLabel={t("common.confirm") || "Confirm"}
      cancelLabel={t("common.cancel") || "Cancel"}
      onConfirm={() => {
        setShowAgeConfirm(false);
        processAdd();
      }}
      onCancel={() => setShowAgeConfirm(false)}
    />
  );

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

  if (mode === "card") {
    if (isInCart) {
      return (
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-center gap-1 sm:justify-between sm:gap-0 w-full bg-primary text-primary-foreground rounded-xl h-7 sm:h-8 px-0.5 sm:px-1 shadow-sm transition-all duration-200">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleDecrement}
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-lg cursor-pointer text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground active:scale-90 transition-all flex items-center justify-center shrink-0"
            >
              <Minus className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.5]" />
            </Button>
            <span className="text-[10px] sm:text-xs font-extrabold tabular-nums min-w-[12px] sm:min-w-[16px] text-center select-none">
              {quantityInCart}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleIncrement}
              disabled={quantityInCart >= maxStock}
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-lg cursor-pointer text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground active:scale-90 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center shrink-0"
            >
              <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.5]" />
            </Button>
          </div>
          {showRemoveButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              title={t("cart.removeItem") || "Remove"}
              className="h-9 w-9 shrink-0 text-destructive hover:bg-destructive/10 rounded-lg active:scale-95 transition-all"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </Button>
          )}
        </div>
      );
    }

    return (
      <>
        <Button
          className="w-full cursor-pointer rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold h-8 active:scale-95 transition-all shadow-sm"
          size="sm"
          variant="default"
          onClick={handleAdd}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          <span className="truncate">{t("common.add") || "Add"}</span>
        </Button>
        {ageModal}
      </>
    );
  }

  if (isInCart) {
    return (
      <div className="flex items-center justify-between border border-border rounded-xl bg-muted/40 h-11 px-1 w-full sm:w-fit">
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
    <>
      <Button
        onClick={() => handleAdd()}
        className="w-full sm:w-fit px-8 h-11 rounded-xl cursor-pointer font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <ShoppingCart className="h-4 w-4" />
        <span>{t("products.addToCart") || "Add to Cart"}</span>
      </Button>
      {ageModal}
    </>
  );
}
