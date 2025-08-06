"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const ScrollToTop = () => {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      previousPathRef.current !== null &&
      previousPathRef.current !== pathname
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    previousPathRef.current = pathname;
  }, [pathname]);

  return null;
};
