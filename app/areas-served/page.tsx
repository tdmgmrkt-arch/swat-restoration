import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  MapPin,
  Building2,
  Tag,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import {
  areasServedPageSchema,
  areasServedBreadcrumbSchema,
  areasServedFaqSchema,
} from "@/lib/schema"
import { builtCitySlugs } from "@/lib/cities-config"
import { canonicalUrl, cn } from "@/lib/utils"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"

import UtilityBar from "@/components/site/utility-bar"
import SiteHeader from "@/components/site/site-header"
import PageBreadcrumb from "@/components/site/page-breadcrumb"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"
import FinalCta from "@/components/sections/final-cta"

const CANONICAL = canonicalUrl("/areas-served")

export const metadata: Metadata = {
  title: "Restoration Service Areas — 49 Communities | Aledo TX",
  description:
    "S.W.A.T. Restoration serves 49 communities across Tarrant, Parker, Denton & Johnson counties from our Aledo hub. 24/7 emergency water & fire restoration coverage.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title:
      "Restoration Services — 49 Communities Across North Texas | S.W.A.T. Restoration",
    description:
      "S.W.A.T. Restoration covers 49 communities across Tarrant, Parker, Denton & Johnson counties. Aledo response hub. 24/7 emergency dispatch for water, fire & mold.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "49 Communities Served — S.W.A.T. Restoration | Aledo, TX",
    description:
      "24/7 restoration coverage across 49 North Texas communities. One hub, four counties, IICRC-certified crew.",
  },
}

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "49", accent: "+", label: "Communities" },
  { value: "1", label: "Response Hub" },
  { value: "4", label: "Counties" },
  { value: "24/7", label: "Coverage" },
] as const

const counties = [
  "Tarrant County",
  "Parker County",
  "Denton County",
  "Johnson County",
] as const

/**
 * Two H2 Q&As surfaced inline for FAQPage JSON-LD eligibility.
 * These also satisfy the ≥2 Q&A H2s SEO requirement on the hub.
 */
const HUB_FAQS = [
  {
    question: "How quickly can S.W.A.T. Restoration reach my city?",
    answer:
      "S.W.A.T. Restoration dispatches from our Aledo hub — centrally positioned in the DFW metroplex. Most of the 49 communities we serve are within 30–45 minutes of the hub. For emergency water and fire damage calls, crews mobilize immediately any hour of the day.",
  },
  {
    question: "Does S.W.A.T. Restoration serve all 49 cities at the same standard?",
    answer:
      "Yes. Every call across the 49 communities receives the same IICRC-certified crew, the same equipment, and the same 24/7 emergency dispatch. S.W.A.T. Restoration does not operate a second tier of service for cities further from the hub.",
  },
] as const

type City = (typeof siteConfig.serviceArea)[number]

const featuredCities = siteConfig.serviceArea.filter(
  (c): c is typeof c & { featured: true } => "featured" in c && c.featured === true
)
const allCitiesSorted = [...siteConfig.serviceArea].sort((a, b) =>
  a.name.localeCompare(b.name)
)
const featuredSlugs = new Set(featuredCities.map((c) => c.slug))

