/**
 * Blog post type system.
 *
 * Each post lives in its own module under `lib/blog/` and exports a typed
 * `BlogPost` object. Bodies are structured as an array of `ContentBlock`s
 * rather than raw HTML/markdown so the renderer can apply consistent
 * tactical styling (red dot bullets, tactical headings, accent rules) and
 * so internal/outbound links remain typed and traceable.
 *
 * Adding a new post: create `lib/blog/<slug>.ts`, register it in
 * `lib/blog-posts-config.ts`. The dynamic route at `app/post/[slug]`
 * resolves any registered slug whose `published` flag is `true`.
 *
 * Stubs with `published: false` are imported and registered but excluded
 * from listings, sitemap, and static-param generation — flip the flag to
 * publish once the body content is filled in.
 */

/** Paragraph of body prose. Plain text or inline-link tokens. */
export type ParagraphBlock = {
  type: "paragraph"
  /** String or array of inline tokens. Use array for mid-paragraph links. */
  content: string | InlineToken[]
}

/** H2 section heading inside the article body. */
export type HeadingBlock = {
  type: "heading"
  text: string
  /** Optional anchor — defaults to slugified text */
  id?: string
}

/** Bulleted list, red-dot styling matched to service pages. */
export type ListBlock = {
  type: "list"
  items: string[]
  /** Optional intro sentence rendered above the list */
  intro?: string
}

/** Internal-link callout — a "see also" service page reference rendered
 *  as a styled inline panel inside the article body. */
export type CalloutBlock = {
  type: "callout"
  /** Body copy that appears in the callout */
  text: string
  /** Linked text — usually a service page title */
  linkText: string
  /** Internal path, e.g. "/water-damage/water-extraction" */
  href: string
}

/** Outbound resource link (EPA, IICRC, FEMA, etc.) — flagged so we can render
 *  with a distinct visual treatment + rel="nofollow noopener". */
export type OutboundLinkBlock = {
  type: "outbound"
  text: string
  linkText: string
  href: string
}

/** Discriminated union of all content block shapes. */
export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | CalloutBlock
  | OutboundLinkBlock

/** Inline token for paragraphs that need mid-text links. */
export type InlineToken =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string; outbound?: boolean }
  | { type: "strong"; text: string }

/** One blog post. */
export type BlogPost = {
  /** URL slug — matches legacy site URLs to preserve link equity */
  slug: string
  /** Page title (H1) — also drives meta title */
  title: string
  /** ~155-char meta description */
  metaDescription: string
  /** Short editorial excerpt for listing cards (~30–40 words) */
  excerpt: string
  /** Publish date, ISO 8601 (YYYY-MM-DD) */
  date: string
  /** Last-modified date for sitemap/schema. Defaults to `date` if omitted. */
  lastUpdated?: string
  /** Author display name — defaults to Dillon Patterson via renderer */
  author?: string
  /** Topical category for filtering + chip display */
  category: BlogCategory
  /** Hero image path under /public, e.g. "/blog/water-extraction.webp" */
  heroImage: string
  /** Alt text for hero — should be descriptive, not keyword-stuffed */
  heroAlt: string
  /** Primary city the post addresses — used in schema + breadcrumb context */
  city: "Aledo" | "Fort Worth"
  /** Approx read time in minutes (rough — ~250 wpm) */
  readMinutes: number
  /** Body content as structured blocks */
  body: readonly ContentBlock[]
  /**
   * Whether the post is live. When `false`, the post is excluded from listings,
   * sitemap, and `generateStaticParams` — the route 404s until flipped to true.
   * Stubs created from the legacy sitemap default to false so the URL slot is
   * reserved without thin-content pages indexing on launch.
   */
  published: boolean
  /**
   * Optional absolute canonical URL. When set, the post's <link rel="canonical">
   * points elsewhere instead of `${siteConfig.url}/post/${slug}/`. Used to
   * resolve SXO cannibalization where a blog post overlaps a service page's
   * transactional intent — concedes separate indexation in exchange for
   * consolidated ranking authority on the canonical target.
   */
  canonicalOverride?: string
}

export const BLOG_CATEGORIES = [
  "Water Damage",
  "Fire Damage",
  "Mold Remediation",
  "Storm & Roofing",
  "Insurance Claims",
  "About SWAT",
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]
