"use client";

import Skeleton from "./Skleton";

interface ProductListLayoutSkeletonProps {
  isCategory?: boolean;
}

const ProductListLayoutSkeleton = ({
  isCategory,
}: ProductListLayoutSkeletonProps) => {
  return (
    <div className="mt-4 flex flex-col lg:mx-auto lg:w-[90%] lg:max-w-[1920px] lg:px-6">
      <div className="flex flex-col gap-y-4 px-5 lg:px-2">
        {/* bread crump */}
        <div className="flex items-center gap-x-3">
          <Skeleton className="h-5 w-[115px]" />
          <span>/</span>
          <Skeleton className="h-5 w-[100px]" />
        </div>
        {/* category tag */}

        {isCategory && (
          <div className="flex items-center gap-x-3">
            <Skeleton className="h-9 w-[110px]" />
            <Skeleton className="h-9 w-[110px]" />
            <Skeleton className="h-9 w-[110px]" />
            <Skeleton className="h-9 w-[110px]" />
          </div>
        )}
      </div>

      {/* orderbar productlist filters */}
      <div className="relative mt-4 flex gap-x-8 lg:mt-8 lg:px-[10px]">
        <aside className="sticky top-0 right-0 flex max-w-[270px] min-w-[270px] flex-col self-start rounded-md border border-[#ced0d0] pb-4 max-lg:hidden">
          <div className="flex items-center justify-between border-b border-b-[#ced0d0] p-3.5">
            <div className="flex items-center gap-x-1">
              <Skeleton className="size-5 rounded-sm" />
              <Skeleton className="h-5 w-[50px]" />
            </div>
            <Skeleton className="size-5 rounded-sm" />
          </div>

          <div className="mx-[14px] flex flex-col">
            <div className="flex items-center justify-between py-5">
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-6 w-[40px] rounded-full" />
            </div>

            <div className="flex items-center justify-between py-5">
              <Skeleton className="h-5 w-[85px]" />
              <Skeleton className="size-6 rounded-xl" />
            </div>
            <div className="flex items-center justify-between py-5">
              <Skeleton className="h-5 w-[45px]" />
              <Skeleton className="size-6 rounded-xl" />
            </div>
            <div className="flex items-center justify-between py-5">
              <Skeleton className="h-5 w-[25px]" />
              <Skeleton className="size-6 rounded-xl" />
            </div>
          </div>
        </aside>

        {/*orderbar and products list  */}
        <div className="flex w-full flex-col">
          {/* order bar */}
          <div className="w-full bg-white max-lg:sticky max-lg:top-0 max-lg:z-5 max-lg:p-4 max-lg:px-5">
            <div className="lg:mb-6 flex items-center justify-between rounded-lg border border-[#e9ecf2] max-lg:px-4 lg:px-0 lg:pr-[14px] lg:pl-6">
              {/* pc orderbar */}
              <>
                {/* orders */}
                <div className="hidden gap-x-8 lg:flex">
                  {/* order logo */}
                  <div className="flex items-center gap-x-2 text-[#333333]">
                    <Skeleton className="h-5 w-5 rounded-md" />
                    <Skeleton className="h-5 w-[40px]" />
                  </div>

                  {/* order tags */}
                  <div className="flex gap-x-6 py-4 font-light text-[#212121]">
                    <Skeleton className="h-5 w-[75px]" />
                    <Skeleton className="h-5 w-[75px]" />
                    <Skeleton className="h-5 w-[75px]" />
                    <Skeleton className="h-5 w-[75px]" />
                  </div>
                </div>
                {/* total products */}

                <Skeleton className="hidden h-5 w-7.5 lg:flex" />
              </>

              {/* mobile order bar */}
              <>
                {/* order modal and filter sidebar */}
                <div className="s:gap-x-8 flex gap-x-6 lg:hidden">
                  {/* filter sidebar */}

                  <div className="flex items-center gap-x-1 py-3">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-11" />
                  </div>

                  {/* order modal */}

                  <div className="flex items-center gap-x-1 py-3">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-11" />
                    <Skeleton className="h-5 w-19" />
                  </div>
                </div>
                {/* total products */}

                <Skeleton className="h-5 w-7.5 py-3 lg:hidden" />
              </>
            </div>
          </div>
          {/* products list */}
          <div>
            {/* mobile */}
            <div className="s:hidden flex flex-col">
              {/* product card */}

              {Array.from({ length: 8 }).map((_, index) => (
                <div className="relative flex min-h-[250px] flex-col gap-y-4 border-b-6 border-double border-b-[#f1f3f8] p-3">
                  <div className="mt-5 mb-6 flex w-full flex-col px-1">
                    <Skeleton className="mb-2 h-5 w-19" />
                    <Skeleton className="h-1 w-full" />
                  </div>

                  <div className="grid w-full grid-cols-20">
                    {/* title ratingtag */}
                    <div className="col-span-11 flex w-full flex-col pr-1 pl-4">
                      {/* title */}

                      <div className="mt-2 mb-4 flex flex-col gap-1 overflow-x-hidden">
                        <Skeleton className="h-4.5 max-w-full min-w-[120px] rounded-xl" />
                        <Skeleton className="h-4.5 max-w-full min-w-[120px] rounded-xl" />
                        <Skeleton className="h-4.5 max-w-full min-w-[120px] rounded-xl" />
                        <Skeleton className="h-4.5 max-w-2/3 min-w-[80px] rounded-xl" />
                      </div>

                      {/* rating and quntity */}

                      <div className="mb-6 flex w-full items-center justify-between px-1">
                        <Skeleton className="h-4 w-18" />
                        <Skeleton className="h-4 w-10" />
                      </div>

                      {/* price - offPrice - decount percent */}

                      <div className="flex w-full items-center justify-end gap-x-1 px-0.5 pb-10">
                        <Skeleton className="h-7.5 w-24" />
                        <Skeleton className="h-5 w-8" />
                      </div>
                    </div>
                    {/* image and colors */}
                    <div className="col-span-9 flex w-full flex-col items-center">
                      {/* تصویر */}
                      <div className="mb-4 flex w-full items-center justify-center">
                        <Skeleton className="size-[140px]" />
                      </div>

                      {/* دایره رنگ ها  */}

                      <div className="flex items-center gap-x-1.5 rounded-full bg-[#ffffff] p-1">
                        <Skeleton className="size-2.5 rounded-full shadow-sm" />
                        <Skeleton className="size-2.5 rounded-full shadow-sm" />
                        <Skeleton className="size-2.5 rounded-full shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* pc */}
            <div className="3xl:grid-cols-5 s:grid-cols-2 mlg:grid-cols-3 max-s:hidden grid grid-cols-1 gap-x-3 gap-y-3 max-lg:px-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {/* product card */}
              {Array.from({ length: 40 }).map((_, index) => (
                <div
                  key={index}
                  className="relative flex min-h-[480px] w-full flex-col items-center rounded-md bg-white px-5 shadow-[0px_1px_4px_rgba(0,0,0,0.08)]"
                >
                  <div className="mt-5 mb-6 flex w-full flex-col">
                    <Skeleton className="mb-2 h-5 w-19" />
                    <Skeleton className="h-1 w-full" />
                  </div>

                  <Skeleton className="mb-5 size-[185px]" />

                  <div className="mb-4 flex min-h-[63px] flex-col gap-1 overflow-x-hidden px-5 lg:px-6">
                    <Skeleton className="h-4.75 max-w-full min-w-[210px] rounded-xl" />
                    <Skeleton className="h-4.75 max-w-full min-w-[210px] rounded-xl" />
                    <Skeleton className="h-4.75 max-w-2/3 min-w-[140px] rounded-xl" />
                  </div>

                  <div className="mb-6 flex w-full items-center justify-between">
                    <Skeleton className="h-4 w-18" />
                    <Skeleton className="h-4 w-10" />
                  </div>

                  <div className="flex w-full items-center justify-end gap-x-1 pb-10">
                    <Skeleton className="h-7.5 w-24" />
                    <Skeleton className="h-5 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListLayoutSkeleton;
