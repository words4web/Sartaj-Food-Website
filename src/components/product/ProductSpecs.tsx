import { Scale, Layers, Package, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { IProduct } from "@/types/product/product.types";

interface ProductSpecsProps {
  product: IProduct;
}

interface SpecItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  badgeClass: string;
}

function SpecItem({ icon, label, value, badgeClass }: SpecItemProps) {
  return (
    <div className="flex items-center gap-3.5 p-3 rounded-xl bg-card/60 border border-border/30 hover:border-border/60 transition-colors duration-200">
      <div className={`p-2 rounded-lg border shadow-sm ${badgeClass}`}>{icon}</div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-bold text-foreground capitalize">{value}</p>
      </div>
    </div>
  );
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
    <div className="bg-muted/10 border border-border/50 rounded-2xl p-2 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 backdrop-blur-[2px] transition-all duration-300 hover:shadow-sm">
      {product?.netWeightKg !== undefined && (
        <SpecItem
          icon={<Scale className="h-4.5 w-4.5 stroke-[2]" />}
          label={t("products.netWeight")}
          value={
            product?.netWeightKg >= 1
              ? `${product?.netWeightKg} kg`
              : `${product?.netWeightKg * 1000} g`
          }
          badgeClass="bg-primary/10 border-primary/20 text-primary"
        />
      )}
      {product?.caseQuantity !== undefined && (
        <SpecItem
          icon={<Layers className="h-4.5 w-4.5 stroke-[2]" />}
          label={t("products.caseQuantity")}
          value={product?.caseQuantity}
          badgeClass="bg-orange-500/10 border-orange-500/20 text-orange-600"
        />
      )}
      {product?.sellingUnit && (
        <SpecItem
          icon={<Package className="h-4.5 w-4.5 stroke-[2]" />}
          label={t("products.sellingUnit")}
          value={product?.sellingUnit}
          badgeClass="bg-green-500/10 border-green-500/20 text-green-600"
        />
      )}
      {product?.productType && (
        <SpecItem
          icon={<Info className="h-4.5 w-4.5 stroke-[2]" />}
          label="Type"
          value={product?.productType}
          badgeClass="bg-blue-500/10 border-blue-500/20 text-blue-600"
        />
      )}
    </div>
  );
}
