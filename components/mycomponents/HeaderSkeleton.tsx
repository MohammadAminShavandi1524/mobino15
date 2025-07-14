"use client";
import {
  CirclePercent,
  Info,
  Menu,
  Search,
  ShoppingCart,
  Wallet,
} from "lucide-react";

import Link from "next/link";
import ThemeButton from "./ThemeButton";
import { useTheme } from "next-themes";
import Logo from "@/components/mycomponents/Logo";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarSidebar from "./(NavbarsideBar-components)/NavbarSidebar";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Skeleton from "./Skleton";

const HeaderSkeleton = () => {
  const [isBannerDisplayed, setIsBannerDisplayed] = useState<boolean>(true);

  return (
    <header className="mb-10 bg-background flex flex-col w-full mx-auto ">
      {/* banners */}
      {isBannerDisplayed && <Skeleton height={60} width={1920} />}

      <div className="pt-4 max-w-[1920px] w-full mx-auto  px-6">
        {/* fixed part */}
        <div className="flex items-center justify-between mx-auto w-[90%] pb-6">
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
        <nav className="mx-auto w-[90%] flex items-center gap-x-4 text-[14px] text-[#666666] font-medium pb-3">
          {/* Product categories */}
          <Skeleton height={44} width={176} />
          {/* optional pages */}
          <div className="flex items-center gap-x-4 mx-2">
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
