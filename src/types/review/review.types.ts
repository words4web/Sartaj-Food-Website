export interface IReviewCustomer {
  _id: string;
  name: string;
  phone?: string;
}

export interface IReview {
  _id: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  customer: IReviewCustomer;
}

export interface IProductReviewsResponse {
  success: boolean;
  message: string;
  data: {
    reviews: IReview[];
    averageRating: number;
    totalReviews: number;
    ratingDistribution?: Record<number, number>;
  };
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface ICreateReviewPayload {
  rating: number;
  reviewText: string;
}

export interface ProductReviewFormProps {
  productId: string;
  hasReviewed?: boolean;
}

export interface ProductReviewsProps {
  productId: string;
  hasReviewed?: boolean;
}
