import { useQuery } from "@tanstack/react-query";
import { productService } from "./product.service";

export const useGetFilteredProducts = (params?: {
  badge?: string;
  manufacturers?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["products", "filter", params],
    queryFn: async () => {
      const response = await productService.getFilteredProducts(params);
      return response.data?.data || [];
    },
  });
};
