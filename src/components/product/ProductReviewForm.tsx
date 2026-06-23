"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Star, CheckCircle2, Loader2 } from "lucide-react";
import { reviewSchema, ReviewFormData } from "@/schemas/review/review.schema";
import { useAddReview } from "@/services/review/review.hooks";
import { ProductReviewFormProps } from "@/types/review/review.types";

export function ProductReviewForm({ productId, hasReviewed = false }: ProductReviewFormProps) {
  const t = useTranslations();
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const addReviewMutation = useAddReview(productId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      reviewText: "",
    },
  });

  const selectedRating = watch("rating");
  const reviewText = watch("reviewText");

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await addReviewMutation.mutateAsync(data);
      toast.success(t("products.reviewSuccess") || "Review submitted successfully!");
      reset({ rating: 0, reviewText: "" });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    }
  };

  const getErrorMessage = (errorKey: string | undefined) => {
    if (!errorKey) return "";
    return t(`products.${errorKey}`) || errorKey;
  };

  const renderInteractiveStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = (hoverRating ?? selectedRating) >= star;

          return (
            <Star
              key={star}
              className={`h-5 w-5 ${
                isFilled ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30 fill-none"
              } cursor-pointer transition-transform duration-150 hover:scale-120`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => setValue("rating", star)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="border-t border-border pt-8 mt-4">
      {hasReviewed ? (
        <div className="bg-success/5 border border-success/20 rounded-xl p-6 flex items-start gap-4">
          <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground text-sm mb-1">
              {t("products.writeReview") || "Write a Review"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("products.alreadyReviewed") ||
                "You have already reviewed this product. Thank you for your feedback!"}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <h3 className="text-lg font-bold text-foreground">
            {t("products.writeReview") || "Write a Review"}
          </h3>

          {/* Star selection */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {t("products.rating") || "Rating"}
            </span>
            <div className="flex items-center gap-3">
              {renderInteractiveStars()}
              {selectedRating > 0 && (
                <span className="text-xs font-semibold text-amber-500 uppercase tracking-wide">
                  {selectedRating} {selectedRating === 1 ? t("products.star") : t("products.stars")}
                </span>
              )}
            </div>
            {errors?.rating && (
              <span className="text-xs font-medium text-destructive mt-1">
                {getErrorMessage(errors?.rating?.message)}
              </span>
            )}
          </div>

          {/* Text area */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="reviewText" className="font-medium text-muted-foreground">
                {t("products.reviews") || "Reviews"}
              </label>
              <span
                className={`text-xs ${
                  (reviewText?.length || 0) > 1000
                    ? "text-destructive font-bold"
                    : "text-muted-foreground"
                }`}
              >
                {reviewText?.length || 0} / 1000
              </span>
            </div>
            <textarea
              id="reviewText"
              rows={4}
              placeholder={
                t("products.reviewRequired") || "Tell us about your experience with this product..."
              }
              className={`w-full rounded-xl border border-border bg-card p-4 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-1 focus:ring-primary ${
                errors?.reviewText
                  ? "border-destructive focus:ring-destructive focus:border-destructive"
                  : ""
              }`}
              {...register("reviewText")}
            />
            {errors?.reviewText && (
              <span className="text-xs font-medium text-destructive mt-1">
                {getErrorMessage(errors?.reviewText?.message)}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={addReviewMutation.isPending}
              className="px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm shadow-primary/10 hover:shadow-primary/20"
            >
              {addReviewMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{t("common.save") || "Save"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
