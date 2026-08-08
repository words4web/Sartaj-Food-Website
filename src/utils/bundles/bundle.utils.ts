import { IProduct } from "@/types/product/product.types";
import { IProductBundle, IBundlePairDefinition } from "@/types/bundle.types";

const BUNDLE_PAIR_DEFINITIONS: IBundlePairDefinition[] = [
  {
    id: "bundle-tea-snack",
    productId1: "6a60a89871da977f31c741cf", // Tata Tea Agni Leaf 900g
    productId2: "6a27c8bb343e0d539bf4664e", // Jabsons Dry Kachori 160g
    title: "Tea & Snack Combo",
    description: "The perfect chai pairing — bold leaf tea with a crispy kachori to go with it.",
  },
  {
    id: "bundle-ginger-garlic",
    productId1: "6a27c7af343e0d539bf4638b", // Ginger Paste 1kg
    productId2: "6a27c7af343e0d539bf4638c", // Garlic Paste 1kg
    title: "Ginger & Garlic Paste Duo",
    description:
      "The essential cooking base — fresh ginger and garlic pastes to power every curry.",
  },
  {
    id: "bundle-himalaya-skincare",
    productId1: "6a27c82b343e0d539bf464a3", // Himalaya Neem Face Wash 100ml
    productId2: "6a27c829343e0d539bf46489", // Himalaya Aloe Vera Face Wash 100ml
    title: "Himalaya Skincare Duo",
    description:
      "Complete your daily face-wash routine with Himalaya's trusted neem and aloe vera formulas.",
  },
  {
    id: "bundle-india-gate-rice",
    productId1: "6a27c8cb343e0d539bf4667e", // India Gate Brown Rice 1kg
    productId2: "6a27c8d0343e0d539bf46684", // India Gate Brown Basmati Rice 1kg
    title: "India Gate Rice Pair",
    description:
      "Two nutritious brown rice varieties from India Gate — ideal for health-conscious households.",
  },
  {
    id: "bundle-paneer-duo",
    productId1: "6a27c87e343e0d539bf46599", // RTC Paneer Butter Masala 40g
    productId2: "6a27c87c343e0d539bf4658f", // RTC Kadhai Paneer 30g
    title: "Paneer Lover's Duo",
    description:
      "Two irresistible paneer ready-to-cook masalas — butter masala and kadhai, pick your favourite.",
  },
  {
    id: "bundle-chicken-tikka-tandoori",
    productId1: "6a27c87d343e0d539bf46594", // RTC Chicken Tikka Masala 50g
    productId2: "6a27c87e343e0d539bf4659c", // RTC Tandoori Chicken 50g
    title: "Chicken Feast Combo",
    description:
      "Restaurant favourites at home — chicken tikka masala and tandoori in one convenient bundle.",
  },
  {
    id: "bundle-tata-tea-gold",
    productId1: "6a27c87f343e0d539bf465a4", // Tata Tea Gold 900g
    productId2: "6a27c880343e0d539bf465a6", // Tata Tea Gold 450g
    title: "Tata Tea Gold Bundle",
    description:
      "Stock up on the rich, aromatic Tata Tea Gold in both family-size and everyday packs.",
  },
  {
    id: "bundle-butter-gosht",
    productId1: "6a27c87d343e0d539bf46595", // RTC Bhuna Gosht 50g
    productId2: "6a27c87d343e0d539bf46597", // RTC Butter Chicken 50g
    title: "Meat Lovers' Combo",
    description:
      "Rich, hearty flavours in one go — bhuna gosht and butter chicken ready-to-cook masalas.",
  },
];

/**
 * Returns true if a product is safe to include in a bundle.
 * Validates all required fields and business rules.
 */
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

/**
 * Generates a list of validated product bundles from a flat list of sale products.
 * Uses hardcoded pair definitions keyed by actual MongoDB _id values.
 * Returns only bundles where both products pass all validation rules.
 */
export function generateProductBundles(products: IProduct[]): IProductBundle[] {
  // Build an O(1) lookup map by _id
  const productMap = new Map<string, IProduct>();
  for (const product of products) {
    const id = product._id;
    if (id) {
      productMap.set(id, product);
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
