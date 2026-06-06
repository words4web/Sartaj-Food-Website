import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import { FilterProductsResponse } from "@/types/product/product.types";

export const productService = {
  getFilteredProducts: async (params?: {
    badge?: string;
    manufacturers?: string;
    page?: number;
    limit?: number;
  }): Promise<AxiosResponse<FilterProductsResponse>> => {
    return axiosInstance.get(API_ROUTES.PRODUCTS.FILTER, { params });
  },
};
