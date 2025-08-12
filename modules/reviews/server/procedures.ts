import { Category, Review } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

import { TRPCError } from "@trpc/server";
import { addReviewSchema, updateReviewSchema } from "../schemas";

export const reviewsRouter = createTRPCRouter({
  getMany: baseProcedure
    // .input(
    //   z.object({
    //     productId: z.string(),
    //   })
    // )
    .query(async ({ ctx, input }) => {
      // const product = await ctx.db.findByID({
      //   collection: "products",
      //   id: input.productId,
      // });

      // if (!product) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "product not found",
      //   });
      // }

      const reviewsData = await ctx.db.find({
        collection: "reviews",
        // where: {
        //   product: {
        //     equals: product.id,
        //   },
        // },
      });

      if (!reviewsData) {
        return null;
      }

      return reviewsData.docs;
    }),

  create: baseProcedure
    .input(addReviewSchema)
    .mutation(async ({ input, ctx }) => {
      const product = await ctx.db.findByID({
        collection: "products",
        id: input.productId,
      });

      const user = await ctx.db.findByID({
        collection: "users",
        id: input.userId,
      });

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "product not found",
        });
      }
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user not found",
        });
      }

      const existsingReviewsData = await ctx.db.find({
        collection: "reviews",
        where: {
          and: [
            {
              product: {
                equals: product.id,
              },
            },
            {
              user: { equals: user.id },
            },
          ],
        },
      });

      if (existsingReviewsData.totalDocs > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "you have already reviwed this product",
        });
      }

      const review = await ctx.db.create({
        collection: "reviews",
        data: {
          user: user.id,
          product: product.id,
          rating: input.rating,
          description: input.description,
        },
      });

      return review;
    }),
  update: baseProcedure
    .input(updateReviewSchema)
    .mutation(async ({ input, ctx }) => {
      const existsingReview = await ctx.db.findByID({
        collection: "reviews",
        depth: 0,
        id: input.reviewId,
      });

      if (!existsingReview) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "review not found",
        });
      }

      if (existsingReview.user !== input.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "you are not alowed to update this review",
        });
      }

      const updatedReview = await ctx.db.update({
        collection: "reviews",
        id: input.reviewId,

        data: {
          rating: input.rating,
          description: input.description,
        },
      });

      return updatedReview;
    }),
});
