import { siteConfig } from "@/lib/site-config"
import { getGoogleReviews, formatReviewCount } from "@/lib/google-reviews"

export default async function TrustMetrics() {
  // Live data with siteConfig fallback. Same 24h ISR cache as the hero badge —
  // no extra cost; the second call hits the cached Place Details response.
  const data = await getGoogleReviews()
  const reviewCount =
    formatReviewCount(data.userRatingCount) ??
    formatReviewCount(siteConfig.googleRatingFallback.count) ??
    "1,710"
  const communityCount = siteConfig.serviceArea.length

  const metrics = [
    { value: `${communityCount}+`, label: "Communities Served" },
    { value: "24/7", label: "Emergency Response" },
    { value: "100%", label: "Upfront Pricing" },
    { value: `${reviewCount}+`, label: "Verified Reviews" },
  ] as const

  return (
    <section
      className="relative bg-[#0c1230] border-y border-white/8"
      aria-label="By the numbers"
    >
      {/* Top red accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-red-600/40 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-14 lg:py-20">
        <ul
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 lg:divide-x lg:divide-white/8"
          role="list"
        >
          {metrics.map((m) => (
            <li
              key={m.label}
              className="flex flex-col items-center justify-center text-center lg:px-6"
            >
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-mono leading-none tracking-tight">
                {m.value}
              </span>
              <span className="mt-4 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/45">
                {m.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom red accent line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-red-600/40 to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
