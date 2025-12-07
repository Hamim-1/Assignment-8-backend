import { z } from "zod";

export const createReviewZodSchema = z.object({
    product: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(5),
});
export const updateReviewZodSchema = z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().min(5).optional(),
});
