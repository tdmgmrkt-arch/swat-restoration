import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  CalendarDays,
  BookOpen,
  Droplets,
  Flame,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"

import SiteHeader from "@/components/site/site-header"
import PageBreadcrumb from "@/components/site/page-breadcrumb"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"
import FinalCta from "@/components/sections/final-cta"

const CANONICAL = `${siteConfig.url}/blog`

export const metadata: Metadata = {
  title:
    "Field Notes — Restoration Tips & Guides | S.W.A.T. Restoration Blog",
  description:
    "Practical restoration knowledge from IICRC-trained crews in Aledo and Fort Worth — water damage response, fire and smoke cleanup, mold prevention, and insurance claim guidance.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "Field Notes — S.W.A.T. Restoration Blog",
    description:
      "Practical restoration knowledge from IICRC-trained crews in Aledo and Fort Worth — water, fire, mold, and insurance claim guidance.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes — S.W.A.T. Restoration Blog",
    description:
      "Restoration tips, project breakdowns, and emergency-response guides from the SWAT crew.",
  },
}

const previewTopics = [
  {
    icon: Droplets,
    label: "Water Damage",
    body: "First 24 hours, drying timelines, what to document for your carrier.",
  },
  {
    icon: Flame,
    label: "Fire & Smoke",
    body: "Soot vs. char, odor remediation, salvage decisions on contents.",
  },
  {
    icon: ShieldCheck,
    label: "Mold & Air Quality",
    body: "When to test, when to remediate, and how to keep it from coming back.",
  },
  {
    icon: BookOpen,
    label: "Insurance Claims",
    body: "Working with adjusters, scope disputes, and what a complete file looks like.",
  },
] as const

export default function BlogPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <PageBreadcrumb current="Blog" />

        {/* ============================================================== */}
        {/* HERO                                                            */}
        {/* ============================================================== */}
        <section
          className="relative isolate bg-[#0c1230] pt-14 pb-12 lg:pt-20 lg:pb-16 overflow-hidden"
          aria-labelledby="blog-hero-heading"
        >
          <div
            className="absolute inset-0 -z-10 bg-linear-to-b from-[#0a0f28] via-[#0c1230] to-[#131a3e] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_30%_40%,rgba(220,38,38,0.10),transparent)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 tactical-grid opacity-25"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 inset-y-0 w-1 bg-red-600"
            aria-hidden="true"
          />
          <div
            className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/30"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/30"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="relative flex h-2 w-2"
                aria-hidden="true"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-red-400 font-mono">
                Intelligence Briefings
              </span>
            </div>

            <TacticalLabel>Field Notes</TacticalLabel>
            <AccentLine />

            <h1
              id="blog-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5"
            >
              From the Crew.
              <br />
              <span className="text-red-500">Not a content farm.</span>
            </h1>

            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mb-3">
              Practical restoration knowledge from IICRC-trained crews — water
              extraction timelines, fire and smoke cleanup, mold prevention,
              and what an insurance carrier actually needs in your file.
            </p>

            <p className="text-white/40 text-sm font-mono tracking-wide">
              Aledo, TX · Fort Worth, TX · 49 DFW Communities
            </p>
          </div>
        </section>

        {/* ============================================================== */}
        {/* COMING SOON — empty state with topic preview + CTAs            */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#131a3e] border-t border-white/8 py-16 lg:py-24 overflow-hidden"
          aria-labelledby="coming-soon-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-20"
            aria-hidden="true"
          />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
            {/* Empty state card */}
            <div className="relative bg-[#1a2347] border border-white/12 rounded-sm p-8 sm:p-12 lg:p-16 overflow-hidden">
              <div
                className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-red-600/60 pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-red-600/60 pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-red-600/60 pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-red-600/60 pointer-events-none z-10"
                aria-hidden="true"
              />

              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-red-600/15 border border-red-600/40 mb-6">
                  <BookOpen
                    className="h-6 w-6 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <h2
                  id="coming-soon-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4"
                >
                  First dispatch{" "}
                  <span className="text-red-500">coming soon.</span>
                </h2>
                <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                  We&apos;re writing field-tested restoration guides — from
                  real jobs, not stock copy. Subscribe by phone or check back
                  shortly. Until then, here&apos;s what we&apos;ll cover.
                </p>
              </div>

              {/* Topic preview grid */}
              <ul
                role="list"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 mb-10"
              >
                {previewTopics.map((t) => {
                  const Icon = t.icon
                  return (
                    <li
                      key={t.label}
                      className="bg-[#131a3e] border border-white/10 rounded-sm p-5 flex items-start gap-4"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-red-600/10 border border-red-600/30 shrink-0">
                        <Icon
                          className="h-5 w-5 text-red-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="text-white text-base font-black tracking-tight leading-tight mb-1.5">
                          {t.label}
                        </p>
                        <p className="text-white/60 text-sm leading-relaxed">
                          {t.body}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={siteConfig.phone.primary_tel}
                  className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase",
                    "px-7 py-3.5 rounded-sm border border-red-500/40 min-h-12 transition-colors"
                  )}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.phone.primary}
                </Link>
                <Link
                  href="/contact-us"
                  className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "border border-white/25 text-white bg-transparent hover:bg-white/8 hover:border-white/40",
                    "font-semibold text-sm tracking-wide uppercase",
                    "px-7 py-3.5 rounded-sm min-h-12 transition-colors"
                  )}
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Request Service
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* FINAL CTA                                                       */}
        {/* ============================================================== */}
        <FinalCta />
      </main>

      <SiteFooter />
      <MobileCtaBar />
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  )
}
