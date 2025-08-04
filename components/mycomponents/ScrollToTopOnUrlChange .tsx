"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const ScrollToTopOnUrlChange = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const currentUrl = pathname + "?" + searchParams.toString();

    if (prevUrlRef.current && prevUrlRef.current !== currentUrl) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    prevUrlRef.current = currentUrl;
  }, [pathname, searchParams]);

  return null;
};
