import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/session";

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID?.trim();
  if (!clientId) {
    return NextResponse.json(
      { error: "DISCORD_CLIENT_ID is not configured." },
      { status: 503 }
    );
  }

  const redirectUri = `${siteUrl()}/api/auth/callback`;
  const url = new URL("https://discord.com/api/oauth2/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "identify");
  url.searchParams.set("redirect_uri", redirectUri);

  return NextResponse.redirect(url);
}
