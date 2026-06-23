import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import { cn } from "@/lib/utils"
import type { ServiceConfig } from "@/lib/services-config"

export default function ServiceWhySwat({ cfg }: { cfg: ServiceConfig }) {
  const pillars = cfg.whySwatPillars

  return (
    <section
      className="relative bg-[#131a3e] py-16 lg:py-24 overflow-hidden"
      aria-labelledby="why-swat-heading"
    >
      <div className="absolute inset-0 tactical-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_90%_50%,rgba(220,38,38,0.07),transparent)]"
        aria-hidden="true"
      />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/40" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-red-600/40" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="mb-12 lg:mb-16 max-w-xl">
          <TacticalLabel className="text-red-400">Why S.W.A.T.</TacticalLabel>
          <AccentLine />
          <h2
            id="why-swat-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Built different.
            <br />
            <span className="text-red-500">For this exact problem.</span>
          </h2>
        </div>

        {/* 3-card grid — matches why-choose visual language */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 rounded-sm overflow-hidden border border-white/8">
          {pillars.map((pillar) => {
            const isPrimary = !!pillar.primary
            return (
              <div
                key={pillar.title}
                className={cn(
                  "group relative p-7 lg:p-8 flex flex-col min-h-52",
                  isPrimary
                    ? "bg-[#181f45] hover:bg-[#1f2952]"
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

                {/* Reserve space so title aligns across cards */}
                <div className="h-3.75 mb-4 flex items-center" aria-hidden={!isPrimary}>
                  {isPrimary && (
                    <div className="inline-flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono">
                        Primary Advantage
                      </span>
                    </div>
                  )}
                </div>

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

                {/* Bottom accent on hover; always shown for primary */}
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
