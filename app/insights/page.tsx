import type { Metadata } from "next";
import AmbientDots from "@/components/AmbientDots";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ArticleCard from "@/components/insights/ArticleCard";
import ReviewCTA from "@/components/insights/ReviewCTA";
import { getAllInsights, getInsightsByCluster } from "@/lib/insights";
import { SITE_URL, SITE_NAME, FOUNDER_NAME } from "@/lib/site";

const PATH = "/insights";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "Insights — AI-enabled finance, written from inside the work";
const DESCRIPTION =
  "Field reports on AI agents in finance, the problems that lead founders to a fractional CFO, and the workflows worth rebuilding. Written from a finance function running agents in production.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    siteName: SITE_NAME,
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${SITE_NAME}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function InsightsIndex() {
  const groups = getInsightsByCluster();
  const all = getAllInsights();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": CANONICAL,
      url: CANONICAL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      author: { "@type": "Person", name: FOUNDER_NAME },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: all.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/insights/${a.slug}`,
        name: a.title,
      })),
    },
  ];

  return (
    <>
      <AmbientDots />
      <main id="main" className="relative z-10 min-h-screen bg-transparent text-ink">
        <Nav />

        <header className="mx-auto max-w-[1280px] px-6 pb-4 pt-20 md:px-10 md:pt-28">
          <Reveal>
            <span className="mono-label">Insights</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-[820px] font-display text-display-xl">
              Finance either leads or it files.{" "}
              <span className="gradient-text-teal">This is the leading part, written down.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[620px] text-[17px] leading-[1.7] text-ink-muted">
              Everything here comes out of running a finance function, not out of a vendor
              roadmap. Where there&apos;s a number, it came off a real close. Where something
              failed, it says so.
            </p>
          </Reveal>
        </header>

        <div className="mx-auto max-w-[1280px] px-6 pb-24 md:px-10">
          {groups.length === 0 ? (
            <p className="mt-16 text-[17px] text-ink-muted">
              First articles are being written. Check back shortly.
            </p>
          ) : (
            groups.map((group, gi) => (
              <section key={group.cluster.id} className="mt-20 first:mt-16">
                <div className="mb-10 flex flex-col justify-between gap-6 border-b border-line pb-6 md:flex-row md:items-end">
                  <div>
                    <span className="mono-label">
                      {group.cluster.id} — {group.cluster.name}
                    </span>
                    <p className="mt-4 max-w-[560px] text-[15.5px] leading-[1.65] text-ink-muted">
                      {group.cluster.blurb}
                    </p>
                  </div>
                  <span className="mono-label whitespace-nowrap">
                    {group.articles.length}{" "}
                    {group.articles.length === 1 ? "article" : "articles"}
                  </span>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.articles.map((article, i) => (
                    <ArticleCard
                      key={article.slug}
                      article={article}
                      delay={gi === 0 ? i * 0.06 : 0}
                    />
                  ))}
                </div>
              </section>
            ))
          )}

          <ReviewCTA />
        </div>

        <Footer />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
