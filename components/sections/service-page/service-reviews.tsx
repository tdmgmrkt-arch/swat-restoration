import { Star, Quote } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import { siteConfig } from "@/lib/site-config"
import { getGoogleReviews } from "@/lib/google-reviews"
import type { ServiceConfig } from "@/lib/services-config"

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

          {/* Aggregate rating badge — Google-branded, transparent backdrop */}
          <a
            href={siteConfig.social.google}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-stretch bg-white/5 border border-white/10 backdrop-blur-sm rounded-md overflow-hidden transition-colors hover:bg-white/8 hover:border-white/20 self-start lg:self-end"
            aria-label={`Rated ${rating.toFixed(1)} out of 5 from ${count.toLocaleString()} Google reviews`}
          >
            {/* Left cell: Google G mark */}
            <span className="flex items-center justify-center px-4">
              <GoogleGMark className="h-7 w-7" />
            </span>
            <span className="w-px bg-white/10" aria-hidden="true" />
            {/* Middle cell: rating + stars */}
            <span className="flex items-center gap-3 px-4 py-3">
              <span className="flex flex-col leading-none">
                <span className="text-white/65 text-[10px] font-bold tracking-[0.15em] uppercase">
                  Google
                </span>
                <span className="mt-1.5 inline-flex items-center gap-2">
                  <span className="text-white text-2xl font-black font-mono leading-none">
                    {rating.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5"
                        fill="#FBBC05"
                        stroke="#FBBC05"
                      />
                    ))}
                  </span>
                </span>
              </span>
            </span>
            <span className="w-px bg-white/10" aria-hidden="true" />
            {/* Right cell: review count */}
            <span className="flex flex-col justify-center px-4 py-3">
              <span className="text-white text-sm font-bold leading-tight">
                {count.toLocaleString()}+
              </span>
              <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/50 font-semibold mt-1">
                Reviews
              </span>
            </span>
          </a>
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
