import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticPaths = [
    "",
    "/about",
    "/services",
    "/fleet",
    "/tracking",
    "/pricing",
    "/industries",
    "/testimonials",
    "/careers",
    "/faq",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const posts = await db.blogPost
    .findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
    .catch(() => []);

  const blogPaths = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPaths, ...blogPaths];
}
