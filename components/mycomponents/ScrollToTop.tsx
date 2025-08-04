"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const ScrollToTop = () => {
  const pathname = usePathname();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    if (!hasScrolledRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      hasScrolledRef.current = true;
    }
  }, [pathname]);

  return null;
};
