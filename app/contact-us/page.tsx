import type { Metadata } from "next"
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  CalendarDays,
  Clock,
  MapPin,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { contactPageSchema, contactBreadcrumbSchema } from "@/lib/schema"
import { canonicalUrl, cn } from "@/lib/utils"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"
import { ContactForm } from "@/components/forms/contact-form"

import UtilityBar from "@/components/site/utility-bar"
import SiteHeader from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"
import FinalCta from "@/components/sections/final-cta"

const CANONICAL = canonicalUrl("/contact-us")

export const metadata: Metadata = {
  title: "Contact S.W.A.T. Restoration — Aledo, TX",
  description:
    "Reach S.W.A.T. Restoration in Aledo, TX — 24/7 emergency dispatch, direct phone line, office hours, and a fast-response contact form for water damage, fire damage, and mold remediation.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Contact S.W.A.T. Restoration — Aledo, TX",
    description:
      "Reach S.W.A.T. Restoration in Aledo, TX — 24/7 emergency dispatch, direct phone line, office hours, and a fast-response contact form for water damage, fire damage, and mold remediation.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact S.W.A.T. Restoration — Aledo, TX",
    description:
      "Reach S.W.A.T. Restoration in Aledo, TX — 24/7 emergency dispatch, direct phone line, office hours, and a fast-response contact form for water damage, fire damage, and mold remediation.",
  },
}

const hours = [
  { day: "Mon–Fri", time: "7:00 AM – 5:00 PM" },
  { day: "Saturday", time: "8:00 AM – 1:00 PM" },
  { day: "Sunday", time: "Closed" },
] as const

type City = { name: string; slug: string; featured?: boolean }

