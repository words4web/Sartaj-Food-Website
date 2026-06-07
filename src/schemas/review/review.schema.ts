import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number({
      invalid_type_error: "ratingRequired",
      required_error: "ratingRequired",
    })
    .min(1, "ratingRequired")
    .max(5, "ratingRequired"),
  reviewText: z
    .string({
      required_error: "reviewRequired",
    })
    .trim()
    .min(3, "reviewMinLength")
    .max(1000, "reviewMaxLength"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
