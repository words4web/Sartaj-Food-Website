import { Scale, Layers, Package, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { IProduct } from "@/types/product/product.types";

interface ProductSpecsProps {
  product: IProduct;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const t = useTranslations();

  const hasSpecs =
    product?.netWeightKg !== undefined ||
    product?.caseQuantity !== undefined ||
    product?.sellingUnit ||
    product?.productType;

  if (!hasSpecs) return null;

  return (
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
  );
}
