import { useQuery, useMutation } from "@tanstack/react-query";
import { orderService } from "./order.service";

export const useGetCheckoutSummary = (params: {
  addressId?: string;
  couponCode?: string;
  applyWallet?: boolean;
}) => {
  return useQuery({
    queryKey: ["order", "checkout-summary", params],
    queryFn: async () => {
      const response = await orderService.getCheckoutSummary(params);
      return response.data?.data || null;
    },
    enabled: !!params.addressId,
    refetchOnWindowFocus: false,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async ({
      data,
      idempotencyKey,
    }: {
      data: {
        addressId: string;
        paymentMethod: string;
        couponCode?: string;
        applyWallet?: boolean;
      };
      idempotencyKey?: string;
    }) => {
      const headers = idempotencyKey ? { "Idempotency-Key": idempotencyKey } : undefined;
      const response = await orderService.createOrder(data, headers);
      return response.data?.data;
    },
  });
};
