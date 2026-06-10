import { Zap, DollarSign, Award, Sparkles } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import { cn } from "@/lib/utils"

/**
 * Four differentiators. Scannable bullets, not paragraphs.
 * Rapid Response is the commander — matches the services-section hierarchy
 * (Emergency Response was primary there too). Reinforces the SWAT brand.
 */
const pillars = [
  {
    icon: Zap,
    title: "Rapid Response",
    bullets: ["24/7 emergency dispatch", "Family owned & operated", "First responders for disasters"],
    primary: true,
  },
  {
    icon: DollarSign,
    title: "Insurance Experienced",
    bullets: ["Direct insurance billing", "Claim documentation", "Adjuster coordination"],
  },
  {
    icon: Award,
    title: "Certified Technicians",
    bullets: ["IICRC-trained crews", "Background checked", "Full PPE & containment"],
  },
  {
    icon: Sparkles,
    title: "Restored Right",
    bullets: ["Pack-out & contents care", "Detailed cleaning", "Better than before"],
  },
] as const

export default function WhyChoose() {
  return (
    <section
      className="relative bg-[#131a3e] py-20 lg:py-28 overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* Tactical grid */}
      <div className="absolute inset-0 tactical-grid opacity-40" aria-hidden="true" />

      {/* Right side red glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_90%_50%,rgba(220,38,38,0.07),transparent)]"
        aria-hidden="true"
      />

      {/* Corner marks */}
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/40" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-red-600/40" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">

        {/* Section header */}
        <div className="mb-12 lg:mb-16 max-w-xl">
          <TacticalLabel className="text-red-400">Why S.W.A.T.</TacticalLabel>
          <AccentLine />
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Built on Family.
            <br />
            <span className="text-red-500">Deployed Like First Responders.</span>
          </h2>
          <p className="mt-4 text-white/50 text-base leading-relaxed">
            Restoration companies are everywhere. A restoration team you can trust to
            treat your home like their own, at any hour, all the way through the insurance
            claim — that&apos;s a different standard.
          </p>
        </div>

        {/* Pillar grid — 4 columns with hairline dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-sm overflow-hidden border border-white/8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            const isPrimary = "primary" in pillar && pillar.primary
            return (
              <div
                key={pillar.title}
                className={cn(
                  "group relative p-7 lg:p-8 flex flex-col transition-colors min-h-65",
                  isPrimary
                    ? "bg-[#1f2952] hover:bg-[#2a3370]"
                    : "bg-[#131a3e] hover:bg-[#181f45]"
                )}
              >
                {/* Primary command stripe */}
                {isPrimary && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600"
                    aria-hidden="true"
                  />
                )}

                {/* PRIMARY tag (primary pillar only) */}
                {isPrimary && (
                  <div className="inline-flex items-center gap-1.5 mb-4 w-max">
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono">
                      Primary Standard
                    </span>
                  </div>
                )}

                {/* Icon block */}
                <div
                  className={cn(
                    "w-11 h-11 flex items-center justify-center border rounded-sm mb-6 transition-colors",
                    isPrimary
                      ? "border-red-600/50 bg-red-600/10 group-hover:border-red-500/70"
                      : "border-white/10 group-hover:border-red-600/40"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5",
                      isPrimary ? "text-red-400" : "text-red-500"
                    )}
                    aria-hidden="true"
                  />
                </div>

                {/* Title — uppercase, tactical */}
                <h3
                  className={cn(
                    "font-black tracking-wider uppercase leading-tight mb-5",
                    isPrimary
                      ? "text-white text-lg lg:text-xl"
                      : "text-white/90 text-base lg:text-lg"
                  )}
                >
                  {pillar.title}
                </h3>

                {/* Bullets — scannable, not paragraphs */}
                <ul role="list" className="space-y-2 mt-auto">
                  {pillar.bullets.map((b) => (
                    <li
                      key={b}
                      className={cn(
                        "flex items-center gap-2.5 text-sm font-medium leading-snug",
                        isPrimary ? "text-white/80" : "text-white/60"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1 w-1 rounded-full shrink-0",
                          isPrimary ? "bg-red-500" : "bg-red-500/60"
                        )}
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Bottom accent line on hover */}
                <div
                  className={cn(
                    "absolute bottom-0 inset-x-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
                    isPrimary && "scale-x-100"
                  )}
                  aria-hidden="true"
                />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
