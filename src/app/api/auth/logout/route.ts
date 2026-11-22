import { NextResponse } from "next/server";
import { clearSessionCookie, siteUrl } from "@/lib/session";

export async function GET() {
  const response = NextResponse.redirect(new URL("/en/feedback", siteUrl()));
  response.cookies.set(clearSessionCookie());
  return response;
}
