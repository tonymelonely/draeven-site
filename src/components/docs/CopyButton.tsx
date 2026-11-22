"use client";

import { useState, type MouseEvent } from "react";
import { useTranslations } from "next-intl";

async function copyText(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through */
    }
  }

  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "-9999px";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.focus();
  area.select();
  area.setSelectionRange(0, area.value.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(area);
  return ok;
}

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="8" y="3" width="12" height="16" rx="2" />
      <path d="M16 7H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12.5 9.5 17 19 7" />
    </svg>
  );
}

export function CopyButton({ code }: { code: string }) {
  const t = useTranslations("code");
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function onCopy(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const ok = await copyText(code);
    setState(ok ? "copied" : "failed");
    window.setTimeout(() => setState("idle"), 1800);
  }

  const label =
    state === "copied" ? t("copied") : state === "failed" ? t("failed") : t("copy");

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-live="polite"
      aria-label={label}
      title={label}
      className={`inline-flex h-7 w-7 items-center justify-center rounded-md border transition ${
        state === "copied"
          ? "border-[color-mix(in_srgb,var(--color-accent)_55%,transparent)] bg-[var(--color-accent-soft)] text-[var(--color-accent-bright)]"
          : state === "failed"
            ? "border-[#ff8fa3]/50 bg-[#3a1d24] text-[#ff8fa3]"
            : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-bright)]"
      }`}
    >
      {state === "copied" ? <CheckIcon /> : <ClipboardIcon />}
    </button>
  );
}
