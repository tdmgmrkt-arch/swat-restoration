import { MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"
import { siteConfig } from "@/lib/site-config"
import type { CityConfig } from "@/lib/cities/_types"

export default function CityMapEmbed({ cfg }: { cfg: CityConfig }) {
  const hubSlug = cfg.hasGbpListing ? cfg.primaryHubSlug : cfg.closestHubSlug
  const location = siteConfig.locations.find(
    (l) => l.name.toLowerCase().replace(/ /g, "-") === hubSlug
  )
  if (!location) return null

  const isLocalHub = cfg.hasGbpListing
  const driveLine = isLocalHub
    ? null
    : cfg.driveTimeMinutes > 0
      ? `~${cfg.driveTimeMinutes} min from your door`
      : null

  const fullAddress = `${location.address}, ${location.city}, ${location.state} ${location.zip}`
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    fullAddress
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    fullAddress
  )}`

  return (
    <section
      className="relative bg-[#0c1230] border-y border-white/8 py-16 lg:py-20 overflow-hidden"
      aria-labelledby={`city-map-${cfg.slug}-heading`}
    >
      <div
        className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <TacticalLabel>{isLocalHub ? "Response Hub" : "Closest Hub"}</TacticalLabel>
          <AccentLine />
          <h2
            id={`city-map-${cfg.slug}-heading`}
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight"
          >
            {isLocalHub ? `Serving ${cfg.name} from` : `Dispatching to ${cfg.name} from`}
            <br />
            <span className="text-red-500">
              {location.name} HQ
              {driveLine ? ` — ${driveLine}.` : "."}
            </span>
          </h2>
          <p className="mt-4 text-white/55 text-base leading-relaxed">
            {isLocalHub
              ? `Our ${location.name} office is the dispatch hub for every ${cfg.name} call. Drop a pin, get directions, or call the line below — all routed through this address.`
              : `Every ${cfg.name} call dispatches from our ${location.name} office. Same trucks, same crew, same response standard — just routed to your address.`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/8 rounded-sm overflow-hidden border border-white/10">
          {/* Map iframe */}
          <div className="relative lg:col-span-2 bg-[#1a2347] min-h-80">
            <iframe
              src={embedSrc}
              title={`Map of S.W.A.T. Restoration ${location.name} office`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Address + actions */}
          <div className="bg-[#1a2347] p-6 lg:p-7 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MapPin
                className="h-4 w-4 text-red-500 shrink-0"
                aria-hidden="true"
              />
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-red-400 font-mono">
                {location.name} Office
              </span>
            </div>

            <address className="not-italic text-white text-base leading-relaxed mb-5">
              <div className="font-semibold">{siteConfig.name}</div>
              <div className="text-white/80">{location.address}</div>
              <div className="text-white/80">
                {location.city}, {location.state} {location.zip}
              </div>
            </address>

            <Link
              href={location.tel}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase px-5 py-3 rounded-sm border border-red-500/40 min-h-11 transition-colors mb-3"
              aria-label={`Call ${location.name} at ${location.phone}`}
            >
              Call {location.phone}
            </Link>

            <Link
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white bg-transparent hover:bg-white/8 hover:border-white/35 font-semibold text-sm tracking-wide uppercase px-5 py-3 rounded-sm min-h-11 transition-colors"
            >
              Get Directions
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <div className="mt-auto pt-5 border-t border-white/8 text-white/45 text-xs leading-relaxed">
              24/7 dispatch — emergency calls answered live, day or night.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
