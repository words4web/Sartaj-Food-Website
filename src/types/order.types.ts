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

export interface ICreateOrderBody {
  addressId: string;
  paymentMethod: string;
  couponCode?: string;
  applyWallet?: boolean;
  platform?: string;
  deliveryDate: string;
  deliverySlot: string;
}

export interface ICreateOrderMutationArgs {
  data: ICreateOrderBody;
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

export interface OrderDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface OrderDetailHeaderProps {
  orderId?: string;
  id: string;
  status?: string;
  invoiceURL?: string | null;
}

export interface OrderDetailInfoProps {
  createdAt?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  shippingAddress?: {
    fullName: string;
    phone: string;
    postalCode: string;
    prefecture: string;
    city: string;
    streetAddress: string;
    building?: string;
  };
  trackOrder?: string | null;
  notes?: string | null;
  cancelReason?: string | null;
}

export interface OrderDetailItemsProps {
  items?: Array<{
    product: {
      _id: string;
      name: string | { [key: string]: string };
      images?: string[];
      quantity?: number;
      price?: number;
      lineSubtotal?: number;
    };
  }>;
}

export interface PriceBreakdownItem {
  _id?: string;
  type: string;
  name: string;
  amount: number;
  message?: string;
  isNegative?: boolean;
}

export interface OrderDetailSummaryProps {
  subtotal?: number;
  priceBreakdown?: PriceBreakdownItem[];
  totalAmount?: number;
  couponCode?: string | null;
}

export interface ICustomerOrderListItemProduct {
  _id: string;
  name: string | { en?: string; ja?: string; [key: string]: any };
  images?: string[];
}

export interface ICustomerOrderListItem {
  product: ICustomerOrderListItemProduct;
}

export interface ICustomerOrder {
  _id: string;
  orderId: string;
  customer: string;
  items: ICustomerOrderListItem[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  trackOrder: string | null;
  invoiceURL: string | null;
  notes: string | null;
  cancelledBy: string | null;
  cancelReason: string | null;
  paypalOrderId: string | null;
  paypalCaptureId: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ICustomerOrdersResponse {
  orders: ICustomerOrder[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export enum OrderTab {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface OrderTabsProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
}

export interface OrderCardProps {
  order: ICustomerOrder;
}

export interface OrderCancelAlertProps {
  status?: string;
  isWithin1Hour: boolean;
  onCancelClick: () => void;
}
