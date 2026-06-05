export const API_ROUTES = {
  // Auth
  AUTH: {
    SIGNUP: "/customer/auth/signup",
    LOGIN: "/customer/auth/login",
    VERIFY_OTP: "/customer/auth/verify-otp",
    RESEND_OTP: "/customer/auth/resend-otp",
    LOGOUT: "/customer/auth/logout",
    REFRESH_TOKEN: "/customer/auth/refresh-token",
  },

  // Products
  PRODUCTS: {
    GET_ALL: "/customer/products",
    GET_BY_ID: (id: string) => `/customer/products/${id}`,
    SEARCH: "/customer/products/search",
    GET_BY_CATEGORY: (id: string) => `/customer/products/category/${id}`,
    GET_BY_BRAND: "/customer/products/filter",
  },

  // Categories
  CATEGORIES: {
    GET_ALL: "/customer/categories",
    GET_BY_ID: (id: string) => `/customer/categories/${id}`,
  },

  // Cart
  CART: {
    GET: "/customer/cart",
    ADD_ITEM: "/customer/cart/items",
    UPDATE_ITEM: (id: string) => `/customer/cart/items/${id}`,
    REMOVE_ITEM: (id: string) => `/customer/cart/items/${id}`,
    CLEAR: "/customer/cart/clear",
  },

  // Wishlist
  WISHLIST: {
    GET: "/customer/wishlist",
    ADD: "/customer/wishlist",
    REMOVE: (id: string) => `/customer/wishlist/${id}`,
  },

  // Orders
  ORDERS: {
    GET_ALL: "/customer/orders",
    GET_BY_ID: (id: string) => `/customer/orders/${id}`,
    CREATE: "/customer/orders",
    CHECKOUT_SUMMARY: "/customer/orders/checkout-summary",
    CANCEL: (id: string) => `/customer/orders/${id}/cancel',`,
  },

  // Addresses
  ADDRESSES: {
    GET_ALL: "/customer/address",
    GET_BY_ID: (id: string) => `/customer/address/${id}`,
    CREATE: "/customer/address",
    UPDATE: (id: string) => `/customer/address/${id}`,
    DELETE: (id: string) => `/customer/address/${id}`,
    SET_DEFAULT: (id: string) => `/customer/address/${id}/set-default`,
  },

  // Wallet
  WALLET: {
    GET_BALANCE: "/customer/wallet/balance",
    GET_TRANSACTIONS: "/customer/wallet/transactions",
  },

  // Coupons
  COUPONS: {
    GET_ALL: "/customer/coupons",
    VALIDATE: (code: string) => `/customer/coupons/${code}/validate`,
  },

  // Profile
  PROFILE: {
    GET: "/customer/profile",
    UPDATE: "/customer/profile",
  },

  // Notifications
  NOTIFICATIONS: {
    GET_ALL: "/customer/notification",
    MARK_READ: (id: string) => `/customer/notification/${id}/read`,
    MARK_ALL_READ: "/customer/notification/mark-all-read",
  },

  // CMS
  CMS: {
    GET_PAGE: (slug: string) => `/customer/cms/${slug}`,
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const CURRENCY = {
  SYMBOL: "¥",
  CODE: "JPY",
  DECIMAL_PLACES: 0,
} as const;
