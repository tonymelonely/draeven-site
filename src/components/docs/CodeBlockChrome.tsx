"use client";

import { CopyButton } from "@/components/docs/CopyButton";
import { useSiteTheme } from "@/components/chrome/ThemeProvider";

export function CodeBlockChrome({
  name,
  label,
  code,
  copyable,
  darkHtml,
  lightHtml,
}: {
  name: string;
  label: string;
  code: string;
  copyable: boolean;
  darkHtml: string;
  lightHtml: string;
}) {
  const { theme } = useSiteTheme();
  const light = theme === "white";
  const html = light ? lightHtml : darkHtml;

  return (
    <div
      data-no-swipe=""
      data-code-theme={light ? "light" : "dark"}
      className={`code-block my-5 overflow-hidden rounded-2xl border ${
        light
          ? "border-[#cbd5e1] bg-white"
          : "border-[var(--color-line-strong)] bg-[#0b1118]"
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2 text-xs ${
          light
            ? "border-[#e2e8f0] bg-[#f8fafc] text-[#475569]"
            : "border-[var(--color-line)] bg-[color-mix(in_srgb,#121a24_88%,var(--color-accent))] text-[var(--color-ink-soft)]"
        }`}
      >
        <span className="truncate font-medium tracking-wide">{name}</span>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`rounded-md px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-[0.14em] uppercase ${
              light
                ? "bg-[#ccfbf1] text-[#0f766e]"
                : "bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] text-[var(--color-accent-bright)]"
            }`}
          >
            {label}
          </span>
          {copyable ? <CopyButton code={code} /> : null}
        </div>
      </div>
      <div
        data-no-swipe=""
        className="code-block__body themed-scroll max-w-full overflow-x-auto p-4 text-[0.86rem] leading-[1.7] [-webkit-overflow-scrolling:touch] [&_pre]:m-0! [&_pre]:max-w-full [&_pre]:rounded-none! [&_pre]:border-0! [&_pre]:bg-transparent! [&_pre]:p-0! [&_pre]:shadow-none! [&_pre]:whitespace-pre-wrap! [&_pre]:break-words! [&_code]:max-w-full [&_code]:bg-transparent! [&_code]:whitespace-pre-wrap! [&_code]:break-words! [&_.line]:break-words [&_span]:break-words"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
