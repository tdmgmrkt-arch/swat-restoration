import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  CalendarDays,
  AlertTriangle,
  Home,
  MapPin,
  Wrench,
  Flame,
  Droplets,
  ShieldCheck,
  ArrowRight,
  Search,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"

import UtilityBar from "@/components/site/utility-bar"
import SiteHeader from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"

export const metadata: Metadata = {
  title: "Signal Lost — Page Not Found",
  description:
    "The page you were looking for doesn't exist or has moved. Get back on track — or call dispatch directly for 24/7 emergency water, fire, and mold restoration.",
  robots: { index: false, follow: true },
}

const quickLinks = [
  {
    href: "/water-damage",
    icon: Droplets,
    title: "Water Damage",
    desc: "Extraction, structural drying, flood & burst pipe recovery",
  },
  {
    href: "/fire-damage",
    icon: Flame,
    title: "Fire & Smoke",
    desc: "Soot removal, odor neutralization, contents recovery",
  },
  {
    href: "/mold-remediation",
    icon: ShieldCheck,
    title: "Mold Remediation",
    desc: "Inspection, containment, removal, air quality restoration",
  },
  {
    href: "/reconstruction",
    icon: Wrench,
    title: "Reconstruction & Roofing",
    desc: "Full-scope rebuild, roofing, pack-out, insurance claims",
  },
  {
    href: "/areas-served",
    icon: MapPin,
    title: "Areas Served",
    desc: `${siteConfig.serviceArea.length} communities across DFW`,
  },
  {
    href: "/contact-us",
    icon: Phone,
    title: "Contact",
    desc: "Request service or talk to dispatch",
  },
] as const

