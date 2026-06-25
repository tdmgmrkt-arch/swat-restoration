import { siteConfig } from "./site-config"
import { canonicalUrl } from "./utils"

// =============================================================================
// SHARED CONSTANTS
// =============================================================================

/**
 * Office hours — when the phone is answered by a live team member.
 * Mon–Fri 7 AM – 5 PM · Sat 8 AM – 1 PM · Sun closed (office).
 * After-hours calls roll to the 24/7 emergency dispatch crew.
 */
const OFFICE_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "17:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "08:00",
    closes: "13:00",
  },
] as const

/** 24/7 emergency dispatch contactPoint */
const EMERGENCY_CONTACT_POINT = {
  "@type": "ContactPoint",
  telephone: siteConfig.phone.primary,
  contactType: "Emergency",
  areaServed: "TX",
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
} as const

// =============================================================================
// AREAS SERVED INDEX PAGE SCHEMA
// /areas-served
// =============================================================================

/** Service JSON-LD for /areas-served — lists all 49 cities as areaServed */
export function areasServedPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Restoration Services — North Texas Coverage",
    url: canonicalUrl("/areas-served"),
    provider: {
      "@type": ["LocalBusiness", "GeneralContractor"],
      "@id": `${siteConfig.url}/#restoration-aledo`,
      name: siteConfig.name,
      url: canonicalUrl("/"),
      telephone: siteConfig.phone.primary,
    },
    areaServed: siteConfig.serviceArea.map((city) => ({
      "@type": "Place",
      name: `${city.name}, TX`,
    })),
    description:
      "S.W.A.T. Restoration provides 24/7 emergency water damage restoration, fire & smoke damage restoration, mold remediation, and reconstruction across 49 communities in Tarrant, Parker, Denton, and Johnson counties.",
  }
}

/** BreadcrumbList for /areas-served */
export function areasServedBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas Served",
        item: canonicalUrl("/areas-served"),
      },
    ],
  }
}

/** FAQPage JSON-LD for /areas-served hub */
export function areasServedFaqSchema(
  faqs: { question: string; answer: string }[]
) {
  if (!faqs || faqs.length === 0) return null
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// =============================================================================
// CITY HUB PAGE SCHEMA
// /areas-served/[slug-tx]/
// =============================================================================

/**
 * Minimal shape the city-hub page must supply.
 */
export interface CitySchemaConfig {
  slug: string
  name: string
  county: string
  zipCodes: string[]
  geoCenter: { lat: number; lng: number }
  serviceRadiusMiles: number
  /** Restoration is single-hub — always "aledo" */
  closestHubSlug: "aledo"
  hasGbpListing: boolean
  faqs: { question: string; answer: string }[]
}

// Internal hub data — single Aledo hub for restoration
const HUB_DATA = {
  aledo: {
    id: `${siteConfig.url}/#restoration-aledo`,
    telephone: siteConfig.phone.aledo,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.locations[0].address,
      addressLocality: siteConfig.locations[0].city,
      addressRegion: siteConfig.locations[0].state,
      postalCode: siteConfig.locations[0].zip,
      addressCountry: "US",
    },
    placeId: siteConfig.locations[0].placeId,
  },
} as const

/**
 * Primary schema for /areas-served/[slug-tx]/.
 *
 * ENTITY STRATEGY — two tiers (mirrors swat-plumbing pattern):
 *
 * Tier 1 — GBP-backed city (Aledo — once verified):
 *   Full [LocalBusiness, GeneralContractor] block with @id matching homepage entity.
 *
 * Tier 2 — 48 non-GBP cities (SAB pattern):
 *   Service with GeoCircle areaServed, provider references hub by @id only.
 *   No address.addressLocality set to the served city.
 */
