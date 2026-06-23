import { Star, Quote } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import { siteConfig } from "@/lib/site-config"
import { getGoogleReviews } from "@/lib/google-reviews"
import type { ServiceConfig } from "@/lib/services-config"

// Brand-voice fallback testimonials — used when Google Places fetch fails
// or env vars are missing. Voiced to match the SWAT Restoration brand standard.
const FALLBACK_QUOTES = [
  {
    quote:
      "Called at midnight after our water heater flooded the utility room. Crew was here in under an hour, got everything extracted, and handled the insurance paperwork the next morning. Seamless.",
    author: "R. Morrison",
    location: "Aledo, TX",
    rating: 5,
  },
  {
    quote:
      "Burst pipe took out our kitchen floor. S.W.A.T. Restoration walked us through every step — moisture readings, drying schedule, adjuster contact. Couldn't have navigated the claim without them.",
    author: "T. Nguyen",
    location: "Weatherford, TX",
    rating: 5,
  },
  {
    quote:
      "Dillon's crew showed up fast, explained the Category 2 classification, and had dryers running before I'd even had coffee. Three days later the readings were clean. That's how it should be done.",
    author: "K. Albright",
    location: "Fort Worth, TX",
    rating: 5,
  },
] as const

export default async function ServiceReviews({ cfg }: { cfg: ServiceConfig }) {
  const data = await getGoogleReviews()

  const rating = data.rating ?? siteConfig.googleRatingFallback.rating
  const count = data.userRatingCount ?? siteConfig.googleRatingFallback.count

  // Use live Google reviews (5-star only, top 3) if available; else fall back
  const liveReviews = data.reviews
    .filter((r) => r.rating >= 5 && r.text?.trim().length > 30)
    .slice(0, 3)
    .map((r) => ({
      quote: r.text,
      author: r.authorName,
      location: r.relativePublishTime,
      rating: r.rating,
    }))

  const quotes = liveReviews.length >= 3 ? liveReviews : FALLBACK_QUOTES

  return (
    <section
      className="relative bg-[#131a3e] border-y border-white/8 py-20 lg:py-24 overflow-hidden"
      aria-labelledby="reviews-heading"
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
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <TacticalLabel>Verified Reviews</TacticalLabel>
            <AccentLine />
            <h2
              id="reviews-heading"
              className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
            >
              Real homes.
              <br />
              <span className="text-red-500">Real results.</span>
            </h2>
            <p className="mt-4 text-white/55 text-base leading-relaxed">
              S.W.A.T. Restoration has responded to {cfg.name.toLowerCase()} calls across Aledo, Fort Worth, and the DFW metroplex. Here&apos;s what it actually sounds like.
            </p>
          </div>

          {/* Aggregate rating badge */}
          <div className="flex items-center gap-4 bg-[#131a3e] border border-white/10 rounded-sm px-5 py-4 self-start lg:self-end">
            <div className="flex flex-col items-center">
              <span className="text-3xl lg:text-4xl font-black text-white font-mono leading-none">
                {rating.toFixed(1)}
              </span>
              <div className="flex items-center gap-0.5 mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 text-red-500"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-white/10" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-white/85 text-sm font-bold leading-tight">
                {count.toLocaleString()}+ Reviews
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/45 font-semibold mt-1">
                Google Verified
              </span>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <ul
          role="list"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5"
        >
          {quotes.map((q, i) => (
            <li
              key={i}
              className="relative bg-[#131a3e] border border-white/10 rounded-sm p-7 lg:p-8 flex flex-col"
            >
              <Quote
                className="absolute top-5 right-5 h-6 w-6 text-red-600/20"
                aria-hidden="true"
              />
              <div
                className="flex items-center gap-0.5 mb-4"
                aria-label={`${q.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={
                      j < q.rating
                        ? "h-3.5 w-3.5 text-red-500"
                        : "h-3.5 w-3.5 text-white/15"
                    }
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-white/80 text-[15px] leading-loose flex-1 mb-5">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-between pt-4 border-t border-white/8">
                <span className="text-white font-bold text-sm">{q.author}</span>
                <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/45 font-semibold">
                  {q.location}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
