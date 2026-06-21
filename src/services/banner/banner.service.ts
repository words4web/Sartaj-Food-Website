import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import { ICustomerBannerItem } from "@/types/banner/banner.types";

export const bannerService = {
  getActiveBanners: async (): Promise<
    AxiosResponse<{ success: boolean; message: string; data: { banners: ICustomerBannerItem[] } }>
  > => {
    return axiosInstance.get(API_ROUTES.BANNERS.GET_ACTIVE);
  },
};
