/** Last substantive doc edit dates (ISO date). Shown in the article header. */
export const DOC_UPDATED: Record<string, string> = {
  welcome: "2026-11-20",
  install: "2026-11-18",
  quickstart: "2026-11-18",
  commands: "2026-11-20",
  subcommands: "2026-11-19",
  replies: "2026-11-18",
  recipes: "2026-11-20",
  "from-discordjs": "2026-11-20",
  "migration-checklist": "2026-11-20",
  troubleshooting: "2026-11-20",
  "why-failing": "2026-11-20",
  glossary: "2026-11-20",
  starters: "2026-11-20",
  simulate: "2026-11-18",
  collectors: "2026-11-19",
  "embeds-layout": "2026-11-19",
  changelog: "2026-11-20",
  architecture: "2026-11-20",
  "press-handlers": "2026-11-20",
  "events-intents": "2026-11-20",
  config: "2026-11-20",
  "project-layout": "2026-11-20",
  "start-options": "2026-11-20",
  "create-cli": "2026-11-20",
  pieces: "2026-11-20",
  rules: "2026-11-20",
};

export function getDocUpdated(slug: string): string | undefined {
  return DOC_UPDATED[slug];
}
