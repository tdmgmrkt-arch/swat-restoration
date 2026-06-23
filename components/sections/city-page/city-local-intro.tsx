import Image from "next/image"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import type { CityConfig } from "@/lib/cities/_types"

export default function CityLocalIntro({ cfg }: { cfg: CityConfig }) {
  const paragraphs = cfg.localIntro.split("\n\n").filter(Boolean)

  return (
    <section
      className="bg-white py-16 lg:py-20"
      aria-labelledby="local-intro-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        {/* Desktop: floated aside so long paragraphs wrap around and below it,
            short paragraphs close cleanly at its edge. */}
        <div className="hidden lg:block lg:float-right lg:w-120 lg:ml-12 lg:mb-6">
          <VerifiedCoverageAside cfg={cfg} />
        </div>

        <div>
          <TacticalLabel>Local Context</TacticalLabel>
          <AccentLine />
          <h2
            id="local-intro-heading"
            className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight mb-6"
          >
            Restoration in {cfg.name}
            <br />
            <span className="text-red-600">demands a fast response.</span>
          </h2>

          {/* Mobile-only aside — sits between the headline and the body copy so
              the headline frames the section, then the trust visual lands, then
              the paragraphs deliver the substance. */}
          <div className="lg:hidden mb-8">
            <VerifiedCoverageAside cfg={cfg} />
          </div>

          <div className="space-y-5">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-gray-600 text-base leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Clear the float so the section closes cleanly regardless of which
            column was taller. */}
        <div className="clear-both" aria-hidden="true" />
      </div>
    </section>
  )
}

function VerifiedCoverageAside({ cfg }: { cfg: CityConfig }) {
  return (
    <div className="relative bg-[#131a3e] border border-white/8 rounded-sm p-7 lg:p-8">
      <div className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600 rounded-l-sm" aria-hidden="true" />
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-red-600/50" aria-hidden="true" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-red-600/50" aria-hidden="true" />

      <div className="relative w-full aspect-4/3 mb-6 overflow-hidden rounded-sm border border-white/10 bg-black">
        <Image
          src={`/city-truck-images/${cfg.slug}.webp`}
          alt={`S.W.A.T. Restoration crew in ${cfg.name}, TX`}
          fill
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono mb-4">
        Verified Coverage
      </p>

      <p className="text-white/75 text-sm leading-loose mb-6">
        {cfg.entityAnchor}
      </p>

      <div>
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/40 mb-2">
          ZIP Codes Served
        </p>
        <div className="flex flex-wrap gap-2">
          {cfg.zipCodes.map((zip) => (
            <span
              key={zip}
              className="inline-flex items-center px-3 py-1 bg-red-600/10 border border-red-600/25 rounded-sm text-xs font-mono font-bold text-red-300 tracking-wider"
            >
              {zip}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
