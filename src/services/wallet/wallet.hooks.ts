import { useQuery } from "@tanstack/react-query";
import { walletService } from "./wallet.service";

export const useGetWalletBalance = () => {
  return useQuery({
    queryKey: ["wallet", "balance"],
    queryFn: async () => {
      const response = await walletService.getBalance();
      return response?.data?.data || { balance: 0 };
    },
  });
};

export const useGetWalletTransactions = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["wallet", "transactions", params],
    queryFn: async () => {
      const response = await walletService.getTransactions(params);
      return response?.data || { data: [], meta: {} };
    },
  });
};
