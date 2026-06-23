import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import type { RelatedService } from "@/lib/services-config"

export default function ServiceRelated({ services }: { services: RelatedService[] }) {
  if (services.length === 0) return null

  return (
    <section
      className="relative bg-[#0c1230] py-20 lg:py-24 overflow-hidden"
      aria-labelledby="related-heading"
    >
      <div
        className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <TacticalLabel>Related Services</TacticalLabel>
        <AccentLine />
        <h2
          id="related-heading"
          className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-10"
        >
          You may also need
        </h2>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          role="list"
        >
          {services.map((svc) => (
            <li key={svc.slug}>
              <Link
                href={svc.href}
                className="group relative block bg-[#131a3e] hover:bg-[#1a2347] border border-white/10 hover:border-red-600/40 rounded-sm p-7 lg:p-8 h-full transition-colors focus-visible:outline-2 focus-visible:outline-red-600"
                aria-label={`${svc.title} — view service details`}
              >
                {/* Command stripe on hover */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-l-sm"
                  aria-hidden="true"
                />

                <h3 className="text-white font-black text-base lg:text-lg tracking-wide uppercase mb-4 group-hover:text-red-400 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-white/60 text-sm leading-loose mb-6 line-clamp-3">
                  {svc.description}
                </p>
                <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold tracking-[0.15em] uppercase font-mono">
                  View Service
                  <ArrowRight
                    className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
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
