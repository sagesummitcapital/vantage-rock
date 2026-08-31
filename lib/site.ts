// Single source of truth for the public site URL.
// Set NEXT_PUBLIC_SITE_URL in Vercel to your real domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.vantagerockfinancial.com";

export const SITE_NAME = "Vantage Rock Financial";
export const SITE_DESCRIPTION =
  "Fractional CFO. AI-native financial leadership. 30-minute Finance Systems Review — fit-check. We don't diagnose on the call.";
export const CONTACT_EMAIL = "info@vantagerockfinancial.com";
export const FOUNDER_NAME = "Stavros Christas";
export const SAME_AS = [
  "https://x.com/VantageRock",
  "https://www.youtube.com/@VantageRockFinancial",
];
