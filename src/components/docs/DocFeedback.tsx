"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export function DocFeedback({ slug }: { slug: string }) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function send(helpful: boolean) {
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stars: helpful ? 5 : 2,
          message: `[doc] ${slug}: ${helpful ? "helpful" : "unclear"}`,
          anonymous: true,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-[var(--color-line)] px-4 py-3 sm:px-5">
      <p className="text-sm text-[var(--color-ink)]">
        {isNl ? "Was deze gids duidelijk?" : "Was this guide clear?"}
      </p>
      {status === "done" ? (
        <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
          {isNl ? "Bedankt — dat helpt." : "Thanks — that helps."}{" "}
          <Link href="/feedback" className="no-underline hover:underline">
            {isNl ? "Meer feedback" : "More feedback"}
          </Link>
        </p>
      ) : (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={status === "sending"}
            onClick={() => send(true)}
            className="rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-sm hover:bg-[var(--color-mist)]/40 disabled:opacity-50"
          >
            {isNl ? "Ja" : "Yes"}
          </button>
          <button
            type="button"
            disabled={status === "sending"}
            onClick={() => send(false)}
            className="rounded-lg border border-[var(--color-line)] px-3 py-1.5 text-sm hover:bg-[var(--color-mist)]/40 disabled:opacity-50"
          >
            {isNl ? "Nee" : "No"}
          </button>
          {status === "error" ? (
            <span className="text-sm text-[var(--color-ink-soft)]">
              {isNl ? "Kon niet versturen." : "Could not send."}
            </span>
          ) : null}
          <Link
            href="/feedback"
            className="ml-auto text-sm text-[var(--color-ink-soft)] no-underline hover:underline"
          >
            {isNl ? "Uitgebreid formulier" : "Full form"}
          </Link>
        </div>
      )}
    </div>
  );
}
