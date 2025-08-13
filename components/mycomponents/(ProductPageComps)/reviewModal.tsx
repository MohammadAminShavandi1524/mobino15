"use client";

import z from "zod";
import { cn, convertToPersianNumber, getColorInfo } from "@/lib/utils";
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
  type: "single" | "multiple";
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: Dispatch<SetStateAction<boolean>>;
  product: Product;
  userId?: string;

  MPMainImage?: {
    url: string;
    isMain?: boolean | null;
    id?: string | null;
  } | null;

  SPMainImage?: {
    url: string;
    isMain?: boolean | null;
    id?: string | null;
  } | null;
}

const formSchema = z.object({
  rating: z
    .number("یک عدد بین ۱ تا ۵ انتخاب کن")
    .min(1, "حداقل امتیاز ۱ است")
    .max(5, "حداکثر امتیاز ۵ است"),
  description: z.string().min(1, "توضیحات نمی‌تواند خالی باشد"),
});

const ReviewModal = ({
  isReviewModalOpen,
  setIsReviewModalOpen,
  product,
  userId,
  type,
  MPMainImage,
  SPMainImage,
}: ReviewModalProps) => {
  // const [ratingValue, setRatingValue] = useState<number>(0);
  // console.log("🚀 ~ ReviewModal ~ ratingValue:", ratingValue);

  const mainImage = type === "multiple" ? MPMainImage : SPMainImage;

  const trpc = useTRPC();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all", // this will show the form errors immediently
    resolver: zodResolver(formSchema),
    defaultValues: { description: "فعلا که از گوشی راضی هستم" },
  });

  const addreviewOnSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
        router.refresh()
      },
    })
  );

  return (
    <>
      {isReviewModalOpen && (
        <div
          onClick={() => setIsReviewModalOpen(false)}
          className="fixed z-[500] top-0 right-0  bg-zinc-900/50 min-w-screen min-h-screen flex justify-center items-center overflow-y-scroll"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex flex-col w-[420px]  max-w-[420px]  bg-white rounded-xl shadow-[0px_1px_4px_rgba(0,0,0,0.08)] p-4 py-6"
          >
            {/* header */}
            <div className="flex items-center justify-between pb-5 px-5 mb-5 border-b border-b-[#919ebc]">
              <span className="text-xl ">افزودن نظر</span>
              <span
                onClick={() => setIsReviewModalOpen(false)}
                className="cursor-pointer"
              >
                <X size={24} />
              </span>
            </div>

            <div>
              {/* title and image */}
              <div className="flex items-center gap-x-5 py-2.5 px-5 mb-8 rounded-lg shadow-[0px_1px_4px_rgba(0,0,0,0.08)]">
                {/* image */}
                <div className="flex justify-center items-center self-baseline min-w-[100px]">
                  {mainImage && (
                    <Image
                      className={cn("")}
                      src={mainImage.url}
                      alt={product.name}
                      width={80}
                      height={80}
                    />
                  )}
                </div>

                {/* title */}
                <ProductFaTitle
                  className="productlist-title overflow-y-hidden text-[12px]/[18px] text-[#212121] font-normal text-justify m-0"
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
                      <FormItem className="w-full mb-4 flex flex-col items-center gap-y-4">
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
                              className="w-[380px] h-[120px] text-base resize-none"
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
                    className="flex items-center justify-center h-13 w-full bg-custom-primary text-white cursor-pointer rounded-lg text-lg disabled:opacity-90 disabled:cursor-pointer "
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
