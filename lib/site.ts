// Single source of truth for the public site URL.
// Set NEXT_PUBLIC_SITE_URL in Vercel to your real domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.vantagerockfinancial.com";

export const SITE_NAME = "Vantage Rock Financial";
export const SITE_DESCRIPTION =
  "Fractional CFO firm delivering AI-enabled finance, FP&A, and AI implementation for founder-led and sponsor-backed companies from $1M in revenue. Faster closes, real cash visibility, numbers you can run the business on.";

export const CONTACT_EMAIL = "info@vantagerockfinancial.com";
export const FOUNDER_NAME = "Stavros Christias";
export const FOUNDER_TITLE = "Founder & Fractional CFO";
export const FOUNDER_LINKEDIN =
  "https://www.linkedin.com/in/stavros-christias-4863b211a/";
export const COMPANY_LINKEDIN = "https://www.linkedin.com/company/vantagerock/";
export const X_URL = "https://x.com/VantageRock";
export const YOUTUBE_URL = "https://www.youtube.com/@VantageRockFinancial";

export const LOCATION = { city: "Scottsdale", region: "AZ", country: "US" };

/** The one offer. Every CTA on the site points here. */
export const CTA_LABEL = "Book a 30-minute call";

export const SAME_AS = [
  FOUNDER_LINKEDIN,
  COMPANY_LINKEDIN,
  X_URL,
  YOUTUBE_URL,
];
