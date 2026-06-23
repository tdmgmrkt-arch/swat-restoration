import { MapPin } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import type { CityConfig } from "@/lib/cities/_types"

export default function CityNeighborhoods({ cfg }: { cfg: CityConfig }) {
  return (
    <section
      className="relative bg-[#0c1230] py-16 lg:py-20 overflow-hidden"
      aria-labelledby="neighborhoods-heading"
    >
      <div className="absolute inset-0 tactical-grid opacity-25 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_30%_50%,rgba(220,38,38,0.06),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <TacticalLabel>Coverage Map</TacticalLabel>
          <AccentLine />
          <h2
            id="neighborhoods-heading"
            className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
          >
            Neighborhoods we
            <br />
            <span className="text-red-500">respond to in {cfg.name}.</span>
          </h2>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {cfg.neighborhoods.map((hood) => (
            <li
              key={hood.name}
              className="group relative bg-[#1a2347] border border-white/10 hover:border-red-600/35 rounded-sm px-5 py-4 transition-colors"
            >
              {/* Left accent — appears on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-600 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top rounded-l-sm"
                aria-hidden="true"
              />

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex items-center justify-center w-7 h-7 rounded-sm bg-red-600/10 border border-red-600/25 shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">
                    {hood.name}
                  </p>
                  {hood.note && (
                    <p className="text-white/45 text-xs leading-snug mt-1">
                      {hood.note}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
