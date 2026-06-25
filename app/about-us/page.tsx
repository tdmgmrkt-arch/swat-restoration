import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  CalendarDays,
  Compass,
  Scale,
  ShieldCheck,
  Hammer,
  Handshake,
  Building2,
  Check,
  Users,
  Heart,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { canonicalUrl, cn } from "@/lib/utils"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"

import SiteHeader from "@/components/site/site-header"
import PageBreadcrumb from "@/components/site/page-breadcrumb"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"
import FinalCta from "@/components/sections/final-cta"

const CANONICAL = canonicalUrl("/about-us")

export const metadata: Metadata = {
  title:
    "About S.W.A.T. Restoration — Family-Owned Restoration in Aledo & DFW, TX",
  description:
    "Meet Dillon and Danielle Patterson — the family behind S.W.A.T. Restoration, the first responders for water and fire disasters across Aledo, Fort Worth, and the DFW metroplex.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title:
      "About S.W.A.T. Restoration — Family-Owned in Aledo & DFW, TX",
    description:
      "Meet Dillon and Danielle Patterson — the family behind S.W.A.T. Restoration. First responders for water and fire disasters across the DFW metroplex.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About S.W.A.T. Restoration — Family-Owned, 24/7, DFW",
    description:
      "Meet the Patterson family — first responders for water and fire disasters across Aledo, Fort Worth, and 49+ DFW communities.",
  },
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const coreValues = [
  {
    icon: Compass,
    title: "Rapid Response",
    body:
      "Water damage doubles in the first 24 hours. Fire damage worsens by the minute. Every member of the crew operates with the same urgency, the same standard, the same playbook — from first call to final restoration.",
  },
  {
    icon: Scale,
    title: "Honesty",
    body:
      "Straight answers about what's salvageable, what's not, and what your carrier will cover. You'll know the real scope, the real timeline, and the real cost — before a single piece of equipment goes in the door.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    body:
      "If it isn't right, we don't leave. The job ends when your property is restored and your file is complete — not when the clock says it's time to roll. How we do anything is how we do everything.",
  },
] as const

type Owner = {
  name: string
  role: string
  bio: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  photo: string
  photoAlt: string
}

const owners: readonly Owner[] = [
  {
    name: "Dillon Patterson",
    role: "Owner",
    icon: Hammer,
    photo: "/dillon.webp",
    photoAlt: "Dillon Patterson, co-owner of S.W.A.T. Restoration",
    bio: "Founded S.W.A.T. Restoration with Danielle. Leads field operations, complex damage assessments, and the crew that shows up at 2 a.m. when a pipe bursts or a kitchen catches fire. The buck stops at the truck — and that's exactly how he wants it.",
  },
  {
    name: "Danielle Patterson",
    role: "Owner",
    icon: Heart,
    photo: "/danielle.webp",
    photoAlt: "Danielle Patterson, co-owner of S.W.A.T. Restoration",
    bio: "Co-founded S.W.A.T. Restoration with Dillon. Runs the operational and financial side of the business — insurance coordination, billing, vendor relationships, and the office that keeps every crew dispatched and every file complete.",
  },
] as const

