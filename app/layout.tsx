import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  FOUNDER_NAME,
  FOUNDER_TITLE,
  LOCATION,
  SAME_AS,
} from "@/lib/site";
import "./globals.css";

// Self-hosted Newsreader — a transitional serif with true optical sizing,
// pinned to the display cut for crisp, high-contrast headlines.
// Bundled in the repo so builds never depend on a Google Fonts fetch.
const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "./fonts/Newsreader-roman.woff2", weight: "300 600", style: "normal" },
    { path: "./fonts/Newsreader-italic.woff2", weight: "300 600", style: "italic" },
  ],
});

const TITLE =
  "Fractional CFO & AI-Enabled Finance | Vantage Rock Financial";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "fractional CFO",
    "AI-enabled finance",
    "AI-native financial leadership",
    "fractional CFO services",
    "outsourced CFO",
    "FP&A consultant",
    "AI implementation for finance",
    "month-end close automation",
    "cash flow forecasting",
    "multi-entity finance",
    "founder-led business finance",
    "private equity portfolio CFO",
  ],
  authors: [{ name: FOUNDER_NAME }, { name: SITE_NAME }],
  creator: FOUNDER_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#FAFBFC",
  width: "device-width",
  initialScale: 1,
};

// Organization-level structured data. Page-level schema (FAQ, Person, Services)
// lives in app/page.tsx and references the @id declared here.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  priceRange: "$$$",
  areaServed: { "@type": "Country", name: "United States" },
  address: {
    "@type": "PostalAddress",
    addressLocality: LOCATION.city,
    addressRegion: LOCATION.region,
    addressCountry: LOCATION.country,
  },
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: FOUNDER_NAME,
    jobTitle: FOUNDER_TITLE,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    sameAs: SAME_AS,
  },
  sameAs: SAME_AS,
  slogan: "AI-enabled finance. A human between the systems and the decisions.",
  serviceType: [
    "Fractional CFO Services",
    "AI-Enabled Finance",
    "AI-Native Financial Leadership",
    "FP&A",
    "AI Implementation",
    "Financial Reporting and Dashboards",
    "Cash Flow Forecasting",
    "Month-End Close Automation",
    "Multi-Entity Financial Consolidation",
  ],
  knowsAbout: [
    "Fractional CFO",
    "AI-enabled finance",
    "AI-native financial leadership",
    "AI agents in finance",
    "Financial reporting",
    "Month-end close acceleration",
    "Cash flow forecasting",
    "FP&A",
    "Finance process automation",
    "Multi-entity finance",
    "M&A due diligence and integration",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}
    >
      <head>
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body className="bg-bg text-ink antialiased">
        {/* Accessibility: lets keyboard users skip the nav */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
