import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "./order.service";
import { ICreateOrderMutationArgs, ICustomerOrdersResponse } from "@/types/order.types";

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
    mutationFn: async ({ data, idempotencyKey }: ICreateOrderMutationArgs) => {
      const response = await orderService.createOrder(data, { "Idempotency-Key": idempotencyKey });
      return response.data?.data;
    },
  });
};

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", "detail", id],
    queryFn: async () => {
      const response = await orderService.getOrderById(id);
      return response?.data?.data || null;
    },
    enabled: !!id,
  });
};

export const useGetOrders = (params: {
  page?: number;
  limit?: number;
  orderTab: "active" | "completed" | "cancelled";
}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: async (): Promise<ICustomerOrdersResponse> => {
      const response = await orderService.getOrders(params);
      return {
        orders: response?.data?.data || [],
        meta: response?.data?.meta || { total: 0, page: 1, limit: 20, totalPages: 1 },
      };
    },
    enabled: !!params.orderTab,
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, cancelReason }: { id: string; cancelReason: string }) => {
      const response = await orderService.cancelOrder(id, cancelReason);
      return response?.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", "detail", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
