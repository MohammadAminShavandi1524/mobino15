"use client";

import { cn } from "@/lib/utils";
import Skeleton from "../Skleton";
import { useBreakpoints } from "@/hooks/useBreakPoint";

const ProductsCarouselSkeleton = ({}) => {
  const { lg, md, _2xl, _3xl, mlg, s, sm, xl, xs } = useBreakpoints();
 

  const card = (
    <div className="border-l-custom-skeleton flex flex-col items-center gap-y-5 border-l pt-1 last:border-l-0 last:pl-0 lg:px-2 lg:pl-4">
      <div className="border-custom-skeleton mb-3 flex size-[125px] items-center justify-center rounded-xl border lg:mb-5 lg:size-[186px]">
        <Skeleton className="size-[100px] lg:size-[139px]" />
      </div>

      <div className="mb-3 flex min-h-[63px] flex-col gap-1 overflow-x-hidden px-5 lg:px-6">
        <Skeleton className="h-4.75 min-w-[150px] max-w-full rounded-xl" />
        <Skeleton className="h-4.75 min-w-[150px] max-w-full rounded-xl" />
        <Skeleton className="h-4.75 min-w-[100px] max-w-2/3 rounded-xl" />
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "border-b-solid border-custom-skeleton mt-6 flex w-full flex-col border-t-5 border-b border-double pb-6 lg:mt-13 lg:min-h-120 lg:rounded-2xl lg:border lg:p-3",
      )}
    >
      <div
        className={cn(
          "mb-3 flex w-full items-center justify-between bg-transparent px-5 py-1.5 pr-7 lg:mb-6 lg:rounded-md lg:px-6 lg:py-3",
        )}
      >
        <Skeleton className="h-[23px] w-[116px] rounded-lg md:h-7 md:w-[115px] lg:h-8 lg:w-[185px]" />

        <Skeleton className="h-4.5 w-[81px] rounded-lg md:h-5 md:w-[91px]" />
      </div>

      <div className="3xl:grid-cols-6 mlg:grid-cols-4 grid grid-cols-2 grid-rows-1 overflow-hidden sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <div>{card}</div>
        <div>{card}</div>
        <div className="hidden sm:block">{card}</div>
        <div className="mlg:block hidden lg:hidden xl:block">{card}</div>
        <div className="hidden 2xl:block">{card}</div>
        <div className="3xl:block hidden">{card}</div>
      </div>
    </div>
  );
};

export default ProductsCarouselSkeleton;
