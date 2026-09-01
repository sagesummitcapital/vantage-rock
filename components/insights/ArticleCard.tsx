import Link from "next/link";
import Reveal from "@/components/Reveal";
import { formatDate, type Insight } from "@/lib/insights";

export default function ArticleCard({
  article,
  delay = 0,
}: {
  article: Insight;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link
        href={`/insights/${article.slug}`}
        className="card-lift soft-shadow group flex h-full flex-col rounded-md border border-line bg-bg-raised p-7"
      >
        <div className="flex items-center gap-3">
          <span className="mono-label">{article.cluster}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden />
          <span className="mono-label">{article.readingMinutes} min</span>
        </div>

        <h3 className="mt-5 font-display text-[21px] leading-[1.25] tracking-tighter2 text-ink transition-colors group-hover:text-teal">
          {article.title}
        </h3>

        <p className="mt-3 flex-1 text-[15px] leading-[1.62] text-ink-muted">
          {article.description}
        </p>

        <div className="mono-label mt-6 flex items-center justify-between">
          <span>{formatDate(article.publishedAt)}</span>
          <span
            className="text-teal transition-transform duration-300 group-hover:translate-x-[3px]"
            aria-hidden
          >
            →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
