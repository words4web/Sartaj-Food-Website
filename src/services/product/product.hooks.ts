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

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["products", "detail", id],
    queryFn: async () => {
      const response = await productService.getProductById(id);
      return response.data?.data || null;
    },
    enabled: !!id,
  });
};

export const useGetRelatedProducts = (id: string, limit: number = 30) => {
  return useQuery({
    queryKey: ["products", "related", id, limit],
    queryFn: async () => {
      const response = await productService.getRelatedProducts(id, { limit });
      return response.data?.data || [];
    },
    enabled: !!id,
  });
};
