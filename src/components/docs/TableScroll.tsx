"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

/** Scrollable table wrapper. Copy lives on code blocks only — not on tables. */
export function TableScroll(props: ComponentPropsWithoutRef<"table">) {
  const { children, ...rest } = props;

  return (
    <div
      data-no-swipe=""
      className="table-scroll themed-scroll my-5 overflow-x-auto overscroll-x-contain rounded-2xl border border-[var(--color-line)] [-webkit-overflow-scrolling:touch]"
    >
      <table {...rest} className="w-full min-w-[28rem] border-collapse text-left text-sm">
        {children as ReactNode}
      </table>
    </div>
  );
}
