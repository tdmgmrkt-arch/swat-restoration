import { Star, Quote } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { getGoogleReviews } from "@/lib/google-reviews"

/* Official Google "G" mark — brand colors */
function GoogleGMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

/**
 * Curated featured-review fallback — used per hub when no substantive
 * live 5-star review (≥80 chars) is returned by the Places API. We pick
 * a different curated quote per category so a visitor browsing multiple
 * hubs doesn't see the same testimonial twice.
 */
const CURATED_BY_CATEGORY: Record<
  HubCategorySlug,
  { quote: string; author: string; location: string }
> = {
  "water-damage": {
    quote:
      "Pipe burst overnight and flooded most of the first floor. They had a truck on site in under an hour, extracting water and setting up dehumidifiers. Daily moisture logs, direct billing to my insurance — everything handled.",
    author: "Marcus T.",
    location: "Aledo, TX",
  },
  "fire-damage": {
    quote:
      "Kitchen fire left smoke and soot in every room. The team packed out our contents, deodorized everything, and reconstructed the damaged areas. We honestly couldn't tell anything had happened by the time they finished.",
    author: "Dale K.",
    location: "Benbrook, TX",
  },
  "mold-remediation": {
    quote:
      "Suspected mold from a slow leak behind the shower wall. They inspected, contained the area properly, and remediated everything to spec. Tested the air quality before signing off — gave us complete peace of mind.",
    author: "S. Nguyen",
    location: "Mansfield, TX",
  },
  reconstruction: {
    quote:
      "Storm took out a section of our roof and the ceiling below. Dillon's crew coordinated the tarp, the insurance claim, and the full rebuild. Same team start to finish — that made the whole process so much easier.",
    author: "K. Williams",
    location: "Weatherford, TX",
  },
}

export type HubCategorySlug =
  | "water-damage"
  | "fire-damage"
  | "mold-remediation"
  | "reconstruction"

type Props = {
  /** Category name shown in the heading, e.g. "Water Damage Restoration". */
  categoryName: string
  /** Category slug — selects the curated fallback quote. */
  categorySlug: HubCategorySlug
}

/**
 * Compact hub-page reviews strip — Google aggregate badge + one featured
 * quote. Lighter touch than the 3-card service/city version so visitors
 * still click through to a service page where the deeper reviews live.
 */
export default async function HubReviews({
  categoryName,
  categorySlug,
}: Props) {
  const data = await getGoogleReviews()
  const rating = data.rating ?? siteConfig.googleRatingFallback.rating
  const count = data.userRatingCount ?? siteConfig.googleRatingFallback.count

  // Live featured: most recent 5-star review with substantial body.
  // Curated fallback per category if nothing live qualifies.
  const liveFeatured = data.reviews.find(
    (r) => r.rating >= 5 && r.text?.trim().length >= 80
  )

  const featured = liveFeatured
    ? {
        quote: liveFeatured.text.trim(),
        author: liveFeatured.authorName,
        location: liveFeatured.relativePublishTime || "via Google",
        isLive: true as const,
      }
    : { ...CURATED_BY_CATEGORY[categorySlug], isLive: false as const }

  return (
    <section
      className="relative bg-[#0c1230] border-y border-white/8 py-14 lg:py-20 overflow-hidden"
      aria-labelledby="hub-reviews-heading"
    >
      <div
        className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 inset-y-0 w-0.75 bg-linear-to-b from-transparent via-red-600 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section header */}
        <div className="flex items-end justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-400 font-bold">
                Verified Reviews
              </span>
              <span
                className="h-px w-8 bg-red-600/40"
                aria-hidden="true"
              />
            </div>
            <h2
              id="hub-reviews-heading"
              className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
            >
              What customers say about our
              <br />
              <span className="text-red-500">{categoryName}.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-5 lg:gap-7 items-stretch">
          {/* Aggregate badge — Google-branded, transparent */}
          <a
            href={siteConfig.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-stretch bg-white/5 border border-white/10 backdrop-blur-sm rounded-md overflow-hidden transition-colors hover:bg-white/8 hover:border-white/20 lg:min-w-[18rem]"
            aria-label={`Rated ${rating.toFixed(1)} out of 5 from ${count.toLocaleString()} Google reviews`}
          >
            <span className="flex items-center justify-center px-5">
              <GoogleGMark className="h-8 w-8" />
            </span>
            <span className="w-px bg-white/10" aria-hidden="true" />
            <span className="flex items-center px-5 py-4 flex-1">
              <span className="flex flex-col leading-none">
                <span className="text-white/65 text-[10px] font-bold tracking-[0.15em] uppercase">
                  Google
                </span>
                <span className="mt-2 inline-flex items-center gap-2">
                  <span className="text-white text-3xl font-black font-mono leading-none">
                    {rating.toFixed(1)}
                  </span>
                  <span
                    className="flex items-center gap-0.5"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill="#FBBC05"
                        stroke="#FBBC05"
                      />
                    ))}
                  </span>
                </span>
                <span className="text-white/55 text-xs font-medium tracking-wide mt-2">
                  {count.toLocaleString()}+ reviews
                </span>
              </span>
            </span>
          </a>

          {/* Featured quote */}
          <blockquote className="relative bg-[#1a2347] border border-white/10 rounded-sm p-6 lg:p-7 flex flex-col gap-4">
            <div
              className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600"
              aria-hidden="true"
            />
            <Quote
              className="absolute top-5 right-5 h-6 w-6 text-red-600/25"
              aria-hidden="true"
            />

            <div className="flex items-center gap-3 pl-2">
              <div
                className="flex items-center gap-0.5"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5"
                    fill="#FBBC05"
                    stroke="#FBBC05"
                  />
                ))}
              </div>
              {featured.isLive && (
                <>
                  <span
                    className="h-3 w-px bg-white/15"
                    aria-hidden="true"
                  />
                  <span
                    className="inline-flex items-center gap-1 text-[9px] font-mono tracking-[0.18em] uppercase text-white/45 font-semibold"
                    title="Pulled live from Google reviews via Places API"
                  >
                    <GoogleGMark className="h-3 w-3" />
                    Live
                  </span>
                </>
              )}
            </div>

            <p className="text-white/85 text-base lg:text-lg leading-relaxed flex-1 pl-2 line-clamp-5">
              &ldquo;{featured.quote}&rdquo;
            </p>

            <footer className="flex items-center gap-3 pl-2 pt-3 border-t border-white/8">
              <div
                className="w-9 h-9 rounded-sm bg-red-600/20 border border-red-600/25 flex items-center justify-center text-red-300 text-sm font-black font-mono shrink-0"
                aria-hidden="true"
              >
                {featured.author[0]}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">
                  {featured.author}
                </div>
                <div className="text-white/45 text-xs">
                  {featured.location}
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
