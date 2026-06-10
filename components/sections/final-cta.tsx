import Link from "next/link"
import { CalendarDays, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import { getGoogleReviews, formatReviewCount } from "@/lib/google-reviews"

export default async function FinalCta() {
  // Pull live Google data for the proof readout. Same 24h ISR cache as other sections.
  const data = await getGoogleReviews()
  const reviewCount =
    formatReviewCount(data.userRatingCount) ??
    formatReviewCount(siteConfig.googleRatingFallback.count)
  const communityCount = siteConfig.serviceArea.length

  const proof = [
    { value: "24/7", label: "Dispatch Active", pulse: true },
    { value: "100%", label: "Family Owned" },
    { value: `${communityCount}+`, label: "DFW Communities" },
  ] as const

  return (
    <section
      className="relative bg-[#0c1230] py-20 lg:py-28 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Tactical grid */}
      <div className="absolute inset-0 tactical-grid opacity-50" aria-hidden="true" />

      {/* Red left accent stripe */}
      <div className="absolute left-0 inset-y-0 w-1 bg-red-600" aria-hidden="true" />

      {/* Glow center */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(220,38,38,0.1),transparent)]"
        aria-hidden="true"
      />

      {/* Corner marks */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-red-600/50" aria-hidden="true" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/50" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-red-600/50" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/50" aria-hidden="true" />

      {/* Mission-ready status header — bridges from reviews above */}
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 mb-12 lg:mb-16">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px flex-1 bg-linear-to-r from-transparent to-red-600/40" aria-hidden="true" />
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#1a2347] border border-red-600/30 rounded-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono">
              Mission Status
            </span>
            <span className="text-red-600/50 text-xs" aria-hidden="true">·</span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white font-mono">
              Ready
            </span>
          </div>
          <span className="h-px flex-1 bg-linear-to-l from-transparent to-red-600/40" aria-hidden="true" />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center">

        {/* Tactical label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-red-600/40" aria-hidden="true" />
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-red-400 font-mono">
            Deploy Now
          </span>
          <div className="h-px w-10 bg-red-600/40" aria-hidden="true" />
        </div>

        {/* Headline */}
        <h2
          id="cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5"
        >
          Water or fire damage
          <br />
          <span className="text-red-500">at your home?</span>
        </h2>

        {/* Body — tighter, operational */}
        <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          One call. Real dispatch. First responders for water and fire disasters —
          across {communityCount}+ DFW communities, 24/7.
        </p>

        {/* Tactical proof readout — gives the section visual weight */}
        <ul
          role="list"
          className="grid grid-cols-3 gap-px bg-red-600/15 border border-red-600/20 rounded-sm overflow-hidden mb-10 max-w-2xl mx-auto"
        >
          {proof.map((p) => (
            <li
              key={p.label}
              className="bg-[#131a3e] px-4 py-5 flex flex-col items-center gap-2"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-mono leading-none tracking-tight">
                  {p.value}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {"pulse" in p && p.pulse && (
                  <span className="relative flex h-1 w-1" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-red-500" />
                  </span>
                )}
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-white/45 font-mono text-center">
                  {p.label}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact-us"
            className={cn(
              "bg-red-600 hover:bg-red-700 text-white font-bold text-base border border-red-500/40",
              "min-h-13 px-8 py-4 h-auto w-full sm:w-auto min-w-50",
              "inline-flex items-center justify-center gap-2 rounded-sm transition-colors",
              "tracking-wide uppercase"
            )}
          >
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
            Contact Us Now
          </Link>
          <Link
            href={siteConfig.phone.primary_tel}
            className={cn(
              "border border-white/25 text-white bg-transparent hover:bg-white/8 hover:border-white/40",
              "font-semibold text-base min-h-13 px-8 py-4 h-auto w-full sm:w-auto min-w-50",
              "inline-flex items-center justify-center gap-2 rounded-sm transition-colors",
              "tracking-wide uppercase"
            )}
            aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.primary}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {siteConfig.phone.primary}
          </Link>
        </div>

        {/* Operational status footer */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            <span className="text-white/45 text-xs font-mono tracking-wider uppercase">
              24/7 Dispatch
            </span>
          </div>
          <span className="text-red-500/40 text-xs" aria-hidden="true">·</span>
          <span className="text-white/45 text-xs font-mono tracking-wider uppercase">
            Family Owned · DFW
          </span>
          {reviewCount && (
            <>
              <span className="text-red-500/40 text-xs" aria-hidden="true">·</span>
              <span className="text-white/45 text-xs font-mono tracking-wider uppercase">
                {reviewCount}+ Verified Reviews
              </span>
            </>
          )}
        </div>

      </div>
    </section>
  )
}
