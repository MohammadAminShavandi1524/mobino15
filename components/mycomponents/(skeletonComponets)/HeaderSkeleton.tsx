"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Skeleton from "./Skleton";

const HeaderSkeleton = () => {
  const [isBannerDisplayed, setIsBannerDisplayed] = useState<boolean>(true);
  const pathname = usePathname();

  if (
    pathname === "/auth" ||
    pathname === "/auth/seller" ||
    pathname === "/auth/user"
    
  ) {
    return <div className="hidden"></div>;
  }

  return (
    <header className="bg-background mx-auto flex w-full flex-col border-b border-b-[#d7dee0]">
      {/* banner */}

      <Skeleton className="s:h-14 relative h-10.5 w-full rounded-none sm:h-16 md:h-20 lg:h-15" />

      <div className="mx-auto w-full max-w-[1920px] px-6 pt-4 pb-2.75 max-lg:hidden">
        {/* fixed part */}
        <div className="mx-auto flex w-[90%] items-center justify-between pb-6">
          {/* logo and searchbar */}
          <section className="flex items-center gap-x-6">
            {/* logo */}
            <Skeleton className="h-[45px] w-[145px]" />
            {/* searchbar */}
            <Skeleton className="h-[45px] w-full lg:w-[460px] xl:w-[600px]" />
          </section>
          {/* auth and cart button  */}
          <section className="flex items-center gap-x-6">
            {/* login/signup button */}
            <Skeleton className="h-[40px] w-[140px]" />
            {/* cart button */}
            <Skeleton className="h-[40px] w-[40px]" />
          </section>
        </div>
        {/* navbar */}
        <nav className="mx-auto flex w-[90%] items-center gap-x-4 pb-3 text-[14px] font-medium text-[#666666]">
          {/* Product categories */}
          <Skeleton className="h-[44px] w-[176px]" />
          {/* optional pages */}
          <div className="mx-2 flex items-center gap-x-4">
            <Skeleton className="h-[44px] w-[140px]" />

            <Skeleton className="h-[44px] w-[128px]" />
          </div>
          {/* seller login */}
          <Skeleton className="h-[44px] w-[91px]" />
        </nav>
      </div>

      <div className="px-6 pt-4 pb-4.25 lg:hidden">
        <div className="flex items-center justify-between">
          <Skeleton className="size-8 p-1" />

          <Skeleton className="h-10 w-[102px]" />

          <div className="flex items-center gap-x-3">
            <Skeleton className="size-10" />
            <Skeleton className="h-10 w-15" />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-x-4 sm:gap-x-20">
          {/* searchbar */}
          <Skeleton className="h-12 w-full" />

          {/* seller login */}
          <Skeleton className="hidden h-10 w-25 sm:block" />
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
