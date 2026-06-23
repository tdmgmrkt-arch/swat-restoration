import type { CityConfig } from "@/lib/cities/_types"

export default function CityStatsStrip({ cfg }: { cfg: CityConfig }) {
  const stats = [
    {
      value: cfg.driveTimeMinutes === 0 ? "0" : `${cfg.driveTimeMinutes}`,
      unit: cfg.driveTimeMinutes === 0 ? null : "MIN",
      label: cfg.driveTimeMinutes === 0 ? "HQ City" : "Drive from Hub",
    },
    {
      value: String(cfg.zipCodes.length),
      unit: null,
      label: "ZIP Codes",
    },
    {
      value: String(cfg.neighborhoods.length),
      unit: "+",
      label: "Neighborhoods",
    },
    {
      value: cfg.county,
      unit: null,
      label: "County",
      wide: true,
    },
  ] as const

  return (
    <section
      className="relative bg-[#131a3e] border-y border-white/8 overflow-hidden"
      aria-label={`${cfg.name} coverage statistics`}
    >
      <div className="absolute inset-0 tactical-grid opacity-20" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <ul
          role="list"
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8"
        >
          {stats.map((s) => (
            <li key={s.label} className="px-6 py-8 lg:py-10 flex flex-col gap-1.5">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight leading-none">
                  {s.value}
                </span>
                {"unit" in s && s.unit && (
                  <span className="text-lg font-black text-red-500 leading-none ml-0.5">
                    {s.unit}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/45 font-semibold">
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
