import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import {  PaginatedDocs } from "payload";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ctx}) => {
    
    const data: PaginatedDocs<Category> = await ctx.db.find({
        collection: "categories",
        sort: "order",
        depth: 1,
        where: {
          parent: {
            exists: false,
          },
        },
        pagination: false,
      });

      
    return data;
  }),
});
