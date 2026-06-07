import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import { IAddToCartPayload, IUpdateCartPayload } from "@/types/cart.types";

export const cartService = {
  getCart: async (): Promise<AxiosResponse<{ success: boolean; data: any }>> => {
    return axiosInstance.get(API_ROUTES.CART.GET);
  },

  addToCart: async (
    payload: IAddToCartPayload,
  ): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
    return axiosInstance.post(API_ROUTES.CART.ADD_ITEM, payload);
  },

  updateCartItem: async (
    payload: IUpdateCartPayload,
  ): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
    return axiosInstance.put(API_ROUTES.CART.UPDATE_ITEM, payload);
  },

  removeCartItem: async (
    productId: string,
  ): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
    return axiosInstance.delete(API_ROUTES.CART.REMOVE_ITEM(productId));
  },

  clearCart: async (): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
    return axiosInstance.delete(API_ROUTES.CART.CLEAR);
  },
};
