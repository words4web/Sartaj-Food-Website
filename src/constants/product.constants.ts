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
