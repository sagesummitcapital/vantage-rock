import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const AI_CRAWLERS = [
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/ops", "/ops/"],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/ops", "/ops/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
