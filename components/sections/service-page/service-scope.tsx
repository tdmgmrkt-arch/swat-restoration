import { Check } from "lucide-react"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import type { ServiceConfig } from "@/lib/services-config"

export default function ServiceScope({ cfg }: { cfg: ServiceConfig }) {
  return (
    <section
      className="relative bg-[#0c1230] py-20 lg:py-24 overflow-hidden"
      aria-labelledby="scope-heading"
    >
      <div
        className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 inset-y-0 w-0.75 bg-linear-to-b from-transparent via-red-600 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="max-w-3xl mb-12">
          <TacticalLabel>Scope of Service</TacticalLabel>
          <AccentLine />
          <h2
            id="scope-heading"
            className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-3"
          >
            What&rsquo;s included
            <br />
            <span className="text-red-500">in this service.</span>
          </h2>
          <p className="text-white/55 text-base leading-relaxed">
            Every dispatch is fully equipped. Here&rsquo;s what S.W.A.T. Restoration covers under{" "}
            {cfg.name}.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4"
          role="list"
          aria-label={`${cfg.name} service scope`}
        >
          {cfg.scopeBullets.map((item) => (
            <li
              key={item}
              className="group flex items-start gap-3.5 bg-[#131a3e] hover:bg-[#1a2347] border border-white/10 hover:border-red-600/30 rounded-sm px-5 py-4 transition-colors"
            >
              <div className="mt-0.5 h-5 w-5 rounded-sm bg-red-600/15 border border-red-600/40 flex items-center justify-center shrink-0 group-hover:bg-red-600/25 transition-colors">
                <Check
                  className="h-3 w-3 text-red-400"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </div>
              <span className="text-white/85 text-sm sm:text-[15px] font-medium leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
