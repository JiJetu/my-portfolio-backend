import { z } from "zod";

const createReviewSchema = z.object({
  body: z.object({
    productId: z.string().min(1, { message: "Product ID is required" }),
    userReview: z.string().min(1, "User Review is required").trim(),
    rating: z.number().min(1, "User rating is required"),
  }),
});

export const ReviewValidation = {
  createReviewSchema,
};
