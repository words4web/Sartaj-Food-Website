import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
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

export const useGetProductsByCategory = (
  categoryId?: string,
  params?: { search?: string; page?: number; limit?: number },
) => {
  return useQuery({
    queryKey: ["products", "category", categoryId, params],
    queryFn: async () => {
      if (!categoryId || categoryId === "all") {
        const response = await productService.getAllProducts(params);
        return {
          products: response.data?.data || [],
          meta: response.data?.meta || { total: 0, page: 1, limit: 12 },
        };
      }
      const response = await productService.getProductsByCategory(categoryId, params);
      return {
        products: response.data?.data || [],
        meta: response.data?.meta || { total: 0, page: 1, limit: 12 },
      };
    },
  });
};

export const useGetInfiniteProductsByCategory = (
  categoryId?: string,
  params?: { search?: string; limit?: number },
) => {
  return useInfiniteQuery({
    queryKey: ["products", "category", "infinite", categoryId, params],
    queryFn: async ({ pageParam = 1 }) => {
      const queryParams = { ...params, page: pageParam };
      if (!categoryId || categoryId === "all") {
        const response = await productService.getAllProducts(queryParams);
        return {
          products: response?.data?.data || [],
          meta: response?.data?.meta || { total: 0, page: pageParam, limit: 12 },
        };
      }
      const response = await productService.getProductsByCategory(categoryId, queryParams);
      return {
        products: response?.data?.data || [],
        meta: response?.data?.meta || { total: 0, page: pageParam, limit: 12 },
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, limit, total } = lastPage.meta;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useGetDiscountedProducts = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["products", "offers", params],
    queryFn: async () => {
      const response = await productService.getDiscountedProducts(params);
      return response.data?.data || [];
    },
  });
};

export const useGetGiftProducts = (cartItems?: any[]) => {
  const cartItemIds = cartItems?.map((i) => i.productId).join(",") || "";
  return useQuery({
    queryKey: ["products", "gifts", cartItemIds],
    queryFn: async () => {
      const response = await productService.getGiftProducts();
      return response.data?.data || [];
    },
  });
};
