import { IProduct } from "../product/product.types";

export interface IWishlist {
  _id: string;
  customer: string;
  products: IProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface GetWishlistResponse {
  success: boolean;
  message: string;
  data: IWishlist;
}