export default function NotFound() {
  return (
    <>
      <UtilityBar />
      <SiteHeader />

      <main id="main-content">
        {/* ============================================================== */}
        {/* HERO — tactical "signal lost" treatment                        */}
        {/* ============================================================== */}
        <section
          className="relative isolate bg-[#0c1230] overflow-hidden min-h-[60vh] flex items-center"
          aria-labelledby="notfound-heading"
        >
          {/* Background layers */}
          <div
            className="absolute inset-0 -z-10 bg-linear-to-b from-[#080d24] via-[#0c1230] to-[#131a3e] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(220,38,38,0.18),transparent_70%)] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 tactical-grid opacity-30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Red left stripe */}
          <div
            className="absolute left-0 inset-y-0 w-1 bg-red-600 z-0"
            aria-hidden="true"
          />

          {/* Corner marks */}
          <div
            className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-red-600/50 pointer-events-none z-0 hidden sm:block"
            aria-hidden="true"
          />
          <div
            className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/50 pointer-events-none z-0"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-red-600/50 pointer-events-none z-0 hidden sm:block"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/50 pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
              {/* Big 404 — tactical numeric callout */}
              <div className="relative">
                <div
                  className="text-[120px] sm:text-[160px] lg:text-[200px] xl:text-[240px] font-black text-white leading-none tracking-tighter font-mono select-none"
                  aria-hidden="true"
                >
                  4<span className="text-red-500">0</span>4
                </div>
                <div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-red-600 via-red-600/50 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Right column — messaging + CTAs */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-red-600/15 border border-red-600/40 mb-5">
                  <AlertTriangle
                    className="h-3.5 w-3.5 text-red-400"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-300 font-bold">
                    Signal Lost
                  </span>
                </div>

                <TacticalLabel>Page Not Found</TacticalLabel>
                <AccentLine />

                <h1
                  id="notfound-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.07] mb-5"
                >
                  This page is off the grid.
                </h1>

                <p className="text-white/65 text-base sm:text-lg leading-relaxed mb-8">
                  The page you were looking for has moved, been retired, or
                  never existed. Dispatch is still standing by — pick a path
                  back below, or call the line directly.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Link
                    href="/"
                    className={cn(
                      "inline-flex items-center justify-center gap-2",
                      "bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase",
                      "px-7 py-3.5 rounded-sm border border-red-500/40 min-h-12 transition-colors",
                      "shadow-[0_8px_32px_-8px_rgba(220,38,38,0.5)]"
                    )}
                  >
                    <Home className="h-4 w-4" aria-hidden="true" />
                    Return to Base
                  </Link>
                  <Link
                    href={siteConfig.phone.primary_tel}
                    className={cn(
                      "inline-flex items-center justify-center gap-2",
                      "border border-white/25 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40",
                      "font-semibold text-sm tracking-wide uppercase",
                      "px-7 py-3.5 rounded-sm min-h-12 transition-colors"
                    )}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call {siteConfig.phone.primary}
                  </Link>
                </div>

                <p className="text-white/40 text-xs font-mono tracking-wider">
                  24/7 dispatch · Aledo + DFW
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* QUICK LINKS — common destinations                              */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#131a3e] border-t border-white/8 py-14 lg:py-20 overflow-hidden"
          aria-labelledby="quick-links-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3">
                <Search
                  className="h-3.5 w-3.5 text-red-400"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-red-400 font-bold">
                  Quick Links
                </span>
                <div
                  className="h-px flex-1 bg-red-600/20"
                  aria-hidden="true"
                />
              </div>
              <h2
                id="quick-links-heading"
                className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
              >
                Where to next?
              </h2>
              <p className="mt-3 text-white/55 text-base leading-relaxed">
                You probably came in looking for one of these. Pick a path and
                we&apos;ll get you back on track.
              </p>
            </div>

            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            >
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group relative flex items-start gap-3 p-5 lg:p-6 h-full",
                        "bg-[#0c1230] border border-white/10 hover:border-red-600/40 rounded-sm transition-colors"
                      )}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-600/0 group-hover:bg-red-600 transition-colors"
                        aria-hidden="true"
                      />
                      <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-red-600/10 border border-red-600/30 shrink-0">
                        <Icon
                          className="h-4 w-4 text-red-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                          <p className="text-white text-base font-black tracking-tight leading-tight group-hover:text-red-400 transition-colors">
                            {link.title}
                          </p>
                          <ArrowRight
                            className="h-3.5 w-3.5 text-white/40 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-white/55 text-xs sm:text-sm leading-relaxed">
                          {link.desc}
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* ============================================================== */}
        {/* EMERGENCY STRIP — 24/7 dispatch reminder                       */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#0c1230] py-12 lg:py-16 overflow-hidden"
          aria-labelledby="emergency-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-25 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 inset-y-0 w-0.75 bg-linear-to-b from-transparent via-red-600 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
            <div className="relative bg-[#131a3e] border-2 border-dashed border-red-600/50 rounded-sm p-7 lg:p-9 shadow-[0_0_0_1px_rgba(220,38,38,0.1),0_8px_30px_-12px_rgba(220,38,38,0.25)]">
              <div
                className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600 rounded-l-sm"
                aria-hidden="true"
              />
              <div
                className="absolute top-3 left-3 w-3 h-3 border-t border-l border-red-600/60"
                aria-hidden="true"
              />
              <div
                className="absolute top-3 right-3 w-3 h-3 border-t border-r border-red-600/60"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-red-600/30"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-red-600/30"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span
                      className="relative flex h-2 w-2"
                      aria-hidden="true"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-red-400 font-mono">
                      Active Emergency?
                    </span>
                  </div>
                  <h2
                    id="emergency-heading"
                    className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mb-2"
                  >
                    Don&apos;t scroll. Call.
                  </h2>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                    Burst pipe, house fire, smoke damage, mold growth, storm
                    damage — dispatch is live 24/7. A real human answers, not
                    a voicemail tree.
                  </p>
                </div>

                <div className="flex flex-col gap-2 lg:min-w-[16rem]">
                  <Link
                    href={siteConfig.phone.primary_tel}
                    className={cn(
                      "inline-flex items-center justify-between gap-3",
                      "bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase",
                      "px-5 py-3.5 rounded-sm border border-red-500/40 min-h-12 transition-colors"
                    )}
                    aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.primary}`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Dispatch
                    </span>
                    <span className="font-mono">
                      {siteConfig.phone.primary}
                    </span>
                  </Link>
                  <Link
                    href="/contact-us"
                    className={cn(
                      "inline-flex items-center justify-between gap-3",
                      "border border-white/25 text-white bg-white/5 hover:bg-white/10 hover:border-white/40",
                      "font-semibold text-sm tracking-wide uppercase",
                      "px-5 py-3.5 rounded-sm min-h-12 transition-colors"
                    )}
                  >
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      Request Service
                    </span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <p className="text-center text-white/40 text-xs font-mono tracking-wider pt-1">
                    24/7 · Family owned · DFW
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <MobileCtaBar />
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  )
}
