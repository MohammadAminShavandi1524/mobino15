import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";
import { generateCookies } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.db.auth({ headers });

    return session;
  }),

  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      //* username error
      const existingUsername = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      const existingUser = existingUsername.docs[0];

      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "این نام کاربری قبلاً انتخاب شده است.",
        });
      }

      //* sellername error

      const existingSellername = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          sellername: {
            equals: input.sellername,
          },
        },
      });

      const existingSeller = existingSellername.docs[0];

      if (existingSeller) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "این نام فروشگاه قبلاً انتخاب شده است.",
        });
      }

      //* email error

      const existingEamil = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          email: {
            equals: input.email,
          },
        },
      });

      const _existingEamil = existingEamil.docs[0];

      if (_existingEamil) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "این ایمیل قبلاً انتخاب شده است.",
        });
      }
      // ******************************************************************************

      const tenant = await ctx.db.create({
        collection: "tenants",
        data: {
          name: input.sellername,
          slug: input.username,
        },
      });

      await ctx.db.create({
        collection: "users",
        data: {
          username: input.username,
          email: input.email,
          password: input.password,
          sellername: input.sellername,
          roles: ["seller"],
          tenants: [
            {
              tenant: tenant.id,
            },
          ],
        },
      });

      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "ورود ناموفق بود",
        });
      }

      await generateCookies({
        prefix: ctx.db.config.cookiePrefix,
        value: data.token,
      });
    }),

  login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "ایمیل یا رمز عبور اشتباه است.",
      });
    }

    // const cookies = await getCookies();
    // cookies.set({
    //   name: AUTH_COOKIE,
    //   value: data.token,
    //   httpOnly: true,
    //   path: "/",
    // });

    await generateCookies({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    });

    return data;
  }),

  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),
});
