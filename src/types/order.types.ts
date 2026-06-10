import { IProduct } from "./product/product.types";

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
  product?: IProduct;
}

export interface IAddress {
  id: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  addressLine1: string;
  addressLine2?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: string;
  orderId: string;
  items: IOrderItem[];
  shippingAddress: IAddress;
  billingAddress?: IAddress;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  paymentMethod: "WALLET" | "PAYPAL" | "PAYPAY" | "CREDIT_CARD";
  couponCode?: string;
  walletUsed: number;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderCheckoutSummary {
  items: IOrderItem[];
  subtotal: number;
  estimatedTax: number;
  estimatedShipping: number;
  availableCoupons: ICoupon[];
  walletBalance: number;
  defaultAddress?: IAddress;
}

export interface ICoupon {
  id: string;
  code: string;
  discount: number;
  discountType: "FLAT" | "PERCENTAGE";
  minimumPurchase: number;
  maxUsagePerUser: number;
  expiresAt: string;
  isActive: boolean;
}

export interface ICreateOrderPayload {
  items: IOrderItem[];
  shippingAddressId: string;
  billingAddressId?: string;
  paymentMethod: string;
  couponCode?: string;
  useWallet: boolean;
  walletAmount: number;
  idempotencyKey: string;
}

export interface IPriceBreakdownItem {
  type: string;
  name: string | { [key: string]: string };
  amount: number;
  message?: string;
  isNegative?: boolean;
}

export interface ICheckoutSummary {
  priceBreakdown: IPriceBreakdownItem[];
  totalAmount: number;
  taxTotal: number;
  couponDiscount: number;
  walletDebit: number;
  shippingFee: number;
  subTotal: number;
  penaltyAmount: number;
  otherCharges: number;
  maxWalletApplicable: number;
  walletBalance: number;
}
