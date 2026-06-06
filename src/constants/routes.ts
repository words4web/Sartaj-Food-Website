// Frontend Navigation Routes
export const ROUTES = {
  // Public / Guest routes
  LANDING: "/",
  LOGIN: "/login",
  TERMS: "/terms",
  PRIVACY: "/privacy",

  // Authenticated / Dashboard routes
  HOME: "/",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDERS: "/orders",
  PRODUCTS: "/products",
  PROFILE: "/profile",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
