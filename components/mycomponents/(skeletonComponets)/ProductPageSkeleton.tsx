"use client";

import { cn } from "@/lib/utils";
import Skeleton from "./Skleton";
import ProductsCarouselSkeleton from "./Landing/ProductsCarouselSkeleton";

const ProductPageSkeleton = ({}) => {
   return (
    <div className="relative mt-4 mb-50 lg:mx-auto lg:w-[90%] lg:max-w-[1600px] lg:px-2.5">
      <div className="xss:px-6 s:px-8 flex flex-col px-4 lg:px-0">
        {/* bread crump */}
        <div className="max-s:justify-center mb-5 flex items-center gap-x-3 overflow-x-hidden px-1">
          <Skeleton className="h-5 w-[115px] shrink-0" />
          <span>/</span>
          <Skeleton className="h-5 w-[40px] shrink-0" />
          <span>/</span>
          <Skeleton className="h-5 w-[70px] shrink-0" />
          <span className="max-s:hidden">/</span>
          <Skeleton className="max-s:hidden h-5 w-[500px]" />
        </div>

        {/* main content pc*/}
        <div className="3xl:gap-x-[50px] relative hidden gap-y-10 bg-[#fcfeff] max-2xl:mt-4 max-2xl:border-y-5 max-2xl:border-double max-2xl:border-y-[#d3d8e4] max-2xl:py-10 max-xl:flex-col lg:flex 2xl:gap-x-10">
          {/* landing main */}
          <div className="grid w-full grid-cols-20 rounded-xl 2xl:border 2xl:border-[#d3d8e4]">
            {/* col span 11 */}
            <div className="col-span-10 flex h-full flex-col rounded-r-xl bg-[#fcfeff] p-0 pr-0.5 xl:col-span-11 2xl:p-10 2xl:pl-0">
              {/* product fa title */}
              <ProductFaTitleSkeleton />
              {/* product en title */}
              <ProductEnTitleSkeleton />
              <div className="mb-10 self-baseline">
                {/* product rating */}
                <div className="mb-4 flex items-center gap-x-1 self-baseline border-b border-b-[#d3d8e4] pb-4 pl-6">
                  <Skeleton className="h-6 w-21 2xl:h-7 2xl:w-24" />
                  <Skeleton className="h-6 w-12 2xl:h-7 2xl:w-15" />
                </div>
                {/* product color */}
                <div className="flex flex-col gap-y-[14px] self-baseline border-b border-b-[#d3d8e4] pb-4 pl-6">
                  <div className="flex items-center gap-x-2 text-sm 2xl:text-base">
                    <Skeleton className="h-6 w-8 2xl:h-7 2xl:w-9.5" />
                    <Skeleton className="h-6 w-10 2xl:h-7 2xl:w-11.5" />
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex items-center justify-between self-baseline rounded-[6px] border border-[#d7dee0] p-[4px]">
                      <Skeleton className="size-4.5 rounded-[6px] 2xl:size-5" />
                      <Skeleton className="mr-2 ml-2 h-5.25 w-9.5 2xl:mr-2 2xl:ml-3" />
                    </div>
                    <div className="flex items-center justify-between self-baseline rounded-[6px] border border-[#d7dee0] p-[4px]">
                      <Skeleton className="size-4.5 rounded-[6px] 2xl:size-5" />
                      <Skeleton className="mr-2 ml-2 h-5.25 w-13 2xl:mr-2 2xl:ml-3" />
                    </div>
                    <div className="flex items-center justify-between self-baseline rounded-[6px] border border-[#d7dee0] p-[4px]">
                      <Skeleton className="size-4.5 rounded-[6px] 2xl:size-5" />
                      <Skeleton className="mr-2 ml-2 h-5.25 w-11 2xl:mr-2 2xl:ml-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* main specifictions */}

              <div className="flex flex-col gap-y-2.5">
                <Skeleton className="h-6.5 w-28 pr-1.5 pb-0.5" />

                <div className="w-full gap-y-3.5 rounded-[10px] border border-[#d7dee0] bg-white px-4.5 py-0.5 pl-6.5 2xl:px-5 2xl:py-1 2xl:pl-7.5">
                  {/* 1 */}
                  <div
                    className={cn(
                      "flex items-center border-b border-dashed border-b-[#d3d8e4] pt-4 pb-4",
                    )}
                  >
                    <Skeleton className="ml-3 h-4.5 w-28" />
                    <Skeleton className="h-4.5 w-32" />
                  </div>
                  {/* 2 */}
                  <div
                    className={cn(
                      "flex items-center border-b border-dashed border-b-[#d3d8e4] pt-4 pb-4",
                    )}
                  >
                    <Skeleton className="ml-3 h-4.5 w-21" />
                    <Skeleton className="h-4.5 w-20" />
                  </div>
                  {/* 3 */}
                  <div
                    className={cn(
                      "flex items-center border-b border-dashed border-b-[#d3d8e4] pt-4 pb-4",
                    )}
                  >
                    <Skeleton className="ml-3 h-4.5 w-20" />
                    <Skeleton className="h-4.5 w-18" />
                  </div>
                  {/* 4 */}
                  <div
                    className={cn(
                      "flex items-center border-b border-dashed border-b-[#d3d8e4] pt-4 pb-4",
                    )}
                  >
                    <Skeleton className="ml-3 h-4.5 w-30" />
                    <Skeleton className="h-4.5 w-13" />
                  </div>
                  {/* 5 */}
                  <div className={cn("flex items-center pt-4 pb-4")}>
                    <Skeleton className="ml-3 h-4.5 w-30" />
                    <Skeleton className="h-4.5 w-21" />
                  </div>
                </div>
              </div>
            </div>
            {/* ImageShowcase col-span9*/}
            <div className="3xl:px-[50px] relative col-span-10 flex h-full flex-col gap-y-[70px] rounded-l-xl pt-[60px] pr-4 pb-0 pl-0 xl:col-span-9 xl:px-6 xl:pb-5 2xl:justify-center 2xl:px-10 2xl:pt-[60px] 2xl:pb-[42px]">
              {/* like share and reviews btns */}

              <div className="absolute top-[3px] left-[50%] z-2 -translate-x-[50%] 2xl:top-[20px]">
                <LikeAndShareBtnsSkeleton />
              </div>

              {/* main image */}
              <Skeleton className="size-80 shrink-1 self-center 2xl:size-90" />

              {/* other image */}
              <div className="flex w-full flex-row-reverse items-center justify-center gap-x-3">
                <Skeleton className="size-18 2xl:size-20" />
                <Skeleton className="size-18 2xl:size-20" />
                <Skeleton className="size-18 2xl:size-20" />
              </div>
            </div>
          </div>
          {/* landing aside */}
          <div className="flex flex-col self-baseline rounded-[16px] px-5 max-xl:w-full xl:sticky xl:top-5 xl:min-w-95 xl:border xl:border-[#d3d8e4] xl:p-5 2xl:min-w-100 2xl:p-6">
            {/* seller info */}
            <div className="flex flex-col">
              <Skeleton className="mr-2 mb-3 h-6.5 w-20 max-lg:self-baseline lg:mr-2 2xl:mb-2" />
              <Skeleton className="h-[170px] w-full" />
            </div>
            {/* price info and quantity */}
            <div className="flex items-center justify-between px-2 py-4">
              <Skeleton className="size-7" />
              <Skeleton className="h-8 w-38" />
            </div>
            {/* add to cart button */}
            <Skeleton className="h-12.5 w-full self-center rounded-lg text-white lg:w-[calc(100%-10px)] 2xl:h-13" />
          </div>
        </div>

        {/* main content mobile */}

        <div className="mt-2 flex flex-col items-center lg:hidden">
          {/*  Like And Share Btns */}
          <LikeAndShareBtnsSkeleton />
          {/* image carousel showCase */}
          <Skeleton className="my-10 size-[280px]" />
          <div className="mb-6 w-full pr-6 pl-5">
            {/* product fa title */}
            <ProductFaTitleSkeleton />
            {/* product en title */}
            <ProductEnTitleSkeleton />

            {/* product color */}
            <div className="flex flex-col gap-y-[14px] self-baseline border-b border-b-[#d3d8e4] pb-4 pl-6">
              <div className="flex items-center gap-x-2 text-sm 2xl:text-base">
                <Skeleton className="h-6 w-8 2xl:h-7 2xl:w-9.5" />
                <Skeleton className="h-6 w-10 2xl:h-7 2xl:w-11.5" />
              </div>
              <div className="flex items-center gap-x-3">
                <div className="flex items-center justify-between self-baseline rounded-[6px] border border-[#d7dee0] p-[4px]">
                  <Skeleton className="size-4.5 rounded-[6px] 2xl:size-5" />
                  <Skeleton className="mr-2 ml-2 h-5.25 w-9.5 2xl:mr-2 2xl:ml-3" />
                </div>
                <div className="flex items-center justify-between self-baseline rounded-[6px] border border-[#d7dee0] p-[4px]">
                  <Skeleton className="size-4.5 rounded-[6px] 2xl:size-5" />
                  <Skeleton className="mr-2 ml-2 h-5.25 w-13 2xl:mr-2 2xl:ml-3" />
                </div>
                <div className="flex items-center justify-between self-baseline rounded-[6px] border border-[#d7dee0] p-[4px]">
                  <Skeleton className="size-4.5 rounded-[6px] 2xl:size-5" />
                  <Skeleton className="mr-2 ml-2 h-5.25 w-11 2xl:mr-2 2xl:ml-3" />
                </div>
              </div>
            </div>
          </div>

          {/* seller info */}

          <div className="flex w-full flex-col px-4">
            <Skeleton className="mr-2 mb-3 h-6.5 w-20 max-lg:self-baseline lg:mr-2 2xl:mb-2" />
            <Skeleton className="h-[170px] w-full" />
          </div>
        </div>
      </div>

      {/* ServiceHighlights */}
      <div className="s:px-10 mx-auto mt-10 mb-8 flex w-full justify-between gap-x-3 border-b-6 border-double border-b-[#d3d8e4] px-4 max-lg:pb-10 lg:my-15 lg:w-[700px] lg:border-b-0 lg:px-0">
        {[1, 2, 3, 4].map((_, index) => {
          return (
            <div key={index} className="flex flex-col items-center gap-y-3">
              <Skeleton className="xss:size-14 s:size-18 size-12" />
              <Skeleton className="max-xss:w-16 max-s:w-18 s:w-20 h-5 sm:max-w-full" />
            </div>
          );
        })}
      </div>

      {/* main specifictions for mobile*/}

      <div className="mb-10 flex flex-col gap-y-2.5 lg:hidden">
        <Skeleton className="h-6.5 w-28 pr-1.5 pb-0.5" />

        <div className="w-full gap-y-3.5 rounded-[10px] border border-[#d7dee0] bg-white px-4.5 py-0.5 pl-6.5 2xl:px-5 2xl:py-1 2xl:pl-7.5">
          {/* 1 */}
          <div
            className={cn(
              "flex items-center border-b border-dashed border-b-[#d3d8e4] pt-4 pb-4",
            )}
          >
            <Skeleton className="ml-3 h-4.5 w-28" />
            <Skeleton className="h-4.5 w-32" />
          </div>
          {/* 2 */}
          <div
            className={cn(
              "flex items-center border-b border-dashed border-b-[#d3d8e4] pt-4 pb-4",
            )}
          >
            <Skeleton className="ml-3 h-4.5 w-21" />
            <Skeleton className="h-4.5 w-20" />
          </div>
          {/* 3 */}
          <div
            className={cn(
              "flex items-center border-b border-dashed border-b-[#d3d8e4] pt-4 pb-4",
            )}
          >
            <Skeleton className="ml-3 h-4.5 w-20" />
            <Skeleton className="h-4.5 w-18" />
          </div>
          {/* 4 */}
          <div
            className={cn(
              "flex items-center border-b border-dashed border-b-[#d3d8e4] pt-4 pb-4",
            )}
          >
            <Skeleton className="ml-3 h-4.5 w-30" />
            <Skeleton className="h-4.5 w-13" />
          </div>
          {/* 5 */}
          <div className={cn("flex items-center pt-4 pb-4")}>
            <Skeleton className="ml-3 h-4.5 w-30" />
            <Skeleton className="h-4.5 w-21" />
          </div>
        </div>
      </div>

      {/* similar products carousel */}

      <ProductsCarouselSkeleton />

      {/* all spec and reviews */}

      <div className="relative my-10 flex flex-col">
        {/* header */}
        <div className="sticky top-0 z-9 flex items-center gap-x-10 border-b border-b-[#919ebc] bg-[#f3f8fd] py-4 max-xl:justify-center xl:px-11">
          <Skeleton className="h-5 w-18 bg-[#919ebc] lg:h-6.5 lg:w-22" />
          <Skeleton className="h-5 w-18 bg-[#919ebc] lg:h-6.5 lg:w-22" />
          <Skeleton className="h-5 w-18 bg-[#919ebc] lg:h-6.5 lg:w-22" />
        </div>
        {/*  */}

        <div className="relative flex gap-x-10 px-4 lg:px-0 lg:pt-5 2xl:gap-x-12.5">
          <div className="flex w-full flex-col">
            {/* product introduction */}
            <div className="mb-10 flex flex-col gap-y-3 px-4 pt-6 lg:mb-14 lg:gap-y-5 lg:px-0 lg:pt-4">
              <div className="flex items-center gap-x-3 lg:mr-5">
                <Skeleton className="size-3.5 rounded-full max-lg:hidden" />
                <Skeleton className="h-6.5 w-25 lg:h-7.5 lg:w-31" />
              </div>
              <div className="flex flex-col gap-y-2 lg:gap-y-3 lg:px-10.5">
                {/* <Skeleton className="h-[450px] w-full" /> */}
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-full lg:h-[28px]" />
                <Skeleton className="h-6 w-2/5 lg:h-[28px]" />
              </div>
            </div>

            {/* divider */}
            <Skeleton className="h-1.5 w-full self-center rounded-2xl px-10.5" />

            {/* all spec */}
            <div className="mt-10 mb-14 flex flex-col gap-y-3 pt-4 lg:gap-y-5">
              <div className="flex items-center gap-x-3 lg:mr-5">
                <Skeleton className="size-3.5 rounded-full max-lg:hidden" />
                <Skeleton className="h-6.5 w-25 lg:h-7.5 lg:w-31" />
              </div>

              <div className="flex flex-col gap-y-2.5">
                <Skeleton className="h-22 w-full rounded-lg bg-[#f3f8fd]" />
                <Skeleton className="h-22 w-full rounded-lg bg-[#f3f8fd]" />
                <Skeleton className="h-22 w-full rounded-lg bg-[#f3f8fd]" />
                <Skeleton className="h-22 w-full rounded-lg bg-[#f3f8fd]" />
                <Skeleton className="h-22 w-full rounded-lg bg-[#f3f8fd]" />
                <Skeleton className="h-22 w-full rounded-lg bg-[#f3f8fd]" />
              </div>
            </div>

            {/* divider */}
            <Skeleton className="h-1.5 w-full self-center rounded-2xl px-10.5" />

            {/* reviews */}
            <div className="relative mt-10 flex max-2xl:flex-col-reverse 2xl:gap-x-10">
              <div className="flex w-full flex-col">
                {/* reviews header pc*/}
                <div className="mr-5 mb-5 hidden items-center gap-x-3 2xl:flex">
                  <Skeleton className="size-3.5 rounded-full max-lg:hidden" />
                  <Skeleton className="h-6.5 w-25 lg:h-7.5 lg:w-31" />
                </div>

                {/* reviews orderbar */}
                <div className="s:gap-x-3 max-xss:justify-between xss:gap-x-3 mb-6 flex w-full items-center rounded-sm bg-[#f1f8ff] p-[14px] text-[12px] sm:mb-8 lg:gap-x-4">
                  <div className="max-xss:hidden flex items-center">
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-5 w-13" />
                  <Skeleton className="h-5 w-13" />
                  <Skeleton className="h-5 w-13" />
                  <Skeleton className="h-5 w-13" />
                </div>

                {/* content */}
                <div className="flex flex-col gap-y-8">
                  {[1, 2, 3, 4].map((_, index) => {
                    return (
                      <div key={index}>
                        <div className="flex w-full flex-col border-double border-b-[#d3d8e4] px-8">
                          {/* profile logo and username */}
                          <div className="s:mb-4 s:gap-x-2.5 mb-2.5 flex items-center gap-x-1.5">
                            <Skeleton className="s:size-7 size-6 rounded-sm" />
                            <Skeleton className="s:h-7 s:w-23 h-6 w-20" />
                          </div>
                          {/* rating */}
                          <Skeleton className="s:h-5 s:w-21 mb-4.5 h-4 w-19" />
                          {/* date */}
                          <Skeleton className="s:h-7 s:w-23 s:mb-6 mb-4 h-6 w-20" />
                          {/* description */}

                          <Skeleton className="s:h-7 mb-8 h-6 w-[85%] max-w-[530px]" />
                        </div>
                        {/* divider */}
                        <div className="h-0.25 w-full bg-[#d3d8e4]"></div>
                        <div className="mt-0.75 h-0.25 w-full bg-[#d3d8e4]"></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* reviews aside */}
              <div className="mb-10 flex px-3 max-2xl:flex-row-reverse max-2xl:items-center max-2xl:gap-x-5 max-lg:flex-col max-lg:gap-y-4 lg:px-0 2xl:sticky 2xl:top-16 2xl:z-5 2xl:mb-0 2xl:max-w-[400px] 2xl:min-w-[400px] 2xl:flex-col 2xl:self-baseline 2xl:pt-10">
                {/* review progress bars */}
                <div className="s:gap-x-6 flex justify-between gap-x-2 max-2xl:w-full 2xl:mb-10">
                  <div className="flex flex-col gap-y-1">
                    {[1, 2, 3, 4, 5].map((_, index) => {
                      return (
                        <div
                          className="s:gap-x-1.5 flex items-center justify-between gap-x-1"
                          key={index}
                        >
                          <Skeleton className="h-2 max-w-[180px] min-w-[180px] rounded-[16px] sm:h-2.5 sm:max-w-[180px] sm:min-w-[180px]" />
                          <Skeleton className="h-5 w-4 rounded-sm" />
                        </div>
                      );
                    })}
                  </div>
                  {/*  */}
                  <div className="flex flex-col items-end">
                    {/* reviews averege */}
                    <Skeleton className="s:h-10 s:w-16 mb-3 h-8 w-12" />
                    <Skeleton className="s:h-6 s:w-12 mb-3 h-5 w-10" />
                    <Skeleton className="s:h-5 s:w-22 mb-3 h-4 w-18" />
                  </div>
                </div>
                {/* add review */}
                <div className="flex gap-y-3 rounded-lg p-4 shadow-[0px_1px_4px_rgba(0,0,0,0.08)] max-2xl:min-w-90 max-lg:w-full max-lg:justify-between sm:rounded-2xl lg:min-h-[140px] lg:flex-col lg:p-6 2xl:w-full">
                  <div className="flex items-center gap-x-1.5 sm:gap-x-2 sm:px-2">
                    <Skeleton className="size-4.5 sm:size-5" />
                    <Skeleton className="s:w-60 s:h-5 h-4 w-50" />
                  </div>

                  <Skeleton className="s:rounded-lg xss:min-w-[90px] s:min-w-[106px] xss:h-6 s:h-8 h-4 min-w-13.5 rounded-sm sm:h-10 sm:min-w-[130px] lg:h-13 lg:w-full" />
                </div>
              </div>
              {/* product fa tilte mobile*/}
              <div className="mr-3 mb-4 block lg:hidden">
                <Skeleton className="h-6 w-full max-w-[500px]" />
              </div>
              {/* reviews header mobile*/}
              <div className="mr-3 mb-3 flex items-center gap-x-3 lg:mr-5 lg:mb-5 2xl:hidden">
                <Skeleton className="size-3.5 rounded-full max-lg:hidden" />
                <Skeleton className="h-6 w-22 lg:h-7 lg:w-27" />
              </div>
            </div>
          </div>

          {/* aside max-lg:hidden*/}
          <div className="sticky top-20 z-5 hidden min-h-100 max-w-[400px] min-w-[400px] flex-col self-baseline rounded-[16px] p-6 shadow-[0px_1px_4px_rgba(0,0,0,0.08)] xl:flex">
            {/* image,title and color */}
            <div className="mt-3 flex gap-x-5">
              <div className="flex min-w-[100px] items-center justify-center self-baseline">
                <Skeleton className="size-25" />
              </div>
              {/* title and color */}
              <div className="flex w-full flex-col pt-0.5">
                {/* title */}
                <div className="mb-4 flex flex-col gap-y-2 2xl:gap-y-2.5">
                  <Skeleton className="h-5 w-full 2xl:h-6" />
                  <Skeleton className="h-5 w-full 2xl:h-6" />

                  <Skeleton className="h-5 w-[60%] lg:block 2xl:h-6" />
                </div>
                {/* product color */}
                <div className="flex items-center justify-between self-baseline rounded-[6px]">
                  <Skeleton className="size-5.5" />
                  <Skeleton className="mr-2 ml-3 h-5 w-9" />
                </div>
              </div>
            </div>
            {/* seller info */}
            <div className="mt-8 mr-4.5 flex flex-col gap-x-3">
              <div className="border-b border-b-[#d3d8e4] pb-3">
                <div className="flex items-center gap-x-4 pb-2">
                  <Skeleton className="size-5 rounded-sm" />
                  <Skeleton className="h-6 w-11" />
                </div>

                <div className="flex items-center gap-x-4">
                  <Skeleton className="size-5 rounded-sm" />
                  <Skeleton className="h-6 w-[268px]" />
                </div>
              </div>

              <div className="flex items-center gap-x-4 pt-3 pb-1">
                <Skeleton className="size-5 rounded-sm" />
                <Skeleton className="h-6 w-29" />
              </div>
            </div>
            {/* price and qty */}
            <div className="flex items-center justify-between p-4.5 2xl:p-5">
              <Skeleton className="size-5 rounded-sm" />
              <Skeleton className="h-8 w-38" />
            </div>
            {/* add to cart button */}
            <Skeleton className="h-12.5 w-full self-center rounded-lg text-white lg:w-[calc(100%-10px)] 2xl:h-13" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;





const ProductFaTitleSkeleton = () => {
  return (
    <div className="mb-4 flex flex-col gap-y-1.5 2xl:gap-y-2">
      <Skeleton className="h-6.75 w-[60%] max-lg:max-w-[630px] lg:h-7.25 lg:w-[95%] 2xl:h-9" />
      <Skeleton className="hidden h-7.25 w-[30%] lg:block 2xl:h-9 2xl:w-[60%]" />
    </div>
  );
};
const ProductEnTitleSkeleton = () => {
  return (
    <div className="mb-4 flex flex-col gap-y-1.25 lg:gap-y-1.5 2xl:gap-y-2">
      <Skeleton className="h-6 w-[45%] lg:h-6.5 lg:w-[95%]" />
      <Skeleton className="hidden h-6.5 w-[5%] lg:block 2xl:w-[10%]" />
    </div>
  );
};

const LikeAndShareBtnsSkeleton = () => {
  return (
    <div className="flex items-center gap-x-10">
      <Skeleton className="size-8 rounded-sm xl:size-8.5" />
      <Skeleton className="size-8 rounded-sm xl:size-8.5" />
      <Skeleton className="size-8 rounded-sm xl:size-8.5" />
    </div>
  );
};
