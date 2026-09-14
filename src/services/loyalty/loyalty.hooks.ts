import { useQuery } from "@tanstack/react-query";
import { loyaltyService } from "./loyalty.service";

export const LOYALTY_QUERY_KEYS = {
  status: ["loyalty-status"] as const,
};

export const useCustomerLoyaltyStatus = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: LOYALTY_QUERY_KEYS.status,
    queryFn: async () => {
      const response = await loyaltyService.getLoyaltyStatus();
      return response?.data?.data;
    },
    enabled: isAuthenticated,
  });
};
