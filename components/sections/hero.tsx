import Link from "next/link"
import { Phone, CalendarDays, Clock, Home, Flame, Droplets } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import GoogleRatingBadge from "@/components/site/google-rating-badge"

const trustBadges = [
  { icon: Clock, label: "24/7 Emergency Response" },
  { icon: Home, label: "Family Owned & Operated" },
  { icon: Droplets, label: "Water Damage" },
  { icon: Flame, label: "Fire & Smoke" },
]

export default async function Hero() {
  return (
    <section
      className="relative min-h-[70vh] flex flex-col justify-end lg:justify-center overflow-hidden bg-[#0c1230]"
      aria-label="Hero"
    >
      {/* Background video — full-bleed, cover-scaled */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <video
          src="/montage.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/swatteamphoto.jpeg"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />
      </div>

      {/* Navy overlay — keeps headline legible, lets video show on the right. */}
      <div
        className="absolute inset-0 bg-linear-to-r from-[#0c1230] via-[#0c1230]/90 to-[#0c1230]/60 lg:from-[#0c1230] lg:via-[#0c1230]/80 lg:to-[#0c1230]/35"
        aria-hidden="true"
      />

      {/* Tactical grid texture */}
      <div className="absolute inset-0 tactical-grid opacity-20 mix-blend-overlay" aria-hidden="true" />

      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#0c1230] to-transparent"
        aria-hidden="true"
      />

      {/* Tactical corner marks */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-red-600/60" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/60" aria-hidden="true" />

      {/* Red accent vertical line */}
      <div
        className="absolute left-0 top-0 h-full w-0.75 bg-linear-to-b from-transparent via-red-600/40 to-transparent"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-6 pb-16 lg:pb-0 pt-24 lg:pt-0">
        <div className="max-w-2xl">

          {/* Tactical label */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-red-400 font-mono">
                Dispatched 24/7
              </span>
            </div>
            <div className="h-px flex-1 max-w-16 bg-red-600/30" />
          </div>

          {/* Main headline */}
          <h1 className="font-black text-white tracking-tight mb-5">
            <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.95]">
              First Responders
            </span>
            <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight text-white/90">
              for Water &amp; Fire <span className="text-red-500">Disasters.</span>
            </span>
          </h1>

          {/* Supporting copy */}
          <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Family owned and operated, right here in DFW. Water damage, fire &amp; smoke,
            mold remediation, and full reconstruction — when disaster hits, we deploy fast.
          </p>

          {/* Google rating — live data via Places API, falls back to siteConfig values */}
          <div className="mb-7">
            <GoogleRatingBadge />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link
              href="/contact-us"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "bg-red-600 hover:bg-red-700 text-white font-bold",
                "px-7 py-4 rounded-lg text-base border border-red-500/50",
                "min-h-[52px] transition-colors"
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
                "font-semibold px-7 py-4 rounded-lg text-base",
                "min-h-[52px] transition-colors"
              )}
              aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.primary}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {siteConfig.phone.primary}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white/70 text-xs font-medium backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-red-400 shrink-0" aria-hidden="true" />
                {label}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0c1230] to-transparent z-10"
        aria-hidden="true"
      />
    </section>
  )
}
