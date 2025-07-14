"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = () => {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // قبل از mount هیچ چیزی رندر نمی‌کنیم

  return (
    <Link href="/" className="flex items-center  gap-x-2">
      <Image
        src={resolvedTheme === "dark" ? "/logo.png" : "/yellow_logo.png"}
        alt="logo"
        width={44}
        height={44}
      />

      <div className="pb-1 text-[36px]/4 text-custom-primary">
        موبی<span className="text-custom-primary">نو</span>
      </div>
    </Link>
  );
};
export default Logo;
