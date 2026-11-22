import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  sessionCookieOptions,
  siteUrl,
} from "@/lib/session";

type TokenResponse = {
  access_token?: string;
};

type UserResponse = {
  id: string;
  username: string;
  global_name?: string | null;
  avatar?: string | null;
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const clientId = process.env.DISCORD_CLIENT_ID?.trim();
  const clientSecret = process.env.DISCORD_CLIENT_SECRET?.trim();

  if (!code || !clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/en/feedback?auth=missing", siteUrl()));
  }

  const redirectUri = `${siteUrl()}/api/auth/callback`;
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const tokenJson = (await tokenRes.json()) as TokenResponse;

  if (!tokenRes.ok || !tokenJson.access_token) {
    return NextResponse.redirect(new URL("/en/feedback?auth=token", siteUrl()));
  }

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${tokenJson.access_token}` },
  });
  const user = (await userRes.json()) as UserResponse;

  if (!userRes.ok || !user.id) {
    return NextResponse.redirect(new URL("/en/feedback?auth=user", siteUrl()));
  }

  const session = await createSessionToken({
    id: user.id,
    name: user.global_name?.trim() || user.username,
    ...(user.avatar
      ? { avatar: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` }
      : {}),
  });

  const response = NextResponse.redirect(new URL("/en/feedback", siteUrl()));
  response.cookies.set(sessionCookieOptions(session));
  return response;
}
