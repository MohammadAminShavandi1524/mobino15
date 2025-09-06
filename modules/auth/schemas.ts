import z from "zod";

export const passwordSchema = z
  .string("لطفا این قسمت را خالی نگذارید")
  .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
  .max(128, "رمز عبور نباید بیشتر از ۱۲۸ کاراکتر باشد")
  .regex(/[a-z]/, "باید حداقل یک حرف کوچک انگلیسی داشته باشد")
  .regex(/[A-Z]/, "باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
  .regex(/[0-9]/, "باید حداقل یک عدد داشته باشد")
  .refine((val) => !val.includes(" "), "رمز عبور نباید فاصله داشته باشد");

export const usernameSchema = z
  .string("لطفا این قسمت را خالی نگذارید")
  .min(5, "نام کاربری حداقل باید 5 حرف باشد")
  .max(70, "نام کاربری باید کمتر از 70 حرف باشد")
  .regex(
    /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
    "فقط حروف کوچک، عدد و خط فاصله؛ با حرف یا عدد شروع و پایان یابد",
  )

  .refine(
    (val) => !val.includes("--"),
    "نام کاربری نمی‌تواند شامل خط فاصله‌های متوالی باشد",
  )
  .refine(
    (val) => /^[\x00-\x7F]*$/.test(val),
    "نام کاربری نمی‌تواند شامل حروف فارسی یا کاراکترهای غیرمجاز باشد",
  )
  .transform((val) => val.toLowerCase());

export const sellernameSchema = z
  .string("لطفا این قسمت را خالی نگذارید")
  .min(5, "نام فروشنده حداقل باید ۵ حرف باشد")
  .max(40, "نام فروشنده باید کمتر از ۴۰ حرف باشد");

export const emailSchema = z
  .string("لطفا این قسمت را خالی نگذارید")
  .min(6, "ایمیل خیلی کوتاه است")
  .max(254, "ایمیل خیلی طولانی است")
  .email("فرمت ایمیل معتبر نیست")
  .refine((val) => val.endsWith(".com") || val.endsWith(".ir"), {
    message: "ایمیل باید با .com یا .ir تمام شود",
  });

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  sellername: sellernameSchema,
});
export const UserRegisterSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.string("لطفا این قسمت را خالی نگذارید").email("ایمیل معتبر نیست"),
  password: z.string("لطفا این قسمت را خالی نگذارید"),
});
