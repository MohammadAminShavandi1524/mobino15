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
import { UserRegisterSchema } from "@/modules/auth/schemas";
import { migrateGuestCartToUser } from "@/modules/checkout/hooks/useCart";
import { User } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import ConicGradientButton from "./ConicGradientButton";

interface UserRegisterFormProps {
  user: User | null;
}

const UserRegisterForm = ({ user }: UserRegisterFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof UserRegisterSchema>>({
    mode: "all", // this will show the form errors immediently
    resolver: zodResolver(UserRegisterSchema),
    // defaultValues: {
    //   username: "",
    //   email: "",
    //   password: "",
    //   sellername: "",
    // },
  });

  const registerOnSubmit = (values: z.infer<typeof UserRegisterSchema>) => {
    register.mutate(values);
  };

  const trpc = useTRPC();

  const register = useMutation(
    trpc.auth.UserRegister.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },

      onSuccess: () => {
        if (user) {
          migrateGuestCartToUser(user?.username);
        }
        router.push("/");
      },
    }),
  );

  // const username = form.watch("username");
  // const usernameErrors = form.formState.errors.username;

  // const showPreview = username && !usernameErrors;
  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center gap-y-4"
        onSubmit={form.handleSubmit(registerOnSubmit)}
      >
        {/* email  */}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mr-[10px] text-[12px]">ایمیل</FormLabel>
              <FormControl>
                <Input className="" {...field} />
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
                <Input type="password" className="" {...field} />
              </FormControl>
              <FormMessage className="mr-[10px] text-[12px]" />
            </FormItem>
          )}
        />
        {/* submit button */}
        {/* <button
          disabled={register.isPending}
          type="submit"
          className="bg-primaryGradient xss:w-[370px] s:w-full mt-5 block h-[48px] w-75 cursor-pointer rounded-md text-xl font-semibold text-white"
        >
          ثبت نام
        </button> */}
        <ConicGradientButton
          buttonType="submit"
          disabled={register.isPending}
          className="bg-primaryGradient s:w-full xss:w-[370px] flex h-[48px] w-75 cursor-pointer items-center justify-center rounded-md text-xl font-semibold text-white disabled:cursor-default disabled:opacity-90"
        >
          ثبت نام
        </ConicGradientButton>
      </form>
    </Form>
  );
};

export default UserRegisterForm;
