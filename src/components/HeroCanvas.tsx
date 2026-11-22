"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false, loading: () => null }
);

export function HeroCanvas({
  subtle = false,
  viewport = false,
}: {
  subtle?: boolean;
  /** Fixed full-screen layer (docs index + article pages). */
  viewport?: boolean;
}) {
  return <HeroScene subtle={subtle} viewport={viewport} />;
}
