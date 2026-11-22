import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

function pathOnly(href: string): string {
  const i = href.indexOf("#");
  return i === -1 ? href : href.slice(0, i);
}

function isAppPath(path: string): boolean {
  return (
    path.startsWith("/docs") ||
    path.startsWith("/reference") ||
    path.startsWith("/roadmap") ||
    path.startsWith("/feedback") ||
    path.startsWith("/login") ||
    path === "/"
  );
}

/** MDX `<a>` → locale-aware Link for in-app paths; keep `#anchors` on the href string. */
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

  const path = pathOnly(href);

  if (isAppPath(path) || (path.startsWith("/") && !path.startsWith("//"))) {
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
