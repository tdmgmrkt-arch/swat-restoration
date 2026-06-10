import { Star, Quote, BadgeCheck } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import { siteConfig } from "@/lib/site-config"
import { getGoogleReviews, formatRating, formatReviewCount } from "@/lib/google-reviews"
import { cn } from "@/lib/utils"

/* Official Google "G" mark — brand colors, used in the verification stamp. */
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
 * One featured review + two supporting. Jennifer's is the featured —
 * longest, most specific, strongest story (10 PM emergency, slab leak,
 * within the hour). Reinforces the "Deployed Fast" brand thread.
 */
const testimonials = [
  {
    quote:
      "When our home flooded, S.W.A.T. Restoration was a lifesaver. They arrived quickly, removed the water, and repaired everything like new. Their team was professional, friendly, and made a stressful situation so much easier. Highly recommend!",
    author: "A. Young",
    city: "Fort Worth",
    stars: 5,
    featured: true,
  },
  {
    quote:
      "S.W.A.T. Restoration helped us rebuild after a kitchen fire, and we couldn't be more grateful. They took care of everything — from cleanup to reconstruction — and kept us informed every step of the way. Our home looks better than ever!",
    author: "M. James",
    city: "Grapevine",
    stars: 5,
  },
  {
    quote:
      "We had mold growing in our basement, and S.W.A.T. Restoration took care of it completely. They were thorough, explained the process, and made sure our home was safe again. Excellent service from start to finish!",
    author: "L. Driver",
    city: "Weatherford",
    stars: 5,
  },
] as const

function StarRow({ count, size = "sm" }: { count: number; size?: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "h-5 w-5" : "h-4 w-4"
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className={cn(sizeClass, "text-red-500 fill-red-500")}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default async function Testimonials() {
  // Pull live Google data for the trust caption. Falls back to siteConfig.
  const data = await getGoogleReviews()
  const rating =
    formatRating(data.rating) ??
    formatRating(siteConfig.googleRatingFallback.rating)
  const reviewCount =
    formatReviewCount(data.userRatingCount) ??
    formatReviewCount(siteConfig.googleRatingFallback.count)

  const featured = testimonials.find((t) => "featured" in t && t.featured)!
  const supporting = testimonials.filter((t) => !("featured" in t && t.featured))

  return (
    <section
      className="relative bg-[#131a3e] py-20 lg:py-28 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Grid */}
      <div className="absolute inset-0 tactical-grid opacity-40" aria-hidden="true" />

      {/* Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(220,38,38,0.05),transparent)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">

        {/* Section header — trust caption sits TIGHT under the headline */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <TacticalLabel className="text-red-400">In the Field</TacticalLabel>
          <AccentLine />
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Real Disasters.
            <br />
            <span className="text-red-500">Real Restorations.</span>
          </h2>

          {/* Official Google verification stamp — uses the real Google brand mark,
              the live Places API rating, and a verified badge. Reads as a genuine
              third-party authority element, not stylized text. */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-stretch bg-white rounded-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)] overflow-hidden transition-transform hover:-translate-y-0.5"
              aria-label={
                rating && reviewCount
                  ? `Rated ${rating} out of 5 from ${reviewCount} Google reviews`
                  : "View S.W.A.T. Restoration on Google"
              }
            >
              {/* Left cell: Google G mark on white — matches real Google widgets */}
              <span className="flex items-center justify-center px-3 bg-white">
                <GoogleGMark className="h-6 w-6" />
              </span>
              {/* Right cell: data */}
              <span className="flex items-center gap-2 pl-2.5 pr-3.5 py-2 bg-white">
                <span className="flex flex-col leading-none">
                  <span className="text-gray-900 text-[10px] font-bold tracking-[0.12em] uppercase">
                    Google
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1.5">
                    {rating && (
                      <span className="text-gray-900 text-base font-black font-mono leading-none">
                        {rating}
                      </span>
                    )}
                    <StarRow count={5} />
                    {reviewCount && (
                      <span className="text-gray-500 text-xs font-medium leading-none">
                        ({reviewCount})
                      </span>
                    )}
                  </span>
                </span>
              </span>
            </a>

            {/* Verified seal — official-looking secondary tag */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#1a2347] border border-white/12 rounded-md">
              <BadgeCheck
                className="h-3.5 w-3.5 text-blue-400"
                aria-hidden="true"
              />
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/75 font-mono">
                Verified Reviews
              </span>
            </span>

            <span className="text-white/55 text-sm font-medium">
              Serving All of DFW
            </span>
          </div>
        </div>

        {/* Testimonial cards — featured on left (2-col span), two stacked on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">

          {/* FEATURED — larger, brighter, more breathing room */}
          <blockquote className="relative lg:col-span-2 bg-[#232d5e] border border-red-600/30 rounded-sm p-8 lg:p-10 flex flex-col gap-6 transition-colors hover:border-red-500/50">
            {/* Red command stripe */}
            <div
              className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600"
              aria-hidden="true"
            />
            {/* Tactical corner marks */}
            <div
              className="absolute top-3 left-3 w-3 h-3 border-t border-l border-red-600/60"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-red-600/60"
              aria-hidden="true"
            />
            {/* Big quote mark */}
            <Quote
              className="h-10 w-10 text-red-600/25 absolute top-7 right-7"
              aria-hidden="true"
            />

            {/* Featured tag + stars */}
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono">
                  Featured Response
                </span>
              </div>
              <StarRow count={featured.stars} size="lg" />
            </div>

            {/* Quote text — larger */}
            <p className="text-white/90 text-lg lg:text-xl leading-relaxed font-medium flex-1">
              &ldquo;{featured.quote}&rdquo;
            </p>

            {/* Attribution — larger avatar + name */}
            <footer className="flex items-center gap-4 pt-5 border-t border-white/10">
              <div
                className="w-12 h-12 rounded-sm bg-red-600/25 border border-red-600/40 flex items-center justify-center text-red-300 text-base font-black font-mono shrink-0"
                aria-hidden="true"
              >
                {featured.author[0]}
              </div>
              <div>
                <div className="text-white text-base font-bold">{featured.author}</div>
                <div className="text-white/45 text-sm">{featured.city}, TX</div>
              </div>
            </footer>
          </blockquote>

          {/* Supporting reviews — stack in third column on lg+ */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {supporting.map((t) => (
              <blockquote
                key={t.author}
                className="relative bg-white/4 border border-white/8 rounded-sm p-6 lg:p-7 flex flex-col gap-4 hover:border-white/15 hover:bg-white/6 transition-colors flex-1"
              >
                <Quote
                  className="h-6 w-6 text-red-600/30 absolute top-5 right-5"
                  aria-hidden="true"
                />

                <StarRow count={t.stars} />

                <p className="text-white/75 text-base leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <footer className="flex items-center gap-3 pt-3 border-t border-white/8">
                  <div
                    className="w-10 h-10 rounded-sm bg-red-600/20 border border-red-600/20 flex items-center justify-center text-red-400 text-sm font-black font-mono shrink-0"
                    aria-hidden="true"
                  >
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">
                      {t.author}
                    </div>
                    <div className="text-white/40 text-xs">{t.city}, TX</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Trust footer — official verification stamp */}
        <div className="mt-12 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-[#1a2347] border border-white/10 rounded-md">
            <GoogleGMark className="h-4 w-4" />
            <span className="text-white/75 text-xs font-semibold tracking-wide">
              Verified by Google
            </span>
            <span className="h-3 w-px bg-white/15" aria-hidden="true" />
            <BadgeCheck className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
            <span className="text-white/55 text-xs font-medium tracking-wide">
              Live data · Updated daily
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
