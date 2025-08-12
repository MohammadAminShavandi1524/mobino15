import z from "zod";

export const addReviewSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  rating: z
    .number({})
    .min(1, "حداقل امتیاز ۱ است")
    .max(5, "حداکثر امتیاز ۵ است"),
  description: z.string().min(1, "توضیحات نمی‌تواند خالی باشد"),
});

export const updateReviewSchema = z.object({
  reviewId: z.string(),
  userId: z.string(),
  rating: z
    .number({})
    .min(1, "حداقل امتیاز ۱ است")
    .max(5, "حداکثر امتیاز ۵ است"),
  description: z
    .string("توضیحات الزامی است")
    .min(1, "توضیحات نمی‌تواند خالی باشد")
    .max(300, "توضیحات حداکثر 300 حرف است"),
});
