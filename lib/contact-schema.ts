import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid US phone number")
    .regex(/^[\d\s\-().+]+$/, "Enter a valid US phone number"),
  email: z.string().email("Enter a valid email address"),
  city: z.string().optional(),
  service_type: z.enum(
    [
      "Emergency Water Extraction",
      "Water Damage Restoration",
      "Fire & Smoke Damage",
      "Mold Remediation",
      "Structural Drying",
      "Reconstruction & Roofing",
      "Insurance Claim Assistance",
      "Other",
    ],
    { error: "Select the service you need" }
  ),
  urgency: z.enum(
    [
      "Emergency — now (24/7)",
      "Today if possible",
      "This week",
      "Just planning",
    ],
    { error: "Select your urgency" }
  ),
  preferred_contact: z.enum(["Phone", "Email", "Text"], {
    error: "Select a preferred contact method",
  }),
  message: z.string().optional(),
  website: z.string().optional(), // honeypot
})

export type ContactFormValues = z.infer<typeof contactSchema>

export const SERVICE_TYPE_OPTIONS = [
  "Emergency Water Extraction",
  "Water Damage Restoration",
  "Fire & Smoke Damage",
  "Mold Remediation",
  "Structural Drying",
  "Reconstruction & Roofing",
  "Insurance Claim Assistance",
  "Other",
] as const

export const URGENCY_OPTIONS = [
  "Emergency — now (24/7)",
  "Today if possible",
  "This week",
  "Just planning",
] as const

export const PREFERRED_CONTACT_OPTIONS = ["Phone", "Email", "Text"] as const

/**
 * Map a service-page href (e.g. "/water-damage/sewage-cleanup") to one of the
 * eight SERVICE_TYPE_OPTIONS used by the contact form. Returns undefined if the
 * href doesn't match a known category — caller falls back to leaving the
 * dropdown unselected.
 *
 * Used by service-page CTAs to deep-link into /contact-us with the service
 * pre-selected, so visitors don't have to re-state what they came in for.
 */
export function hrefToContactServiceType(
  href: string
): (typeof SERVICE_TYPE_OPTIONS)[number] | undefined {
  // Specific overrides for high-intent slugs that don't follow category mapping
  if (
    href === "/water-damage/water-extraction" ||
    href === "/water-damage/water-removal"
  )
    return "Emergency Water Extraction"
  if (href === "/water-damage/structural-drying") return "Structural Drying"
  if (href === "/reconstruction/insurance-claims")
    return "Insurance Claim Assistance"

  // Category-level catch-alls
  if (href.startsWith("/water-damage")) return "Water Damage Restoration"
  if (href.startsWith("/fire-damage")) return "Fire & Smoke Damage"
  if (href.startsWith("/mold-remediation")) return "Mold Remediation"
  if (href.startsWith("/reconstruction")) return "Reconstruction & Roofing"

  return undefined
}
