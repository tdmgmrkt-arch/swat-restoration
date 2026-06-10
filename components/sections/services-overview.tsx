import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Check } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import { cn } from "@/lib/utils"

/**
 * Four mission profiles. Each card carries a number, a unit tag, two outcome
 * statements, a 3-item checklist, AND a contextual badge (per-card focal
 * point that varies — keeps the structure uniform but breaks visual sameness).
 */
const missions = [
  {
    number: "01",
    unit: "Primary Response Unit",
    badge: "24/7 Active",
    title: "Water Damage Restoration",
    href: "/water-damage",
    outcomes: ["24/7 emergency dispatch.", "Rapid water extraction."],
    checklist: ["Burst pipes & flooding", "Structural drying", "Sewage cleanup"],
    primary: true,
    image: "/watercard.jpeg",
  },
  {
    number: "02",
    unit: "Fire Response Unit",
    badge: "Full Restoration",
    title: "Fire & Smoke Damage",
    href: "/fire-damage",
    outcomes: ["Soot, smoke & odor removal.", "Full contents recovery."],
    checklist: ["Smoke damage cleanup", "Odor neutralization", "Board-up & secure"],
    image: "/firedamagecard.jpeg",
  },
  {
    number: "03",
    unit: "Air Quality Unit",
    badge: "Certified",
    title: "Mold Remediation",
    href: "/mold-remediation",
    outcomes: ["Safe containment & removal.", "Air-quality restoration."],
    checklist: ["Mold inspection & testing", "Black mold remediation", "Air quality restoration"],
    image: "/moldcard.jpeg",
  },
  {
    number: "04",
    unit: "Rebuild Unit",
    badge: "Insurance-Ready",
    title: "Reconstruction & Roofing",
    href: "/reconstruction",
    outcomes: ["Pack-out, cleaning & rebuild.", "Insurance claim assistance."],
    checklist: ["Roofing services", "Pack-out & cleaning", "General construction"],
    image: "/roofingcard.jpeg",
  },
] as const

export default function ServicesOverview() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Section header */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <TacticalLabel>What We Do</TacticalLabel>
          <AccentLine />
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight"
          >
            Services
            <br />
            <span className="text-red-600">Ready to Serve You.</span>
          </h2>
          <p className="mt-5 text-gray-500 text-base sm:text-lg leading-relaxed">
            Water damage, fire &amp; smoke, mold remediation, reconstruction —
            full-scope restoration from emergency response to insurance claim close-out.
          </p>
        </div>

        {/* Subhead ties the cards to the headline's "mission" framing */}
        <div className="mb-7 lg:mb-9 flex items-center gap-3">
          <span className="h-px w-8 bg-red-600" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-gray-900 font-mono">
            Core Response Units
          </span>
          <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
        </div>

        {/* Mission cards — 2×2 grid, dark cards punch out of the white section */}
        <ul role="list" className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {missions.map((m) => (
            <li key={m.number}>
              <Link
                href={m.href}
                aria-label={`${m.title} — view details`}
                className={cn(
                  "group relative block border overflow-hidden p-8 lg:p-10 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-red-600 h-full",
                  "primary" in m && m.primary
                    ? "bg-[#232d5e] border-red-600/35 hover:border-red-500/60 shadow-[0_0_0_1px_rgba(220,38,38,0.08)]"
                    : "bg-[#1a2347] border-white/8 hover:border-red-600/40"
                )}
              >
                {/* Background image — muted but present */}
                <Image
                  src={m.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  aria-hidden="true"
                  className="absolute inset-0 object-cover grayscale opacity-30 transition-opacity duration-500 group-hover:opacity-45 pointer-events-none"
                />

                {/* Gradient mask — keeps text legible while letting the image breathe */}
                <div
                  className={cn(
                    "absolute inset-0 pointer-events-none",
                    "primary" in m && m.primary
                      ? "bg-linear-to-t from-[#232d5e] from-25% via-[#232d5e]/60 via-65% to-transparent"
                      : "bg-linear-to-t from-[#1a2347] from-25% via-[#1a2347]/60 via-65% to-transparent"
                  )}
                  aria-hidden="true"
                />

                {/* Primary card — solid red left command stripe */}
                {"primary" in m && m.primary && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600 z-1"
                    aria-hidden="true"
                  />
                )}

                {/* Tactical corner marks */}
                <div
                  className="absolute top-3 left-3 w-3 h-3 border-t border-l border-red-600/50"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-red-600/50"
                  aria-hidden="true"
                />

                {/* Contextual badge — primary gets a pill treatment, others stay minimal */}
                {"primary" in m && m.primary ? (
                  <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-600/15 border border-red-600/40 rounded-sm">
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-red-300 font-mono">
                      {m.badge}
                    </span>
                  </div>
                ) : (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-400 font-mono">
                      {m.badge}
                    </span>
                  </div>
                )}

                <div className="relative flex flex-col h-full">
                  {/* Mission number */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl lg:text-7xl font-black font-mono leading-none tracking-tight text-white">
                      {m.number}
                    </span>
                    <span className="text-2xl font-black font-mono text-red-500 leading-none">
                      .
                    </span>
                  </div>

                  {/* Red accent line — extends on hover */}
                  <div
                    className="mt-5 h-px w-12 bg-red-600 origin-left group-hover:scale-x-[3] transition-transform duration-300"
                    aria-hidden="true"
                  />

                  {/* Mission name */}
                  <h3 className="mt-6 text-white text-xl lg:text-2xl font-black tracking-[0.08em] uppercase leading-tight">
                    {m.title}
                  </h3>

                  {/* Outcomes */}
                  <div className="mt-3 space-y-1">
                    {m.outcomes.map((line) => (
                      <p
                        key={line}
                        className="text-white/55 text-sm lg:text-base font-medium leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Checklist — fills the card with substance */}
                  <ul role="list" className="mt-6 pt-5 border-t border-white/8 space-y-2.5">
                    {m.checklist.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-white/70 text-sm font-medium"
                      >
                        <Check
                          className="h-3.5 w-3.5 text-red-500 shrink-0"
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom row — unit tag + chevron */}
                  <div className="mt-auto pt-7 flex items-center justify-between">
                    {"primary" in m && m.primary ? (
                      <span className="text-[10px] font-bold tracking-[0.25em] uppercase font-mono">
                        <span className="text-red-500">Primary</span>
                        <span className="text-white/40"> Response Unit</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/40 font-mono">
                        {m.unit}
                      </span>
                    )}
                    <ChevronRight
                      className="h-5 w-5 text-white/35 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-200"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom CTA — intentional handoff block, not a tacked-on link.
            Tactical divider above + larger headline + bigger button. */}
        <div className="mt-16 lg:mt-20">
          {/* Tactical end-of-units marker */}
          <div className="flex items-center gap-4 mb-10">
            <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 font-mono">
              End of Core Units
            </span>
            <span className="h-px flex-1 bg-gray-200" aria-hidden="true" />
          </div>

          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-700 text-lg sm:text-xl font-medium text-center max-w-md leading-snug">
              Need something beyond these
              <br className="hidden sm:inline" />
              <span className="sm:hidden"> </span>
              core units?
            </p>
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-2.5 text-base font-bold tracking-wide uppercase text-white bg-[#232d5e] hover:bg-red-600 border border-[#232d5e] hover:border-red-600 rounded-sm px-8 py-4 transition-colors min-h-12"
            >
              Contact Us Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