export function cityPageSchema(city: CitySchemaConfig) {
  const pageUrl = canonicalUrl(`/areas-served/${city.slug}`)
  const hub = HUB_DATA[city.closestHubSlug]

  // ── Tier 1: GBP-backed location page ──────────────────────────────────────
  if (city.hasGbpListing) {
    // Only emit AggregateRating when a verified Place ID is on file. Until then
    // we never publish a rating to Google — avoids unverifiable-rating risk.
    const rating = siteConfig.locations[0].placeId
      ? siteConfig.googleRatingFallback
      : null

    return {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "GeneralContractor"],
      "@id": hub.id,
      name: siteConfig.name,
      url: canonicalUrl("/"),
      mainEntityOfPage: pageUrl,
      telephone: hub.telephone,
      email: siteConfig.email,
      address: hub.address,
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.geoCenter.lat,
        longitude: city.geoCenter.lng,
      },
      openingHoursSpecification: OFFICE_HOURS,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: hub.telephone,
          contactType: "customer service",
          areaServed: "TX",
          availableLanguage: "English",
          hoursAvailable: OFFICE_HOURS,
        },
        EMERGENCY_CONTACT_POINT,
      ],
      priceRange: "$$",
      ...(rating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating.rating,
          reviewCount: rating.count,
          bestRating: 5,
          worstRating: 1,
        },
      }),
      areaServed: {
        "@type": "City",
        name: city.name,
        containedInPlace: { "@type": "State", name: "Texas" },
      },
      hasOfferCatalog: _offerCatalog(),
    }
  }

  // ── Tier 2: SAB city — no physical address claim ───────────────────────────
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Restoration Services in ${city.name}, TX`,
    url: pageUrl,
    description: `S.W.A.T. Restoration provides 24/7 water damage restoration, fire & smoke damage restoration, mold remediation, and reconstruction in ${city.name}, ${city.county}, TX. Family-owned, IICRC-certified.`,
    provider: {
      "@type": ["LocalBusiness", "GeneralContractor"],
      "@id": hub.id,
      name: siteConfig.name,
      url: canonicalUrl("/"),
      telephone: hub.telephone,
      openingHoursSpecification: OFFICE_HOURS,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: hub.telephone,
          contactType: "customer service",
          areaServed: "TX",
          availableLanguage: "English",
          hoursAvailable: OFFICE_HOURS,
        },
        EMERGENCY_CONTACT_POINT,
      ],
      hasOfferCatalog: _offerCatalog(),
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: city.geoCenter.lat,
        longitude: city.geoCenter.lng,
      },
      geoRadius: `${city.serviceRadiusMiles * 1609.34}`, // metres — schema.org expects string
    },
  }
}

/** FAQPage schema for /areas-served/[slug-tx]/ */
export function cityFaqSchema(city: CitySchemaConfig) {
  if (!city.faqs || city.faqs.length === 0) return null

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * BreadcrumbList for /areas-served/[slug-tx]/.
 * Three-level trail: Home → Areas Served → [City], TX.
 */
export function cityBreadcrumbSchema(city: CitySchemaConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Areas Served",
        item: canonicalUrl("/areas-served"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${city.name}, TX`,
        item: canonicalUrl(`/areas-served/${city.slug}`),
      },
    ],
  }
}

/** Shared OfferCatalog for city pages — all restoration services */
function _offerCatalog() {
  type ServiceLink = { title: string; href: string }
  const allServices = (
    siteConfig.serviceCategories as unknown as Array<{ services: ServiceLink[] }>
  ).flatMap((c) => c.services)
  return {
    "@type": "OfferCatalog",
    name: "Restoration Services",
    itemListElement: allServices.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        url: canonicalUrl(s.href),
      },
    })),
  }
}

// =============================================================================
// EXISTING SCHEMAS (contact, homepage LocalBusiness)
// =============================================================================

/** ContactPage JSON-LD for /contact-us */
export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact S.W.A.T. Restoration",
    url: canonicalUrl("/contact-us"),
    mainEntity: {
      "@type": ["LocalBusiness", "GeneralContractor"],
      name: siteConfig.name,
      url: canonicalUrl("/"),
      telephone: siteConfig.phone.primary,
      email: siteConfig.email,
      description: siteConfig.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.locations[0].address,
        addressLocality: siteConfig.locations[0].city,
        addressRegion: siteConfig.locations[0].state,
        postalCode: siteConfig.locations[0].zip,
        addressCountry: "US",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: siteConfig.phone.primary,
          contactType: "customer service",
          areaServed: "TX",
          availableLanguage: "English",
          hoursAvailable: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "07:00",
              closes: "17:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday"],
              opens: "08:00",
              closes: "13:00",
            },
          ],
        },
      ],
    },
  }
}

/** BreadcrumbList for /contact-us */
export function contactBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: canonicalUrl("/contact-us"),
      },
    ],
  }
}

