import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";

export const walletService = {
  getBalance: async (): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.WALLET.GET_BALANCE);
  },

  getTransactions: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.WALLET.GET_TRANSACTIONS, { params });
  },
};
