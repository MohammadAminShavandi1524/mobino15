"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Skeleton from "./(skeletonComponets)/Skleton";

interface LogoProps {
  // setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
  logoImage_width?: number;
  logoImage_height?: number;
  text_className?: string;
  logo_className?: string;
}

const Logo = ({
  logoImage_height,
  logoImage_width,
  text_className,
  logo_className,
}: LogoProps) => {
  return (
    <Link href="/" className="flex items-center gap-x-2">
      <Image
        className={cn(logo_className)}
        src="/yellow_logo.png"
        alt="logo"
        width={logoImage_width || 44}
        height={logoImage_height || 44}
      />

      <div
        className={cn("text-custom-primary pb-1 text-[36px]/4", text_className)}
      >
        موبی<span className="">نو</span>
      </div>
    </Link>
  );
};
export default Logo;
