import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";

export const wishlistService = {
  getWishlist: async (): Promise<AxiosResponse<{ success: boolean; data: any }>> => {
    return axiosInstance.get(API_ROUTES.WISHLIST.GET);
  },

  addToWishlist: async (
    productId: string,
  ): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
    return axiosInstance.post(API_ROUTES.WISHLIST.ADD, { productId });
  },

  removeFromWishlist: async (
    productId: string,
  ): Promise<AxiosResponse<{ success: boolean; message: string }>> => {
    return axiosInstance.delete(API_ROUTES.WISHLIST.REMOVE(productId));
  },
};
