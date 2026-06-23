import { AlertTriangle } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import type { ServiceConfig } from "@/lib/services-config"

export default function ServiceProblem({ cfg }: { cfg: ServiceConfig }) {
  return (
    <section
      className="bg-white py-16 lg:py-20"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: intro copy */}
          <div>
            <TacticalLabel>When You Need This</TacticalLabel>
            <AccentLine />
            <h2
              id="problem-heading"
              className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight mb-5"
            >
              The longer you wait,
              <br />
              <span className="text-red-600">the worse it gets.</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {cfg.problemIntro}
            </p>
          </div>

          {/* Right: signs panel */}
          <div className="relative bg-[#131a3e] border border-white/8 rounded-sm p-7 lg:p-8">
            {/* Command stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600 rounded-l-sm" aria-hidden="true" />

            {/* Corner marks */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-red-600/50" aria-hidden="true" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-red-600/50" aria-hidden="true" />

            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono">
                Warning Signs
              </p>
            </div>

            <ul className="space-y-3" role="list">
              {cfg.problemSigns.map((sign) => (
                <li
                  key={sign}
                  className="flex items-start gap-3 text-white/75 text-sm font-medium leading-snug"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"
                    aria-hidden="true"
                  />
                  {sign}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
