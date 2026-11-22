import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const dataDir = join(process.cwd(), ".data");
mkdirSync(dataDir, { recursive: true });

const db = new Database(join(dataDir, "metrics.sqlite"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS pageviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    locale TEXT NOT NULL,
    day TEXT NOT NULL,
    count INTEGER NOT NULL DEFAULT 0,
    UNIQUE(path, locale, day)
  );
  CREATE TABLE IF NOT EXISTS download_pings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    package TEXT NOT NULL,
    at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS saas_sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    at TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    label TEXT NOT NULL
  );
`);

export function recordPageview(path: string, locale: string): void {
  const day = new Date().toISOString().slice(0, 10);
  db.prepare(
    `INSERT INTO pageviews (path, locale, day, count)
     VALUES (?, ?, ?, 1)
     ON CONFLICT(path, locale, day) DO UPDATE SET count = count + 1`
  ).run(path, locale, day);
}

export function recordDownloadPing(pkg: string): void {
  db.prepare(`INSERT INTO download_pings (package, at) VALUES (?, ?)`).run(
    pkg,
    new Date().toISOString()
  );
}

export function getMetricsSummary() {
  const pageViews = (
    db.prepare(`SELECT COALESCE(SUM(count), 0) AS total FROM pageviews`).get() as {
      total: number;
    }
  ).total;

  const downloads = (
    db.prepare(`SELECT COUNT(*) AS total FROM download_pings`).get() as {
      total: number;
    }
  ).total;

  const saas = (
    db.prepare(
      `SELECT COALESCE(SUM(amount_cents), 0) AS total FROM saas_sales`
    ).get() as { total: number }
  ).total;

  const topPaths = db
    .prepare(
      `SELECT path, SUM(count) AS views
       FROM pageviews
       GROUP BY path
       ORDER BY views DESC
       LIMIT 12`
    )
    .all() as Array<{ path: string; views: number }>;

  const viewsByDay = db
    .prepare(
      `SELECT day, SUM(count) AS views
       FROM pageviews
       GROUP BY day
       ORDER BY day DESC
       LIMIT 14`
    )
    .all() as Array<{ day: string; views: number }>;

  return { pageViews, downloads, saasCents: saas, topPaths, viewsByDay };
}