const codeOfEthics = [
  {
    icon: Building2,
    label: "Our Company & Ourselves",
    items: [
      "We take full responsibility for everything we do.",
      "We hold ourselves to the highest standard — a model of excellence to others.",
      "We push ourselves to be better than we were before.",
      "We build an environment where each team member contributes their best — and is rewarded for it.",
      "We earn an ethical, respectable income for the value we deliver.",
      "We leave a positive, lasting impression on everyone we meet.",
      "How you do anything is how you do everything.",
    ],
  },
  {
    icon: Handshake,
    label: "Our Clients",
    items: [
      "We market our services ethically.",
      "We serve our clients, not the other way around.",
      "We meet every homeowner with empathy — they're in the worst day of their year.",
      "We deliver strategies that work — and work hard to make them better.",
      "We add value, and accept fair compensation for that value.",
      "We provide accountability for those who want it.",
    ],
  },
  {
    icon: Hammer,
    label: "Our Vendors & Partners",
    items: [
      "We build vendor relationships that positively serve our clients.",
      "We build win/win relationships with our vendors and insurance partners.",
      "We hold our vendors to the highest standards — and hold ourselves to the same.",
    ],
  },
] as const

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <PageBreadcrumb current="About Us" />

        {/* ============================================================== */}
        {/* 1. HERO                                                         */}
        {/* ============================================================== */}
        <section
          className="relative isolate bg-[#0c1230] pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden"
          aria-labelledby="about-heading"
        >
          {/* Background image — heavily masked for legibility */}
          <Image
            src="/hero-images/service-pages-hero.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center -z-10 opacity-55"
            priority
          />
          {/* Stacked overlays — left-weighted so headline copy sits on near-solid backdrop */}
          <div
            className="absolute inset-0 -z-10 bg-linear-to-r from-[#0c1230] from-0% via-[#0c1230]/85 via-50% to-[#0c1230]/60 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-t from-[#0c1230] via-transparent to-[#0c1230]/50 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute left-0 inset-y-0 w-1 bg-red-600"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_20%_45%,rgba(220,38,38,0.08),transparent)] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-red-600/30 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-red-600/30 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* LEFT — copy + CTAs */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <TacticalLabel>Family Owned · DFW HQ · 24/7</TacticalLabel>
                <AccentLine />

                <h1
                  id="about-heading"
                  className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6"
                >
                  First responders
                  <br />
                  <span className="text-red-500">for water &amp; fire.</span>
                </h1>

                <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mb-5">
                  S.W.A.T. Restoration is your family-owned damage restoration
                  crew — right here in DFW. Water damage at 2&nbsp;a.m., a
                  kitchen fire on a Tuesday, mold uncovered behind a wall on
                  Sunday: we run the same playbook every call, every hour.
                </p>

                <p className="text-white/55 text-base leading-relaxed max-w-xl mb-8">
                  Headquartered in Aledo and dispatching across Fort Worth and
                  the wider DFW metroplex. Insurance-claim experienced. Family
                  at the heart of every job.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact-us"
                    className={cn(
                      "inline-flex items-center justify-center gap-2",
                      "bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase",
                      "px-7 py-3.5 rounded-sm border border-red-500/40 min-h-12 transition-colors"
                    )}
                  >
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    Request Service
                  </Link>
                  <Link
                    href={siteConfig.phone.primary_tel}
                    className={cn(
                      "inline-flex items-center justify-center gap-2",
                      "border border-white/25 text-white bg-transparent hover:bg-white/8 hover:border-white/40",
                      "font-semibold text-sm tracking-wide uppercase",
                      "px-7 py-3.5 rounded-sm min-h-12 transition-colors"
                    )}
                    aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.primary}`}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {siteConfig.phone.primary}
                  </Link>
                </div>
              </div>

              {/* RIGHT — hero photo with tactical frame */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative">
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

                  <div className="relative bg-[#131a3e] border border-white/10 rounded-sm overflow-hidden aspect-4/3 lg:aspect-3/4">
                    <Image
                      src="/aboutus.webp"
                      alt="S.W.A.T. Restoration crew — the team behind every dispatch"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0c1230]/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-white/75 font-semibold">
                        Family Owned · Aledo, TX
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 2. STORY / MISSION                                              */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#131a3e] border-y border-white/8 py-20 lg:py-24 overflow-hidden"
          aria-labelledby="story-heading"
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-5">
                <TacticalLabel>Our Story</TacticalLabel>
                <AccentLine />
                <h2
                  id="story-heading"
                  className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-5"
                >
                  Built on family.
                  <br />
                  <span className="text-red-500">Run on urgency.</span>
                </h2>
                <p className="text-white/65 text-base leading-relaxed mb-4">
                  S.W.A.T. Restoration was built from a simple idea:
                  homeowners in the worst day of their year deserve a crew
                  that shows up like family — fast, calm, and ready to put the
                  property back together from the studs out.
                </p>
                <p className="text-white/55 text-sm leading-relaxed">
                  Disasters don&apos;t keep business hours. Neither do we.
                  Seven days a week, around the clock — from Aledo to Fort
                  Worth and across the DFW metroplex.
                </p>
              </div>

              {/* Two narrative beats */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                <div className="bg-[#1a2347] border border-white/10 rounded-sm p-6 lg:p-7 flex flex-col">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-red-400 font-semibold">
                      Specialty
                    </span>
                    <div className="h-px flex-1 bg-red-600/30" aria-hidden="true" />
                  </div>
                  <h3 className="text-white text-xl font-black tracking-tight leading-tight mb-3">
                    Full-Scope Restoration
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed flex-1">
                    Water extraction and structural drying, fire and smoke
                    cleanup, mold remediation, pack-out and contents care,
                    roofing, and full reconstruction. One crew. One file. One
                    accountable point of contact through the whole project.
                  </p>
                </div>

                <div className="bg-[#1a2347] border border-white/10 rounded-sm p-6 lg:p-7 flex flex-col">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-red-400 font-semibold">
                      Reach
                    </span>
                    <div className="h-px flex-1 bg-red-600/30" aria-hidden="true" />
                  </div>
                  <h3 className="text-white text-xl font-black tracking-tight leading-tight mb-3">
                    49 DFW Communities
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed flex-1">
                    Dispatching from our Aledo HQ across Tarrant, Parker,
                    Denton, and Johnson counties. Insurance-claim experienced —
                    we coordinate with your carrier and document the scope
                    correctly the first time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 3. CORE VALUES                                                  */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#0c1230] py-20 lg:py-24 overflow-hidden"
          aria-labelledby="values-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <TacticalLabel>Core Values</TacticalLabel>
              <AccentLine />
              <h2
                id="values-heading"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
              >
                The standard.
                <br />
                <span className="text-red-500">Non-negotiable.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              {coreValues.map((v, idx) => {
                const Icon = v.icon
                return (
                  <article
                    key={v.title}
                    className="relative bg-[#131a3e] border border-white/10 rounded-sm p-6 lg:p-8 flex flex-col"
                  >
                    <div
                      className="absolute top-3 right-3 font-mono text-[10px] text-white/30 tracking-wider"
                      aria-hidden="true"
                    >
                      0{idx + 1}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-red-600/10 border border-red-600/30 mb-5">
                      <Icon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-white text-xl font-black tracking-tight uppercase leading-tight mb-3">
                      {v.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {v.body}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 4. OWNERS — Dillon + Danielle                                   */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#131a3e] border-y border-white/8 py-20 lg:py-24 overflow-hidden"
          aria-labelledby="owners-heading"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 inset-y-0 w-0.75 bg-linear-to-b from-transparent via-red-600 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <TacticalLabel>Meet The Owners</TacticalLabel>
              <AccentLine />
              <h2
                id="owners-heading"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
              >
                Real owners.
                <br />
                <span className="text-red-500">Family-run since day one.</span>
              </h2>
              <p className="mt-4 text-white/60 text-base leading-relaxed">
                S.W.A.T. Restoration is owned and operated by Dillon and
                Danielle Patterson — not a holding company, not a franchise.
                When you call the dispatch line, the people answering are the
                people accountable for the work.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
              {owners.map((o) => (
                <OwnerCard key={o.name} owner={o} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 5. CODE OF ETHICS                                               */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#0c1230] py-20 lg:py-24 overflow-hidden"
          aria-labelledby="ethics-heading"
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
            <div className="mb-12 max-w-2xl">
              <TacticalLabel>Code of Ethics</TacticalLabel>
              <AccentLine />
              <h2
                id="ethics-heading"
                className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight"
              >
                The way we work —
                <br />
                <span className="text-red-500">written down.</span>
              </h2>
              <p className="mt-4 text-white/55 text-base leading-relaxed">
                Three commitments. To ourselves, to the people we serve, and to
                the partners who help us serve them.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
              {codeOfEthics.map((block, idx) => {
                const Icon = block.icon
                return (
                  <article
                    key={block.label}
                    className="relative bg-[#131a3e] border border-white/10 rounded-sm overflow-hidden flex flex-col"
                  >
                    <div className="flex items-center justify-between gap-3 px-6 pt-6 pb-4 border-b border-white/8">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-sm bg-red-600/10 border border-red-600/30 shrink-0">
                          <Icon className="h-4 w-4 text-red-400" aria-hidden="true" />
                        </div>
                        <h3 className="text-white text-base sm:text-lg font-black tracking-tight leading-tight uppercase">
                          {block.label}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-white/35 font-semibold shrink-0">
                        0{idx + 1}
                      </span>
                    </div>

                    <ul role="list" className="px-6 py-6 space-y-3.5 flex-1">
                      {block.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-white/70 text-sm leading-relaxed"
                        >
                          <span
                            className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-600/15 border border-red-600/40 shrink-0"
                            aria-hidden="true"
                          >
                            <Check className="h-2.5 w-2.5 text-red-400" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 6. FINAL CTA                                                    */}
        {/* ============================================================== */}
        <FinalCta />
      </main>

      <SiteFooter />
      <MobileCtaBar />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* OwnerCard — featured owner card with photo                           */
/* ------------------------------------------------------------------ */
function OwnerCard({ owner }: { owner: Owner }) {
  const Icon = owner.icon
  return (
    <div className="relative bg-[#1a2347] border border-white/10 rounded-sm flex flex-col sm:flex-row overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-3 right-3 w-3 h-3 border-t border-r border-red-600/55 z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-red-600/55 z-10"
        aria-hidden="true"
      />

      <div className="relative w-full sm:w-2/5 aspect-4/3 sm:aspect-auto sm:min-h-full bg-[#131a3e] shrink-0">
        <Image
          src={owner.photo}
          alt={owner.photoAlt}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#1a2347]/40 via-transparent to-transparent pointer-events-none sm:bg-linear-to-r"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col p-6 sm:p-7 lg:p-8 flex-1">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-red-600/15 border border-red-600/40 shrink-0">
            <Icon className="h-5 w-5 text-red-400" aria-hidden={true} />
          </div>
          <div className="min-w-0">
            <h3 className="text-white text-xl sm:text-2xl font-black tracking-tight leading-tight">
              {owner.name}
            </h3>
            <p className="text-red-400 text-xs font-mono tracking-[0.18em] uppercase font-semibold mt-1">
              {owner.role}
            </p>
          </div>
        </div>

        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          {owner.bio}
        </p>

        <div className="mt-6 pt-5 border-t border-white/8 flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
          <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-white/50 font-semibold">
            Patterson Family · Aledo, TX
          </span>
        </div>
      </div>
    </div>
  )
}
