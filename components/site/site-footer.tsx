import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  MapPin,
  Mail,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Star,
} from "lucide-react"
import { siteConfig } from "@/lib/site-config"

const featuredServices = [
  { label: "Water Damage Restoration", href: "/water-damage" },
  { label: "Fire & Smoke Damage", href: "/fire-damage" },
  { label: "Mold Remediation", href: "/mold-remediation" },
  { label: "Pack-Out & Cleaning", href: "/reconstruction/pack-out-cleaning" },
  { label: "Roofing Services", href: "/reconstruction/roofing" },
  { label: "Insurance Claim Assistance", href: "/insurance-claims" },
]

const company = [
  { label: "About Us", href: "/about-us" },
  { label: "Insurance Claims", href: "/insurance-claims" },
  { label: "Contact", href: "/contact-us" },
  { label: "Areas Served", href: "/areas-served" },
  { label: "Blog", href: "/blog" },
]

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const totalAreas = siteConfig.serviceArea.length
  const primaryAreas = siteConfig.serviceArea.filter(
    (c) => "featured" in c && c.featured
  )
  const extendedAreas = siteConfig.serviceArea.filter(
    (c) => !("featured" in c && c.featured)
  )

  return (
    <footer className="bg-[#0c1230] border-t border-white/8" aria-label="Site footer">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Col 1: Brand + locations + authority signals */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center mb-4 group" aria-label="S.W.A.T. Restoration Home">
              <Image
                src="/swatroughlogo.png"
                alt="S.W.A.T. Restoration"
                width={375}
                height={322}
                className="h-16 w-auto"
              />
            </Link>

            <p className="text-white/45 text-sm leading-snug mb-5 max-w-xs">
              First responders for water &amp; fire disasters. Family owned and operated across DFW.
            </p>

            {/* Locations */}
            <div className="space-y-3">
              {siteConfig.locations.map((loc) => (
                <address
                  key={loc.name}
                  className="not-italic"
                  itemScope
                  itemType="http://schema.org/PostalAddress"
                >
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-white/60 text-xs font-semibold tracking-wide uppercase mb-0.5">
                        {loc.name}
                      </div>
                      <div className="text-white/40 text-xs leading-relaxed">
                        <span itemProp="streetAddress">{loc.address}</span>
                        <br />
                        <span itemProp="addressLocality">{loc.city}</span>,{" "}
                        <span itemProp="addressRegion">{loc.state}</span>{" "}
                        <span itemProp="postalCode">{loc.zip}</span>
                      </div>
                      <Link
                        href={loc.tel}
                        className="text-white/50 text-xs hover:text-red-400 transition-colors mt-0.5 inline-flex items-center gap-1"
                        aria-label={`Call ${loc.name} office at ${loc.phone}`}
                      >
                        <Phone className="h-3 w-3" aria-hidden="true" />
                        {loc.phone}
                      </Link>
                    </div>
                  </div>
                </address>
              ))}
            </div>

          </div>

          {/* Col 2: Featured Services */}
          <div>
            <h3 className="text-white/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-2" role="list">
              {featuredServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors leading-relaxed flex items-center min-h-9"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h3 className="text-white/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2" role="list">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors leading-relaxed flex items-center min-h-9"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Emergency contact — strengthened to read as a final CTA, not an info card */}
          <div>
            <h3 className="text-white/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
              Emergency Line
            </h3>
            <div className="relative bg-white/4 border border-red-600/30 rounded-sm p-5">
              {/* Red command stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600"
                aria-hidden="true"
              />
              {/* Corner marks */}
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-red-600/50" aria-hidden="true" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-red-600/50" aria-hidden="true" />

              <div className="flex items-center gap-1.5 mb-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                <span className="text-red-400 text-[10px] font-semibold tracking-[0.15em] uppercase font-mono">
                  24/7 Available
                </span>
              </div>

              {/* Phone number — now red, gets the visual weight it deserves */}
              <Link
                href={siteConfig.phone.primary_tel}
                className="text-red-500 hover:text-red-400 font-black text-xl font-mono tracking-tight transition-colors block mb-3 leading-none"
                aria-label={`Call S.W.A.T. Restoration emergency line at ${siteConfig.phone.primary}`}
              >
                {siteConfig.phone.primary}
              </Link>

              {/* Supporting urgency proof */}
              <ul role="list" className="space-y-1.5 mb-4">
                <li className="flex items-center gap-2 text-white/65 text-xs">
                  <span className="h-1 w-1 rounded-full bg-red-500 shrink-0" aria-hidden="true" />
                  Under 60-min arrival
                </li>
                <li className="flex items-center gap-2 text-white/65 text-xs">
                  <span className="h-1 w-1 rounded-full bg-red-500 shrink-0" aria-hidden="true" />
                  Dispatch in minutes
                </li>
              </ul>

              {/* Call Now button — closes the CTA */}
              <Link
                href={siteConfig.phone.primary_tel}
                className="inline-flex items-center justify-center gap-1.5 w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide uppercase py-2.5 rounded-sm transition-colors min-h-10"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Call Now
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>

              <div className="mt-4 pt-3 border-t border-white/8">
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-white/35 text-xs hover:text-white/60 transition-colors min-h-9"
                  aria-label="Email S.W.A.T. Restoration"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {siteConfig.email}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Service Areas — split into Primary Response + Extended Coverage */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10">
          <div className="mb-5">
            <h3 className="text-white/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-1.5">
              Service Areas
            </h3>
            <p className="text-white/35 text-xs leading-relaxed max-w-xl">
              {`Serving ${totalAreas} DFW communities across Tarrant, Parker, Denton & Johnson counties from our Aledo office. Family owned & operated.`}
            </p>
          </div>

          {/* Primary Response Areas */}
          {primaryAreas.length > 0 && (
            <div className="mb-7">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="h-px w-6 bg-red-600/50" aria-hidden="true" />
                <span className="text-red-400 text-[9px] font-bold tracking-[0.25em] uppercase font-mono">
                  Primary Response
                </span>
              </div>
              <ul
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1.5"
                role="list"
              >
                {primaryAreas.map((city) => {
                  const cls =
                    "text-white/85 text-xs font-semibold leading-relaxed py-0.5 hover:text-white transition-colors"
                  const label = `${city.name}, TX`
                  return (
                    <li key={city.slug}>
                      {siteConfig.cityPagesLive ? (
                        <Link href={`/areas-served/${city.slug}`} className={cls}>
                          {label}
                        </Link>
                      ) : (
                        <span className={cls}>{label}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Extended Coverage — collapsed by default behind <details>.
              Content stays in the DOM so Google still indexes the cities; we
              just stop dumping them visually on every page load. */}
          {extendedAreas.length > 0 && (
            <details className="group">
              <summary className="list-none cursor-pointer inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                <span className="h-px w-6 bg-white/15" aria-hidden="true" />
                <span className="text-white/50 text-[9px] font-bold tracking-[0.25em] uppercase font-mono">
                  Extended Coverage
                </span>
                <span className="text-white/40 text-[10px] font-mono tracking-wider">
                  ({extendedAreas.length} more)
                </span>
                <span
                  className="text-white/40 text-[10px] transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  ▼
                </span>
              </summary>
              <ul
                className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1.5"
                role="list"
              >
                {extendedAreas.map((city) => {
                  const cls =
                    "text-white/30 text-xs leading-relaxed py-0.5 hover:text-white/60 transition-colors"
                  const label = `${city.name}, TX`
                  return (
                    <li key={city.slug}>
                      {siteConfig.cityPagesLive ? (
                        <Link href={`/areas-served/${city.slug}`} className={cls}>
                          {label}
                        </Link>
                      ) : (
                        <span className={cls}>{label}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </details>
          )}

          {/* View All — outlined button below the lists, bumped to a stronger weight */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/areas-served"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-red-600/50 text-white/85 hover:text-white text-sm font-bold tracking-[0.18em] uppercase px-7 py-3.5 rounded-sm transition-colors font-mono min-h-12"
            >
              View All {totalAreas} Communities
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Trust signal row — quiet authority closer, no new color or motion */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5">
          <ul
            role="list"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-white/55"
          >
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-white/55" aria-hidden="true" />
              <span className="text-xs font-medium tracking-wide">
                Licensed &amp; Insured
              </span>
            </li>
            <li className="inline-flex items-center gap-2">
              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" aria-hidden="true" />
              <span className="text-xs font-medium tracking-wide">
                <span className="text-white/80 font-bold font-mono">
                  {siteConfig.googleRatingFallback.rating.toFixed(1)}
                </span>{" "}
                Google ·{" "}
                {siteConfig.googleRatingFallback.count.toLocaleString("en-US")}+
                reviews
              </span>
            </li>
            <li className="inline-flex items-center gap-2">
              <BadgeCheck className="h-3.5 w-3.5 text-white/55" aria-hidden="true" />
              <span className="text-xs font-medium tracking-wide">
                Insurance Claim Experienced
              </span>
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
              </span>
              <span className="text-xs font-medium tracking-wide">
                24/7 Dispatch
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/25 text-xs">
          <p>
            &copy; {currentYear} S.W.A.T. Restoration. All rights reserved. · Aledo, TX
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/50 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
