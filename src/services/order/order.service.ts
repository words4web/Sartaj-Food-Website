import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";

export const orderService = {
  getCheckoutSummary: async (params?: {
    addressId?: string;
    couponCode?: string;
    applyWallet?: boolean;
  }): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.ORDERS.CHECKOUT_SUMMARY, { params });
  },

  createOrder: async (data: {
    addressId: string;
    paymentMethod: string;
    couponCode?: string;
    applyWallet?: boolean;
  }, headers?: { "Idempotency-Key": string }): Promise<AxiosResponse<any>> => {
    return axiosInstance.post(API_ROUTES.ORDERS.CREATE, data, { headers });
  },
};
