// Shared types for per-service config files in this directory.
// Centralized here so each service file only imports a type (no circular dep
// risk with the lib/services-config.ts aggregator).

export interface ProcessStep {
  number: string
  label: string
  title: string
  description: string
}

export interface WhySwatPillar {
  title: string
  bullets: string[]
  primary?: boolean
}

export interface Faq {
  question: string
  answer: string
}

export interface RelatedService {
  slug: string
  title: string
  href: string
  description: string
}

export interface ServiceConfig {
  slug: string
  /** Canonical URL path — e.g. /water-damage/water-extraction */
  href: string
  /** Page H1 — can include a line-break hint using " // " which the template splits */
  h1: string
  /** Short service name used in breadcrumbs and related cards */
  name: string
  metaTitle: string
  metaDescription: string
  /** One-line pain-point shown in the hero under the H1 */
  heroPainLine: string
  /** Trust strip items in the hero */
  trustStrip: string[]
  problemIntro: string
  problemSigns: string[]
  processSteps: ProcessStep[]
  scopeBullets: string[]
  whySwatPillars: [WhySwatPillar, WhySwatPillar, WhySwatPillar]
  faqs: Faq[]
  /** Slugs of 2–3 related services */
  relatedSlugs: string[]
  /** Optional hero image in /public/ */
  heroImage?: string
  /** ISO date string — rendered as "Last Updated: Month YYYY" */
  lastUpdated: string
}
