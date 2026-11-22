import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export type FeedbackEntry = {
  id: string;
  at: string;
  stars: number;
  message: string;
  anonymous: boolean;
  userId?: string;
  userName?: string;
};

const dataDir = join(process.cwd(), ".data");
const dataFile = join(dataDir, "feedback.jsonl");

export async function appendFeedback(
  entry: Omit<FeedbackEntry, "id" | "at">
): Promise<FeedbackEntry> {
  const full: FeedbackEntry = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    ...entry,
  };
  await mkdir(dataDir, { recursive: true });
  await appendFile(dataFile, `${JSON.stringify(full)}\n`, "utf8");
  return full;
}

export async function listFeedback(limit = 40): Promise<FeedbackEntry[]> {
  try {
    const text = await readFile(dataFile, "utf8");
    const lines = text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const parsed: FeedbackEntry[] = [];
    for (const line of lines.slice(-Math.max(limit, 1))) {
      try {
        parsed.push(JSON.parse(line) as FeedbackEntry);
      } catch {
        /* skip */
      }
    }
    return parsed.reverse();
  } catch {
    return [];
  }
}

export function averageStars(entries: FeedbackEntry[]): number | null {
  if (entries.length < 1) return null;
  const sum = entries.reduce((total, entry) => total + entry.stars, 0);
  return Math.round((sum / entries.length) * 10) / 10;
}
