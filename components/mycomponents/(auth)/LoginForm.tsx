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
import { loginSchema } from "@/modules/auth/schemas";
import { useTRPC } from "@/trpc/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation,  } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all", // this will show the form errors immediently
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "maminshavandi@gmail.com",
      password: "v;>Pe23wLC^w^P_",
    },
  });

  const trpc = useTRPC();
 

  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: () => {
        toast.error("ایمیل یا رمز عبور اشتباه است");
      },

      onSuccess: () => {
        // await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
        router.push("/");
      },
    })
  );

  const loginOnSubmit = (values: z.infer<typeof loginSchema>) => {
    // console.log("🚀 ~ onSubmit ~ values:", values);
    login.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full items-center gap-y-4"
        onSubmit={form.handleSubmit(loginOnSubmit)}
      >
        {/* email  */}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-[10px] text-[12px]">ایمیل</FormLabel>
              <FormControl>
                <Input className="w-[380px] h-[60px] text-base" {...field} />
              </FormControl>
              <FormMessage className="mr-[10px] text-[12px]" />
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
              <FormMessage className="mr-[10px] text-[12px]" />
            </FormItem>
          )}
        />
        {/* submit button */}
        <button
          disabled={login.isPending}
          type="submit"
          className="block w-full h-[60px] mt-5 bg-custom-primary text-white text-xl font-semibold rounded-md cursor-pointer"
        >
          ورود
        </button>
      </form>
    </Form>
  );
};
export default LoginForm;
