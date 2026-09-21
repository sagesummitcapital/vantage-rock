import type { Metadata } from "next";
import Image from "next/image";
import WhatWeDo from "@/components/what-we-do/WhatWeDo";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  CTA_LABEL,
} from "@/lib/site";

const PATH = "/what-we-do";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "What We Do — AI-Native Financial Leadership";
const DESCRIPTION =
  "Fractional CFO + AI automation for growing businesses. Essentials, Growth, and Scale packages. Contact for pricing. Book an Introduction Call.";

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${CANONICAL}#webpage`,
  url: CANONICAL,
  name: TITLE,
  description: DESCRIPTION,
  isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  about: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION,
  },
  author: {
    "@type": "Person",
    name: FOUNDER_NAME,
    url: SITE_URL,
  },
};

export default function WhatWeDoPage() {
  return (
    <>
      <main id="main" className="relative z-10 min-h-screen bg-bg text-ink">
        {/* Minimal chrome — logo + Book call only (no homepage section nav) */}
        <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-3 md:px-8">
            <a
              href="/"
              className="group flex items-center"
              aria-label="Vantage Rock Financial — home"
            >
              <Image
                src="/logo-light.png"
                alt="Vantage Rock Financial"
                width={1042}
                height={459}
                priority
                unoptimized
                className="h-8 w-auto transition-opacity group-hover:opacity-80 md:h-9"
              />
            </a>
            <div className="flex items-center gap-4">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hidden text-[12px] text-ink-muted transition-colors hover:text-teal sm:inline"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href="#book"
                className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-[12.5px] font-medium text-ink-invert transition-colors hover:bg-teal hover:text-white"
              >
                {CTA_LABEL}
              </a>
            </div>
          </div>
        </header>

        <WhatWeDo />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
