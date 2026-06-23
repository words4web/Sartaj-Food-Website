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

  createOrder: async (
    data: {
      addressId: string;
      paymentMethod: string;
      couponCode?: string;
      applyWallet?: boolean;
      platform?: string;
    },
    headers?: { "Idempotency-Key": string },
  ): Promise<AxiosResponse<any>> => {
    return axiosInstance.post(API_ROUTES.ORDERS.CREATE, data, { headers });
  },

  getOrderById: async (id: string): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.ORDERS.GET_BY_ID(id));
  },

  getOrders: async (params: {
    page?: number;
    limit?: number;
    orderTab: "active" | "completed" | "cancelled";
  }): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.ORDERS.GET_ALL, { params });
  },

  cancelOrder: async (id: string, cancelReason: string): Promise<AxiosResponse<any>> => {
    return axiosInstance.patch(API_ROUTES.ORDERS.CANCEL(id), { cancelReason });
  },
};
