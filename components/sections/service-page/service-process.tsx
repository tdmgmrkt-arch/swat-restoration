import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import { cn } from "@/lib/utils"
import type { ServiceConfig } from "@/lib/services-config"

export default function ServiceProcess({ cfg }: { cfg: ServiceConfig }) {
  const steps = cfg.processSteps

  return (
    <section
      className="relative bg-[#131a3e] py-16 lg:py-24 overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* Tactical grid */}
      <div className="absolute inset-0 tactical-grid opacity-40" aria-hidden="true" />

      {/* Right glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_85%_50%,rgba(220,38,38,0.06),transparent)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section header */}
        <div className="mb-12 lg:mb-16 max-w-xl">
          <TacticalLabel className="text-red-400">Mission Operations</TacticalLabel>
          <AccentLine />
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            How we execute
            <br />
            <span className="text-red-500">from call to close.</span>
          </h2>
        </div>

        {/* Steps — vertical stack mobile, horizontal row lg */}
        <ol
          className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-6"
          role="list"
          aria-label="Service process steps"
        >
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1
            return (
              <li key={step.number} className="relative flex lg:flex-col gap-5 lg:gap-0">
                {/* Connector line — horizontal on lg, vertical on mobile */}
                {!isLast && (
                  <div
                    className="hidden lg:block absolute top-9 left-[calc(100%_+_12px)] right-[-12px] h-px bg-red-600/20 z-0"
                    aria-hidden="true"
                  />
                )}

                {/* Step card */}
                <div
                  className={cn(
                    "relative border rounded-sm p-6 lg:p-7 flex-1 transition-colors",
                    idx === 0
                      ? "bg-[#1a2347] border-red-600/35"
                      : "bg-[#131a3e] border-white/8"
                  )}
                >
                  {/* Primary stripe on step 01 */}
                  {idx === 0 && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600 rounded-l-sm"
                      aria-hidden="true"
                    />
                  )}

                  {/* Corner marks */}
                  <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-red-600/40" aria-hidden="true" />
                  <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-red-600/40" aria-hidden="true" />

                  {/* Step number */}
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-black font-mono text-white leading-none tracking-tight">
                      {step.number}
                    </span>
                    <span className="text-xl font-black font-mono text-red-500 leading-none">.</span>
                  </div>

                  {/* Label / unit tag */}
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono mb-2">
                    {step.label}
                  </p>

                  {/* Title */}
                  <h3 className="text-white font-black text-base lg:text-lg tracking-wide uppercase leading-tight mb-3">
                    {step.title}
                  </h3>

                  {/* Accent divider */}
                  <div className="h-px w-8 bg-red-600 mb-4" aria-hidden="true" />

                  {/* Description */}
                  <p className="text-white/55 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
