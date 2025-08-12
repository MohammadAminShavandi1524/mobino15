import { createTRPCRouter } from "../init";
import { authRouter } from "@/modules/auth/server/procedures";
import { productsRouter } from "@/modules/products/server/porcedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { reviewsRouter } from "@/modules/reviews/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  products: productsRouter,
  reviews: reviewsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
