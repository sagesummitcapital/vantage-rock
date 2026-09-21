import type { Metadata } from "next";
import WhatWeDo from "@/components/what-we-do/WhatWeDo";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  FOUNDER_NAME,
} from "@/lib/site";

const PATH = "/what-we-do";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "What We Do — AI-Native Financial Leadership";
const DESCRIPTION =
  "Fractional CFO + AI automation for growing businesses. Essentials, Growth, and Scale packages. Contact for pricing. Schedule a Strategy Call.";

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
      {/* Digital one-pager: no site Nav/Footer — sheet chrome lives in WhatWeDo */}
      <main id="main" className="relative z-10 min-h-screen">
        <WhatWeDo />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