export default function ContactPage() {
  const featuredCities = (siteConfig.serviceArea as readonly City[]).filter(
    (c) => c.featured
  )
  const cityCount = siteConfig.serviceArea.length
  const ratingFallback = siteConfig.googleRatingFallback
  const loc = siteConfig.locations[0]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactBreadcrumbSchema()),
        }}
      />

      <UtilityBar />
      <SiteHeader />

      <main id="main-content">
        {/* ============================================================== */}
        {/* 1. HERO — 2-column: copy/CTA + form (form lives above the fold) */}
        {/* ============================================================== */}
        <section
          className="relative isolate bg-[#0c1230] pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden"
          aria-labelledby="contact-heading"
        >
          {/* Background image */}
          <Image
            src="/hero-images/contacthero.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-right lg:object-center -z-10 opacity-55 scale-110 lg:translate-x-[4%]"
            priority
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-r from-[#0c1230] from-0% via-[#0c1230]/85 via-50% to-[#0c1230]/60 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-t from-[#0c1230] via-transparent to-[#0c1230]/50 pointer-events-none"
            aria-hidden="true"
          />

          {/* Tactical grid */}
          <div
            className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Red left stripe */}
          <div
            className="absolute left-0 inset-y-0 w-1 bg-red-600"
            aria-hidden="true"
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_15%_40%,rgba(220,38,38,0.08),transparent)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Corner marks */}
          <div
            className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/30 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/30 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* LEFT — headline + direct line + trust */}
              <div className="lg:col-span-5 lg:pt-4">
                <TacticalLabel>Direct Contact</TacticalLabel>
                <AccentLine />

                <h1
                  id="contact-heading"
                  className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5"
                >
                  <span className="whitespace-nowrap">First Responders</span>
                  <br />
                  <span className="text-red-500 whitespace-nowrap">for Water &amp; Fire.</span>
                </h1>

                <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
                  Water damage, fire damage, mold remediation — one number,
                  live dispatch, crew rolls within the hour.
                </p>

                {/* Direct line — single Aledo hub */}
                <div className="mb-7">
                  <DirectLineCard
                    label="Aledo Hub"
                    phone={loc.phone}
                    tel={loc.tel}
                  />
                </div>

                {/* Request Service button — secondary action */}
                <Link
                  href="/water-damage"
                  className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase",
                    "px-7 py-3.5 rounded-sm border border-red-500/40 min-h-12 transition-colors w-full sm:w-auto"
                  )}
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  View Services
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                {/* Trust ribbon — operational proof */}
                <ul
                  role="list"
                  className="mt-9 grid grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden"
                >
                  <TrustStat value="24/7" label="Dispatch" pulse />
                  <TrustStat value="<60" label="Min Arrival" unit="MIN" />
                  <TrustStat value={`${ratingFallback.rating}★`} label={`${ratingFallback.count}+ Reviews`} />
                </ul>

                {/* Active emergency callout — high-urgency redirect to phone */}
                <div className="mt-6 relative bg-red-600/8 border border-red-600/35 rounded-sm p-5">
                  <div
                    className="absolute top-0 left-0 w-1 h-full bg-red-600"
                    aria-hidden="true"
                  />
                  <div className="flex items-start gap-3 pl-2">
                    <AlertTriangle
                      className="h-5 w-5 text-red-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-red-400 font-bold mb-1.5">
                        Active Emergency?
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed mb-2">
                        Water still rising, fire just out, or sewage backing up?
                        Don&apos;t wait on the form — call dispatch direct, 24/7.
                      </p>
                      <Link
                        href={loc.tel}
                        className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-mono font-bold text-base tracking-tight transition-colors"
                        aria-label={`Call dispatch at ${loc.phone}`}
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {loc.phone}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* What happens next — sets expectations, lowers form friction */}
                <div className="mt-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-white/55 font-semibold">
                      After You Submit
                    </span>
                    <span
                      className="h-px flex-1 bg-linear-to-r from-white/15 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <ol role="list" className="space-y-3">
                    <NextStep
                      index="01"
                      title="Dispatcher reviews your request"
                      copy="A real person reads your notes and matches an IICRC-trained crew to the loss."
                    />
                    <NextStep
                      index="02"
                      title="We reach out your way"
                      copy="Phone, text, or email — your call. We confirm timing and crew ETA."
                    />
                    <NextStep
                      index="03"
                      title="Insurance billing direct"
                      copy="Covered losses get documented for the adjuster and billed to your carrier — no out-of-pocket wait."
                    />
                  </ol>
                </div>
              </div>

              {/* RIGHT — form card, above the fold on desktop */}
              <div className="lg:col-span-7">
                <div className="relative">
                  {/* Tactical corner marks framing the form */}
                  <div
                    className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-red-600/60 pointer-events-none z-10"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-red-600/60 pointer-events-none z-10"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-red-600/60 pointer-events-none z-10"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-red-600/60 pointer-events-none z-10"
                    aria-hidden="true"
                  />

                  {/* Form header strip */}
                  <div className="relative bg-[#131a3e] border border-white/12 border-b-0 rounded-t-sm px-6 lg:px-8 pt-5 pb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-400 font-semibold mb-1">
                        Request Service
                      </p>
                      <h2
                        id="contact-form-heading"
                        className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight"
                      >
                        Tell us what&apos;s going on.
                      </h2>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                      </span>
                      <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/45 font-semibold">
                        Live Intake
                      </span>
                    </div>
                  </div>

                  {/* Suspense boundary required because ContactForm uses
                      useSearchParams() to read ?service= and &detail= for
                      deep-linked service-page CTAs. */}
                  <Suspense fallback={null}>
                    <ContactForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. SINGLE LOCATION CARD — Aledo only                           */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#0c1230] py-20 lg:py-24 overflow-hidden"
          aria-labelledby="locations-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            {/* Full-width header band — left-aligned, matches service-area.tsx pattern */}
            <div className="mb-12 max-w-3xl">
              <TacticalLabel>Service Hub</TacticalLabel>
              <AccentLine />
              <h2
                id="locations-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
              >
                Aledo HQ.
                <br />
                <span className="text-red-500">DFW-Wide Reach.</span>
              </h2>
              <p className="mt-4 text-white/55 text-base sm:text-lg leading-relaxed">
                One base. Twenty-four hours. S.W.A.T. Restoration dispatches
                from Aledo to {cityCount}+ communities across Tarrant, Parker,
                Denton &amp; Johnson counties.
              </p>
            </div>

            {/* Full-width tactical panel — no max-w clamp */}
            <LocationCard loc={loc} />
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. SERVICE AREAS                                                */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#131a3e] border-y border-white/8 py-20 lg:py-24 overflow-hidden"
          aria-labelledby="service-areas-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 inset-y-0 w-0.75 bg-linear-to-b from-transparent via-red-600 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <TacticalLabel>Area of Operations</TacticalLabel>
                <AccentLine />
                <h2
                  id="service-areas-heading"
                  className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
                >
                  Primary Response Zones
                </h2>
                <p className="mt-4 text-white/55 text-base leading-relaxed">
                  Serving {cityCount} North Texas communities across Tarrant,
                  Parker, Denton &amp; Johnson counties. Featured markets below.
                </p>
              </div>

              <Link
                href="/areas-served"
                className="inline-flex items-center gap-2 self-start border border-white/15 hover:border-red-600/50 text-white/75 hover:text-white text-xs font-semibold tracking-[0.15em] uppercase px-5 py-3 rounded-sm transition-colors font-mono shrink-0 min-h-11"
              >
                View All {cityCount}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>

            {/* Featured city tile grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {featuredCities.map((city, index) => (
                <ServiceAreaChip key={city.slug} city={city} index={index + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. FINAL CTA (reuse)                                            */}
        {/* ============================================================== */}
        <FinalCta />
      </main>

      <SiteFooter />
      <MobileCtaBar />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Direct Line Card — hero phone CTA                                   */
