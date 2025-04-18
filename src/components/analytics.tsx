"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Declare gtag on window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url =
      pathname + (searchParams.toString() ? "?" + searchParams.toString() : "");

    window.gtag?.("config", "G-746W88T01J", {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
};
