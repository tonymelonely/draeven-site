import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

function isAppPath(href: string): boolean {
  return (
    href.startsWith("/docs") ||
    href.startsWith("/reference") ||
    href.startsWith("/roadmap") ||
    href.startsWith("/feedback") ||
    href.startsWith("/login") ||
    href === "/"
  );
}

/** MDX `<a>` → locale-aware Link for in-app paths; leave hashes/external alone. */
export function DocsMdxLink({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a"> & { children?: ReactNode }) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  if (isAppPath(href) || (href.startsWith("/") && !href.startsWith("//"))) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
