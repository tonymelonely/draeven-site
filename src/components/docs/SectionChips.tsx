"use client";

import { useDocsScroll } from "@/components/docs/DocsScrollContext";

const NOISE =
  /^(related|verder|pitfalls|valkuilen|where to go|waar verder|volgende stappen|also|ook)$/i;

export function SectionChips({
  title,
  headings,
}: {
  title: string;
  headings: Array<{ id: string; text: string; level: number }>;
}) {
  const { scrollToId } = useDocsScroll();
  const tops = headings
    .filter((heading) => heading.level === 2)
    .filter((heading) => !NOISE.test(heading.text.trim()))
    .filter((heading) => heading.text.trim().length >= 3)
    .slice(0, 6);
  if (!tops.length) return null;

  return (
    <div className="docs-section-chips mb-6">
      <p className="mb-2 text-[0.65rem] tracking-[0.14em] text-[var(--color-ink-soft)] uppercase">
        {title}
      </p>
      <ul className="flex flex-wrap gap-2">
        {tops.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(event) => {
                event.preventDefault();
                scrollToId(heading.id, "smooth");
                history.replaceState(null, "", `#${heading.id}`);
              }}
              className="docs-path-step inline-flex max-w-[14rem] truncate px-3 py-1.5 text-sm no-underline"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
