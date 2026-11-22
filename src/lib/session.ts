import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type SessionUser = {
  id: string;
  name: string;
  avatar?: string;
  isAdmin: boolean;
};

const COOKIE = "draeven_session";

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET?.trim();
  if (!secret || secret.length < 16) {
    return new TextEncoder().encode("dev-only-session-secret-change-me");
  }
  return new TextEncoder().encode(secret);
}

export function adminIds(): string[] {
  return (process.env.ADMIN_DISCORD_IDS ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function isAdminId(id: string): boolean {
  return adminIds().includes(id);
}

export async function createSessionToken(
  user: Omit<SessionUser, "isAdmin"> & { isAdmin?: boolean }
): Promise<string> {
  const isAdmin = user.isAdmin ?? isAdminId(user.id);
  return await new SignJWT({
    id: user.id,
    name: user.name,
    isAdmin,
    ...(user.avatar ? { avatar: user.avatar } : {}),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secretKey());
}

export async function readSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.id !== "string" || typeof payload.name !== "string") {
      return null;
    }
    const id = payload.id;
    return {
      id,
      name: payload.name,
      isAdmin: payload.isAdmin === true || isAdminId(id),
      ...(typeof payload.avatar === "string" ? { avatar: payload.avatar } : {}),
    };
  } catch {
    return null;
  }
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  };
}

export function clearSessionCookie() {
  return {
    name: COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://127.0.0.1:3000"
  );
}
