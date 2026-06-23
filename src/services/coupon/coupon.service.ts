import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import { ITransformedCoupon } from "@/types/coupon.types";

export const couponService = {
  getPublicCoupons: async (): Promise<
    AxiosResponse<{ success: boolean; data: ITransformedCoupon[] }>
  > => {
    return axiosInstance.get(API_ROUTES.COUPONS.GET_ALL);
  },

  validateCoupon: async (
    code: string,
  ): Promise<
    AxiosResponse<{
      success: boolean;
      data: { coupon: ITransformedCoupon; discountAmount: number };
    }>
  > => {
    return axiosInstance.post("/customer/coupons/validate", { code });
  },
};
