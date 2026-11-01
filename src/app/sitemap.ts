import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { programmes } from "@/data/programmes";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/corporate-training", "/programmes", "/ai-implementation", "/pricing", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...programmes.map((p) => ({ url: `${site.url}/programmes/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
