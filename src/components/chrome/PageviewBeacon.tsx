"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

export function PageviewBeacon({ locale }: { locale: string }) {
  const pathname = usePathname();

  useEffect(() => {
    const key = `pv:${locale}:${pathname}:${new Date().toISOString().slice(0, 10)}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    void fetch("/api/metrics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, locale }),
      keepalive: true,
    });
  }, [locale, pathname]);

  return null;
}
