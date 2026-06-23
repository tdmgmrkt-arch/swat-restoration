import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import type { CityConfig } from "@/lib/cities/_types"
import type { ResolvedServiceHighlight } from "@/lib/cities-config"

interface Props {
  cfg: CityConfig
  highlights: ResolvedServiceHighlight[]
}

export default function CityServicesGrid({ cfg, highlights }: Props) {
  return (
    <section
      className="relative bg-[#1a2347] border-y border-white/8 py-16 lg:py-20 overflow-hidden"
      aria-labelledby="services-grid-heading"
    >
      <div className="absolute inset-0 tactical-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <TacticalLabel>Restoration Services in {cfg.name}</TacticalLabel>
          <AccentLine />
          <h2
            id="services-grid-heading"
            className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
          >
            What we handle
            <br />
            <span className="text-red-500">on every call here.</span>
          </h2>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {highlights.map((h, i) => (
            <li key={h.service.href}>
              <Link
                href={h.service.href}
                aria-label={`${h.service.name} in ${cfg.name}`}
                className="group relative flex flex-col h-full bg-[#0c1230] border border-white/10 hover:border-red-600/40 hover:bg-[#1f2952] rounded-sm p-5 lg:p-6 transition-colors"
              >
                {/* Corner marks */}
                <div
                  className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-red-600/40 pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-red-600/40 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Index */}
                <span className="font-mono text-[10px] text-white/30 tracking-wider mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Service name */}
                <h3 className="text-white text-base font-black tracking-tight leading-tight uppercase mb-2 group-hover:text-red-400 transition-colors">
                  {h.service.name}
                </h3>

                {/* Local angle */}
                <p className="text-white/55 text-xs leading-relaxed flex-1 mb-4">
                  {h.localAngle}
                </p>

                {/* Bottom row */}
                <div className="pt-3 border-t border-white/8 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-red-500 font-mono">
                    Learn More
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-white/30 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
