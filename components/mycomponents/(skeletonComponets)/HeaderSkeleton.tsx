"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Skeleton from "./Skleton";

const HeaderSkeleton = () => {
  const [isBannerDisplayed, setIsBannerDisplayed] = useState<boolean>(true);
  const pathname = usePathname();
  if (pathname === "/auth") {
    return <div className="hidden"></div>;
  }

  return (
    <header className="bg-background mx-auto flex w-full flex-col border-b border-b-[#d7dee0]">
      {/* banners */}
      {isBannerDisplayed && <Skeleton height={60} width={1920} />}

      <div className="mx-auto w-full max-w-[1920px] px-6 pt-4">
        {/* fixed part */}
        <div className="mx-auto flex w-[90%] items-center justify-between pb-6">
          {/* logo and searchbar */}
          <section className="flex items-center gap-x-6">
            {/* logo */}
            <Skeleton width={145} height={45} />
            {/* searchbar */}
            <Skeleton height={45} width={600} />
          </section>
          {/* auth and cart button  */}
          <section className="flex items-center gap-x-6">
            {/* dark/light mode button */}
            <Skeleton height={40} width={40} />
            {/* login/signup button */}
            <Skeleton height={40} width={140} />
            {/* cart button */}
            <Skeleton height={40} width={40} />
          </section>
        </div>
        {/* navbar */}
        <nav className="mx-auto flex w-[90%] items-center gap-x-4 pb-3 text-[14px] font-medium text-[#666666]">
          {/* Product categories */}
          <Skeleton height={44} width={176} />
          {/* optional pages */}
          <div className="mx-2 flex items-center gap-x-4">
            <Skeleton height={44} width={140} />
            <Skeleton height={44} width={98} />
            <Skeleton height={44} width={128} />
          </div>
          {/* seller login */}
          <Skeleton height={44} width={91} />
        </nav>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
