export const PRODUCT_BADGES = {
  FEATURED: "featured",
  HOT: "hot",
  NEW_ARRIVAL: "new_arrival",
} as const;

export type ProductBadge = (typeof PRODUCT_BADGES)[keyof typeof PRODUCT_BADGES];

export const STOCK_STATUSES = {
  IN_STOCK: "in_stock",
  OUT_OF_STOCK: "out_of_stock",
} as const;

export type StockStatus = (typeof STOCK_STATUSES)[keyof typeof STOCK_STATUSES];

export const isProductOutOfStock = (
  product?: {
    stockStatus?: string | null;
    stockQuantity?: number | null;
    isActive?: boolean | null;
  } | null,
): boolean => {
  if (!product) return true;
  if (product.isActive === false) return true;

  const normalizedStatus = product.stockStatus?.trim().toLowerCase();
  if (normalizedStatus === STOCK_STATUSES.OUT_OF_STOCK || normalizedStatus === "out of stock") {
    return true;
  }

  if (
    product.stockQuantity !== undefined &&
    product.stockQuantity !== null &&
    product.stockQuantity <= 0
  ) {
    return true;
  }

  return false;
};
