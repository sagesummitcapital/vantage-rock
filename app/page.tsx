import type { Metadata } from "next";
import AmbientDots from "@/components/AmbientDots";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import TheRatio from "@/components/sections/TheRatio";
import Pillars from "@/components/sections/Pillars";
import HowItWorks from "@/components/sections/HowItWorks";
import Agents from "@/components/sections/Agents";
import Engagements from "@/components/sections/Engagements";
import Proof from "@/components/sections/Proof";
import About from "@/components/sections/About";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/Footer";
import { FAQS } from "@/lib/faqs";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  FOUNDER_NAME,
  FOUNDER_TITLE,
  FOUNDER_LINKEDIN,
  SAME_AS,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const services = [
  {
    name: "Fractional CFO Services",
    description:
      "Strategic finance leadership for companies that need a CFO's judgment without a full-time hire: capital planning, unit economics, pricing, lender and investor relationships, and board reporting.",
  },
  {
    name: "AI-Enabled Finance",
    description:
      "Automation built into the finance function: faster closes, forecasts that update continuously, KPI dashboards wired to the source, and reporting that doesn't take a week to prepare.",
  },
  {
    name: "AI-Native Financial Leadership",
    description:
      "A finance function designed around systems doing the mechanical work and people doing the judgment, with agent-supervised workflows, review gates, and every figure traceable to a source record.",
  },
  {
    name: "FP&A",
    description:
      "Operating models, budgets, rolling forecasts, cash flow planning, KPI reporting, and board packages built to be read rather than filed.",
  },
];

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: FOUNDER_NAME,
      jobTitle: FOUNDER_TITLE,
      url: SITE_URL,
      sameAs: SAME_AS,
      worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      knowsAbout: [
        "Fractional CFO services",
        "AI-enabled finance",
        "FP&A",
        "Financial reporting and month-end close",
        "Cash flow forecasting",
        "Multi-entity finance",
        "Finance systems implementation",
        "M&A due diligence and integration",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${SITE_NAME} — AI-enabled finance and fractional CFO services`,
      description: SITE_DESCRIPTION,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      about: { "@id": `${SITE_URL}/#organization` },
      author: { "@id": `${SITE_URL}/#founder` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Services",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          areaServed: { "@type": "Country", name: "United States" },
        },
      })),
    },
  ];

  return (
    <>
      <AmbientDots />
      <main id="main" className="relative z-10 min-h-screen bg-transparent text-ink">
        <Nav />
        <Hero />
        <TheRatio />
        <Pillars />
        <HowItWorks />
        <Agents />
        <Engagements />
        <Proof />
        <About />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
