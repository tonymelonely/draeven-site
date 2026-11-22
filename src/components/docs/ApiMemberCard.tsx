import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  blockTag,
  flagBadges,
  formatSignature,
  formatType,
  kindLabel,
  primarySource,
  summarizeComment,
  symbolPath,
  type ApiSymbol,
} from "@/lib/api-docs";

type Props = {
  pkgId: string;
  parentSlug: string[];
  member: ApiSymbol;
  nested?: boolean;
};

function Badge({ children }: { children: string }) {
  const deprecated = children === "deprecated";
  return (
    <span
      className={`rounded-md px-1.5 py-0.5 text-[0.62rem] font-semibold tracking-wide uppercase ${
        deprecated
          ? "bg-[#3a1d24] text-[#ff8fa3]"
          : "bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent)] text-[var(--color-accent-bright)]"
      }`}
    >
      {children}
    </span>
  );
}

export async function ApiMemberCard({ pkgId, parentSlug, member, nested = true }: Props) {
  const t = await getTranslations("api");
  const badges = flagBadges(member);
  const source = primarySource(member);
  const summary =
    summarizeComment(member) ||
    summarizeComment({ comment: member.signatures?.[0]?.comment } as ApiSymbol) ||
    blockTag(member, "deprecated");
  const inherited = member.inheritedFrom ? formatType(member.inheritedFrom) : null;
  const signature =
    member.signatures?.[0] || member.getSignature?.[0] || member.setSignature?.[0];
  const href = nested
    ? symbolPath(pkgId, [...parentSlug, member.name])
    : symbolPath(pkgId, [member.name]);

  let rest = "";
  if (member.kind === 1024 || member.kind === 16) {
    rest = `${member.flags?.isOptional ? "?" : ""} : ${formatType(member.type)}`;
  } else if (signature) {
    const full = formatSignature(member, signature);
    rest = full.startsWith(member.name) ? full.slice(member.name.length) : ` ${full}`;
  } else if (member.type) {
    rest = `: ${formatType(member.type)}`;
  }

  return (
    <li id={member.name} className="scroll-mt-28 px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          {badges.length ? (
            <div className="flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </div>
          ) : null}
          <div className="font-mono text-[0.92rem] leading-relaxed break-words text-[#d7e2ec]">
            <Link href={href} className="text-[#7dd3c7] no-underline hover:underline">
              {member.name}
            </Link>
            {rest ? <span className="text-[#9aa7b5]">{rest}</span> : null}
          </div>
        </div>
        {source?.url ? (
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-lg border border-[var(--color-line)] px-2 py-1 font-mono text-[0.65rem] text-[var(--color-ink-soft)] no-underline hover:border-[var(--color-accent)] hover:text-[var(--color-accent-bright)]"
            title={source.fileName}
          >
            {"</>"}
          </a>
        ) : null}
      </div>

      {summary ? <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{summary}</p> : null}

      {inherited ? (
        <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
          {t("inherited")}:{" "}
          <span className="font-mono text-[var(--color-accent-bright)]">{inherited}</span>
        </p>
      ) : null}

      {member.overwrites ? (
        <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
          {t("overrides")}:{" "}
          <span className="font-mono text-[var(--color-accent-bright)]">
            {formatType(member.overwrites)}
          </span>
        </p>
      ) : null}

      <p className="mt-2 text-[0.65rem] tracking-wide text-[var(--color-ink-soft)] uppercase">
        {kindLabel(member)}
      </p>
    </li>
  );
}
