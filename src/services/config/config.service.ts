import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";

export const configService = {
  getConfig: async (): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.CONFIG.GET);
  },
};
