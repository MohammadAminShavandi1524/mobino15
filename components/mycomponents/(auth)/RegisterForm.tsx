"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/modules/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all", // this will show the form errors immediently
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "maminshavandi",
      email: "maminshavandi@gmail.com",
      password: "v;>Pe23wLC^w^P_",
    },
  });

  const registerOnSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
  };

  // const username = form.watch("username");
  // const usernameErrors = form.formState.errors.username;

  // const showPreview = username && !usernameErrors;

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full items-center gap-y-6"
        onSubmit={form.handleSubmit(registerOnSubmit)}
      >
        {/* user name */}
        <FormField
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-[10px] text-[12px]">
                نام کاربری
              </FormLabel>
              <FormControl>
                <Input className="w-[380px] h-[60px] text-base" {...field} />
              </FormControl>
              {/* <FormDescription
                className={cn("hidden", showPreview && "block")}
              >
                <span>فروشگاه شما در دسترس خواهد بود در</span>
                <span className="font-semibold">{username}</span>
                <span>.shop.com</span>
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* email  */}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-[10px] text-[12px]">ایمیل</FormLabel>
              <FormControl>
                <Input className="w-[380px] h-[60px] text-base" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* password */}
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-[10px] text-[12px]">رمز عبور</FormLabel>
              <FormControl>
                <Input className="w-[380px] h-[60px] text-base" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* submit button */}
        <button
          type="submit"
          className="block w-full h-[60px] mt-5 bg-custom-primary text-white text-xl font-semibold rounded-md cursor-pointer"
        >
          ثبت نام
        </button>
      </form>
    </Form>
  );
};
export default RegisterForm;
