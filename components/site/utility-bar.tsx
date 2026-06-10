/**
 * Top utility bar — pure trust signals only. No phone number here (lives in
 * the nav CTA, sticky mobile bar, and footer). No icons either — keeps the
 * thin bar reading magazine/luxury rather than icon-template SaaS.
 *
 * Three signals on lg+, two on mobile (Family Owned drops to keep the bar
 * single-line on narrow viewports; the trust strip below the hero picks up
 * the family-owned signal anyway).
 */
export default function UtilityBar() {
  return (
    <div className="bg-[#0c1230] border-b border-white/8 text-white/70 text-xs py-2">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-center gap-3 sm:gap-4 lg:gap-4">
        {/* 1. Availability */}
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
          </span>
          <span className="text-white/85 font-medium tracking-wide">
            24/7 Emergency Response
          </span>
        </span>

        <Dot />

        {/* 2. Insurance experience */}
        <span className="text-white/75 font-medium tracking-wide">
          Insurance Claim Experienced
        </span>

        {/* 3. Character — hidden on mobile to keep bar single-line */}
        <Dot className="hidden lg:inline" />
        <span className="hidden lg:inline text-white/75 font-medium tracking-wide">
          Family Owned &amp; Operated
        </span>
      </div>
    </div>
  )
}

function Dot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-red-500/60 leading-none select-none ${className}`}
      aria-hidden="true"
    >
      •
    </span>
  )
}
