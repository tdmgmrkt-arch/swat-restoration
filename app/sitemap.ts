import { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = siteConfig.staticPages.map((p) => ({
    url: `${base}${p.href === "/" ? "" : p.href}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))

  // Category hub pages (/plumbing, /water-heater, /water-quality)
  const categoryHubs: MetadataRoute.Sitemap = siteConfig.serviceCategories.map((c) => ({
    url: `${base}${c.hubHref}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  // All sub-service pages, flattened across categories.
  // De-duplicate hrefs that point back to a category hub (e.g. "All Water Heaters" → /water-heater).
  type ServiceLink = { title: string; href: string }
  const hubHrefs = new Set<string>(
    siteConfig.serviceCategories.map((c) => c.hubHref)
  )
  const allServices: ServiceLink[] = siteConfig.serviceCategories.flatMap(
    (c) => [...c.services] as ServiceLink[]
  )
  const serviceRoutes: MetadataRoute.Sitemap = allServices
    .filter((s) => !hubHrefs.has(s.href))
    .map((s) => ({
      url: `${base}${s.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }))

  // City pages: /areas-served/[slug] — only emitted once cityPagesLive is true
  const cityRoutes: MetadataRoute.Sitemap = siteConfig.cityPagesLive
    ? siteConfig.serviceArea.map((city) => ({
        url: `${base}/areas-served/${city.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      }))
    : []

  return [...staticRoutes, ...categoryHubs, ...serviceRoutes, ...cityRoutes]
}
