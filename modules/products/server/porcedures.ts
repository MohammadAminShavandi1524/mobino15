import { Product } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import z from "zod";
import { PaginatedDocs, Where } from "payload";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        available: z.boolean().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        color: z.array(z.string()).nullable().optional(),
        brand: z.array(z.string()).nullable().optional(),
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
