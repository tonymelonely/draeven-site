import { Link } from "@/i18n/navigation";

type Step = {
  title: string;
  body: string;
  href?: string;
};

type Branch = {
  label: string;
  steps: Step[];
};

type Diagram = {
  title: string;
  branches: Branch[];
};

const DIAGRAMS: Record<string, { en: Diagram; nl: Diagram }> = {
  architecture: {
    en: {
      title: "Start()",
      branches: [
        {
          label: "Slash path",
          steps: [
            {
              title: "loadCommands()",
              body: "Compiled .js becomes command and menu exports.",
              href: "/docs/commands",
            },
            {
              title: "Discord registers slash",
              body: "Guild sync is fast; global sync can take up to an hour.",
              href: "/docs/start-options",
            },
            {
              title: "Interaction arrives",
              body: "One ctx with options, lookups, and reply methods.",
              href: "/docs/commands",
            },
            {
              title: "Gates / cooldown",
              body: "need, ownerOnly, when, then the cooldown book.",
              href: "/docs/permissions",
            },
            {
              title: "Handler",
              body: "Your run function on command(), userMenu(), or messageMenu().",
              href: "/docs/commands",
            },
            {
              title: "reply / edit / wait / collect",
              body: "Acknowledge once, or keep waiting on this same command.",
              href: "/docs/replies",
            },
            {
              title: "press / submit",
              body: "Later click or modal when nothing is collecting that id.",
              href: "/docs/press-handlers",
            },
          ],
        },
        {
          label: "Gateway path",
          steps: [
            {
              title: "loadEvents()",
              body: "Folder exports whose names are gateway events.",
              href: "/docs/events-intents",
            },
            {
              title: "intentsFor(...)",
              body: "Event names become the gateway bitmask Discord requires.",
              href: "/docs/events-intents",
            },
            {
              title: "onEvent / events.*",
              body: "bot.onEvent or the events folder receives the payload.",
              href: "/docs/bot-handle",
            },
          ],
        },
      ],
    },
    nl: {
      title: "Start()",
      branches: [
        {
          label: "Slash-pad",
          steps: [
            {
              title: "loadCommands()",
              body: "Gecompileerde .js wordt command- en menu-exports.",
              href: "/docs/commands",
            },
            {
              title: "Discord registreert slash",
              body: "Guild-sync is snel; globale sync kan tot een uur duren.",
              href: "/docs/start-options",
            },
            {
              title: "Interactie komt binnen",
              body: "Eén ctx met opties, lookups en reply-methoden.",
              href: "/docs/commands",
            },
            {
              title: "Gates / cooldown",
              body: "need, ownerOnly, when, daarna het cooldown-boek.",
              href: "/docs/permissions",
            },
            {
              title: "Handler",
              body: "Jouw run op command(), userMenu() of messageMenu().",
              href: "/docs/commands",
            },
            {
              title: "reply / edit / wait / collect",
              body: "Eén keer bevestigen, of blijven wachten in dit commando.",
              href: "/docs/replies",
            },
            {
              title: "press / submit",
              body: "Latere klik of modal als er niets op die id verzamelt.",
              href: "/docs/press-handlers",
            },
          ],
        },
        {
          label: "Gateway-pad",
          steps: [
            {
              title: "loadEvents()",
              body: "Map-exports waarvan de namen gateway-events zijn.",
              href: "/docs/events-intents",
            },
            {
              title: "intentsFor(...)",
              body: "Eventnamen worden de bitmask die Discord vraagt.",
              href: "/docs/events-intents",
            },
            {
              title: "onEvent / events.*",
              body: "bot.onEvent of de events-map krijgt de payload.",
              href: "/docs/bot-handle",
            },
          ],
        },
      ],
    },
  },
};

export function FlowDiagram({
  id = "architecture",
  locale = "en",
  title,
  branches,
}: {
  id?: string;
  locale?: "en" | "nl";
  title?: string;
  branches?: Branch[];
}) {
  const preset = DIAGRAMS[id]?.[locale] ?? DIAGRAMS[id]?.en;
  const resolvedTitle = title || preset?.title || "Start()";
  const resolvedBranches = branches?.length ? branches : preset?.branches || [];

  if (!resolvedBranches.length) return null;

  return (
    <div className="flow-diagram my-6 space-y-5">
      <div className="flow-diagram__start panel mx-auto w-full max-w-md px-4 py-3.5 text-center">
        <p className="font-display text-lg text-[var(--color-accent-bright)] sm:text-xl">
          {resolvedTitle}
        </p>
      </div>

      <div
        className="mx-auto hidden h-5 w-px bg-[color-mix(in_srgb,var(--color-accent)_55%,transparent)] sm:block"
        aria-hidden
      />

      <div className="grid gap-5 sm:gap-4 lg:grid-cols-2 lg:gap-5">
        {resolvedBranches.map((branch) => (
          <div key={branch.label} className="min-w-0 space-y-2.5">
            <p className="text-center text-[0.68rem] tracking-[0.14em] text-[var(--color-accent)] uppercase">
              {branch.label}
            </p>
            <ol className="space-y-0">
              {branch.steps.map((step, index) => (
                <li key={step.title} className="relative">
                  <div className="panel px-3.5 py-3 sm:px-4">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="mt-0.5 shrink-0 font-display text-[0.7rem] text-[var(--color-accent)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 space-y-1">
                        {step.href ? (
                          <Link
                            href={step.href}
                            className="font-display text-[0.95rem] leading-snug text-[var(--color-ink)] no-underline hover:text-[var(--color-accent-bright)] sm:text-base"
                          >
                            {step.title}
                          </Link>
                        ) : (
                          <p className="font-display text-[0.95rem] leading-snug text-[var(--color-ink)] sm:text-base">
                            {step.title}
                          </p>
                        )}
                        <p className="text-[0.86rem] leading-relaxed text-[var(--color-ink-soft)] sm:text-sm">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < branch.steps.length - 1 ? (
                    <div className="flex justify-center py-1.5" aria-hidden>
                      <div className="h-3 w-px bg-[color-mix(in_srgb,var(--color-line-strong)_80%,var(--color-accent))]" />
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