/* ------------------------------------------------------------------ */
function DirectLineCard({
  label,
  phone,
  tel,
}: {
  label: string
  phone: string
  tel: string
}) {
  return (
    <Link
      href={tel}
      className={cn(
        "group relative flex flex-col gap-1.5",
        "bg-[#131a3e] border border-white/12 hover:border-red-600/50",
        "rounded-sm px-4 py-3.5 min-h-16 transition-colors"
      )}
      aria-label={`Call ${label} at ${phone}`}
    >
      <span className="flex items-center gap-2">
        <Phone className="h-3.5 w-3.5 text-red-500 shrink-0" aria-hidden="true" />
        <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/55 font-semibold">
          {label}
        </span>
      </span>
      <span className="text-white font-bold text-lg tracking-tight group-hover:text-red-400 transition-colors">
        {phone}
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/* Next Step — numbered step in the "After You Submit" list             */
/* ------------------------------------------------------------------ */
function NextStep({
  index,
  title,
  copy,
}: {
  index: string
  title: string
  copy: string
}) {
  return (
    <li className="flex items-start gap-3.5">
      <span
        className="shrink-0 w-8 h-8 bg-red-600/15 border border-red-600/40 text-red-400 font-mono font-bold text-xs tracking-tight flex items-center justify-center rounded-sm"
        aria-hidden="true"
      >
        {index}
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-white font-bold text-sm leading-tight mb-1">
          {title}
        </p>
        <p className="text-white/55 text-[13px] leading-relaxed">{copy}</p>
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Trust Stat — small operational readout pill                          */
/* ------------------------------------------------------------------ */
function TrustStat({
  value,
  label,
  unit,
  pulse,
}: {
  value: string
  label: string
  unit?: string
  pulse?: boolean
}) {
  return (
    <li className="bg-[#131a3e] px-3 py-3.5 flex flex-col items-center justify-center gap-1.5 text-center">
      <div className="flex items-baseline gap-1">
        <span className="text-xl sm:text-2xl font-black text-white font-mono leading-none tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-[9px] font-bold text-red-400 font-mono">
            {unit}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        {pulse && (
          <span className="relative flex h-1 w-1" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1 w-1 bg-red-500" />
          </span>
        )}
        <span className="text-[9px] font-semibold tracking-[0.15em] uppercase text-white/50 font-mono">
          {label}
        </span>
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Location Card — single Aledo hub                                    */
/* ------------------------------------------------------------------ */
type LocationData = (typeof siteConfig.locations)[number]

function LocationCard({ loc }: { loc: LocationData }) {
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`
  )}&output=embed`

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${loc.address}, ${loc.city}, ${loc.state} ${loc.zip}`
  )}`

  return (
    <div className="relative bg-[#131a3e] border border-red-600/30 rounded-sm overflow-hidden">
      {/* Red left command stripe — marks this as the primary hub */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600"
        aria-hidden="true"
      />

      {/* Tactical corner marks */}
      <div
        className="absolute top-3 left-3 w-3 h-3 border-t border-l border-red-600/55 pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-3 right-3 w-3 h-3 border-t border-r border-red-600/55 pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-red-600/55 pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-red-600/55 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Card header strip */}
      <div className="flex items-center justify-between pl-7 pr-6 pt-5 pb-4 border-b border-white/8">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/55 font-semibold">
            {loc.city.toUpperCase()}, {loc.state} HUB
          </span>
          <h3 className="hidden sm:block text-white text-lg font-black tracking-tight leading-tight">
            {loc.city}, {loc.state}
          </h3>
        </div>
        <span
          className="relative flex h-1.5 w-1.5"
          aria-label="Dispatch live"
          role="status"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
        </span>
      </div>

      {/*
        Command-center body
        Mobile: single column — Phone → Address → Hours → Emergency → Map
        Tablet (md): 2-col — (Phone + Address + Hours + Emergency) | Map
        Desktop (lg): 3-col — Phone+Address | Hours+Emergency | Map
      */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] lg:grid-cols-[1fr_1fr_1.2fr]">

        {/* ── Col 1: Phone + Address ── */}
        <div className="pl-7 pr-6 py-6 flex flex-col gap-5 border-b border-white/8 md:border-b-0 md:border-r lg:border-r">

          {/* Phone — primary action */}
          <div>
            <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/45 font-semibold mb-2">
              Direct Line
            </div>
            <Link
              href={loc.tel}
              className={cn(
                "group flex items-center justify-between gap-3",
                "bg-red-600/8 hover:bg-red-600/15 border border-red-600/30 hover:border-red-600/55",
                "rounded-sm px-4 py-3.5 min-h-14 transition-colors"
              )}
              aria-label={`Call ${loc.city} at ${loc.phone}`}
            >
              <span className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-red-400 shrink-0" aria-hidden="true" />
                <span className="text-white font-bold text-lg tracking-tight group-hover:text-red-300 transition-colors">
                  {loc.phone}
                </span>
              </span>
              <ArrowUpRight
                className="h-4 w-4 text-red-400/60 group-hover:text-red-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin
              className="h-4 w-4 text-red-500 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/45 font-semibold mb-1.5">
                Address
              </div>
              <address className="not-italic text-white/75 text-sm leading-relaxed">
                {loc.address}
                <br />
                {loc.city}, {loc.state} {loc.zip}
              </address>
            </div>
          </div>
        </div>

        {/* ── Col 2: Hours + Emergency ── */}
        <div className="px-6 py-6 flex flex-col gap-5 border-b border-white/8 lg:border-b-0 lg:border-r">

          {/* Hours table */}
          <div className="flex items-start gap-3">
            <Clock
              className="h-4 w-4 text-red-500 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="min-w-0 w-full">
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/45 font-semibold mb-1.5">
                Office Hours
              </div>
              <dl className="space-y-0.5 text-sm">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex items-baseline gap-2">
                    <dt className="text-white/45 font-mono text-[11px] tracking-wider w-16 shrink-0">
                      {day}
                    </dt>
                    <dd
                      className={cn(
                        "font-medium text-[13px]",
                        time === "Closed" ? "text-white/30" : "text-white/80"
                      )}
                    >
                      {time}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* 24/7 Emergency callout */}
          <div className="flex items-start gap-3 bg-red-600/10 border border-red-600/30 rounded-sm p-4 mt-auto">
            <AlertTriangle
              className="h-4 w-4 text-red-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <div className="text-red-400 font-bold text-[11px] tracking-[0.15em] uppercase font-mono mb-1">
                24/7 Emergency
              </div>
              <div className="text-white/65 text-xs leading-relaxed">
                Flood, fire, or mold emergency? Dispatch is always live — outside
                office hours included.
              </div>
            </div>
          </div>
        </div>

        {/* ── Col 3: Embedded map ── */}
        <div className="flex flex-col">
          {/* Map embed — square-ish on desktop, 16/10 on mobile */}
          <div className="relative aspect-video md:aspect-auto md:h-full min-h-56 lg:min-h-0">
            <div
              className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-600/50 pointer-events-none z-10"
              aria-hidden="true"
            />
            <div
              className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-600/50 pointer-events-none z-10"
              aria-hidden="true"
            />

            <iframe
              src={mapsEmbedUrl}
              title={`Map of S.W.A.T. Restoration ${loc.city} location`}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label={`Google Maps showing ${loc.address}, ${loc.city}, ${loc.state}`}
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Directions footer */}
          <Link
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-center gap-2",
              "border-t border-white/8 bg-[#0c1230] hover:bg-red-600/10",
              "text-white/65 hover:text-white text-[11px] font-mono tracking-[0.2em] uppercase font-semibold",
              "py-3.5 min-h-12 transition-colors"
            )}
            aria-label={`Get directions to ${loc.address}, ${loc.city}, ${loc.state}`}
          >
            <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" aria-hidden="true" />
            Get Directions
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Service Area Chip                                                    */
/* ------------------------------------------------------------------ */
function ServiceAreaChip({ city, index }: { city: City; index: number }) {
  const inner = (
    <>
      <div className="font-mono text-[9px] text-white/40 tracking-wider group-hover:text-red-400 transition-colors">
        {String(index).padStart(2, "0")}
      </div>
      <div className="flex items-center gap-1.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
        <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" aria-hidden="true" />
        <span className="text-white text-base font-semibold leading-tight group-hover:text-red-300 transition-colors">
          {city.name}
        </span>
      </div>
      <ArrowUpRight
        className="absolute top-3 right-3 h-3.5 w-3.5 text-red-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out"
        aria-hidden="true"
      />
    </>
  )

  const cls =
    "group relative flex flex-col items-start gap-2 bg-[#131a3e] border border-white/10 rounded-sm p-4 hover:border-red-600/50 hover:bg-[#1a2347] transition-colors duration-200 min-h-20"

  if (siteConfig.cityPagesLive) {
    return (
      <Link
        href={`/areas-served/${city.slug}`}
        className={cls}
        aria-label={`Restoration service in ${city.name}, TX`}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div className={cls} aria-label={`Restoration service in ${city.name}, TX`}>
      {inner}
    </div>
  )
}
