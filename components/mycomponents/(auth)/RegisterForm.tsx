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
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
    // console.log("🚀 ~ onSubmit ~ values:", values);
    register.mutate(values)
  };


  const trpc = useTRPC()
  const register = useMutation(trpc.auth.register.mutationOptions({
    onError : (error)=>{
      toast.error(error.message)
    }
  }))


  // const username = form.watch("username");
  // const usernameErrors = form.formState.errors.username;

  // const showPreview = username && !usernameErrors;

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full items-center gap-y-4"
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
              <FormMessage className="mr-[10px] text-[12px]"/>
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
              <FormMessage className="mr-[10px] text-[12px]"/>
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
               <FormMessage className="mr-[10px] text-[12px]"/>
            </FormItem>
          )}
        />
        {/* submit button */}
        <button
        disabled={register.isPending}
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
