import Link from "next/link"
import Image from "next/image"
import { Phone, CalendarDays, ShieldCheck, Clock, BadgeCheck, Zap, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import type { CityConfig } from "@/lib/cities/_types"

const TRUST_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>
> = {
  "HQ in Aledo": MapPin,
  "Aledo Based": MapPin,
  "<30-Min Response": Zap,
  "<25-Min from Hub": Zap,
  "24/7 Dispatch": Clock,
  "24/7 Emergency": Clock,
  "IICRC Certified": ShieldCheck,
  "Licensed & Insured": BadgeCheck,
  "Insurance Direct": BadgeCheck,
  "Family Owned": ShieldCheck,
}

function renderH1(h1: string) {
  const parts = h1.split(" // ")
  if (parts.length === 1) return <>{h1}</>
  return (
    <>
      {parts[0]}
      <br />
      <span className="text-red-500">{parts[1]}</span>
    </>
  )
}

export default function CityHero({ cfg }: { cfg: CityConfig }) {
  return (
    <section
      className="relative isolate bg-[#0c1230] py-20 lg:py-28 overflow-hidden"
      aria-labelledby="city-hero-heading"
    >
      {/* DFW residential street at night — atmospheric background */}
      <Image
        src="/hero-images/city-hero-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[55%_40%] -z-10 opacity-[0.28]"
        priority
      />

      {/* Stacked overlays — solid behind copy, transparent behind right column */}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-r from-[#0c1230] from-0% via-[#0c1230]/85 via-45% to-[#0c1230]/35 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-t from-[#0c1230] via-transparent to-[#0c1230]/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Tactical grid */}
      <div className="absolute inset-0 tactical-grid opacity-25 pointer-events-none" aria-hidden="true" />

      {/* Red left accent stripe */}
      <div className="absolute left-0 inset-y-0 w-0.75 bg-red-600" aria-hidden="true" />

      {/* Ambient red glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_15%_55%,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Corner marks */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-red-600/60 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/30 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-red-600/30 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/30 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* Mission brief label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <TacticalLabel className="mb-0 text-red-400">Service Area</TacticalLabel>
          <div className="h-px w-12 bg-red-600/30" aria-hidden="true" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40">
            {cfg.county} County, TX
          </span>
        </div>

        <div className="max-w-3xl">
          <AccentLine className="mb-5" />

          {/* H1 */}
          <h1
            id="city-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.04] tracking-tight mb-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
          >
            {renderH1(cfg.h1)}
          </h1>

          {/* Pain line */}
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-9 max-w-2xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
            {cfg.heroPainLine}
          </p>

          {/* CTAs — single Aledo hub phone */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href="/contact-us"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "bg-red-600 hover:bg-red-700 text-white font-bold text-base",
                "px-8 py-4 rounded-sm border border-red-500/40 min-h-[52px]",
                "transition-colors tracking-wide uppercase"
              )}
            >
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
              Request Service
            </Link>
            <Link
              href={siteConfig.phone.aled_tel}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "border border-white/25 text-white bg-transparent hover:bg-white/8 hover:border-white/40",
                "font-semibold text-base px-8 py-4 rounded-sm min-h-[52px]",
                "transition-colors tracking-wide uppercase"
              )}
              aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.aledo}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {siteConfig.phone.aledo}
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-2" role="list" aria-label="Service guarantees">
            {cfg.trustStrip.map((item) => {
              const Icon = TRUST_ICONS[item] ?? ShieldCheck
              return (
                <div
                  key={item}
                  role="listitem"
                  className="flex items-center gap-1.5 bg-white/4 border border-white/10 rounded-sm px-3 py-1.5 text-white/65 text-xs font-medium"
                >
                  <Icon className="h-3.5 w-3.5 text-red-400 shrink-0" aria-hidden="true" />
                  {item}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
