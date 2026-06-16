export enum EDiscountType {
  PERCENT = "Percent",
  AMOUNT = "Amount",
}

export interface ITransformedCoupon {
  _id: string;
  title: string;
  code: string;
  discountType: EDiscountType;
  discountValue: number;
  minPurchase: number;
  maxDiscount: number;
  startDate: string;
  expiryDate: string;
  isValid: boolean;
  errors: string[];
  appliedDiscount: number;
}
