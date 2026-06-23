import Link from "next/link"
import { MapPin, ArrowUpRight, Clock } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import { cn } from "@/lib/utils"
import type { CityConfig } from "@/lib/cities/_types"
import type { annotateNearbyCities } from "@/lib/cities-config"

interface Props {
  cfg: CityConfig
  nearby: ReturnType<typeof annotateNearbyCities>
}

export default function CityNearbyCities({ cfg, nearby }: Props) {
  if (nearby.length === 0) return null

  return (
    <section
      className="relative bg-[#0c1230] py-16 lg:py-20 overflow-hidden"
      aria-labelledby="nearby-cities-heading"
    >
      <div className="absolute inset-0 tactical-grid opacity-25 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <TacticalLabel>Surrounding Area</TacticalLabel>
          <AccentLine />
          <h2
            id="nearby-cities-heading"
            className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
          >
            Also serving
            <br />
            <span className="text-red-500">nearby communities.</span>
          </h2>
          <p className="mt-4 text-white/50 text-sm leading-relaxed">
            S.W.A.T. Restoration covers {cfg.name} and the surrounding area with
            the same IICRC-certified crew, same 24/7 emergency dispatch.
          </p>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {nearby.map((nc) => {
            const cardContent = (
              <>
                {/* Corner marks */}
                <div
                  className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-red-600/45 pointer-events-none"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-red-600/45 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-red-600/10 border border-red-600/25 shrink-0">
                    <MapPin className="h-4 w-4 text-red-400" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white font-black text-base tracking-tight leading-tight">
                      {nc.name}
                    </p>
                    <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/35">
                      Texas
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/45">
                  <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span>{nc.driveMinutes} min from {cfg.name}</span>
                </div>

                {nc.isBuilt && (
                  <div className="absolute bottom-3 right-3">
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/25 group-hover:text-red-400 transition-colors" aria-hidden="true" />
                  </div>
                )}

                {!nc.isBuilt && (
                  <div className="mt-3">
                    <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/30">
                      Coverage Active
                    </span>
                  </div>
                )}
              </>
            )

            const baseClass = cn(
              "group relative block bg-[#131a3e] border rounded-sm p-5 transition-colors w-full",
              nc.isBuilt
                ? "border-white/10 hover:border-red-600/45 cursor-pointer"
                : "border-white/6 cursor-default"
            )

            if (nc.isBuilt) {
              return (
                <li key={nc.slug}>
                  <Link
                    href={`/areas-served/${nc.slug}`}
                    className={baseClass}
                    aria-label={`Restoration services in ${nc.name}, TX`}
                  >
                    {cardContent}
                  </Link>
                </li>
              )
            }

            return (
              <li key={nc.slug}>
                <div className={baseClass}>
                  {cardContent}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
