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

  getProductById: async (id: string): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.PRODUCTS.GET_BY_ID(id));
  },

  getRelatedProducts: async (
    id: string,
    params?: { limit?: number },
  ): Promise<AxiosResponse<FilterProductsResponse>> => {
    return axiosInstance.get(API_ROUTES.PRODUCTS.GET_RELATED(id), { params });
  },

  getProductsByCategory: async (
    categoryId: string,
    params?: { search?: string; page?: number; limit?: number },
  ): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.PRODUCTS.GET_BY_CATEGORY(categoryId), { params });
  },

  getAllProducts: async (params?: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.PRODUCTS.GET_ALL, { params });
  },

  getDiscountedProducts: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.PRODUCTS.GET_OFFERS, { params });
  },
};
