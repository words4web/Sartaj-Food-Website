import { IAddress } from "../address/address.types";
import { ICheckoutSummary } from "../order.types";
import { ITransformedCoupon } from "../coupon.types";

export interface CheckoutAddressSelectionProps {
  addresses: IAddress[];
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
  hasError?: boolean;
}

export interface CheckoutPaymentMethodProps {
  selectedPaymentMethod: string;
  onSelectPaymentMethod: (method: string) => void;
  hasError?: boolean;
}

export interface CheckoutWalletSelectionProps {
  applyWallet: boolean;
  onToggleWallet: (apply: boolean) => void;
  walletBalance: number;
  maxWalletApplicable: number;
  isAddressSelected: boolean;
}

export interface CheckoutCouponSelectionProps {
  appliedCoupon: string;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  publicCoupons: ITransformedCoupon[];
  isAddressSelected: boolean;
}

export interface CheckoutPriceBreakdownProps {
  summary: ICheckoutSummary | null;
  summaryLoading: boolean;
  summaryFetching: boolean;
  appliedCoupon: string;
  isPlacingOrder: boolean;
  onPlaceOrder: () => void;
  isAddressSelected: boolean;
  cartSubtotal: number;
}

export enum CheckoutStatus {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export type CheckoutOverlayState = CheckoutStatus;

export interface CheckoutStatusOverlayProps {
  state: CheckoutOverlayState;
  orderId?: string;
  dbOrderId?: string;
  errorMessage?: string;
}

export interface CheckoutDeliverySelectionProps {
  selectedDate: string;
  selectedSlot: string;
  onSelectDate: (date: string) => void;
  onSelectSlot: (slot: string) => void;
  hasError?: boolean;
  prefecture?: string;
  isAddressSelected: boolean;
}
