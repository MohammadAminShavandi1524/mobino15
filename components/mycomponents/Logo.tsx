"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton from "./Skleton";

interface LogoProps {
  logoImage_width?: number;
  logoImage_height?: number;
  text_className?: string;
}

const Logo = ({
  logoImage_height,
  logoImage_width,
  text_className,
}: LogoProps) => {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton width={145} height={45} />; // قبل از mount هیچ چیزی رندر نمی‌کنیم

  return (
    <Link href="/" className="flex items-center  gap-x-2">
      <Image
        src={resolvedTheme === "dark" ? "/logo.png" : "/yellow_logo.png"}
        alt="logo"
        width={logoImage_width || 44}
        height={logoImage_height || 44}
      />

      <div
        className={cn("pb-1 text-[36px]/4 text-custom-primary", text_className)}
      >
        موبی<span className="text-custom-primary">نو</span>
      </div>
    </Link>
  );
};
export default Logo;
