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
import { migrateGuestCartToUser } from "@/modules/checkout/hooks/useCart";
import { User } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface RegisterFormProps {
  user: User | null;
}

const RegisterForm = ({ user }: RegisterFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all", // this will show the form errors immediently
    resolver: zodResolver(registerSchema),
    // defaultValues: {
    //   username: "",
    //   email: "",
    //   password: "",
    //   sellername: "",
    // },
  });

  const registerOnSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values);
  };

  const trpc = useTRPC();

  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },

      onSuccess: () => {
        if (user) {
          migrateGuestCartToUser(user?.username);
        }
        router.push("/");
      },
    })
  );

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
              <FormMessage className="mr-[10px] text-[12px]" />
            </FormItem>
          )}
        />
        {/*seller name */}
        <FormField
          name="sellername"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-[10px] text-[12px] flex gap-x-1">
                <span>نام فروشگاه</span>
                {/* <span>(اسمی که نمایش داده میشود)</span> */}
              </FormLabel>
              <FormControl>
                <Input className="w-[380px] h-[60px] text-base" {...field} />
              </FormControl>
              <FormMessage className="mr-[10px] text-[12px]" />
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
                <Input
                  type="password"
                  className="w-[380px] h-[60px] text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mr-[10px] text-[12px]" />
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
