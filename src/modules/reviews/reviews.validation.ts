import { z } from "zod";

export const createReviewZodSchema = z.object({
  body: z.object({
    menuItem: z.string({
      required_error: "Menu item ID is required",
    }),
    rating: z.number({
      required_error: "Rating is required",
    }).min(1).max(5),
    comment: z.string().optional(),
  }),
});

export const updateReviewZodSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
  }),
});
