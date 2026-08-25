import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL } from "@/lib/site";
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

const TITLE = "Vantage Rock Financial — AI-Native Financial Leadership";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "fractional CFO",
    "AI finance automation",
    "financial reporting",
    "cash flow forecasting",
    "founder-led business finance",
    "outsourced CFO",
    "finance systems",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
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

// Structured data helps Google understand the business.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  areaServed: "US",
  serviceType: [
    "Fractional CFO Services",
    "Financial Reporting & Dashboards",
    "Cash Flow Forecasting",
    "Finance Automation",
    "Strategic Financial Planning",
  ],
  knowsAbout: [
    "Financial reporting",
    "Cash flow forecasting",
    "FP&A",
    "Finance process automation",
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
