import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { canonicalUrl } from "@/lib/utils"
import {
  builtCities,
  getCityConfig,
  resolveCityServiceHighlights,
  annotateNearbyCities,
} from "@/lib/cities-config"
import {
  cityPageSchema,
  cityBreadcrumbSchema,
  cityFaqSchema,
} from "@/lib/schema"

import UtilityBar from "@/components/site/utility-bar"
import SiteHeader from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"

import CredentialsStrip from "@/components/sections/credentials-strip"
import CityBreadcrumb from "@/components/sections/city-page/city-breadcrumb"
import CityHero from "@/components/sections/city-page/city-hero"
import CityLocalIntro from "@/components/sections/city-page/city-local-intro"
import CityMapEmbed from "@/components/sections/city-page/city-map-embed"
import CityStatsStrip from "@/components/sections/city-page/city-stats-strip"
import CityNeighborhoods from "@/components/sections/city-page/city-neighborhoods"
import CityCommonIssues from "@/components/sections/city-page/city-common-issues"
import CityServicesGrid from "@/components/sections/city-page/city-services-grid"
import CityWhySwat from "@/components/sections/city-page/city-why-swat"
import CityReviews from "@/components/sections/city-page/city-reviews"
import CityFaq from "@/components/sections/city-page/city-faq"
import CityNearbyCities from "@/components/sections/city-page/city-nearby-cities"
import CityFinalCta from "@/components/sections/city-page/city-final-cta"

// ---------------------------------------------------------------------------
// Static params — empty for now; wire-up pass populates once city data files
// land from seo-writer. Only slugs imported into lib/cities-config.ts produce
// routes. Other slugs → 404.
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return builtCities.map((c) => ({ slug: c.slug }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cfg = getCityConfig(slug)
  if (!cfg) return {}

  const canonical = canonicalUrl(cfg.href)

  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: cfg.metaTitle,
      description: cfg.metaDescription,
    },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cfg = getCityConfig(slug)
  if (!cfg) notFound()

  const highlights = resolveCityServiceHighlights(cfg)
  const nearby = annotateNearbyCities(cfg)

  const lastUpdatedDate = new Date(cfg.lastUpdated)
  const lastUpdatedDisplay = lastUpdatedDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const faqSchema = cityFaqSchema(cfg)

  return (
    <>
      {/* JSON-LD: 1) City page entity schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityPageSchema(cfg)) }}
      />
      {/* JSON-LD: 2) BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityBreadcrumbSchema(cfg)) }}
      />
      {/* JSON-LD: 3) FAQPage — null-guarded */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <UtilityBar />
      <SiteHeader />

      <main id="main-content">
        {/* 1. Visual breadcrumb */}
        <CityBreadcrumb cfg={cfg} />

        {/* 2. Hero */}
        <CityHero cfg={cfg} />

        {/* 2.5. Credentials strip — surfaces trust signals before deep scroll */}
        <CredentialsStrip />

        {/* 3. Local intro + entity anchor */}
        <CityLocalIntro cfg={cfg} />

        {/* 3.5. Map embed — anchored to the real dispatch hub (Aledo) */}
        <CityMapEmbed cfg={cfg} />

        {/* 4. Stats strip */}
        <CityStatsStrip cfg={cfg} />

        {/* 5. Neighborhoods */}
        <CityNeighborhoods cfg={cfg} />

        {/* 6. Common issues */}
        <CityCommonIssues cfg={cfg} />

        {/* 7. Services grid */}
        <CityServicesGrid cfg={cfg} highlights={highlights} />

        {/* 8. Why SWAT Restoration */}
        <CityWhySwat cfg={cfg} />

        {/* 9. Verified Google reviews + curated fallbacks */}
        <CityReviews cfg={cfg} />

        {/* 10. FAQ */}
        <CityFaq cfg={cfg} />

        {/* 11. Nearby cities */}
        <CityNearbyCities cfg={cfg} nearby={nearby} />

        {/* 12. Final CTA */}
        <CityFinalCta cfg={cfg} />

        {/* Last updated — required SEO signal on every city page */}
        <div className="bg-[#0c1230] border-t border-white/8 py-4">
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            <p className="text-white/35 text-xs font-mono tracking-wider">
              Last updated: {lastUpdatedDisplay}
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
      <MobileCtaBar />
      {/* Spacer reserves height so sticky mobile CTA bar never overlaps page content */}
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  )
}
