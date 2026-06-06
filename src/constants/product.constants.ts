export const PRODUCT_BADGES = {
  FEATURED: "featured",
  HOT: "hot",
  NEW_ARRIVAL: "new_arrival",
} as const;

export type ProductBadge = (typeof PRODUCT_BADGES)[keyof typeof PRODUCT_BADGES];
