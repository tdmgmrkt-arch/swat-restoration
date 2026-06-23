import type { Metadata } from "next"
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
  Flame,
  ArrowRight,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { servicesConfig } from "@/lib/services-config"
import { hubServiceSchema, hubBreadcrumbSchema, hubFaqSchema } from "@/lib/schema"
import { cn } from "@/lib/utils"
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

const HUB_HREF = "/fire-damage"
const CANONICAL = `${siteConfig.url}${HUB_HREF}`
const LAST_UPDATED = "June 2026"

const fireDamageCategory = siteConfig.serviceCategories.find(
  (c) => c.slug === "fire-damage"
)!
const subServiceLinks = fireDamageCategory.services.filter(
  (s) => s.href !== HUB_HREF
)

function buildCardData(link: { title: string; href: string }): HubCardData {
  const slug = link.href.replace("/fire-damage/", "")
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
  title: "Fire Damage Restoration Aledo & Fort Worth | S.W.A.T.",
  description:
    "Fire damage restoration in Aledo & Fort Worth, TX. S.W.A.T. Restoration boards up the night of the fire and handles smoke, soot, odor, and contents recovery. IICRC S700-compliant.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Fire Damage Restoration Aledo & Fort Worth | S.W.A.T.",
    description:
      "Fire damage restoration in Aledo & Fort Worth, TX. S.W.A.T. Restoration boards up the night of the fire and handles smoke, soot, odor, and contents recovery. IICRC S700-compliant.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fire Damage Restoration Aledo & Fort Worth | S.W.A.T.",
    description:
      "Fire damage restoration in Aledo & Fort Worth, TX. Board-up the night of the fire. IICRC S700, 24/7 dispatch, insurance billing direct.",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────────────────────────────────────

const HUB_NAME = "Fire & Smoke Damage Restoration"
const HUB_DESCRIPTION =
  "IICRC S700-compliant fire and smoke damage restoration across Aledo, Fort Worth, and 49 DFW communities. Board-up the same night, full soot and odor neutralization, Esporta contents recovery, and direct insurance billing."

const hubFaqs = [
  {
    question: "Can S.W.A.T. Restoration board up a fire-damaged home the same night?",
    answer:
      "Yes. S.W.A.T. Restoration dispatches board-up crews 24/7 across Aledo, Fort Worth, Weatherford, Willow Park, and Benbrook. Securing the structure the night of the fire prevents secondary weather damage, deters trespassing, and satisfies most carrier requirements for prompt protective action. A crew can be on-site within 60 minutes of the initial call. Documentation begins at arrival — photos, moisture readings, and soot classification per IICRC S700 — so the insurance file is building from hour one.",
  },
  {
    question: "What does IICRC S700 fire restoration actually cover?",
    answer:
      "IICRC S700 is the industry standard for professional fire and smoke damage restoration. It governs how crews assess smoke penetration depth, classify residues (dry, wet, protein, or oil-based), select cleaning chemistry, and verify that odor-causing volatile compounds have been neutralized — not just masked. S.W.A.T. Restoration follows S700 protocols on every fire job. Hydroxyl generators, ozone treatment, and thermal foggers address odor at the molecular level. Chem sponges and wet-cleaning chemistry handle soot on structure surfaces. The Esporta wash system recovers soft contents — clothing, bedding, and fabric — that traditional cleaning cannot save.",
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// Process steps
// ─────────────────────────────────────────────────────────────────────────────

const processSteps = [
  {
    number: "01",
    icon: Phone,
    label: "Dispatch",
    title: "Board-Up the Same Night.",
    description:
      "Live dispatcher answers around the clock. A board-up and emergency mitigation crew is confirmed rolling within minutes. The structure is secured before conditions worsen.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    label: "Assess",
    title: "Classify the Damage.",
    description:
      "Soot and smoke residues are classified per IICRC S700 — dry, wet, protein, or oil-based. Each type demands a different cleaning chemistry. Misidentifying residue type is the most common reason DIY cleaning fails.",
  },
  {
    number: "03",
    icon: Wind,
    label: "Restore",
    title: "Neutralize. Clean. Recover.",
    description:
      "Hydroxyl generators, ozone treatment, and thermal foggers eliminate odor at the molecular level. Chem sponges and wet-cleaning chemistry tackle soot on structure surfaces. The Esporta wash system recovers soft contents that other methods cannot.",
  },
  {
    number: "04",
    icon: FileText,
    label: "Document & Hand Off",
    title: "Full Insurance Package.",
    description:
      "Photo documentation, residue classification report, and scope of work — formatted for adjuster review. S.W.A.T. Restoration bills insurance directly for covered losses and coordinates the handoff to reconstruction.",
  },
] as const

// ─────────────────────────────────────────────────────────────────────────────
// Why pillars
// ─────────────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: Zap,
    title: "Same-Night Board-Up",
    bullets: [
      "24/7 dispatch — live crew, not voicemail",
      "Target: under 60 min from call to on-site",
      "Secures structure before secondary damage sets in",
    ],
    primary: true,
  },
  {
    icon: ShieldCheck,
    title: "IICRC S700 Protocol",
    bullets: [
      "S700-compliant residue classification",
      "Hydroxyl generators, ozone, thermal foggers",
      "Esporta wash system for contents recovery",
    ],
  },
  {
    icon: CreditCard,
    title: "Insurance Billing Direct",
    bullets: [
      "Documentation built for adjuster review",
      "Direct billing to major Texas carriers",
      "S700 classification on-site from hour one",
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
  "Aledo", "Fort Worth", "Weatherford", "Willow Park", "Benbrook",
]

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function FireDamageHubPage() {
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
                  Fire &amp; Smoke Damage Restoration
                </li>
              </ol>
            </nav>

            <TacticalLabel>Fire &amp; Smoke Damage Restoration</TacticalLabel>
            <AccentLine />

            <h1
              id="hub-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.04] mb-5 max-w-4xl"
            >
              Fire Damage Restoration
              <br />
              <span className="text-red-500">in Aledo &amp; Fort Worth, TX.</span>
            </h1>

            <p className="text-white/35 text-xs font-mono tracking-wider mb-6">
              Last Updated: {LAST_UPDATED}
            </p>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mb-9">
              S.W.A.T. Restoration boards up the structure the night of the fire and
              returns the home the way it was — or better. IICRC S700-trained crews
              handle smoke, soot, odor neutralization, and contents recovery across
              Aledo, Fort Worth, Weatherford, Willow Park, and Benbrook. A Texas
              structure fire is traumatic. The restoration team shouldn&apos;t add to
              the stress. Insurance billing goes direct.
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
                { icon: Flame, label: "Same-Night Board-Up" },
                { icon: ShieldCheck, label: "IICRC S700" },
                { icon: AlertTriangle, label: "<60-Min Arrival" },
                { icon: CreditCard, label: "Insurance Billing Direct" },
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
                5 Fire &amp; Smoke
                <br />
                <span className="text-red-500">Service Scopes.</span>
              </h2>
              <p className="mt-4 text-white/55 text-base leading-relaxed">
                From the night of the fire through final odor clearance — smoke
                damage, soot removal, contents recovery, and board-up services.
                Click any scope to see full process and FAQs.
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
                  Fire Loss Demands
                  <br />
                  <span className="text-red-500">a Different Standard.</span>
                </h2>
                <p className="mt-4 text-white/55 text-base leading-relaxed">
                  A Texas structure fire can spread soot to every surface within
                  minutes. Odor-causing volatile compounds embed in drywall, insulation,
                  and HVAC ductwork. A crew that follows IICRC S700 and documents the
                  loss from the first hour is the difference between a clean insurance
                  file and a drawn-out claim.
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
                <TacticalLabel className="text-red-400">Restoration Protocol</TacticalLabel>
                <AccentLine />
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  How S.W.A.T. Restoration
                  <br />
                  <span className="text-red-500">Handles a Fire Loss.</span>
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
                  S.W.A.T. Restoration handles fire damage restoration across{" "}
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
          categoryName="Fire & Smoke Damage Restoration"
          categorySlug="fire-damage"
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
