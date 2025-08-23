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
import { migrateGuestCartToUser } from "@/modules/checkout/hooks/useCart";
import { User } from "@/payload-types";
import { useTRPC } from "@/trpc/client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { SellerAuthInput } from "./SellerAuthInput";

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all", // this will show the form errors immediently
    resolver: zodResolver(loginSchema),
    // defaultValues: {
    //   email: "shavandi1524@gmail.com",
    //   password: "v;>P1524LC^w^P_",
    // },
  });

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: () => {
        toast.error("ایمیل یا رمز عبور اشتباه است");
      },

      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryOptions());

        const session = await queryClient.fetchQuery(
          trpc.auth.session.queryOptions(),
        );

        const username = session?.user?.username;

        if (username) {
          migrateGuestCartToUser(username);
        }

        router.push("/");
      },
    }),
  );

  const loginOnSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex  flex-col items-center gap-y-4"
        onSubmit={form.handleSubmit(loginOnSubmit)}
      >
        {/* email  */}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-[10px] text-[12px]">ایمیل</FormLabel>
              <FormControl>
                <SellerAuthInput className="" {...field} />
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
                <SellerAuthInput className="" {...field} />
              </FormControl>
              <FormMessage className="mr-[10px] text-[12px]" />
            </FormItem>
          )}
        />
        {/* submit button */}
        <button
          disabled={login.isPending}
          type="submit"
          className="bg-custom-primary mt-5 block h-[54px] w-[340px] cursor-pointer rounded-md text-xl font-semibold text-white disabled:cursor-default disabled:opacity-90"
        >
          ورود
        </button>
      </form>
    </Form>
  );
};
export default LoginForm;
