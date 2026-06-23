import Link from "next/link"
import { CalendarDays, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import type { CityConfig } from "@/lib/cities/_types"

/** City-scoped final CTA — interpolates city name into the headline.
 *  Single-hub: always routes to the Aledo phone number. */
export default function CityFinalCta({ cfg }: { cfg: CityConfig }) {
  return (
    <section
      className="relative bg-[#0c1230] py-20 lg:py-28 overflow-hidden"
      aria-labelledby="city-cta-heading"
    >
      {/* Tactical grid */}
      <div className="absolute inset-0 tactical-grid opacity-50" aria-hidden="true" />

      {/* Red left accent stripe */}
      <div className="absolute left-0 inset-y-0 w-1 bg-red-600" aria-hidden="true" />

      {/* Center glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(220,38,38,0.1),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Corner marks */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-red-600/50" aria-hidden="true" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/50" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-red-600/50" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/50" aria-hidden="true" />

      {/* Mission status header */}
      <div className="relative max-w-5xl mx-auto px-5 sm:px-6 mb-12 lg:mb-16">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px flex-1 bg-linear-to-r from-transparent to-red-600/40" aria-hidden="true" />
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#131a3e] border border-red-600/30 rounded-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono">
              Crew Status
            </span>
            <span className="text-red-600/50 text-xs" aria-hidden="true">·</span>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white font-mono">
              Ready to Deploy
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

        <h2
          id="city-cta-heading"
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5"
        >
          Need restoration in {cfg.name}
          <br />
          <span className="text-red-500">right now?</span>
        </h2>

        <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
          One call. Real dispatch. S.W.A.T. Restoration is in {cfg.county} County —
          any hour, any day. No call center. No relay.
        </p>

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
            Request Service
          </Link>
          <Link
            href={siteConfig.phone.aled_tel}
            className={cn(
              "border border-white/25 text-white bg-transparent hover:bg-white/8 hover:border-white/40",
              "font-semibold text-base min-h-13 px-8 py-4 h-auto w-full sm:w-auto min-w-50",
              "inline-flex items-center justify-center gap-2 rounded-sm transition-colors",
              "tracking-wide uppercase"
            )}
            aria-label={`Call S.W.A.T. Restoration ${cfg.name} at ${siteConfig.phone.aledo}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {siteConfig.phone.aledo}
          </Link>
        </div>

        {/* Operational footer */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            <span className="text-white/45 text-xs font-mono tracking-wider uppercase">
              24/7 Emergency Dispatch
            </span>
          </div>
          <span className="text-red-500/40 text-xs" aria-hidden="true">·</span>
          <span className="text-white/45 text-xs font-mono tracking-wider uppercase">
            {cfg.name}, TX
          </span>
          <span className="text-red-500/40 text-xs" aria-hidden="true">·</span>
          <span className="text-white/45 text-xs font-mono tracking-wider uppercase">
            IICRC Certified
          </span>
        </div>
      </div>
    </section>
  )
}
