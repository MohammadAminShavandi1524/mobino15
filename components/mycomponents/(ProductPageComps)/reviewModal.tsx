"use client";

import z from "zod";
import {
  cn,
  convertToPersianNumber,
  getColorInfo,
  getMainImageUrl,
} from "@/lib/utils";
import { Product } from "@/payload-types";
import { CircleCheck, CircleX, Percent, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import ProductFaTitle from "./ProductFaTitle";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addReviewSchema } from "@/modules/reviews/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTRPC } from "@/trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Rating, RatingButton } from "@/components/ui/rating";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReviewModalProps {
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: Dispatch<SetStateAction<boolean>>;
  product: Product;
  userId?: string;
}

const formSchema = z.object({
  rating: z
    .number("یک عدد بین ۱ تا ۵ انتخاب کن")
    .min(1, "حداقل امتیاز ۱ است")
    .max(5, "حداکثر امتیاز ۵ است"),
  description: z
    .string("توضیحات نمی‌تواند خالی باشد")
    .min(1, "توضیحات نمی‌تواند خالی باشد"),
});

const ReviewModal = ({
  isReviewModalOpen,
  setIsReviewModalOpen,
  product,
  userId,
}: ReviewModalProps) => {
  const mainImageUrl = getMainImageUrl(product);

  const trpc = useTRPC();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all", // this will show the form errors immediently
    resolver: zodResolver(formSchema),
    // defaultValues: { description: "فعلا که از گوشی راضی هستم" },
  });

  const addreviewOnSubmit = (values: z.infer<typeof formSchema>) => {
    addReview.mutate({
      productId: product.id,
      description: values.description,
      rating: values.rating,
      userId: userId ?? "6884d171a767a882d176be72", // mobino id for guests
    });
  };

  const addReview = useMutation(
    trpc.reviews.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },

      onSuccess: () => {
        setIsReviewModalOpen(false);
        router.refresh();
      },
    }),
  );

  return (
    <>
      {isReviewModalOpen && (
        <div
          onClick={() => setIsReviewModalOpen(false)}
          className="fixed top-0 right-0 z-[500] flex min-h-screen min-w-screen items-center justify-center overflow-y-scroll bg-zinc-900/50"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex flex-col overflow-y-hidden bg-white px-4 py-8 max-sm:h-screen sm:w-[420px] sm:max-w-[420px] sm:rounded-xl sm:py-6 sm:shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
          >
            {/* header */}
            <div className="mb-5 flex items-center justify-between border-b border-b-[#919ebc] px-5 pb-5">
              <span className="text-lg sm:text-xl">افزودن نظر</span>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="flex cursor-pointer items-center gap-x-1"
              >
                <span className="pb-0.5 max-sm:hidden lg:hidden">بستن</span>
                <X size={24} />
              </button>
            </div>

            <div className="">
              {/* title and image */}
              <div className="mb-8 flex items-center gap-x-5 rounded-lg px-5 py-2.5 shadow-[0px_1px_4px_rgba(0,0,0,0.08)]">
                {/* image */}
                <div className="flex min-w-[100px] items-center justify-center self-baseline">
                  <Image
                    className={cn("")}
                    src={mainImageUrl}
                    alt={product.name}
                    width={80}
                    height={80}
                  />
                </div>

                {/* title */}
                <ProductFaTitle
                  className="productlist-title m-0 overflow-y-hidden text-justify text-[12px]/[18px] font-normal text-[#212121] lg:text-[14px]/[21px] 2xl:text-[15px]/[24px]"
                  label={product.label}
                />
              </div>
              {/* form */}
              <Form {...form}>
                <form
                  className="flex flex-col"
                  onSubmit={form.handleSubmit(addreviewOnSubmit)}
                >
                  {/* rating */}

                  <FormField
                    name="rating"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="mb-4 flex w-full flex-col items-center gap-y-4">
                        <FormLabel className="text-center text-[14px]">
                          به این کالا امتیاز دهید :)
                        </FormLabel>
                        <FormControl>
                          <div style={{ direction: "rtl" }}>
                            <Rating
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              {Array.from({ length: 5 }).map((_, index) => (
                                <RatingButton
                                  className="text-[#f1c21b]"
                                  key={index}
                                />
                              ))}
                            </Rating>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* description */}

                  <div className="mb-10">
                    <FormField
                      name="description"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mr-[10px] text-[12px]">
                            نظر خود را در مورد این محصول بنویسید
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="h-[120px] resize-none text-base lg:w-[380px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="mr-[10px] text-[12px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* add review button */}
                  <button
                    disabled={addReview.isPending}
                    type="submit"
                    className="bg-custom-primary flex h-13 w-full cursor-pointer items-center justify-center rounded-lg text-lg text-white disabled:cursor-default disabled:opacity-90 max-sm:self-end"
                  >
                    ثبت نظر
                  </button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ReviewModal;
