import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";

export const bundleService = {
  getActiveBundles: async (): Promise<AxiosResponse<{ success: boolean; data: any[] }>> => {
    return axiosInstance.get(API_ROUTES.BUNDLES.GET_ACTIVE);
  },
};
