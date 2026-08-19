import { IProduct } from "@/types/product/product.types";
import { IProductBundle, IBundlePairDefinition } from "@/types/bundle.types";

const BUNDLE_PAIR_DEFINITIONS: IBundlePairDefinition[] = [
  {
    id: "bundle-milk-cake-rakhi-1",
    productId1: "6a27c870343e0d539bf46577",
    productId2: "6a859c332c49e3fe45e89f0f",
    title: "Milk Cake & Rakhi Combo",
    description:
      "Enjoy sweet celebrations with fresh milk cake paired with a designer Rakhi thread.",
  },
  {
    id: "bundle-milk-cake-rakhi-2",
    productId1: "6a27c870343e0d539bf46577",
    productId2: "6a859c5a2c49e3fe45e89f24",
    title: "Milk Cake & Rakhi Combo",
    description:
      "Enjoy sweet celebrations with fresh milk cake paired with a designer Rakhi thread.",
  },
  {
    id: "bundle-milk-cake-rakhi-3",
    productId1: "6a27c870343e0d539bf46577",
    productId2: "6a859c7c2c49e3fe45e89f39",
    title: "Milk Cake & Rakhi Combo",
    description:
      "Enjoy sweet celebrations with fresh milk cake paired with a designer Rakhi thread.",
  },
  {
    id: "bundle-milk-cake-rakhi-4",
    productId1: "6a27c870343e0d539bf46577",
    productId2: "6a859ce62c49e3fe45e89f64",
    title: "Milk Cake & Rakhi Combo",
    description:
      "Enjoy sweet celebrations with fresh milk cake paired with a designer Rakhi thread.",
  },
  {
    id: "bundle-milk-cake-rakhi-5",
    productId1: "6a27c870343e0d539bf46577",
    productId2: "6a859d442c49e3fe45e89f79",
    title: "Milk Cake & Rakhi Combo",
    description:
      "Enjoy sweet celebrations with fresh milk cake paired with a designer Rakhi thread.",
  },
  {
    id: "bundle-milk-cake-rakhi-6",
    productId1: "6a27c870343e0d539bf46577",
    productId2: "6a859cad2c49e3fe45e89f4e",
    title: "Milk Cake & Rakhi Combo",
    description:
      "Enjoy sweet celebrations with fresh milk cake paired with a designer Rakhi thread.",
  },
];

function isValidBundleProduct(product: IProduct | undefined): product is IProduct & {
  _id: string;
  name: string;
  images: string[];
  unitPrice: number;
  originalPrice: number;
} {
  if (!product) return false;
  if (!product._id) return false;
  if (!product.name || (typeof product.name === "string" && !product.name.trim())) return false;
  if (!product.images?.[0]) return false;
  if (typeof product.unitPrice !== "number" || product.unitPrice <= 0) return false;
  if (typeof product.originalPrice !== "number" || product.originalPrice <= 0) return false;
  if (product.isActive === false) return false;

  const stockStatus = product.stockStatus?.toLowerCase();
  if (stockStatus === "out_of_stock" || stockStatus === "out of stock") return false;
  if (product.stockQuantity !== undefined && product.stockQuantity <= 0) return false;

  return true;
}

export function generateProductBundles(products: IProduct[]): IProductBundle[] {
  const productMap = new Map<string, IProduct>();
  for (const product of products) {
    const id = product._id || product.id;
    if (id) {
      productMap.set(String(id), product);
    }
  }

  const bundles: IProductBundle[] = [];

  for (const def of BUNDLE_PAIR_DEFINITIONS) {
    const p1 = productMap.get(def?.productId1);
    const p2 = productMap.get(def?.productId2);

    if (!isValidBundleProduct(p1) || !isValidBundleProduct(p2)) {
      continue;
    }

    const originalPrice = p1?.originalPrice + p2?.originalPrice;
    const bundlePrice = p1?.unitPrice + p2?.unitPrice;
    const savings = originalPrice - bundlePrice;
    const savingsPercent = Math.round((savings / originalPrice) * 100);

    bundles.push({
      id: def?.id,
      productIds: [p1?._id, p2?._id],
      products: [p1, p2],
      title: def?.title,
      description: def?.description,
      originalPrice,
      bundlePrice,
      savings,
      savingsPercent,
    });
  }

  return bundles;
}
