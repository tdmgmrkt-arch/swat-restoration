import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  CalendarDays,
  Clock,
  ShieldCheck,
  AlertTriangle,
  CreditCard,
  Heart,
  Zap,
  FileText,
  Wind,
  ArrowRight,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { servicesConfig } from "@/lib/services-config"
import { hubServiceSchema, hubBreadcrumbSchema, hubFaqSchema } from "@/lib/schema"
import { canonicalUrl, cn } from "@/lib/utils"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"

import UtilityBar from "@/components/site/utility-bar"
import SiteHeader from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"
import FinalCta from "@/components/sections/final-cta"
import HubReviews from "@/components/sections/hub/hub-reviews"
import HubServiceCard from "@/components/sections/hub/hub-service-card"
import type { HubCardData } from "@/components/sections/hub/hub-service-card"

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const HUB_HREF = "/mold-remediation"
const CANONICAL = canonicalUrl(HUB_HREF)
const LAST_UPDATED = "June 2026"

const moldCategory = siteConfig.serviceCategories.find(
  (c) => c.slug === "mold-remediation"
)!
const subServiceLinks = moldCategory.services.filter(
  (s) => s.href !== HUB_HREF
)

function buildCardData(link: { title: string; href: string }): HubCardData {
  const slug = link.href.replace("/mold-remediation/", "")
  const cfg = servicesConfig[slug]
  if (cfg) {
    return {
      href: cfg.href,
      title: cfg.name,
      heroPainLine: cfg.heroPainLine,
      scopeBullets: cfg.scopeBullets,
      slug: cfg.slug,
    }
  }
  return { href: link.href, title: link.title }
}

const subServiceCards: HubCardData[] = subServiceLinks.map((link) =>
  buildCardData(link)
)

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Mold Remediation Aledo & Fort Worth TX | S.W.A.T.",
  description:
    "Mold remediation in Aledo & Fort Worth, TX. S.W.A.T. Restoration follows IICRC S520 and EPA guidelines — inspection, HEPA containment, removal, and air-quality clearance. Insurance billing direct.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Mold Remediation Aledo & Fort Worth TX | S.W.A.T.",
    description:
      "Mold remediation in Aledo & Fort Worth, TX. S.W.A.T. Restoration follows IICRC S520 and EPA guidelines — inspection, HEPA containment, removal, and air-quality clearance. Insurance billing direct.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mold Remediation Aledo & Fort Worth TX | S.W.A.T.",
    description:
      "Mold remediation in Aledo & Fort Worth, TX. IICRC S520, HEPA containment, air-quality clearance. 24/7 dispatch, insurance billing direct.",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const HUB_NAME = "Mold Remediation"
const HUB_DESCRIPTION =
  "IICRC S520 and EPA-guideline mold remediation across Aledo, Fort Worth, and 49 DFW communities. Inspection with Air-O-Cell air sampling, HEPA negative air machine containment, Concrobium and Microban antimicrobials, and post-remediation air-quality clearance testing."

