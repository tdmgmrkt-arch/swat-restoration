import { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"
import { canonicalUrl } from "@/lib/utils"
import { allBlogPosts, TOTAL_BLOG_PAGES } from "@/lib/blog-posts-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = siteConfig.staticPages.map((p) => ({
    url: canonicalUrl(p.href),
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))

  // Category hub pages (/water-damage, /fire-damage, /mold-remediation, /reconstruction)
  const categoryHubs: MetadataRoute.Sitemap = siteConfig.serviceCategories.map((c) => ({
    url: canonicalUrl(c.hubHref),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  // All sub-service pages, flattened across categories.
  // De-duplicate hrefs that point back to a category hub.
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
      url: canonicalUrl(s.href),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }))

  // City pages: /areas-served/[slug] — only emitted once cityPagesLive is true
  const cityRoutes: MetadataRoute.Sitemap = siteConfig.cityPagesLive
    ? siteConfig.serviceArea.map((city) => ({
        url: canonicalUrl(`/areas-served/${city.slug}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.85,
      }))
    : []

  // Blog posts: only published posts make it into the sitemap.
  // Draft stubs (published: false) carry the legacy URL slots but stay hidden
  // until body content is filled in and the flag is flipped.
  const blogRoutes: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: canonicalUrl(`/post/${post.slug}`),
    lastModified: new Date(post.lastUpdated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Paginated blog hub pages 2..N. Page 1 lives at /blog/ (already in
  // staticRoutes); /blog/page/1/ is redirected to /blog/ in next.config.ts
  // so it doesn't belong here either.
  const blogPaginationRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, TOTAL_BLOG_PAGES - 1) },
    (_, i) => ({
      url: canonicalUrl(`/blog/page/${i + 2}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })
  )

  return [
    ...staticRoutes,
    ...categoryHubs,
    ...serviceRoutes,
    ...cityRoutes,
    ...blogRoutes,
    ...blogPaginationRoutes,
  ]
}
