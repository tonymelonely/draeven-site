"use client";

import { useLocale } from "next-intl";
import { withInlineCode } from "@/components/docs/inlineCode";

type Topic = "events" | "cooldowns" | "permissions" | "collectors" | "use";

type Copy = {
  title: string;
  yes: string[];
  no: string[];
};

const TOPICS: Record<Topic, { en: Copy; nl: Copy }> = {
  events: {
    en: {
      title: "When to use this",
      yes: [
        "Something happens outside a slash run (join, message, reaction).",
        "A button panel must keep working after a bot restart (`use()`).",
      ],
      no: [
        "The same command should wait for one click — that is `collect`.",
        "A one-off “Yes” in this process only — that is inline `press`.",
      ],
    },
    nl: {
      title: "Wanneer gebruik je dit",
      yes: [
        "Iets gebeurt buiten een slash-run (join, bericht, reactie).",
        "Een knoppenpaneel moet na een herstart nog werken (`use()`).",
      ],
      no: [
        "Hetzelfde commando moet op één klik wachten — dat is `collect`.",
        "Een eenmalige “Ja” alleen in dit proces — dat is inline `press`.",
      ],
    },
  },
  cooldowns: {
    en: {
      title: "When to use this",
      yes: [
        "You want a short wait per user, channel, or guild on one command name.",
        "A private “try again in N seconds” reply is enough.",
      ],
      no: [
        "You need the wait to survive a restart — store it yourself.",
        "Discord’s global rate limits — those are separate.",
      ],
    },
    nl: {
      title: "Wanneer gebruik je dit",
      yes: [
        "Je wilt een korte wachttijd per user, kanaal of guild op één commandonaam.",
        "Een privé “probeer over N seconden” is genoeg.",
      ],
      no: [
        "De wachttijd moet een herstart overleven — bewaar die zelf.",
        "Discords globale rate limits — die staan hier los van.",
      ],
    },
  },
  permissions: {
    en: {
      title: "When to use this",
      yes: [
        "`need` / `ownerOnly` / `when` to block a run inside your process.",
        "`permissions` / `places` so Discord hides the command in the picker.",
      ],
      no: [
        "Slow checks that take seconds — gates run before auto-defer.",
        "`need` on a context menu — menus do not get member permissions.",
      ],
    },
    nl: {
      title: "Wanneer gebruik je dit",
      yes: [
        "`need` / `ownerOnly` / `when` om een run in jouw proces te blokkeren.",
        "`permissions` / `places` zodat Discord het commando in de kiezer verbergt.",
      ],
      no: [
        "Trage checks van seconden — gates draaien vóór auto-defer.",
        "`need` op een contextmenu — menu’s krijgen geen member-rechten.",
      ],
    },
  },
  collectors: {
    en: {
      title: "When to use this",
      yes: [
        "The slash handler must pause until someone clicks or submits.",
        "Only the command author (or who you set) may answer.",
      ],
      no: [
        "Clicks days later or after a restart — use `press` or `use()`.",
        "Link and SKU buttons — they never enter `collect`.",
      ],
    },
    nl: {
      title: "Wanneer gebruik je dit",
      yes: [
        "De slash-handler moet pauzeren tot iemand klikt of indient.",
        "Alleen de aanroeper (of wie jij zet) mag antwoorden.",
      ],
      no: [
        "Klikken dagen later of na een herstart — gebruik `press` of `use()`.",
        "Link- en SKU-knoppen — die komen nooit in `collect`.",
      ],
    },
  },
  use: {
    en: {
      title: "When to use this",
      yes: [
        "Many buttons share one flow (letters, roles) and must survive restarts.",
        "You want one handler file next to `memberJoin` in the events folder.",
      ],
      no: [
        "A tiny reply on one button in this process — inline `press` is enough.",
        "The command must keep running after the click — that is `collect`.",
      ],
    },
    nl: {
      title: "Wanneer gebruik je dit",
      yes: [
        "Veel knoppen delen één flow (letters, rollen) en moeten een herstart overleven.",
        "Je wilt één handlerbestand naast `memberJoin` in de events-map.",
      ],
      no: [
        "Een kort antwoord op één knop in dit proces — inline `press` volstaat.",
        "Het commando moet na de klik doorlopen — dat is `collect`.",
      ],
    },
  },
};

export function WhenToUse({ topic }: { topic: Topic }) {
  const locale = useLocale();
  const isNl = locale === "nl";
  const copy = TOPICS[topic][isNl ? "nl" : "en"];

  return (
    <div className="when-to-use my-6 grid gap-3 rounded-2xl border border-[var(--color-line)] p-4 sm:grid-cols-2 sm:gap-0 sm:p-0 sm:overflow-hidden">
      <div className="sm:border-r sm:border-[var(--color-line)] sm:p-4">
        <p className="text-[0.65rem] tracking-[0.16em] text-[var(--color-accent)] uppercase">
          {copy.title}
        </p>
        <p className="mt-2 text-[0.7rem] tracking-[0.1em] text-[var(--color-ink-soft)] uppercase">
          {isNl ? "Wel" : "Yes"}
        </p>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          {copy.yes.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-[var(--color-accent)]" aria-hidden>
                +
              </span>
              <span>{withInlineCode(line)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sm:p-4">
        <p className="mt-0 text-[0.7rem] tracking-[0.1em] text-[var(--color-ink-soft)] uppercase sm:mt-7">
          {isNl ? "Niet" : "No"}
        </p>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">
          {copy.no.map((line) => (
            <li key={line} className="flex gap-2">
              <span className="opacity-50" aria-hidden>
                −
              </span>
              <span>{withInlineCode(line)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
