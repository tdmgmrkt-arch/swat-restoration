import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { siteConfig } from "@/lib/site-config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Build an absolute canonical URL with a guaranteed trailing slash.
 *
 * Matches the legacy swat-restoration.com URL pattern and Next.js's
 * `trailingSlash: true` config so HTML canonicals, sitemap entries, schema
 * URLs, and the actual served path are all identical — no canonical-then-308
 * hops, no re-canonicalization signals to Google.
 *
 * Pass the path WITHOUT the origin (e.g. "/contact-us" or "/post/foo").
 * Pass "" or "/" for the homepage. Do NOT use this for asset URLs (images,
 * logos) — those shouldn't have a trailing slash.
 */
export function canonicalUrl(path: string = ""): string {
  if (path === "" || path === "/") return `${siteConfig.url}/`
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`
  return `${siteConfig.url}${withLeadingSlash}${
    withLeadingSlash.endsWith("/") ? "" : "/"
  }`
}
