import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllInsights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const insights = getAllInsights();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ai-enabled-finance`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cfo-ai-agents`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/insights`,
      // Index is only as fresh as its newest article.
      lastModified: insights[0] ? new Date(insights[0].updatedAt ?? insights[0].publishedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = insights.map((article) => ({
    url: `${SITE_URL}/insights/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly",
    priority: article.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
