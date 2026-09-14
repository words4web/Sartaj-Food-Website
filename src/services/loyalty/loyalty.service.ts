import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import { ILoyaltyStatus } from "@/types/loyalty/loyalty.types";

export const loyaltyService = {
  getLoyaltyStatus: async (): Promise<
    AxiosResponse<{ success: boolean; data: ILoyaltyStatus }>
  > => {
    return axiosInstance.get(API_ROUTES.LOYALTY.GET_STATUS);
  },
};
