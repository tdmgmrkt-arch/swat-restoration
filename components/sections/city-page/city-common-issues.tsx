import { AlertTriangle } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import type { CityConfig } from "@/lib/cities/_types"

export default function CityCommonIssues({ cfg }: { cfg: CityConfig }) {
  return (
    <section
      className="bg-white py-16 lg:py-20"
      aria-labelledby="issues-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: intro */}
          <div>
            <TacticalLabel>Known Threats</TacticalLabel>
            <AccentLine />
            <h2
              id="issues-heading"
              className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight mb-5"
            >
              Common restoration issues
              <br />
              <span className="text-red-600">in {cfg.name}.</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Local soil conditions, weather patterns, and housing stock create
              predictable damage scenarios. Understanding what{"\u2019"}s common here
              lets S.W.A.T. Restoration arrive with the right equipment and
              certified crew already staged.
            </p>
          </div>

          {/* Right: issues panel */}
          <div className="relative bg-[#131a3e] border border-white/8 rounded-sm p-7 lg:p-8">
            {/* Command stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600 rounded-l-sm" aria-hidden="true" />

            {/* Corner marks */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-red-600/50" aria-hidden="true" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-red-600/50" aria-hidden="true" />

            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono">
                Common Issues — {cfg.name}
              </p>
            </div>

            <ul className="space-y-4" role="list">
              {cfg.commonIssues.map((issue, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/75 text-sm font-medium leading-relaxed"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"
                    aria-hidden="true"
                  />
                  {issue}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
