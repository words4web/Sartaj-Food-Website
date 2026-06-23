import axiosInstance from "@/lib/api/axios";
import { API_ROUTES } from "@/constants/api";
import { AxiosResponse } from "axios";
import { IProductReviewsResponse, ICreateReviewPayload } from "@/types/review/review.types";

export const reviewService = {
  getReviews: async (
    productId: string,
    params?: { page?: number; limit?: number },
  ): Promise<AxiosResponse<IProductReviewsResponse>> => {
    return axiosInstance.get(API_ROUTES.REVIEWS.GET(productId), { params });
  },

  addReview: async (
    productId: string,
    payload: ICreateReviewPayload,
  ): Promise<AxiosResponse<any>> => {
    return axiosInstance.post(API_ROUTES.REVIEWS.ADD(productId), payload);
  },
};
