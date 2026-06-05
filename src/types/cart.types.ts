import { IProduct } from "./product.types";

export interface ICartItem {
  productId: string;
  quantity: number;
  product?: IProduct;
}

export interface ICart {
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  coupon?: {
    code: string;
    discount: number;
  };
}

export interface ICartState {
  cart: ICart;
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface IAddToCartPayload {
  productId: string;
  quantity: number;
}

export interface IUpdateCartPayload {
  productId: string;
  quantity: number;
}
