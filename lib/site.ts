// Single source of truth for the public site URL.
// Set NEXT_PUBLIC_SITE_URL in Vercel to your real domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.vantagerockfinancial.com";

export const SITE_NAME = "Vantage Rock Financial";
export const SITE_DESCRIPTION =
  "Fractional CFO leadership + finance automation for founder-led companies that need faster reporting, better cash visibility, and a finance function built to scale.";
export const CONTACT_EMAIL = "info@vantagerockfinancial.com";
