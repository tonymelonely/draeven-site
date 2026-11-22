import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  serverExternalPackages: ["better-sqlite3"],
  // Dev-only: LAN / tunnel origins for next dev. Never shipped in production builds.
  ...(isDev
    ? {
        allowedDevOrigins: [
          "localhost",
          "127.0.0.1",
          "127.19.240.1",
          "172.19.240.1",
          "127.18.240.1",
          "192.168.178.193",
          "*.loca.lt",
          "*.trycloudflare.com",
        ],
      }
    : {}),
};

export default withNextIntl(nextConfig);
