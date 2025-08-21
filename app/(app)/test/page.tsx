"use client";

import ProductsCarouselSkeleton from "@/components/mycomponents/(skeletonComponets)/Landing/ProductsCarouselSkeleton";
import Skeleton from "@/components/mycomponents/(skeletonComponets)/Skleton";
import { useBreakpoints } from "@/hooks/useBreakPoint";

const TestPage = () => {
  const { lg, _2xl, _3xl, md, mlg, s, sm, xl, xs } = useBreakpoints();
  console.log("🚀 ~ TestPage ~ _3xl:", _3xl);
  const columnCount = _3xl ? 8 : _2xl ? 7 : xl ? 6 : lg ? 5 : s ? 4 : 3;

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* main carousel */}

      <Skeleton className="s:h-[350px] rounded-0 3xl:h-[450px] mlg:h-[650px] h-[260px] w-screen sm:h-[440px] md:h-[550px] lg:h-[300px] xl:h-[360px] 2xl:h-[420px]" />

      <div className="s:mt-8 mt-6 flex max-w-[1920px] flex-col lg:mx-auto lg:mt-13 lg:w-9/10 lg:px-12">
        {/* categories carousel */}
        <div className="3xl:grid-cols-8 s:grid-cols-4 grid grid-cols-3 grid-rows-1 overflow-hidden lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {Array.from({ length: columnCount }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-y-5 pt-1"
            >
              <Skeleton className="size-[90px] rounded-full lg:size-[128px]" />
              <Skeleton className="h-[24px] w-[70px] rounded-lg lg:w-[80px]" />
            </div>
          ))}
        </div>
        {/* afino - discountedProducts */}
        <ProductsCarouselSkeleton />
      </div>
    </div>
  );
};
export default TestPage;
