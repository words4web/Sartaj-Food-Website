import { useQuery, useMutation } from "@tanstack/react-query";
import { couponService } from "./coupon.service";

export const useGetPublicCoupons = () => {
  return useQuery({
    queryKey: ["public-coupons"],
    queryFn: async () => {
      const response = await couponService.getPublicCoupons();
      return response?.data?.data || [];
    },
  });
};

export const useValidateCoupon = () => {
  return useMutation({
    mutationFn: async (code: string) => {
      const response = await couponService.validateCoupon(code);
      return response?.data?.data;
    },
  });
};
