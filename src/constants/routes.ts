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
  ORDERS: (id?: string | number) => (id ? `/orders/${id}` : "/orders"),
  PRODUCTS: (id?: string | number) => (id ? `/products/${id}` : "/products"),
  PRODUCTS_BY_CATEGORY: (categoryId: string) => `/products?category=${categoryId}`,
  PRODUCTS_WITH_QUERY: (queryString: string) =>
    queryString ? `/products?${queryString}` : "/products",
  PROFILE: "/profile",
  NOTIFICATIONS: "/notifications",
};

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
