import { IAddress } from "../address/address.types";
import { ICheckoutSummary } from "../order.types";

export interface CheckoutAddressSelectionProps {
  addresses: IAddress[];
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
}

export interface CheckoutPaymentMethodProps {
  selectedPaymentMethod: string;
  onSelectPaymentMethod: (method: string) => void;
}

export interface CheckoutWalletSelectionProps {
  applyWallet: boolean;
  onToggleWallet: (apply: boolean) => void;
  walletBalance: number;
  maxWalletApplicable: number;
}

export interface CheckoutPriceBreakdownProps {
  summary: ICheckoutSummary | null;
  summaryLoading: boolean;
  summaryFetching: boolean;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  isPlacingOrder: boolean;
  onPlaceOrder: () => void;
  isAddressSelected: boolean;
  cartSubtotal: number;
}
