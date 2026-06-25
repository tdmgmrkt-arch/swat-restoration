import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { siteConfig } from "@/lib/site-config"
import { canonicalUrl } from "@/lib/utils"
import { blogPageSchema, blogBreadcrumbSchema } from "@/lib/schema"
import {
  allBlogPosts,
  getPostsForPage,
  TOTAL_BLOG_PAGES,
  POSTS_PER_PAGE,
} from "@/lib/blog-posts-config"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"
import {
  PostCard,
  PaginationNav,
} from "@/components/blog-hub/blog-cards"

import SiteHeader from "@/components/site/site-header"
import PageBreadcrumb from "@/components/site/page-breadcrumb"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"
import FinalCta from "@/components/sections/final-cta"

/* ------------------------------------------------------------------ */
/* Static params — pages 2..N. Page 1 lives at /blog/ (not here).       */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return Array.from({ length: Math.max(0, TOTAL_BLOG_PAGES - 1) }, (_, i) => ({
    page: String(i + 2),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const { page } = await params
  const pageNum = Number(page)
  if (!Number.isInteger(pageNum) || pageNum < 2 || pageNum > TOTAL_BLOG_PAGES) {
    return {}
  }
  const canonical = canonicalUrl(`/blog/page/${pageNum}`)
  const title = `Field Notes — Page ${pageNum} of ${TOTAL_BLOG_PAGES}`
  const description = `Restoration field notes from S.W.A.T. Restoration — page ${pageNum} of ${TOTAL_BLOG_PAGES}. Water damage, fire and smoke cleanup, mold prevention, and insurance claim guidance for Aledo and Fort Worth homeowners.`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function PaginatedBlogPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  const pageNum = Number(page)
  if (!Number.isInteger(pageNum) || pageNum < 2 || pageNum > TOTAL_BLOG_PAGES) {
    notFound()
  }

  const posts = getPostsForPage(pageNum)
  if (posts.length === 0) notFound()

  const startIdx = (pageNum - 1) * POSTS_PER_PAGE + 1
  const endIdx = Math.min(startIdx + posts.length - 1, allBlogPosts.length)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogBreadcrumbSchema()),
        }}
      />

      <SiteHeader />

      <main id="main-content">
        <PageBreadcrumb current={`Blog · Page ${pageNum}`} />

        {/* ============================================================== */}
        {/* HERO — compact paginated variant                                */}
        {/* ============================================================== */}
        <section
          className="relative isolate bg-[#0c1230] pt-10 pb-6 lg:pt-14 lg:pb-8 overflow-hidden"
          aria-labelledby="paged-hero-heading"
        >
          <div
            className="absolute inset-0 -z-10 bg-linear-to-b from-[#0a0f28] via-[#0c1230] to-[#131a3e] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 tactical-grid opacity-25"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 inset-y-0 w-1 bg-red-600"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-red-400 font-mono">
                Intelligence Briefings
              </span>
            </div>

            <TacticalLabel>Field Notes</TacticalLabel>
            <AccentLine />

            <h1
              id="paged-hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.05] mb-4"
            >
              Page <span className="text-red-500">{pageNum}</span> of{" "}
              {TOTAL_BLOG_PAGES}
            </h1>

            <p className="text-white/55 text-sm sm:text-base font-mono tracking-wide">
              Posts {startIdx}–{endIdx} of {allBlogPosts.length}
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* GRID — 3-col, no featured treatment on pages 2+                 */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#131a3e] border-t border-white/8 py-10 lg:py-14 overflow-hidden"
          aria-labelledby="grid-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-20"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <h2 id="grid-heading" className="sr-only">
              Blog posts, page {pageNum}
            </h2>

            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            >
              {posts.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>

            <PaginationNav
              currentPage={pageNum}
              totalPages={TOTAL_BLOG_PAGES}
            />
          </div>
        </section>

        <FinalCta />
      </main>

      <SiteFooter />
      <MobileCtaBar />
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  )
}
