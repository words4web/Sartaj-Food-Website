"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Star, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetReviews } from "@/services/review/review.hooks";
import { formatDate, getAvatarColor, getAvatarInitials } from "@/utils/format/format.utils";
import { IReview, ProductReviewsProps } from "@/types/review/review.types";
import { CommonError } from "@/components/ui/common-error";
import { ProductReviewsSkeleton } from "@/components/skeletons/ProductReviewsSkeleton";
import { ProductReviewForm } from "./ProductReviewForm";

export function ProductReviews({ productId, hasReviewed = false }: ProductReviewsProps) {
  const t = useTranslations();
  const locale = useLocale();

  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: reviewData,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
    refetch: refetchReviews,
  } = useGetReviews(productId, page, limit);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = rating >= star;
          return (
            <Star
              key={star}
              className={`h-5 w-5 ${
                isFilled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30 fill-none"
              }`}
            />
          );
        })}
      </div>
    );
  };

  const reviews = reviewData?.reviews || [];
  const ratingDistribution = reviewData?.ratingDistribution || {};
  const averageRating = reviewData?.averageRating ?? 0;
  const totalReviews = reviewData?.totalReviews ?? 0;
  const meta = reviewData?.meta || { total: 0, page: 1, limit: 5 };
  const totalPages = Math.ceil(meta.total / limit);

  return (
    <section className="mt-12 max-w-7xl mx-auto px-4">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <span>{t("products.reviewsTitle") || "Customer Reviews"}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Column 1: Ratings breakdown & Summary */}
          <div className="flex flex-col gap-6">
            <div className="bg-muted/30 rounded-xl p-6 border border-border flex flex-col items-center justify-center text-center">
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">
                {t("products.averageRatingLabel") || "Average Rating"}
              </span>
              <span className="text-5xl font-extrabold text-foreground mb-2">
                {averageRating?.toFixed(1)}
              </span>
              <div className="mb-2">{renderStars(Math.round(averageRating))}</div>
              <span className="text-sm text-muted-foreground">
                {locale === "en"
                  ? `${totalReviews} ${totalReviews === 1 ? "review" : "reviews"}`
                  : `${totalReviews} ${t("products.reviews")}`}
              </span>
            </div>

            {/* Distribution bars */}
            <div className="flex flex-col gap-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[rating] ?? 0;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                  <div key={rating} className="flex items-center gap-3 text-sm">
                    <span className="w-12 font-medium text-muted-foreground shrink-0 text-right">
                      {rating} {t("products.star") || "star"}
                    </span>
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative border border-border/20">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-medium text-muted-foreground shrink-0">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Columns 2-3: Review list, pagination & submit review */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Review List */}
            <div className="flex flex-col gap-6">
              {isReviewsLoading ? (
                <ProductReviewsSkeleton />
              ) : isReviewsError ? (
                <CommonError
                  onRetry={refetchReviews}
                  message={t("products.loadError") || "Could not load reviews."}
                />
              ) : reviews?.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/10">
                  <span className="text-muted-foreground text-sm font-medium">
                    {t("products.noReviews") || "No reviews yet. Be the first to review!"}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {reviews?.map((review: IReview) => (
                    <div
                      key={review?._id}
                      className="border-b border-border/50 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <div
                          className={`h-10 w-10 rounded-full shrink-0 flex items-center justify-center font-bold text-sm shadow-sm ${getAvatarColor(
                            review?.customer?.name,
                          )}`}
                        >
                          {getAvatarInitials(review?.customer?.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <span className="font-semibold text-foreground text-sm block truncate">
                              {review?.customer?.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(review?.createdAt, locale)}
                            </span>
                          </div>
                          <div className="mt-1">{renderStars(review?.rating)}</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-14 whitespace-pre-line">
                        {review?.reviewText}
                      </p>
                    </div>
                  ))}

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border/50">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 border border-border rounded-lg hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium text-muted-foreground px-2">
                        {page} / {totalPages}
                      </span>
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-2 border border-border rounded-lg hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Render decoupled Review Submission Form */}
            <ProductReviewForm productId={productId} hasReviewed={hasReviewed} />
          </div>
        </div>
      </div>
    </section>
  );
}