const hubFaqs = [
  {
    question: "How does Texas humidity affect mold growth in a home?",
    answer:
      "North Texas summers push humidity above 60% for weeks at a time, and Parker County homes — particularly those with crawl spaces, pier-and-beam foundations, or aging HVAC systems — can hit relative humidity levels that sustain mold growth on drywall, insulation, and wood framing within 24 to 48 hours of a water intrusion. S.W.A.T. Restoration treats mold remediation in Aledo and Fort Worth as a year-round concern. Air-O-Cell cassette sampling taken during inspection establishes baseline spore counts by species. HEPA negative air machines maintain containment during removal so spores don't cross-contaminate clean areas. After physical remediation, Concrobium and Microban antimicrobials are applied to inhibit regrowth. Clearance testing confirms the job is complete before containment comes down.",
  },
  {
    question: "What does IICRC S520 mold remediation actually require?",
    answer:
      "IICRC S520 is the professional standard for mold remediation. It mandates that remediation scope be determined by visual inspection and air sampling — not visual inspection alone. Contaminated material must be physically removed and disposed of, not painted over or treated in place beyond what the standard permits. Containment with polyethylene sheeting and HEPA negative air machines prevents cross-contamination during the work. Post-remediation verification testing confirms spore counts have returned to outdoor baseline levels before the area is released. S.W.A.T. Restoration follows S520 protocol on every mold job. The EPA mold remediation guidelines align with this standard and are followed for occupied residential properties — particularly important for families with asthma or respiratory sensitivities.",
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// Process steps
// ─────────────────────────────────────────────────────────────────────────────

const processSteps = [
  {
    number: "01",
    icon: Zap,
    label: "Inspect",
    title: "Sample. Map. Scope.",
    description:
      "Air-O-Cell cassette air sampling establishes spore counts by species. Visual inspection maps the growth boundary. Together they drive the remediation scope — not guesswork.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    label: "Contain",
    title: "Seal the Zone.",
    description:
      "Polyethylene containment and HEPA negative air machines isolate the affected area. Negative air pressure prevents spores from migrating to clean spaces during the work.",
  },
  {
    number: "03",
    icon: Wind,
    label: "Remediate",
    title: "Remove. Treat. Protect.",
    description:
      "Contaminated material is physically removed per IICRC S520. Concrobium and Microban antimicrobials treat remaining surfaces. The moisture source driving growth is addressed before remediation closes.",
  },
  {
    number: "04",
    icon: FileText,
    label: "Clear",
    title: "Post-Remediation Verification.",
    description:
      "Clearance air sampling confirms spore counts are at or below outdoor baseline before containment comes down. The report is formatted for adjuster review and insurance filing.",
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// Why pillars
// ─────────────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: ShieldCheck,
    title: "IICRC S520 + EPA Protocol",
    bullets: [
      "S520-compliant scope and removal",
      "EPA guidelines followed in occupied homes",
      "Air-O-Cell cassette sampling on every job",
    ],
    primary: true,
  },
  {
    icon: Wind,
    title: "HEPA Containment",
    bullets: [
      "HEPA negative air machines during work",
      "Polyethylene containment seals the zone",
      "Prevents cross-contamination to clean areas",
    ],
  },
  {
    icon: CreditCard,
    title: "Insurance Billing Direct",
    bullets: [
      "Clearance report built for adjuster review",
      "Direct billing to major Texas carriers",
      "Post-water-damage mold treated as one claim",
    ],
  },
  {
    icon: Heart,
    title: "Family Owned",
    bullets: [
      "Dillon & Danielle Patterson, owners",
      "Right here in DFW — not a franchise",
      "Every job backed by the family name",
    ],
  },
] as const

const featuredCities = [
  "Aledo", "Fort Worth", "Weatherford", "Hudson Oaks", "White Settlement",
]

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function MoldRemediationHubPage() {
  return (
    <>
      {/* JSON-LD: Service schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            hubServiceSchema({
              name: HUB_NAME,
              url: CANONICAL,
              description: HUB_DESCRIPTION,
            })
          ),
        }}
      />
      {/* JSON-LD: FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubFaqSchema(hubFaqs)) }}
      />
      {/* JSON-LD: BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            hubBreadcrumbSchema({ name: HUB_NAME, url: CANONICAL })
          ),
        }}
      />

      <UtilityBar />
      <SiteHeader />

      <main id="main-content">

        {/* ================================================================ */}
        {/* 1. HUB HERO                                                       */}
        {/* ================================================================ */}
        <section
          className="relative isolate bg-[#0c1230] pt-16 pb-20 lg:pt-24 lg:pb-24 overflow-hidden"
          aria-labelledby="hub-heading"
        >
          {/* Background image — heavily masked for legibility */}
          <Image
            src="/hero-images/service-pages-hero.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center -z-10 opacity-55"
            priority
          />
          {/* Stacked overlays — left-weighted so headline copy sits on near-solid backdrop */}
          <div
            className="absolute inset-0 -z-10 bg-linear-to-r from-[#0c1230] from-0% via-[#0c1230]/85 via-50% to-[#0c1230]/60 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-t from-[#0c1230] via-transparent to-[#0c1230]/50 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_15%_45%,rgba(220,38,38,0.09),transparent)] pointer-events-none"
            aria-hidden="true"
          />
          <div className="absolute left-0 inset-y-0 w-1 bg-red-600" aria-hidden="true" />
          <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/30 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/30 pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-xs text-white/40 font-mono tracking-wider">
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/25">/</li>
                <li className="text-white/70" aria-current="page">
                  Mold Remediation
                </li>
              </ol>
            </nav>

            <TacticalLabel>Mold Remediation</TacticalLabel>
            <AccentLine />

            <h1
              id="hub-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.04] mb-5 max-w-4xl"
            >
              Mold Remediation
              <br />
              <span className="text-red-500">in Aledo &amp; Fort Worth, TX.</span>
            </h1>

            <p className="text-white/35 text-xs font-mono tracking-wider mb-6">
              Last Updated: {LAST_UPDATED}
            </p>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mb-9">
              S.W.A.T. Restoration follows IICRC S520 and EPA mold remediation
              guidelines on every job. Air-O-Cell sampling at inspection, HEPA
              negative air machine containment during removal, and post-remediation
              clearance testing before containment comes down. Texas humidity creates
              persistent mold pressure — water damage left unaddressed for 24 to 48
              hours is often enough. Insurance billing goes direct across Aledo, Fort
              Worth, Weatherford, Hudson Oaks, and White Settlement.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-9">
              <Link
                href={siteConfig.phone.primary_tel}
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase",
                  "px-7 py-3.5 rounded-sm border border-red-500/40 min-h-[48px] transition-colors"
                )}
                aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.primary}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {siteConfig.phone.primary}
              </Link>
              <Link
                href="/contact-us"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "border border-white/25 text-white bg-transparent hover:bg-white/8 hover:border-white/40",
                  "font-semibold text-sm tracking-wide uppercase",
                  "px-7 py-3.5 rounded-sm min-h-[48px] transition-colors"
                )}
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Get a Response Plan
              </Link>
            </div>

            <div className="flex flex-wrap gap-2" role="list">
              {[
                { icon: Clock, label: "24/7 Dispatch" },
                { icon: ShieldCheck, label: "IICRC S520" },
                { icon: AlertTriangle, label: "HEPA Containment" },
                { icon: CreditCard, label: "Insurance Billing Direct" },
                { icon: Heart, label: "Family Owned" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  role="listitem"
                  className="flex items-center gap-1.5 bg-white/4 border border-white/10 rounded-sm px-3 py-1.5 text-white/65 text-xs font-medium"
                >
                  <Icon className="h-3.5 w-3.5 text-red-400 shrink-0" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 2. SUB-SERVICES GRID                                              */}
        {/* ================================================================ */}
        <section
          className="relative bg-[#0c1230] border-y border-white/8 py-20 lg:py-24 overflow-hidden"
          aria-labelledby="services-grid-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="mb-14 max-w-2xl">
              <TacticalLabel>Service Catalog</TacticalLabel>
              <AccentLine />
              <h2
                id="services-grid-heading"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
              >
                4 Mold Remediation
                <br />
                <span className="text-red-500">Service Scopes.</span>
              </h2>
              <p className="mt-4 text-white/55 text-base leading-relaxed">
                Inspection through air-quality clearance — mold inspection, removal,
                black mold remediation, and indoor air-quality restoration. Click any
                scope to see the full process and FAQs.
              </p>
            </div>

            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            >
              {subServiceCards.map((card, idx) => (
                <li key={card.href}>
                  <HubServiceCard
                    card={card}
                    primary={idx === 0}
                    index={idx + 1}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. WHY S.W.A.T. / PROCESS                                        */}
        {/* ================================================================ */}
        <section
          className="relative bg-[#0c1230] py-20 lg:py-24 overflow-hidden"
          aria-labelledby="why-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_90%_50%,rgba(220,38,38,0.07),transparent)] pointer-events-none"
            aria-hidden="true"
          />
          <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/40 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-red-600/40 pointer-events-none" aria-hidden="true" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            {/* Why pillars */}
            <div className="mb-20 lg:mb-24">
              <div className="mb-12 max-w-xl">
                <TacticalLabel className="text-red-400">Why S.W.A.T. Restoration</TacticalLabel>
                <AccentLine />
                <h2
                  id="why-heading"
                  className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
                >
                  Mold Doesn&apos;t Pause.
                  <br />
                  <span className="text-red-500">Neither Does S.W.A.T.</span>
                </h2>
                <p className="mt-4 text-white/55 text-base leading-relaxed">
                  Texas humidity means mold remediation is rarely a one-time event
                  without addressing the root cause. Families with asthma or
                  respiratory sensitivities can&apos;t afford a remediation that paints
                  over the problem. S.W.A.T. Restoration follows IICRC S520 and EPA
                  guidelines from inspection through clearance — and addresses the
                  moisture source before the containment comes down.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-sm overflow-hidden border border-white/8">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon
                  const isPrimary = "primary" in pillar && pillar.primary
                  return (
                    <div
                      key={pillar.title}
                      className={cn(
                        "group relative p-6 lg:p-7 flex flex-col transition-colors min-h-60",
                        isPrimary
                          ? "bg-[#181f45] hover:bg-[#1a2347]"
                          : "bg-[#131a3e] hover:bg-[#181f45]"
                      )}
                    >
                      {isPrimary && (
                        <div
                          className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600"
                          aria-hidden="true"
                        />
                      )}
                      <div
                        className={cn(
                          "w-11 h-11 flex items-center justify-center border rounded-sm mb-5 transition-colors",
                          isPrimary
                            ? "border-red-600/50 bg-red-600/10"
                            : "border-white/10 group-hover:border-red-600/40"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-5 w-5",
                            isPrimary ? "text-red-400" : "text-red-500"
                          )}
                          aria-hidden="true"
                        />
                      </div>
                      <h3
                        className={cn(
                          "font-black tracking-wider uppercase leading-tight mb-5",
                          isPrimary
                            ? "text-white text-lg lg:text-xl"
                            : "text-white/90 text-base lg:text-lg"
                        )}
                      >
                        {pillar.title}
                      </h3>
                      <ul role="list" className="space-y-2 mt-auto">
                        {pillar.bullets.map((b) => (
                          <li
                            key={b}
                            className={cn(
                              "flex items-center gap-2.5 text-sm font-medium leading-snug",
                              isPrimary ? "text-white/80" : "text-white/60"
                            )}
                          >
                            <span
                              className={cn(
                                "h-1 w-1 rounded-full shrink-0",
                                isPrimary ? "bg-red-500" : "bg-red-500/60"
                              )}
                              aria-hidden="true"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* 4-step process */}
            <div>
              <div className="mb-10 max-w-xl">
                <TacticalLabel className="text-red-400">Remediation Protocol</TacticalLabel>
                <AccentLine />
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  How S.W.A.T. Restoration
                  <br />
                  <span className="text-red-500">Handles a Mold Job.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {processSteps.map((step) => {
                  const StepIcon = step.icon
                  return (
                    <div
                      key={step.number}
                      className="relative bg-[#131a3e] border border-white/10 rounded-sm p-6 lg:p-7"
                    >
                      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-red-600/40 pointer-events-none" aria-hidden="true" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-red-600/40 pointer-events-none" aria-hidden="true" />

                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-3xl font-black text-red-500/40 leading-none tracking-tight">
                          {step.number}
                        </span>
                        <div className="w-9 h-9 flex items-center justify-center border border-red-600/30 bg-red-600/8 rounded-sm">
                          <StepIcon className="h-4 w-4 text-red-400" aria-hidden="true" />
                        </div>
                      </div>

                      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-red-400 mb-2">
                        {step.label}
                      </div>
                      <h3 className="text-white font-black text-base uppercase tracking-tight leading-tight mb-3">
                        {step.title}
                      </h3>
                      <p className="text-white/55 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. FAQ                                                            */}
        {/* ================================================================ */}
        <section
          className="relative bg-[#0c1230] border-y border-white/8 py-20 lg:py-24 overflow-hidden"
          aria-labelledby="hub-faq-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-3xl mx-auto px-5 sm:px-6">
            <TacticalLabel>Common Questions</TacticalLabel>
            <AccentLine />
            <h2
              id="hub-faq-heading"
              className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-10"
            >
              Answered before
              <br />
              <span className="text-red-500">you have to ask.</span>
            </h2>

            <div className="divide-y divide-white/8 border-y border-white/10">
              {hubFaqs.map((faq, idx) => (
                <details key={idx} className="group py-4">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none text-white text-base font-semibold hover:text-red-400 transition-colors">
                    <span>{faq.question}</span>
                    <span
                      className="text-red-500 text-xl leading-none mt-0.5 group-open:rotate-45 transition-transform shrink-0"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-white/65 text-sm leading-loose pt-3">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 5. SERVICE AREA BAND                                              */}
        {/* ================================================================ */}
        <section
          className="relative bg-[#131a3e] border-b border-white/8 py-12 lg:py-16 overflow-hidden"
          aria-label="Service area"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-15 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <TacticalLabel className="text-red-400">Area of Operations</TacticalLabel>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                  S.W.A.T. Restoration handles mold remediation across{" "}
                  <strong className="text-white font-semibold">
                    {siteConfig.serviceArea.length} DFW communities
                  </strong>{" "}
                  — including{" "}
                  {featuredCities.map((city, i) => (
                    <span key={city}>
                      <span className="text-white/90">{city}</span>
                      {i < featuredCities.length - 1 && (
                        <span className="text-white/40">, </span>
                      )}
                    </span>
                  ))}
                  , and more across Tarrant, Parker, Denton &amp; Johnson counties.
                </p>
              </div>
              <Link
                href="/areas-served"
                className={cn(
                  "inline-flex items-center gap-2 shrink-0",
                  "border border-white/15 hover:border-red-600/40 text-white/75 hover:text-white",
                  "text-xs font-semibold tracking-[0.15em] uppercase px-5 py-3 rounded-sm transition-colors font-mono"
                )}
              >
                View All {siteConfig.serviceArea.length} Communities
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. VERIFIED REVIEWS                                               */}
        {/* ================================================================ */}
        <HubReviews
          categoryName="Mold Remediation"
          categorySlug="mold-remediation"
        />

        {/* ================================================================ */}
        {/* 7. FINAL CTA                                                      */}
        {/* ================================================================ */}
        <FinalCta />

      </main>

      <SiteFooter />
      <MobileCtaBar />
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  )
}