/** LocalBusiness JSON-LD schema for the restoration homepage and location pages */
export function plumberSchema() {
  type ServiceLink = { title: string; href: string }
  const allServices: ServiceLink[] = siteConfig.serviceCategories.flatMap(
    (c) => [...c.services] as ServiceLink[]
  )

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name: siteConfig.name,
    url: canonicalUrl("/"),
    telephone: siteConfig.phone.primary,
    email: siteConfig.email,
    description: siteConfig.description,
    areaServed: siteConfig.serviceArea.map((city) => ({
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: "Texas",
      },
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.locations[0].address,
      addressLocality: siteConfig.locations[0].city,
      addressRegion: siteConfig.locations[0].state,
      postalCode: siteConfig.locations[0].zip,
      addressCountry: "US",
    },
    openingHoursSpecification: {
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
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Restoration Services",
      itemListElement: allServices.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          url: canonicalUrl(s.href),
        },
      })),
    },
  }
}

// =============================================================================
// CATEGORY HUB PAGE SCHEMA
// /water-damage, /fire-damage, /mold-remediation, /reconstruction
// =============================================================================

/** Minimal shape a category hub page must supply to the helpers below. */
export interface HubSchemaConfig {
  /** Display name, e.g. "Water Damage Restoration" */
  name: string
  /** Absolute canonical URL of the hub page */
  url: string
  /** Short marketing description used by the Service schema */
  description: string
}

/**
 * Service JSON-LD for a category hub page. Provider is the LocalBusiness +
 * GeneralContractor entity. areaServed lists the full DFW footprint.
 * availableChannel emits a 24/7 ContactPoint for emergency dispatch.
 */
export function hubServiceSchema(cfg: HubSchemaConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: cfg.name,
    url: cfg.url,
    provider: {
      "@type": ["LocalBusiness", "GeneralContractor"],
      name: siteConfig.name,
      url: canonicalUrl("/"),
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
    description: cfg.description,
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: EMERGENCY_CONTACT_POINT,
    },
  }
}

/** BreadcrumbList for a category hub page (Home → Hub). */
export function hubBreadcrumbSchema(cfg: Pick<HubSchemaConfig, "name" | "url">) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cfg.name,
        item: cfg.url,
      },
    ],
  }
}

/** FAQPage JSON-LD built from a hub's FAQ array. */
export function hubFaqSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

// =============================================================================
// BLOG SCHEMA
// /blog/ hub + /post/[slug]/ individual articles
// Legacy URL structure is preserved — posts live at /post/, not /blog/[slug]/.
// =============================================================================

/** Blog / CollectionPage JSON-LD for /blog/ */
export function blogPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Field Notes — S.W.A.T. Restoration",
    url: canonicalUrl("/blog"),
    description:
      "Restoration field notes from IICRC-trained crews in Aledo and Fort Worth — water damage, fire & smoke cleanup, mold prevention, and insurance claim guidance.",
    publisher: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: canonicalUrl("/"),
    },
  }
}

/** BreadcrumbList for /blog/ */
export function blogBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: canonicalUrl("/blog"),
      },
    ],
  }
}

/**
 * BlogPosting JSON-LD for individual /post/[slug]/ pages.
 * Author reference points at the about-us anchor so authorship inherits the
 * restoration company's credentials → E-E-A-T signal for AI Overviews.
 */
export function blogPostingSchema(post: {
  slug: string
  title: string
  metaDescription: string
  date: string
  lastUpdated?: string
  heroImage: string
  city: "Aledo" | "Fort Worth"
}) {
  const url = canonicalUrl(`/post/${post.slug}`)
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: post.title,
    description: post.metaDescription,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    dateModified: post.lastUpdated ?? post.date,
    image: `${siteConfig.url}${post.heroImage}`,
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}/about-us#dillon-patterson`,
      name: "Dillon Patterson",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: canonicalUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/swat-restoration-logo.svg`,
      },
    },
    about: {
      "@type": "Place",
      name: `${post.city}, TX`,
    },
  }
}

/** BreadcrumbList for /post/[slug]/ — Home → Blog → {Post Title}. */
export function blogPostBreadcrumbSchema(post: { slug: string; title: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: canonicalUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl(`/post/${post.slug}`),
      },
    ],
  }
}
