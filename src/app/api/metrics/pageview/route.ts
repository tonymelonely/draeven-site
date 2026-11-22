import { NextRequest, NextResponse } from "next/server";
import { recordPageview } from "@/lib/metrics";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { path?: unknown; locale?: unknown };
    const path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";
    const locale = typeof body.locale === "string" ? body.locale.slice(0, 8) : "en";
    recordPageview(path, locale);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
