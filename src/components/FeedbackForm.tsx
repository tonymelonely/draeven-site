"use client";

import { useMemo, useState, type FormEvent } from "react";

type SessionUser = {
  id: string;
  name: string;
} | null;

export function FeedbackForm({ user }: { user: SessionUser }) {
  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(!user);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const starButtons = useMemo(() => [1, 2, 3, 4, 5], []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars, message, anonymous }),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error || "Could not save feedback.");
      setStatus("done");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not save feedback.");
    }
  }

  return (
    <form className="panel grid max-w-xl gap-4 p-5" onSubmit={onSubmit}>
      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-ink-soft)]">
        {user ? (
          <>
            <span>
              Signed in as <strong className="text-[var(--color-ink)]">{user.name}</strong>
            </span>
            <a
              href="/api/auth/logout"
              className="rounded-xl border border-[var(--color-line-strong)] px-3 py-1.5 no-underline"
            >
              Sign out
            </a>
          </>
        ) : (
          <>
            <span>Optional Discord login, or stay anonymous.</span>
            <a
              href="/api/auth/discord"
              className="rounded-xl bg-[var(--color-accent)] px-3 py-1.5 text-white no-underline"
            >
              Continue with Discord
            </a>
          </>
        )}
      </div>

      <label className="grid gap-2 text-sm">
        Stars
        <div className="flex gap-2" role="group" aria-label="Star rating">
          {starButtons.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={stars === value}
              className={`h-10 w-10 rounded-xl border transition ${
                stars === value
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[var(--color-line-strong)] hover:border-[var(--color-accent)]"
              }`}
              onClick={() => setStars(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </label>

      <label className="grid gap-2 text-sm">
        What should improve?
        <textarea
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          minLength={8}
          maxLength={2000}
          className="rounded-2xl border border-[var(--color-line-strong)] bg-white/70 px-3 py-2 outline-none focus:border-[var(--color-accent)]"
          placeholder="First-hour friction, errors, docs gaps…"
        />
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={anonymous}
          disabled={!user}
          onChange={(event) => setAnonymous(event.target.checked)}
        />
        Post anonymously
      </label>

      <button
        type="submit"
        disabled={status === "saving"}
        className="rounded-2xl bg-[var(--color-ink)] px-4 py-2.5 text-sm text-[var(--color-paper)] transition hover:bg-[var(--color-accent)]"
      >
        {status === "saving" ? "Sending…" : "Send feedback"}
      </button>

      {status === "done" ? <p className="text-sm text-[var(--color-ink-soft)]">Thanks — saved.</p> : null}
      {status === "error" ? <p className="text-sm text-[var(--color-warn)]">{error}</p> : null}
    </form>
  );
}
