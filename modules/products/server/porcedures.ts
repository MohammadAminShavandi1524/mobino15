import { Product } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { resolve } from "path";
import z from "zod";
import { PaginatedDocs, Where } from "payload";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.minPrice && input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
          greater_than_equal: input.minPrice,
        };
      } else if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      } else if (input.maxPrice) {
        where.price = {
          ...where.price,
          less_than_equal: input.maxPrice,
        };
      }

      const data: PaginatedDocs<Product> = await ctx.db.find({
        collection: "products",
        sort: "order",
        depth: 1,
        pagination: true,
        where,
      });
      // deley
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      return data;
    }),
});
