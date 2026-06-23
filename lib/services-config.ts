import { siteConfig } from "./site-config"

// Per-service configs live in lib/services/ — one file per service. This
// keeps each page's content as a small, focused, reviewable unit and lets the
// catalog grow without bloating a single file.
import { waterExtraction } from "./services/water-extraction"
import { waterRemoval } from "./services/water-removal"
import { structuralDrying } from "./services/structural-drying"
import { floodRestoration } from "./services/flood-restoration"
import { burstPipeCleanup } from "./services/burst-pipe-cleanup"
import { ceilingLeakRepair } from "./services/ceiling-leak-repair"
import { sewageCleanup } from "./services/sewage-cleanup"

// Fire damage
import { smokeDamage } from "./services/smoke-damage"
import { sootRemoval } from "./services/soot-removal"
import { odorRemoval } from "./services/odor-removal"
import { contentsCleaning } from "./services/contents-cleaning"
import { boardUp } from "./services/board-up"

// Mold remediation
import { moldInspection } from "./services/mold-inspection"
import { moldRemoval } from "./services/mold-removal"
import { blackMold } from "./services/black-mold"
import { airQuality } from "./services/air-quality"

// Reconstruction
import { roofing } from "./services/roofing"
import { generalConstruction } from "./services/general-construction"
import { packOutCleaning } from "./services/pack-out-cleaning"
import { insuranceClaims } from "./services/insurance-claims"
import { stormDamage } from "./services/storm-damage"

// Re-export the shared types so imports of `ServiceConfig`, `Faq`, etc.
// from "@/lib/services-config" work across the codebase.
export type {
  ServiceConfig,
  ProcessStep,
  WhySwatPillar,
  Faq,
  RelatedService,
} from "./services/_types"
import type { ServiceConfig, RelatedService } from "./services/_types"

const base = siteConfig.url

// ---------------------------------------------------------------------------
// Service registry — keyed by slug for O(1) lookup
// Add new services here as they are written.
// ---------------------------------------------------------------------------
export const servicesConfig: Record<string, ServiceConfig> = {
  // Water damage
  [waterExtraction.slug]: waterExtraction,
  [waterRemoval.slug]: waterRemoval,
  [structuralDrying.slug]: structuralDrying,
  [floodRestoration.slug]: floodRestoration,
  [burstPipeCleanup.slug]: burstPipeCleanup,
  [ceilingLeakRepair.slug]: ceilingLeakRepair,
  [sewageCleanup.slug]: sewageCleanup,
  // Fire damage
  [smokeDamage.slug]: smokeDamage,
  [sootRemoval.slug]: sootRemoval,
  [odorRemoval.slug]: odorRemoval,
  [contentsCleaning.slug]: contentsCleaning,
  [boardUp.slug]: boardUp,
  // Mold remediation
  [moldInspection.slug]: moldInspection,
  [moldRemoval.slug]: moldRemoval,
  [blackMold.slug]: blackMold,
  [airQuality.slug]: airQuality,
  // Reconstruction
  [roofing.slug]: roofing,
  [generalConstruction.slug]: generalConstruction,
  [packOutCleaning.slug]: packOutCleaning,
  [insuranceClaims.slug]: insuranceClaims,
  [stormDamage.slug]: stormDamage,
}

/** Services that render under /water-damage/[slug]. */
export const waterDamageCategoryServices: ServiceConfig[] = Object.values(
  servicesConfig
).filter((cfg) => cfg.href.startsWith("/water-damage/"))

/** Services that render under /fire-damage/[slug]. */
export const fireDamageCategoryServices: ServiceConfig[] = Object.values(
  servicesConfig
).filter((cfg) => cfg.href.startsWith("/fire-damage/"))

/** Services that render under /mold-remediation/[slug]. */
export const moldRemediationCategoryServices: ServiceConfig[] = Object.values(
  servicesConfig
).filter((cfg) => cfg.href.startsWith("/mold-remediation/"))

