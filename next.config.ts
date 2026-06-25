import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Match the legacy swat-restoration.com URL pattern (trailing slashes) so
  // Google's existing index aligns 1:1 with the new site after DNS cutover —
  // no re-canonicalization, no ranking wobble.
  trailingSlash: true,

  // Permanent 301 redirects from legacy URLs to the new structure.
  // The /post/[slug]/ URLs from the legacy blog are NOT redirected — the new
  // site mirrors that path natively (app/post/[slug]/page.tsx) so all
  // existing post link equity transfers without a redirect hop.
  async redirects() {
    return [
      // Static page renames
      { source: "/about", destination: "/about-us/", permanent: true },
      { source: "/contact", destination: "/contact-us/", permanent: true },
      {
        source: "/terms-and-conditions",
        destination: "/terms-of-service/",
        permanent: true,
      },

      // Legacy category hubs → new clean hub URLs
      {
        source: "/water-removal-damage-restoration",
        destination: "/water-damage/",
        permanent: true,
      },
      {
        source: "/fire-smoke-damage-restoration",
        destination: "/fire-damage/",
        permanent: true,
      },

      // Legacy top-level pages that moved under /reconstruction/
      {
        source: "/pack-out-cleaning",
        destination: "/reconstruction/pack-out-cleaning/",
        permanent: true,
      },
      {
        source: "/roofing",
        destination: "/reconstruction/roofing/",
        permanent: true,
      },

      // /schedule is referenced by CTAs but no /schedule route exists —
      // route to the actual scheduling surface (the contact form).
      { source: "/schedule", destination: "/contact-us/", permanent: true },

      // /blog/page/1/ is duplicate content of /blog/ — collapse to the
      // canonical hub URL so Google never indexes the alias.
      { source: "/blog/page/1", destination: "/blog/", permanent: true },
    ]
  },
}

export default nextConfig
