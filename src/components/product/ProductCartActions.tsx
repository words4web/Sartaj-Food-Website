import { ShoppingCart, Plus, Minus, Scale, Layers, Package, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { ProductCartActionsProps } from "@/types/product/product.types";

export function ProductCartActions({
  product,
  isOutOfStock,
  localQuantity,
  quantityInCart,
  isAddPending,
  isUpdatePending,
  isRemovePending,
  onIncrement,
  onDecrement,
  onAddToCart,
  onRemoveFromCart,
}: ProductCartActionsProps) {
  const t = useTranslations();

  return (
    <div className="space-y-4">
      {/* Quantity Selector + Add / Remove Buttons */}
      {!isOutOfStock && (
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex items-center border border-border rounded-xl bg-muted/40 h-11 p-1 shrink-0 justify-between sm:justify-start">
            <Button
              variant="ghost"
              size="icon"
              onClick={onDecrement}
              disabled={localQuantity <= 1}
              className="rounded-lg h-9 w-9 cursor-pointer"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-sm font-extrabold text-foreground">
              {localQuantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onIncrement}
              className="rounded-lg h-9 w-9 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={onAddToCart}
            disabled={isAddPending || isUpdatePending}
            className="flex-1 h-11 rounded-xl cursor-pointer font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>
              {quantityInCart > 0
                ? `${t("cart.updateCart") || "Update Cart"} (${quantityInCart} in Cart)`
                : t("products.addToCart")}
            </span>
          </Button>

          {quantityInCart > 0 && (
            <Button
              variant="outline"
              onClick={onRemoveFromCart}
              disabled={isRemovePending}
              className="border-destructive/30 hover:border-destructive hover:bg-destructive/10 text-destructive font-bold h-11 rounded-xl cursor-pointer"
            >
              {t("cart.removeItem")}
            </Button>
          )}
        </div>
      )}

      {/* Product Specifications Grid */}
      <div className="bg-muted/30 border border-border/70 rounded-xl p-4 grid grid-cols-2 gap-4 text-xs">
        {product?.netWeightKg !== undefined && (
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                {t("products.netWeight")}
              </p>
              <p className="font-semibold text-foreground">
                {product?.netWeightKg >= 1
                  ? `${product?.netWeightKg} kg`
                  : `${product?.netWeightKg * 1000} g`}
              </p>
            </div>
          </div>
        )}
        {product?.caseQuantity !== undefined && (
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                {t("products.caseQuantity")}
              </p>
              <p className="font-semibold text-foreground">{product?.caseQuantity}</p>
            </div>
          </div>
        )}
        {product?.sellingUnit && (
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                {t("products.sellingUnit")}
              </p>
              <p className="font-semibold text-foreground capitalize">{product?.sellingUnit}</p>
            </div>
          </div>
        )}
        {product?.productType && (
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Type
              </p>
              <p className="font-semibold text-foreground capitalize">{product?.productType}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
