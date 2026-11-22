import { NextRequest, NextResponse } from "next/server";
import { recordDownloadPing } from "@/lib/metrics";
import { readSession, siteUrl } from "@/lib/session";

export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") || "";
  let pkg = "@draeven/core";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { package?: string };
    if (body.package) pkg = body.package;
  } else {
    const form = await request.formData();
    const value = form.get("package");
    if (typeof value === "string" && value) pkg = value;
  }

  recordDownloadPing(pkg);
  return NextResponse.redirect(new URL("/en/admin", siteUrl()), 303);
}
