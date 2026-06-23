import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Dark-navy card used in the water-damage category hub's service grid.
 * Accepts either a full ServiceConfig (for built pages with rich copy)
 * or a lightweight { title, href } object (for not-yet-built sub-service pages).
 */
export interface HubCardData {
  href: string
  title: string
  /** Optional short hook line — falls back to a generic line */
  heroPainLine?: string
  /** Optional 3 scope bullets — falls back to a generic prompt */
  scopeBullets?: string[]
  /** Optional slug for index display */
  slug?: string
}

export default function HubServiceCard({
  card,
  primary = false,
  index,
}: {
  card: HubCardData
  primary?: boolean
  index?: number
}) {
  const previewBullets = (card.scopeBullets ?? []).slice(0, 3)

  return (
    <Link
      href={card.href}
      aria-label={`${card.title} — view service`}
      className={cn(
        "group relative block overflow-hidden p-6 lg:p-7 transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-red-600",
        "h-full border rounded-sm",
        primary
          ? "bg-[#1a2347] border-red-600/35 hover:border-red-500/60 shadow-[0_0_0_1px_rgba(220,38,38,0.08)]"
          : "bg-[#131a3e] border-white/10 hover:border-red-600/40 hover:bg-[#1a2347]"
      )}
    >
      {/* Tactical corner marks */}
      <div
        className="absolute top-2 left-2 w-3 h-3 border-t border-l border-red-600/50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-red-600/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Primary command stripe */}
      {primary && (
        <div
          className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600"
          aria-hidden="true"
        />
      )}

      {/* Primary badge */}
      {primary && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-600/15 border border-red-600/40 rounded-sm">
          <span className="relative flex h-1 w-1" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1 w-1 bg-red-500" />
          </span>
          <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-red-300 font-mono">
            Primary
          </span>
        </div>
      )}

      <div className="relative flex flex-col h-full">
        {/* Index marker (optional) */}
        {typeof index === "number" && (
          <div className="font-mono text-[10px] text-white/40 tracking-wider mb-3">
            {String(index).padStart(2, "0")}
          </div>
        )}

        {/* Title */}
        <h3 className="text-white text-lg font-black tracking-tight leading-tight uppercase mb-3 group-hover:text-red-400 transition-colors">
          {card.title}
        </h3>

        {/* Short hook */}
        {card.heroPainLine && (
          <p className="text-white/55 text-sm leading-relaxed mb-5 line-clamp-2">
            {card.heroPainLine}
          </p>
        )}

        {/* Scope bullets */}
        {previewBullets.length > 0 && (
          <ul role="list" className="space-y-2 mb-6">
            {previewBullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2 text-white/70 text-xs font-medium leading-relaxed"
              >
                <Check
                  className="h-3 w-3 text-red-500 shrink-0 mt-0.5"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                <span className="line-clamp-1">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Bottom row */}
        <div className="mt-auto pt-4 border-t border-white/8 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-red-500 font-mono">
            View Service
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-white/35 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  )
}
