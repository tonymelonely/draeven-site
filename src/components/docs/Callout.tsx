import type { ReactNode } from "react";
import { CalloutFix } from "@/components/docs/CalloutFix";

const STYLES = {
  tip: {
    border: "border-[color-mix(in_srgb,var(--color-accent)_40%,var(--color-line))]",
    label: "text-[var(--color-accent-bright)]",
    bg: "bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]",
    icon: "✦",
  },
  note: {
    border: "border-[var(--color-line-strong)]",
    label: "text-[var(--color-ink-soft)]",
    bg: "bg-[color-mix(in_srgb,var(--color-mist)_28%,transparent)]",
    icon: "i",
  },
  warn: {
    border: "border-[color-mix(in_srgb,var(--color-warn)_45%,var(--color-line))]",
    label: "text-[var(--color-warn)]",
    bg: "bg-[color-mix(in_srgb,var(--color-warn)_8%,transparent)]",
    icon: "!",
  },
} as const;

export function Callout({
  type = "note",
  title,
  children,
  fix,
  href,
}: {
  type?: keyof typeof STYLES;
  title: string;
  children: ReactNode;
  /** Short fix line under a warn. */
  fix?: string;
  /** Optional deep link (e.g. /docs/why-failing). */
  href?: string;
}) {
  const style = STYLES[type];
  return (
    <aside
      className={`callout my-5 grid grid-cols-[1.65rem_minmax(0,1fr)] gap-x-3 gap-y-1 rounded-xl border px-3.5 py-3 ${style.border} ${style.bg}`}
    >
      <span
        aria-hidden
        className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-lg border border-current/25 text-[0.72rem] font-bold leading-none ${style.label}`}
      >
        {style.icon}
      </span>
      <div className={`text-[0.68rem] font-semibold tracking-[0.14em] uppercase ${style.label}`}>
        {title}
      </div>
      <div className="col-start-2 space-y-2 text-sm leading-relaxed text-[var(--color-ink-soft)] [&_p]:m-0 [&_code]:text-[0.9em]">
        {children}
        {type === "warn" && fix ? <CalloutFix fix={fix} href={href} /> : null}
      </div>
    </aside>
  );
}
