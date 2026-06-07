import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "./review.service";
import { ICreateReviewPayload } from "@/types/review/review.types";

export const useGetReviews = (productId: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["reviews", productId, page, limit],
    queryFn: async () => {
      const response = await reviewService.getReviews(productId, { page, limit });
      return {
        reviews: response.data?.data?.reviews || [],
        averageRating: response.data?.data?.averageRating ?? 0,
        totalReviews: response.data?.data?.totalReviews ?? 0,
        ratingDistribution: response.data?.data?.ratingDistribution,
        meta: response.data?.meta || { total: 0, page, limit },
      };
    },
    enabled: !!productId,
  });
};

export const useAddReview = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateReviewPayload) => reviewService.addReview(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      queryClient.invalidateQueries({ queryKey: ["products", "detail", productId] });
    },
  });
};
