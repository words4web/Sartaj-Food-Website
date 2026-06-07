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
  PRODUCTS: (id?: string | number) => (id ? `/products/${id}` : "/products"),
  PROFILE: "/profile",
};

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
