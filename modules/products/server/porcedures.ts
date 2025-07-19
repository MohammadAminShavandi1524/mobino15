import { Product } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { resolve } from "path";

import { PaginatedDocs } from "payload";
import { promise } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data: PaginatedDocs<Product> = await ctx.db.find({
      collection: "products",
      sort: "order",
      depth: 1,
      pagination: true,
    });
    // deley
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    return data;
  }),
});
