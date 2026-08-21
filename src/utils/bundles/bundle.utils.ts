import { IProduct } from "@/types/product/product.types";
import { IProductBundle } from "@/types/bundle.types";

function isValidBundleProduct(product: IProduct | undefined): product is IProduct & {
  _id: string;
  name: any;
  images: string[];
  unitPrice: number;
  originalPrice: number;
} {
  if (!product) return false;
  const id = product?._id || product?.id;
  if (!id) return false;
  if (!product?.name) return false;
  if (typeof product?.name === "string" && !product?.name?.trim()) return false;
  if (!product?.images?.[0]) return false;
  if (typeof product?.unitPrice !== "number" || product?.unitPrice <= 0) return false;
  if (typeof product?.originalPrice !== "number" || product?.originalPrice <= 0) return false;
  if (product?.isActive === false) return false;

  const stockStatus = product?.stockStatus?.toLowerCase();
  if (stockStatus === "out_of_stock" || stockStatus === "out of stock") return false;
  if (product?.stockQuantity !== undefined && product?.stockQuantity <= 0) return false;

  return true;
}

export function generateProductBundles(bundleDefinitions: any[] = []): IProductBundle[] {
  if (!bundleDefinitions || bundleDefinitions.length === 0) return [];

  const bundles: IProductBundle[] = [];

  for (const def of bundleDefinitions) {
    if (!def || !Array.isArray(def.productIds)) continue;

    const mappedProducts: IProduct[] = [];
    let isValid = true;

    for (const item of def.productIds) {
      if (!isValidBundleProduct(item)) {
        isValid = false;
        break;
      }
      mappedProducts.push(item);
    }

    if (!isValid || mappedProducts.length < 2) {
      continue;
    }

    const originalPrice = mappedProducts.reduce((sum, p) => sum + (p.originalPrice || 0), 0);
    const regularSum = mappedProducts.reduce((sum, p) => sum + (p.unitPrice || 0), 0);
    const bundlePrice = Math.max(0, regularSum - (def.discountValue || 0));
    const savings = originalPrice - bundlePrice;
    const savingsPercent = originalPrice > 0 ? Math.round((savings / originalPrice) * 100) : 0;

    bundles.push({
      id: def._id || def.id,
      productIds: mappedProducts?.map((p) => String(p._id || p.id)),
      products: mappedProducts,
      title: typeof def.title === "object" ? def.title.en : def.title || "Bundle Deal",
      description: `Get these ${mappedProducts?.length} items together and save ¥${savings}!`,
      originalPrice,
      bundlePrice,
      savings,
      savingsPercent,
    });
  }

  return bundles;
}
