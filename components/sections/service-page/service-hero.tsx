import Link from "next/link"
import Image from "next/image"
import { Phone, CalendarDays, ShieldCheck, Clock, BadgeCheck, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import { hrefToContactServiceType } from "@/lib/contact-schema"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import type { ServiceConfig } from "@/lib/services-config"

const TRUST_ICONS: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  "24/7 Dispatch": Clock,
  "IICRC-Trained Crews": ShieldCheck,
  "<60-Min Arrival": Zap,
  "Insurance Billing Direct": BadgeCheck,
  "Family Owned": ShieldCheck,
  "Licensed & Insured": ShieldCheck,
  "Upfront Pricing": BadgeCheck,
}

function renderH1(h1: string) {
  const parts = h1.split(" // ")
  if (parts.length === 1) {
    return <>{h1}</>
  }
  return (
    <>
      {parts[0]}
      <br />
      <span className="text-red-500">{parts[1]}</span>
    </>
  )
}

export default function ServiceHero({ cfg }: { cfg: ServiceConfig }) {
  // Deep-link into the contact form with two pieces of context:
  //   ?service=<category>  → pre-selects one of the 8 dropdown categories
  //   &detail=<name>       → pre-fills the message field with the specific
  //                          service the visitor came in for, so dispatch
  //                          knows the exact intent (not just the bucket).
  const contactCategory = hrefToContactServiceType(cfg.href)
  const params = new URLSearchParams()
  if (contactCategory) params.set("service", contactCategory)
  params.set("detail", cfg.name)
  const requestHref = `/contact-us?${params.toString()}`

  const bgSrc = cfg.heroImage ?? "/hero-images/service-pages-hero.webp"

  return (
    <section
      className="relative isolate bg-[#0c1230] py-20 lg:py-28 overflow-hidden"
      aria-label={`${cfg.name} hero`}
    >
      {/* Background image — heavily masked for legibility + depth */}
      <Image
        src={bgSrc}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center -z-10 opacity-55"
        priority
      />

      {/* Stacked overlays — left-weighted so headline copy sits on near-solid backdrop */}
      <div
        className="absolute inset-0 -z-10 bg-linear-to-r from-[#0c1230] from-0% via-[#0c1230]/85 via-50% to-[#0c1230]/60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-t from-[#0c1230] via-transparent to-[#0c1230]/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Tactical grid (sits on top of overlays, under content) */}
      <div className="absolute inset-0 tactical-grid opacity-25 pointer-events-none" aria-hidden="true" />

      {/* Red left accent stripe */}
      <div className="absolute left-0 inset-y-0 w-0.75 bg-red-600" aria-hidden="true" />

      {/* Ambient red glow — left-biased to frame the content column */}
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
          <TacticalLabel className="mb-0 text-red-400">Service Brief</TacticalLabel>
          <div className="h-px w-12 bg-red-600/30" aria-hidden="true" />
        </div>

        <div className="max-w-3xl">
          <AccentLine className="mb-5" />

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.04] tracking-tight mb-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]">
            {renderH1(cfg.h1)}
          </h1>

          {/* Pain line */}
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-9 max-w-2xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
            {cfg.heroPainLine}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href={requestHref}
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
              href={siteConfig.phone.primary_tel}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "border border-white/25 text-white bg-transparent hover:bg-white/8 hover:border-white/40",
                "font-semibold text-base px-8 py-4 rounded-sm min-h-[52px]",
                "transition-colors tracking-wide uppercase"
              )}
              aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.primary}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {siteConfig.phone.primary}
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-2" role="list" aria-label="Service credentials">
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
