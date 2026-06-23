// Shared types for per-city config files in this directory.
// One file per city. Aggregated in lib/cities-config.ts.
// Restoration variant — single Aledo hub only.

export interface CityNeighborhood {
  name: string
  note?: string
}

export interface CityServiceHighlight {
  serviceSlug: string
  /** 12–20 words tying this service to the city's specific context */
  localAngle: string
}

export interface CityWhySwatPillar {
  title: string
  bullets: string[]
  primary?: boolean
}

export interface CityFaq {
  question: string
  answer: string
}

export interface NearbyCity {
  slug: string
  name: string
  driveMinutes: number
}

export interface CityConfig {
  slug: string
  name: string
  county: "Tarrant" | "Parker" | "Denton" | "Johnson" | "Wise"
  zipCodes: string[]
  geoCenter: { lat: number; lng: number }
  serviceRadiusMiles: number
  /** Restoration is single-hub — Aledo only */
  closestHubSlug: "aledo"
  hasGbpListing: boolean
  /** Restoration is single-hub — Aledo only */
  primaryHubSlug: "aledo"
  /** 0 for Aledo itself; drive time from the Aledo hub for all other cities */
  driveTimeMinutes: number
  href: string
  /** Page H1 — " // " signals a two-line split in the template */
  h1: string
  metaTitle: string
  metaDescription: string
  /** 25–40 word pain-hook shown in the hero beneath the H1 */
  heroPainLine: string
  /** ~50-word canonical entity sentence; use {{TBD}} for unknowns pending client input */
  entityAnchor: string
  /** 5 items, 2–4 words each — rendered as the hero trust strip */
  trustStrip: string[]
  /** Main local intro body — use \n\n for paragraph breaks; 200–300 words.
   *  Every sentence must inform the reader about local disaster-risk context,
   *  not deliver generic town trivia. */
  localIntro: string
  neighborhoods: CityNeighborhood[]
  /** 5 bullets, 12–22 words each — common restoration issues in this city */
  commonIssues: string[]
  /** Exactly 8 service highlight objects — restoration service slugs */
  serviceHighlights: [
    CityServiceHighlight,
    CityServiceHighlight,
    CityServiceHighlight,
    CityServiceHighlight,
    CityServiceHighlight,
    CityServiceHighlight,
    CityServiceHighlight,
    CityServiceHighlight,
  ]
  whySwatPillars: [
    CityWhySwatPillar,
    CityWhySwatPillar,
    CityWhySwatPillar,
  ]
  faqs: CityFaq[]
  nearbyCities: NearbyCity[]
  /** ISO date string — rendered as "Last Updated: Month YYYY" */
  lastUpdated: string
}
