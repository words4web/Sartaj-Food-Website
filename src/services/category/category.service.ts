import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";

export const categoryService = {
  getAllCategories: async (): Promise<AxiosResponse<any>> => {
    return axiosInstance.get(API_ROUTES.CATEGORIES.GET_ALL);
  },
};
