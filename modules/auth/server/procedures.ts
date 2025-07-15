import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import z, { email } from "zod";
import { AUTH_COOKIE } from "../constants";

export const passwordSchema = z
  .string()
  .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
  .max(128, "رمز عبور نباید از ۱۲۸ کاراکتر بیشتر شود")
  .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک انگلیسی داشته باشد")
  .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
  .regex(/[0-9]/, "رمز عبور باید حداقل یک رقم داشته باشد")
  .regex(/[^a-zA-Z0-9]/, "رمز عبور باید حداقل یک نویسۀ خاص داشته باشد")
  .refine((val) => !val.includes(" "), "رمز عبور نباید فاصله داشته باشد");

export const usernameSchema = z
  .string()
  .min(5, "نام کاربری حداقل باید 5 حرف باشد")
  .max(70, "نام کاربری باید کمتر از 70 حرف باشد")
  .regex(
    /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
    "نام کاربری فقط می‌تواند شامل حروف کوچک، اعداد و خط فاصله باشد، باید با حرف یا عدد شروع و پایان یابد"
  )
  .refine(
    (val) => !val.includes("--"),
    "نام کاربری نمی‌تواند شامل خط فاصله‌های متوالی باشد"
  )
  .transform((val) => val.toLowerCase());

export const emailSchema = z
  .string()
  .min(6, "ایمیل خیلی کوتاه است")
  .max(254, "ایمیل خیلی طولانی است")
  .email("فرمت ایمیل معتبر نیست")
  .refine((val) => val.endsWith(".com") || val.endsWith(".ir"), {
    message: "ایمیل باید با .com یا .ir تمام شود",
  });

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.db.auth({ headers });

    return session;
  }),

  register: baseProcedure
    .input(
      z.object({
        email: emailSchema,
        password: passwordSchema,
        username: usernameSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.create({
        collection: "users",
        data: {
          username: input.username,
          email: input.email,
          password: input.password,
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

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        //? for later
        // sameSite : "none",
        // domain : ""
      });
    }),

  login: baseProcedure
    .input(
      z.object({
        email: z.string().email("ایمیل معتبر نیست"),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        //? for later
        // sameSite : "none",
        // domain : ""
      });

      return data;
    }),

  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),
});
