import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/* ------------------------------------------------------------------ *
 * Content model
 *
 * Articles live as MDX files in /content/insights. The filename is the
 * slug. Everything else comes from frontmatter, so adding an article
 * never requires touching a route, the sitemap, or the index page.
 * ------------------------------------------------------------------ */

export const CLUSTER_IDS = ["A", "B", "C", "D", "E"] as const;
export type ClusterId = (typeof CLUSTER_IDS)[number];

export const STAGES = ["TOF", "MOF", "BOF"] as const;
export type Stage = (typeof STAGES)[number];

export interface Cluster {
  id: ClusterId;
  name: string;
  blurb: string;
}

export const CLUSTERS: Record<ClusterId, Cluster> = {
  A: {
    id: "A",
    name: "Prompts and playbooks",
    blurb:
      "The prompts we actually run, with the input structure they expect and the failure mode when they break.",
  },
  B: {
    id: "B",
    name: "Problems that lead to a CFO",
    blurb:
      "The symptoms founders search at 11pm. Close is slow. Cash is a bank balance. Margin can't be explained.",
  },
  C: {
    id: "C",
    name: "AI agents in finance",
    blurb:
      "Field reports from a finance function running agents in production. Architecture, cost, and what went wrong.",
  },
  D: {
    id: "D",
    name: "AI-enabled workflows",
    blurb:
      "The operating model, workflow by workflow. What to rebuild first and what to leave alone.",
  },
  E: {
    id: "E",
    name: "Fractional CFO, plainly",
    blurb:
      "What the role covers, what it costs, when it's the wrong call, and how the handoff works.",
  },
};

export interface Insight {
  slug: string;
  title: string;
  description: string;
  cluster: ClusterId;
  stage: Stage;
  keyword: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  draft: boolean;
  related: string[];
  body: string;
  readingMinutes: number;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");
const WORDS_PER_MINUTE = 230;

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function assertCluster(value: unknown, slug: string): ClusterId {
  if (typeof value === "string" && (CLUSTER_IDS as readonly string[]).includes(value)) {
    return value as ClusterId;
  }
  throw new Error(
    `content/insights/${slug}.mdx — frontmatter "cluster" must be one of ${CLUSTER_IDS.join(", ")}. Got: ${String(value)}`,
  );
}

function assertStage(value: unknown, slug: string): Stage {
  if (typeof value === "string" && (STAGES as readonly string[]).includes(value)) {
    return value as Stage;
  }
  throw new Error(
    `content/insights/${slug}.mdx — frontmatter "stage" must be one of ${STAGES.join(", ")}. Got: ${String(value)}`,
  );
}

function assertString(value: unknown, field: string, slug: string): string {
  if (typeof value === "string" && value.trim().length > 0) return value.trim();
  throw new Error(`content/insights/${slug}.mdx — frontmatter "${field}" is required.`);
}

function parse(fileName: string): Insight {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: assertString(data.title, "title", slug),
    description: assertString(data.description, "description", slug),
    cluster: assertCluster(data.cluster, slug),
    stage: assertStage(data.stage, slug),
    keyword: assertString(data.keyword, "keyword", slug),
    publishedAt: assertString(data.publishedAt, "publishedAt", slug),
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    featured: data.featured === true,
    draft: data.draft === true,
    related: Array.isArray(data.related) ? data.related.filter((r): r is string => typeof r === "string") : [],
    body: content,
    readingMinutes: readingMinutes(content),
  };
}

/** Every published article, newest first. Drafts are excluded outside development. */
export function getAllInsights(): Insight[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const showDrafts = process.env.NODE_ENV === "development";

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .filter((a) => showDrafts || !a.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getInsightSlugs(): string[] {
  return getAllInsights().map((a) => a.slug);
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return getAllInsights().find((a) => a.slug === slug);
}

/** Articles grouped by cluster, in A–E order, empty clusters omitted. */
export function getInsightsByCluster(): Array<{ cluster: Cluster; articles: Insight[] }> {
  const all = getAllInsights();
  return CLUSTER_IDS.map((id) => ({
    cluster: CLUSTERS[id],
    articles: all.filter((a) => a.cluster === id),
  })).filter((group) => group.articles.length > 0);
}

/**
 * Explicit `related` slugs first, then same-cluster articles as filler,
 * so a new article always has somewhere to send the reader.
 */
export function getRelated(article: Insight, limit = 3): Insight[] {
  const all = getAllInsights().filter((a) => a.slug !== article.slug);
  const explicit = article.related
    .map((slug) => all.find((a) => a.slug === slug))
    .filter((a): a is Insight => Boolean(a));

  const filler = all.filter(
    (a) => a.cluster === article.cluster && !explicit.some((e) => e.slug === a.slug),
  );

  return [...explicit, ...filler].slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
