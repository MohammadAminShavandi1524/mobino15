"use client";

import Skeleton from "./Skleton";

interface CartPageSkeletonProps {}

const CartPageSkeleton = ({}: CartPageSkeletonProps) => {
  return (
    <div className="3xl:gap-x-10 s:px-6 relative mt-4 flex max-w-[1920px] grid-cols-20 flex-col gap-x-8 gap-y-10 pt-4 sm:px-6 md:px-8 lg:mx-auto lg:w-[90%] lg:px-8 xl:flex-row xl:px-10 2xl:px-20">
      {/* main content */}
      <div className="flex w-full flex-col">
        {/* header */}
        <div className="s:px-4 max-s:border-b-6 max-s:border-b-custom-skeleton max-s:border-double xss:px-6 max-s:pb-4 flex items-center justify-between px-4">
          <div className="flex items-center gap-x-2 md:gap-x-3">
            <Skeleton className="h-6 w-23 max-md:pt-0.5 md:h-7 md:w-26 2xl:h-7.5 2xl:w-30" />

            <div className="pt-0.5 max-md:hidden">
              <Skeleton className="h-4 w-12 2xl:h-5 2xl:w-14" />
            </div>
            <div className="md:hidden">
              <Skeleton className="size-6 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-x-1.25">
            <Skeleton className="s:w-27 s:h-5 h-4 w-23" />
            <Skeleton className="s:size-5 size-4" />
          </div>
        </div>

        {/* content */}
        <div className="mt-4 flex flex-col gap-y-6">
          {" "}
          {[1, 2].map((_, index) => {
            return (
              <div
                key={index}
                className="s:border s:rounded-xl s:border-custom-skeleton s:p-4 border-b-custom-skeleton relative flex flex-col border-x-0 border-b-6 border-double p-4 pb-6 max-sm:items-center sm:p-6 sm:pt-4 md:p-10 md:pt-6"
              >
                {/* remove product absolute*/}
                <Skeleton className="absolute top-0 left-0 z-5 m-2 hidden size-8 cursor-pointer items-center justify-center rounded-full p-1.5 shadow-[0px_1px_4px_rgba(0,0,0,0.08)] sm:flex md:size-9" />
                {/* upper content */}
                <div className="s:px-0 xss:pr-2 xss:pl-1 s:gap-x-6 xss:gap-x-4 flex w-full flex-row-reverse gap-x-4 max-sm:justify-between sm:grid sm:grid-cols-20 sm:gap-x-0">
                  {/* title and seller info */}
                  <div className="flex w-50 flex-col pt-4 max-sm:w-full sm:col-span-11 sm:pt-4.5 2xl:col-span-13">
                    {/* product fa title */}
                    <div className="mb-4 flex min-h-20 flex-col gap-y-1 sm:min-h-[112px] sm:gap-y-1.5 lg:w-full 2xl:gap-y-2">
                      <Skeleton className="xss:w-60 s:w-70 h-4 w-50 max-w-[540px] shrink sm:h-5 sm:w-80 xl:w-100 2xl:h-6 2xl:w-[480px]" />
                      <Skeleton className="xss:w-60 s:w-70 h-4 w-50 max-w-[540px] shrink sm:h-5 sm:w-80 xl:w-100 2xl:h-6 2xl:w-[350px]" />
                    </div>
                    {/* seller info */}
                    <div className="flex flex-col gap-y-3 sm:gap-y-4">
                      {[1, 2, 3].map((_, index) => {
                        return (
                          <div
                            className="flex items-center gap-x-2 sm:gap-x-2.5 2xl:gap-x-3.5"
                            key={index}
                          >
                            <Skeleton className="size-4.5 rounded-sm sm:size-5 2xl:size-6" />
                            <Skeleton className="h-4 w-26 pb-0.5 sm:h-5 sm:w-28 2xl:h-6 2xl:w-33" />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* image */}

                  <div className="3xl:pr-0 mlg:pl-[68px] s:pt-0 flex justify-end pt-4 sm:col-span-9 sm:pl-10 md:pt-8 md:pl-[50px] lg:pt-10 xl:justify-center xl:pr-[24px] xl:pl-0 2xl:col-span-7 2xl:pr-[22px]">
                    <Skeleton className="xss:size-24 relative size-20 sm:size-38 md:size-44" />
                  </div>
                </div>
                {/* price and availablity */}

                <div className="mt-8 flex min-w-80 flex-col rounded-md border border-[#f0f0f0] px-6 py-3 max-sm:w-full max-sm:shadow-sm sm:mt-6 sm:ml-[10px] sm:self-baseline-last xl:ml-0 2xl:min-w-90">
                  <div className="flex w-full flex-col">
                    {/* price  */}
                    <div className="flex items-center gap-x-1 self-baseline-last">
                      <Skeleton className="h-7.5 w-23" />
                      <Skeleton className="size-5 rounded-sm" />
                    </div>
                    {/* color and count control */}
                    <div className="mt-3 flex items-center justify-between">
                      {/* color */}
                      <div className="border-custom-skeleton flex items-center justify-between rounded-[5px] border p-[3px]">
                        <Skeleton className="size-4 rounded-[6px] md:size-5" />
                        <Skeleton className="mr-1 ml-2 h-4 w-7.5" />
                      </div>

                      {/* control Bar */}
                      <div className="relative flex w-37.5 items-center justify-between md:w-45">
                        <Skeleton className="size-8 rounded-sm md:size-9" />

                        <Skeleton className="h-8 w-6 rounded-sm md:h-9 md:w-7" />

                        <Skeleton className="size-8 rounded-sm md:size-9" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* aside */}
      <div className="flex flex-col self-baseline max-xl:w-full xl:sticky xl:top-5 xl:min-w-90 2xl:min-w-100">
        <Skeleton className="mr-3 h-6 w-23 2xl:h-7 2xl:w-26" />
        <div className="mt-5 flex flex-col rounded-lg p-8 pb-6 max-xl:bg-[#f6f6f6] xl:shadow-[0px_1px_4px_rgba(0,0,0,0.08)]">
          {[1, 2, 3].map((_, index) => {
            return (
              <div className="my-3 flex items-center justify-between">
                <Skeleton className="h-6 w-23" />
                <Skeleton className="h-7 w-28" />
              </div>
            );
          })}

          <Skeleton className="mt-4 h-12 w-full rounded-lg md:h-13" />
        </div>
      </div>
    </div>
  );
};

export default CartPageSkeleton;
