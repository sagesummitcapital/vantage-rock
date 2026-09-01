import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import AmbientDots from "@/components/AmbientDots";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ArticleCard from "@/components/insights/ArticleCard";
import ReviewCTA from "@/components/insights/ReviewCTA";
import { mdxComponents } from "@/components/insights/mdx";
import {
  CLUSTERS,
  formatDate,
  getInsightBySlug,
  getInsightSlugs,
  getRelated,
} from "@/lib/insights";
import { SITE_URL, SITE_NAME, FOUNDER_NAME, FOUNDER_LINKEDIN, SAME_AS } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getInsightBySlug(params.slug);
  if (!article) return {};

  const canonical = `${SITE_URL}/insights/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.keyword.split(/\s*\/\s*/),
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: `${article.title} | ${SITE_NAME}`,
      description: article.description,
      locale: "en_US",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: [FOUNDER_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ${SITE_NAME}`,
      description: article.description,
    },
    robots: {
      index: !article.draft,
      follow: true,
      googleBot: { index: !article.draft, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function InsightPage({ params }: { params: { slug: string } }) {
  const article = getInsightBySlug(params.slug);
  if (!article) notFound();

  const { content } = await compileMDX({
    source: article.body,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  const canonical = `${SITE_URL}/insights/${article.slug}`;
  const cluster = CLUSTERS[article.cluster];
  const related = getRelated(article, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": canonical,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
      url: canonical,
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt ?? article.publishedAt,
      inLanguage: "en-US",
      articleSection: cluster.name,
      author: {
        "@type": "Person",
        name: FOUNDER_NAME,
        url: FOUNDER_LINKEDIN,
        sameAs: SAME_AS,
      },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/insights` },
        { "@type": "ListItem", position: 3, name: article.title, item: canonical },
      ],
    },
  ];

  return (
    <>
      <AmbientDots />
      <main id="main" className="relative z-10 min-h-screen bg-transparent text-ink">
        <Nav />

        <article className="mx-auto max-w-[1280px] px-6 pb-24 pt-16 md:px-10 md:pt-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mono-label flex flex-wrap items-center gap-2">
            <Link href="/insights" className="transition-colors hover:text-teal">
              Insights
            </Link>
            <span aria-hidden>/</span>
            <span>
              {cluster.id} — {cluster.name}
            </span>
          </nav>

          <header className="mt-8 max-w-[760px]">
            <Reveal>
              <h1 className="font-display text-display-lg">{article.title}</h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 text-[19px] leading-[1.6] text-ink-muted">
                {article.description}
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mono-label mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5">
                <span>{FOUNDER_NAME}</span>
                <span aria-hidden>·</span>
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                {article.updatedAt && (
                  <>
                    <span aria-hidden>·</span>
                    <span>Updated {formatDate(article.updatedAt)}</span>
                  </>
                )}
                <span aria-hidden>·</span>
                <span>{article.readingMinutes} min read</span>
              </div>
            </Reveal>
          </header>

          {/* Body */}
          <div className="mt-4 max-w-[680px]">{content}</div>

          {/* Author block — required for E-E-A-T, and it's true */}
          <div className="mt-16 max-w-[680px] rounded-md border border-line bg-bg-raised p-7">
            <span className="mono-label">Who wrote this</span>
            <p className="mt-4 text-[15.5px] leading-[1.7] text-ink-muted">
              <strong className="font-semibold text-ink">{FOUNDER_NAME}</strong> runs{" "}
              {SITE_NAME}, a fractional CFO firm working with founder-led services, healthcare
              and multi-entity businesses. Ten-plus years across FP&amp;A, controllership,
              reporting, forecasting and systems implementation, including PE-backed operators.
              You talk to the operator, not a sales team.{" "}
              <a
                href={FOUNDER_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal underline decoration-teal/30 underline-offset-[3px] hover:decoration-teal"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>

          <div className="max-w-[680px]">
            <ReviewCTA />
          </div>

          {related.length > 0 && (
            <section className="mt-24">
              <div className="mb-8 border-b border-line pb-5">
                <span className="mono-label">Keep reading</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}
        </article>

        <Footer />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
