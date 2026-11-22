# Draeven site

Marketing + docs hub (en/nl): landing, MDX guides, generated API reference, feedback, admin analytics.

```bash
pnpm install
cp .env.example .env.local
pnpm api:docs
pnpm dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) (redirects to `/en`).

## Env

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public origin (OAuth redirect base) |
| `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` | Discord OAuth (`identify`) |
| `SESSION_SECRET` | Cookie signing (≥ 16 chars) |
| `ADMIN_DISCORD_IDS` | Comma-separated Discord user ids for `/admin` |

Redirect URI: `{NEXT_PUBLIC_SITE_URL}/api/auth/callback`

## Scripts

- `pnpm api:docs` — TypeDoc JSON from `../Draeven-framework/packages/*` into `content/api/`
- `pnpm dev` / `pnpm build`

## Notes

- Toggle **3D** in the header (`localStorage` key `draeven-3d`; respects `prefers-reduced-motion`)
- Shortcuts: `⌘K` search, `G` then `D` docs, `G` then `A` API
- Metrics live in `.data/metrics.sqlite` (gitignored)
