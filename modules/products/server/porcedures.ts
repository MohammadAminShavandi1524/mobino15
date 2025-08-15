import { Product, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import z from "zod";
import { PaginatedDocs, Where } from "payload";
import { shuffle } from "@/lib/utils";
import { TRPCError } from "@trpc/server";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        available: z.boolean().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        color: z.array(z.string()).nullable().optional(),
        brand: z.array(z.string()).nullable().optional(),
        sort: z
          .enum([
            "MostPopular",
            "HighestPrice",
            "LowestPrice",
            "BiggestDiscount",
          ])
          .nullable()
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      // ** فیلتر فقط کالا های موجود
      if (input.available && input.available === true) {
        where.available = {
          equals: true,
        };
      }

      // ** فیلتر  قیمت

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

      // ** فیلتر رنگ

      if (input.color && input.color.length > 0) {
        const groupedColors = {
          WhiteGroup: ["TitaniumWhite", "White"],
          BlackGroup: ["TitaniumBlack", "Black", "JetBlackTitanium"],
          BlueGroup: [
            "DarkBlue",
            "TitaniumIceBlue",
            "LightBlue",
            "Blue",
            "NavyBlue",
            "oceanBlue",
            "skyBlue",
          ],
          YellowGroup: ["yellow", "Lemon", "Cream", "Golden"],
          NeutralGroup: [
            "Silver",
            "TitaniumSilver",
            "DarkGray",
            "TitaniumGray",
            "Gray",
            "LightGray",
            "NaturalTitanium",
            "graphite",
            "charcoalGray",
            "TitaniumDesert",
          ],
          GreenGroup: ["Green", "LightGreen", "oliveGreen", "mintGreen"],
          PinkGroup: ["Pink", "roseGold", "lilac"],
          RedGroup: ["Red", "Brick", "Orange", "copper", "bronze"],
          PurpleGroup: ["Purple", "TitaniumPurple"],
        };

        const selectedColorValues = input.color.flatMap(
          (group) => groupedColors[group as keyof typeof groupedColors] || []
        );

        if (selectedColorValues.length > 0) {
          where.color = {
            in: selectedColorValues,
          };
        }
      }

      // ** فیلتر برند

      if (input.brand && input.brand.length > 0) {
        where["productType.brand"] = { in: input.brand };
      }

      const data: PaginatedDocs<Product> = await ctx.db.find({
        collection: "products",
        depth: 1,
        pagination: true,
        where,
        limit: 150,
      });
      // deley
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // ** مرتب سازی ها

      data.docs.sort((a: Product, b: Product) => {
        if (input.sort) {
          switch (input.sort) {
            case "MostPopular":
              return (b.rating ?? 0) - (a.rating ?? 0);

            case "HighestPrice": {
              const priceA = a.offPrice ?? a.price ?? 0;
              const priceB = b.offPrice ?? b.price ?? 0;
              return priceB - priceA;
            }

            case "LowestPrice": {
              const priceA = a.offPrice ?? a.price ?? 0;
              const priceB = b.offPrice ?? b.price ?? 0;
              return priceA - priceB;
            }

            case "BiggestDiscount": {
              const percentA =
                a.price && a.offPrice
                  ? ((a.price - a.offPrice) / a.price) * 100
                  : 0;

              const percentB =
                b.price && b.offPrice
                  ? ((b.price - b.offPrice) / b.price) * 100
                  : 0;

              return percentB - percentA;
            }

            default:
              return 0;
          }
        }

        return 0;
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          tenant: doc.tenant as Tenant,
        })),
      };
    }),

  getCatProducts: baseProcedure
    .input(
      z.object({
        Id: z.string(),
        available: z.boolean().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        color: z.array(z.string()).nullable().optional(),
        brand: z.array(z.string()).nullable().optional(),
        sort: z
          .enum([
            "MostPopular",
            "HighestPrice",
            "LowestPrice",
            "BiggestDiscount",
          ])
          .nullable()
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      where.category = {
        equals: input.Id,
      };

      // ** فیلتر فقط کالا های موجود
      if (input.available && input.available === true) {
        where.available = {
          equals: true,
        };
      }

      // ** فیلتر  قیمت

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

      // ** فیلتر رنگ

      if (input.color && input.color.length > 0) {
        const groupedColors = {
          WhiteGroup: ["TitaniumWhite", "White"],
          BlackGroup: ["TitaniumBlack", "Black", "JetBlackTitanium"],
          BlueGroup: [
            "DarkBlue",
            "TitaniumIceBlue",
            "LightBlue",
            "Blue",
            "NavyBlue",
            "oceanBlue",
            "skyBlue",
          ],
          YellowGroup: ["yellow", "Lemon", "Cream", "Golden"],
          NeutralGroup: [
            "Silver",
            "TitaniumSilver",
            "DarkGray",
            "TitaniumGray",
            "Gray",
            "LightGray",
            "NaturalTitanium",
            "graphite",
            "charcoalGray",
            "TitaniumDesert",
          ],
          GreenGroup: ["Green", "LightGreen", "oliveGreen", "mintGreen"],
          PinkGroup: ["Pink", "roseGold", "lilac"],
          RedGroup: ["Red", "Brick", "Orange", "copper", "bronze"],
          PurpleGroup: ["Purple", "TitaniumPurple"],
        };

        const selectedColorValues = input.color.flatMap(
          (group) => groupedColors[group as keyof typeof groupedColors] || []
        );

        if (selectedColorValues.length > 0) {
          where.color = {
            in: selectedColorValues,
          };
        }
      }

      // ** فیلتر برند

      if (input.brand && input.brand.length > 0) {
        where["productType.brand"] = { in: input.brand };
      }

      const data: PaginatedDocs<Product> = await ctx.db.find({
        collection: "products",
        depth: 1,
        where,
        pagination: true,
        limit: 200,
      });

      data.docs.sort((a: Product, b: Product) => {
        if (input.sort) {
          switch (input.sort) {
            case "MostPopular":
              return (b.rating ?? 0) - (a.rating ?? 0);

            case "HighestPrice": {
              const priceA = a.offPrice ?? a.price ?? 0;
              const priceB = b.offPrice ?? b.price ?? 0;
              return priceB - priceA;
            }

            case "LowestPrice": {
              const priceA = a.offPrice ?? a.price ?? 0;
              const priceB = b.offPrice ?? b.price ?? 0;
              return priceA - priceB;
            }

            case "BiggestDiscount": {
              const percentA =
                a.price && a.offPrice
                  ? ((a.price - a.offPrice) / a.price) * 100
                  : 0;

              const percentB =
                b.price && b.offPrice
                  ? ((b.price - b.offPrice) / b.price) * 100
                  : 0;

              return percentB - percentA;
            }

            default:
              return 0;
          }
        }

        return 0;
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          tenant: doc.tenant as Tenant,
        })),
      };
    }),
  getSubCatProducts: baseProcedure
    .input(
      z.object({
        Id: z.string(),
        available: z.boolean().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        color: z.array(z.string()).nullable().optional(),
        brand: z.array(z.string()).nullable().optional(),
        sort: z
          .enum([
            "MostPopular",
            "HighestPrice",
            "LowestPrice",
            "BiggestDiscount",
          ])
          .nullable()
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      where.subCategory = {
        equals: input.Id,
      };

      // ** فیلتر فقط کالا های موجود
      if (input.available && input.available === true) {
        where.available = {
          equals: true,
        };
      }

      // ** فیلتر  قیمت

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

      // ** فیلتر رنگ

      if (input.color && input.color.length > 0) {
        const groupedColors = {
          WhiteGroup: ["TitaniumWhite", "White"],
          BlackGroup: ["TitaniumBlack", "Black", "JetBlackTitanium"],
          BlueGroup: [
            "DarkBlue",
            "TitaniumIceBlue",
            "LightBlue",
            "Blue",
            "NavyBlue",
            "oceanBlue",
            "skyBlue",
          ],
          YellowGroup: ["yellow", "Lemon", "Cream", "Golden"],
          NeutralGroup: [
            "Silver",
            "TitaniumSilver",
            "DarkGray",
            "TitaniumGray",
            "Gray",
            "LightGray",
            "NaturalTitanium",
            "graphite",
            "charcoalGray",
            "TitaniumDesert",
          ],
          GreenGroup: ["Green", "LightGreen", "oliveGreen", "mintGreen"],
          PinkGroup: ["Pink", "roseGold", "lilac"],
          RedGroup: ["Red", "Brick", "Orange", "copper", "bronze"],
          PurpleGroup: ["Purple", "TitaniumPurple"],
        };

        const selectedColorValues = input.color.flatMap(
          (group) => groupedColors[group as keyof typeof groupedColors] || []
        );

        if (selectedColorValues.length > 0) {
          where.color = {
            in: selectedColorValues,
          };
        }
      }

      // ** فیلتر برند

      if (input.brand && input.brand.length > 0) {
        where["productType.brand"] = { in: input.brand };
      }

      const data: PaginatedDocs<Product> = await ctx.db.find({
        collection: "products",
        depth: 1,
        where,
        pagination: true,
        limit: 200,
      });

      data.docs.sort((a: Product, b: Product) => {
        if (input.sort) {
          switch (input.sort) {
            case "MostPopular":
              return (b.rating ?? 0) - (a.rating ?? 0);

            case "HighestPrice": {
              const priceA = a.offPrice ?? a.price ?? 0;
              const priceB = b.offPrice ?? b.price ?? 0;
              return priceB - priceA;
            }

            case "LowestPrice": {
              const priceA = a.offPrice ?? a.price ?? 0;
              const priceB = b.offPrice ?? b.price ?? 0;
              return priceA - priceB;
            }

            case "BiggestDiscount": {
              const percentA =
                a.price && a.offPrice
                  ? ((a.price - a.offPrice) / a.price) * 100
                  : 0;

              const percentB =
                b.price && b.offPrice
                  ? ((b.price - b.offPrice) / b.price) * 100
                  : 0;

              return percentB - percentA;
            }

            default:
              return 0;
          }
        }

        return 0;
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          tenant: doc.tenant as Tenant,
        })),
      };
    }),

  getAffinoCarousel: baseProcedure.query(async ({ ctx, input }) => {
    const where: Where = {};
    where.offPrice = {
      greater_than: 0,
    };
    where.available = {
      equals: true,
    };

    const data: PaginatedDocs<Product> = await ctx.db.find({
      collection: "products",
      depth: 1,
      where,
      limit: 50,
    });

    return {
      ...data,
      docs: data.docs.map((doc) => ({
        ...doc,
        tenant: doc.tenant as Tenant,
      })),
    };
  }),
  getMobileCarousel: baseProcedure.query(async ({ ctx, input }) => {
    const where: Where = {};
    where.category = {
      equals: "686ff08bd6713d28c018821b",
    };
    where.available = {
      equals: true,
    };
    where["productType.classification"] = { equals: "FlagBearer" };

    const data: PaginatedDocs<Product> = await ctx.db.find({
      collection: "products",
      depth: 1,
      where,
      limit: 25,
    });

    return {
      ...data,
      docs: data.docs.map((doc) => ({
        ...doc,
        tenant: doc.tenant as Tenant,
      })),
    };
  }),
  getLaptopCarousel: baseProcedure.query(async ({ ctx, input }) => {
    const where: Where = {};
    where.category = {
      equals: "68721e69c794390510ef3922",
    };
    where.available = {
      equals: true,
    };
    const data: PaginatedDocs<Product> = await ctx.db.find({
      collection: "products",
      depth: 1,
      where,
      limit: 25,
    });

    return {
      ...data,
      docs: data.docs.map((doc) => ({
        ...doc,
        tenant: doc.tenant as Tenant,
      })),
    };
  }),
  getTabletCarousel: baseProcedure.query(async ({ ctx, input }) => {
    const where: Where = {};
    where.category = {
      equals: "686ff0c7d6713d28c0188278",
    };
    where.available = {
      equals: true,
    };
    const data: PaginatedDocs<Product> = await ctx.db.find({
      collection: "products",
      depth: 1,
      where,
      limit: 25,
    });

    return {
      ...data,
      docs: data.docs.map((doc) => ({
        ...doc,
        tenant: doc.tenant as Tenant,
      })),
    };
  }),
  getOneWithOrder: baseProcedure
    .input(
      z.object({
        order: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      where.order = {
        equals: input.order,
      };

      const data: PaginatedDocs<Product> = await ctx.db.find({
        collection: "products",
        depth: 1,
        where,
        limit: 1,
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          tenant: doc.tenant as Tenant,
        })),
      };
    }),
  getOneWithDKP: baseProcedure
    .input(
      z.object({
        order: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const matchedProductsByOrder = await ctx.db.find({
        collection: "products",
        where: {
          order: { equals: Number(input.order) },
        },
      });

      if (!matchedProductsByOrder || matchedProductsByOrder.totalDocs === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "products not found",
        });
      }

      const dkp = matchedProductsByOrder.docs[0].address.replace(/\D/g, "");

      const data: PaginatedDocs<Product> = await ctx.db.find({
        collection: "products",
        where: {
          address: {
            like: dkp,
          },
        },
        // limit: 5,
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          tenant: doc.tenant as Tenant,
        })),
      };
    }),

  getCartProducts: baseProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
      const data: PaginatedDocs<Product> = await ctx.db.find({
        collection: "products",
        where: {
          id: {
            in: input.productIds,
          },
        },
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          tenant: doc.tenant as Tenant,
        })),
      };
    }),
});
