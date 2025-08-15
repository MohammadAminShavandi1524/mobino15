import { Category, Review } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

import { TRPCError } from "@trpc/server";
import { addReviewSchema, updateReviewSchema } from "../schemas";

export const reviewsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx, input }) => {
    const reviewsData = await ctx.db.find({
      collection: "reviews",
      depth: 0,
    });

    return reviewsData?.docs || [];
  }),

  getCatReviews: baseProcedure
    .input(
      z.object({
        Id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: "products",
        depth: 0,
        limit: 200,
        where: {
          category: {
            equals: input.Id,
          },
        },
      });

      if (!products || products.totalDocs === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "products not found",
        });
      }

      const productIds = products.docs.map((p) => p.id);

      const reviewsData = await ctx.db.find({
        collection: "reviews",
        depth: 0,
        where: {
          product: { in: productIds },
        },
      });

      return reviewsData?.docs || [];
    }),

  getSubReviews: baseProcedure
    .input(
      z.object({
        Id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.db.find({
        collection: "products",
        depth: 0,
        limit: 200,
        where: {
          subCategory: {
            equals: input.Id,
          },
        },
      });

      if (!products || products.totalDocs === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "products not found",
        });
      }

      const productIds = products.docs.map((p) => p.id);

      const reviewsData = await ctx.db.find({
        collection: "reviews",
        depth: 0,
        where: {
          product: { in: productIds },
        },
      });

      return reviewsData?.docs || [];
    }),

  getOne: baseProcedure
    .input(z.object({ product: z.string() }))
    .query(async ({ ctx, input }) => {
      const orderParam = decodeURIComponent(input.product).split("_")[0];

      const matchedProductsByOrder = await ctx.db.find({
        collection: "products",
        where: {
          order: { equals: Number(orderParam) },
        },
      });

      if (!matchedProductsByOrder || matchedProductsByOrder.totalDocs === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "products not found",
        });
      }

      const dkp = matchedProductsByOrder.docs[0].address.replace(/\D/g, "");

      const matchedProductsByDkp = await ctx.db.find({
        collection: "products",
        where: {
          address: {
            like: dkp,
          },
        },
      });

      const productIds = matchedProductsByDkp.docs.map((p) => p.id);

      const reviewsData = await ctx.db.find({
        collection: "reviews",
        where: {
          product: { in: productIds },
        },
      });

      return reviewsData?.docs || [];
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

      // const existsingReviewsData = await ctx.db.find({
      //   collection: "reviews",
      //   where: {
      //     and: [
      //       {
      //         product: {
      //           equals: product.id,
      //         },
      //       },
      //       {
      //         user: { equals: user.id },
      //       },
      //     ],
      //   },
      // });

      // if (existsingReviewsData.totalDocs > 0) {
      //   throw new TRPCError({
      //     code: "BAD_REQUEST",
      //     message: "شما قبلا در مورد این محصول نظر داده اید",
      //   });
      // }

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