/** Services that render under /reconstruction/[slug]. */
export const reconstructionCategoryServices: ServiceConfig[] = Object.values(
  servicesConfig
).filter((cfg) => cfg.href.startsWith("/reconstruction/"))

/** Resolve the parent category crumb for a service. Drives both the visual
 *  breadcrumb component and the JSON-LD BreadcrumbList. */
export function categoryParent(
  href: string
): { name: string; href: string } | null {
  if (href.startsWith("/water-damage/"))
    return { name: "Water Damage Restoration", href: "/water-damage" }
  if (href.startsWith("/fire-damage/"))
    return { name: "Fire & Smoke Damage", href: "/fire-damage" }
  if (href.startsWith("/mold-remediation/"))
    return { name: "Mold Remediation", href: "/mold-remediation" }
  if (href.startsWith("/reconstruction/"))
    return { name: "Reconstruction & Roofing", href: "/reconstruction" }
  return null
}

/** Ordered list of all service configs, for iteration (sitemap, nav, etc.) */
export const allServices: ServiceConfig[] = Object.values(servicesConfig)

/** Resolve a slug → config, or null if not found */
export function getServiceConfig(slug: string): ServiceConfig | null {
  return servicesConfig[slug] ?? null
}

/** Build the related services list from relatedSlugs.
 *  Falls back to siteConfig service list for title/href if a config page isn't
 *  built yet — this lets relatedSlugs reference future services safely.
 */
export function resolveRelatedServices(cfg: ServiceConfig): RelatedService[] {
  type ServiceLink = { title: string; href: string }
  const legacyMap = Object.fromEntries(
    (siteConfig.serviceCategories as unknown as Array<{ services: ServiceLink[] }>)
      .flatMap((c) => c.services)
      .map((s) => [
        s.href
          .replace("/water-damage/", "")
          .replace("/fire-damage/", "")
          .replace("/mold-remediation/", "")
          .replace("/reconstruction/", ""),
        s,
      ])
  )

  return cfg.relatedSlugs.slice(0, 3).map((slug) => {
    const full = servicesConfig[slug]
    if (full) {
      return {
        slug,
        title: full.name,
        href: full.href,
        description: full.heroPainLine,
      }
    }
    const legacy = legacyMap[slug]
    return {
      slug,
      title: legacy?.title ?? slug,
      href: legacy?.href ?? `/water-damage/${slug}`,
      description:
        "Expert restoration service from S.W.A.T. Restoration — IICRC-trained, 24/7, insurance billing direct.",
    }
  })
}

/** Generate JSON-LD Service schema for a service page */
export function servicePageSchema(cfg: ServiceConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: cfg.name,
    url: `${base}${cfg.href}`,
    provider: {
      "@type": ["LocalBusiness", "GeneralContractor"],
      name: siteConfig.name,
      url: base,
      telephone: siteConfig.phone.primary,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.locations[0].address,
        addressLocality: siteConfig.locations[0].city,
        addressRegion: siteConfig.locations[0].state,
        postalCode: siteConfig.locations[0].zip,
        addressCountry: "US",
      },
    },
    areaServed: siteConfig.serviceArea.map((city) => ({
      "@type": "City",
      name: city.name,
    })),
    description: cfg.metaDescription,
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: siteConfig.phone.primary,
        contactType: "customer service",
        availableLanguage: "English",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      },
    },
  }
}

/** Generate FAQPage JSON-LD from service config faqs */
export function serviceFaqSchema(cfg: ServiceConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cfg.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/** Generate BreadcrumbList JSON-LD for a service page. Uses categoryParent()
 *  so the intermediate crumb matches the actual URL category. */
export function serviceBreadcrumbSchema(cfg: ServiceConfig) {
  const parent = categoryParent(cfg.href)

  const items: Array<Record<string, unknown>> = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: base,
    },
  ]

  if (parent) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: parent.name,
      item: `${base}${parent.href}`,
    })
  }

  items.push({
    "@type": "ListItem",
    position: parent ? 3 : 2,
    name: cfg.name,
    item: `${base}${cfg.href}`,
  })

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  }
}