export default function AreasServedPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const faqSchema = areasServedFaqSchema([...HUB_FAQS])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasServedPageSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areasServedBreadcrumbSchema()) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <UtilityBar />
      <SiteHeader />

      <main id="main-content">
        <PageBreadcrumb current="Areas Served" />

        {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
        <section
          className="relative isolate bg-[#0c1230] pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden"
          aria-labelledby="areas-hero-heading"
        >
          <Image
            src="/hero-images/service-pages-hero.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center -z-10 opacity-55"
            priority
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-r from-[#0c1230] from-0% via-[#0c1230]/85 via-50% to-[#0c1230]/60 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-t from-[#0c1230] via-transparent to-[#0c1230]/50 pointer-events-none"
            aria-hidden="true"
          />

          <div className="absolute inset-0 tactical-grid opacity-25" aria-hidden="true" />
          <div className="absolute left-0 inset-y-0 w-0.75 bg-linear-to-b from-transparent via-red-600/60 to-transparent" aria-hidden="true" />
          <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-red-600/50" aria-hidden="true" />
          <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/30" aria-hidden="true" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/30" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(220,38,38,0.07),transparent)]"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-red-400 font-mono">
                Area of Operations
              </span>
            </div>

            <h1
              id="areas-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5"
            >
              Restoration Services
              <br />
              <span className="text-red-500">49 Communities. One Standard.</span>
            </h1>

            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mb-4">
              S.W.A.T. Restoration deploys from our Aledo hub — covering the full
              breadth of Tarrant, Parker, Denton, and Johnson counties. Same
              IICRC-certified crew. Same 24/7 emergency response. Every zip code.
            </p>

            <p className="text-white/40 text-sm font-mono tracking-wide mb-10">
              {counties.join(" · ")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact-us"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "bg-red-600 hover:bg-red-700 text-white font-bold",
                  "px-7 py-4 rounded-sm text-sm tracking-wide uppercase border border-red-500/40",
                  "min-h-13 transition-colors"
                )}
              >
                Request Service
              </Link>
              <Link
                href={siteConfig.phone.aled_tel}
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "border border-white/20 text-white bg-transparent hover:bg-white/6 hover:border-white/35",
                  "font-semibold px-7 py-4 rounded-sm text-sm tracking-wide uppercase",
                  "min-h-13 transition-colors"
                )}
                aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.aledo}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {siteConfig.phone.aledo}
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. STATS STRIP ──────────────────────────────────────────────── */}
        <section
          className="relative bg-[#131a3e] border-y border-white/8 overflow-hidden"
          aria-label="Coverage statistics"
        >
          <div className="absolute inset-0 tactical-grid opacity-20" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <ul
              role="list"
              className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8"
            >
              {stats.map((s) => (
                <li key={s.label} className="px-6 py-8 lg:py-10 flex flex-col gap-1.5">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight leading-none">
                      {s.value}
                    </span>
                    {"accent" in s && s.accent && (
                      <span className="text-2xl font-black text-red-500 leading-none">
                        {s.accent}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/45 font-semibold">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 3. FEATURED CITIES ──────────────────────────────────────────── */}
        <section
          className="relative bg-[#0c1230] py-16 lg:py-20 overflow-hidden"
          aria-labelledby="featured-cities-heading"
        >
          <div className="absolute inset-0 tactical-grid opacity-30" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_30%_50%,rgba(220,38,38,0.06),transparent)]"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <TacticalLabel>Priority Markets</TacticalLabel>
              <AccentLine />
              <h2
                id="featured-cities-heading"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
              >
                Primary coverage zones.
                <br />
                <span className="text-red-500">Fastest response times.</span>
              </h2>
            </div>

            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            >
              {featuredCities.map((city) => (
                <li key={city.slug}>
                  <CityCard city={city} featured />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 4. FULL CITY GRID ───────────────────────────────────────────── */}
        <section
          className="relative bg-[#181f45] border-y border-white/8 py-16 lg:py-20 overflow-hidden"
          aria-labelledby="all-cities-heading"
        >
          <div className="absolute inset-0 tactical-grid opacity-20" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <TacticalLabel>Full Coverage Zone</TacticalLabel>
              <AccentLine />
              <h2
                id="all-cities-heading"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
              >
                Every city. Every call.
                <br />
                <span className="text-red-500">No second-tier service.</span>
              </h2>
              <p className="mt-4 text-white/50 text-sm leading-relaxed">
                All 49 communities receive the same IICRC-certified crew, the same
                insurance-direct billing, and the same 24/7 emergency dispatch.{" "}
                <span className="text-red-400/80">Red marker</span> indicates a priority market.
              </p>
            </div>

            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 lg:gap-3"
            >
              {allCitiesSorted.map((city) => {
                const isFeatured = featuredSlugs.has(city.slug)
                const inner = (
                  <>
                    <MapPin
                      className={cn(
                        "h-3.5 w-3.5 shrink-0",
                        isFeatured ? "text-red-500" : "text-white/30"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isFeatured ? "text-white" : "text-white/60"
                      )}
                    >
                      {city.name}
                    </span>
                    {isFeatured && (
                      <span
                        className="ml-auto h-1 w-1 rounded-full bg-red-500 shrink-0"
                        aria-label="Priority market"
                      />
                    )}
                  </>
                )

                const cls = cn(
                  "flex items-center gap-2.5 px-3.5 py-3 rounded-sm border transition-colors min-h-11",
                  isFeatured
                    ? "bg-[#131a3e] border-red-600/25 hover:border-red-600/50"
                    : "bg-[#131a3e] border-white/8 hover:border-white/20"
                )

                if (builtCitySlugs.has(city.slug)) {
                  return (
                    <li key={city.slug}>
                      <Link href={`/areas-served/${city.slug}`} className={cls}>
                        {inner}
                      </Link>
                    </li>
                  )
                }

                return (
                  <li key={city.slug}>
                    <div className={cls}>{inner}</div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-white/6" aria-hidden="true" />
              <div className="inline-flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 font-mono">
                  {siteConfig.serviceArea.length} communities active
                </span>
              </div>
              <span className="h-px flex-1 bg-white/6" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ── 5. RESPONSE HUB ─────────────────────────────────────────────── */}
        <section
          className="relative bg-[#0c1230] py-16 lg:py-20 overflow-hidden"
          aria-labelledby="hubs-heading"
        >
          <div className="absolute inset-0 tactical-grid opacity-30" aria-hidden="true" />
          <div
            className="absolute right-0 inset-y-0 w-0.75 bg-linear-to-b from-transparent via-red-600 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <TacticalLabel>Dispatch Location</TacticalLabel>
              <AccentLine />
              <h2
                id="hubs-heading"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
              >
                One hub.
                <br />
                <span className="text-red-500">Full-county reach.</span>
              </h2>
              <p className="mt-4 text-white/55 text-base leading-relaxed">
                Positioned in Aledo to reach every corner of the 49-community
                service area — covering Tarrant, Parker, Denton, and Johnson
                counties with a single IICRC-certified crew.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {siteConfig.locations.map((loc, idx) => (
                <article
                  key={loc.name}
                  className="relative bg-[#131a3e] border border-white/10 rounded-sm overflow-hidden flex flex-col hover:border-red-600/40 transition-colors"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600" aria-hidden="true" />
                  <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-red-600/50" aria-hidden="true" />
                  <div className="absolute bottom-2.5 left-4 w-3 h-3 border-b border-l border-red-600/30" aria-hidden="true" />

                  <div className="px-7 pt-7 pb-2">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-red-400 font-semibold">
                        Hub 0{idx + 1}
                      </span>
                      <div className="h-px flex-1 bg-red-600/25" aria-hidden="true" />
                    </div>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-red-600/10 border border-red-600/30 shrink-0">
                        <Building2 className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <h3 className="text-white text-2xl font-black tracking-tight leading-tight">
                        {loc.name}
                      </h3>
                    </div>
                  </div>

                  <div className="px-7 pt-3 pb-7 flex flex-col gap-4 flex-1">
                    <address className="not-italic">
                      <p className="text-white/70 text-sm leading-relaxed">
                        {loc.address}
                      </p>
                      <p className="text-white/70 text-sm">
                        {loc.city}, {loc.state} {loc.zip}
                      </p>
                    </address>

                    <Link
                      href={loc.tel}
                      className={cn(
                        "inline-flex items-center gap-2 self-start",
                        "border border-white/20 text-white bg-transparent hover:bg-white/6 hover:border-white/35",
                        "font-semibold px-5 py-3 rounded-sm text-sm tracking-wide uppercase",
                        "min-h-11 transition-colors mt-auto"
                      )}
                      aria-label={`Call ${loc.name} at ${loc.phone}`}
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {loc.phone}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. FAQ ──────────────────────────────────────────────────────── */}
        <section
          className="relative bg-[#131a3e] border-y border-white/8 py-16 lg:py-20 overflow-hidden"
          aria-labelledby="areas-faq-heading"
        >
          <div className="absolute inset-0 tactical-grid opacity-20 pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <TacticalLabel>Common Questions</TacticalLabel>
              <AccentLine />
              <h2
                id="areas-faq-heading"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-10"
              >
                Service area questions
                <br />
                <span className="text-red-500">answered.</span>
              </h2>

              <div className="space-y-6">
                {HUB_FAQS.map((faq) => (
                  <div key={faq.question} className="relative bg-[#0c1230] border border-white/8 rounded-sm p-6">
                    <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600 rounded-l-sm" aria-hidden="true" />
                    <h3 className="text-white font-bold text-base mb-3">{faq.question}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. FINAL CTA ────────────────────────────────────────────────── */}
        <FinalCta />

        {/* Last updated — SEO signal */}
        <div className="bg-[#0c1230] border-t border-white/6 py-4">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center gap-2">
            <Tag className="h-3 w-3 text-white/25 shrink-0" aria-hidden="true" />
            <p className="text-white/30 text-xs font-mono">
              Service area last updated: {lastUpdated}
            </p>
          </div>
        </div>

      </main>

      <SiteFooter />
      <MobileCtaBar />
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Featured City Card                                                    */
/* ------------------------------------------------------------------ */
function CityCard({ city, featured = false }: { city: City; featured?: boolean }) {
  const inner = (
    <>
      {featured && (
        <>
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-red-600/55 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-red-600/55 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-red-600/30 pointer-events-none" aria-hidden="true" />
        </>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-sm bg-red-600/10 border border-red-600/30 shrink-0">
          <MapPin className="h-4 w-4 text-red-400" aria-hidden="true" />
        </div>
        <div>
          <p className="text-white font-black text-base sm:text-lg tracking-tight leading-tight">
            {city.name}
          </p>
          <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/35">
            Texas
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
        </span>
        <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-red-400/80 font-semibold">
          Coverage Active
        </span>
      </div>
    </>
  )

  const cls = cn(
    "group relative bg-[#131a3e] border border-white/10 rounded-sm p-5",
    "hover:border-red-600/50 transition-colors block w-full"
  )

  if (builtCitySlugs.has(city.slug)) {
    return (
      <Link href={`/areas-served/${city.slug}`} className={cls}>
        {inner}
      </Link>
    )
  }

  return <div className={cls}>{inner}</div>
}
