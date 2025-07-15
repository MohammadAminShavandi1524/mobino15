import z from "zod";




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






export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
});
