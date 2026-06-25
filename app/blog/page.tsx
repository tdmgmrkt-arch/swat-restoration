import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Phone,
  CalendarDays,
  Clock,
  MapPin,
  BookOpen,
  Droplets,
  Flame,
  ShieldCheck,
  ArrowRight,
  Tag,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import { cn, canonicalUrl } from "@/lib/utils"
import { blogPageSchema, blogBreadcrumbSchema } from "@/lib/schema"
import { allBlogPosts, formatBlogDate } from "@/lib/blog-posts-config"
import type { BlogPost } from "@/lib/blog-posts-config"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"

import SiteHeader from "@/components/site/site-header"
import PageBreadcrumb from "@/components/site/page-breadcrumb"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"
import FinalCta from "@/components/sections/final-cta"

const CANONICAL = canonicalUrl("/blog")

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
  const hasPosts = allBlogPosts.length > 0

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogBreadcrumbSchema()),
        }}
      />

      <SiteHeader />

      <main id="main-content">
        <PageBreadcrumb current="Blog" />

        {hasPosts ? <PublishedHero /> : <ComingSoonHero />}

        {hasPosts ? <PublishedFeed /> : <ComingSoonBody />}

        <FinalCta />
      </main>

      <SiteFooter />
      <MobileCtaBar />
      <div className="h-14 lg:hidden" aria-hidden="true" />
    </>
  )
}

/* ================================================================== */
/* HERO — published variant                                            */
/* ================================================================== */
function PublishedHero() {
  const totalPosts = allBlogPosts.length

  return (
    <section
      className="relative isolate bg-[#0c1230] pt-12 pb-8 lg:pt-16 lg:pb-10 overflow-hidden"
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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
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
          extraction timelines, fire and smoke cleanup, mold prevention, and
          what an insurance carrier actually needs in your file.
        </p>

        <p className="text-white/40 text-sm font-mono tracking-wide">
          Aledo, TX · Fort Worth, TX · 49 DFW Communities
        </p>

        <div className="mt-9 inline-grid grid-cols-2 gap-0 border border-white/10 rounded-sm divide-x divide-white/10 overflow-hidden">
          {[
            { value: String(totalPosts), label: "Published" },
            { value: "24/7", label: "Dispatch" },
          ].map((s) => (
            <div key={s.label} className="px-5 py-3.5 bg-[#0a0f28]">
              <div className="text-lg sm:text-xl font-black text-white tracking-tight leading-none font-mono">
                {s.value}
              </div>
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/45 mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/* PUBLISHED FEED — asymmetric featured row + standard grid             */
/* ================================================================== */
function PublishedFeed() {
  const [featured, second, ...rest] = allBlogPosts
  const totalPosts = allBlogPosts.length
  const lastUpdated = formatBlogDate(allBlogPosts[0].date)

  return (
    <>
      <section
        className="relative bg-[#131a3e] border-t border-white/8 py-10 lg:py-14 overflow-hidden"
        aria-labelledby="feed-heading"
      >
        <div
          className="absolute inset-0 tactical-grid opacity-20"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
          <div className="flex items-end justify-between gap-6 mb-7 lg:mb-9">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-400 font-bold">
                  Latest Dispatch
                </span>
              </div>
              <h2
                id="feed-heading"
                className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
              >
                {totalPosts} {totalPosts === 1 ? "post" : "posts"} published.
                <span className="text-red-500"> Newest first.</span>
              </h2>
            </div>
            <span className="hidden sm:inline-flex text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 font-semibold whitespace-nowrap pb-1.5">
              {totalPosts} {totalPosts === 1 ? "entry" : "entries"}
            </span>
          </div>

          {featured && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mb-4 lg:mb-5">
              <div className="lg:col-span-2">
                <FeaturedCard post={featured} />
              </div>
              {second && (
                <div className="lg:col-span-1">
                  <PostCard post={second} />
                </div>
              )}
            </div>
          )}

          {rest.length > 0 && (
            <ul
              role="list"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
            >
              {rest.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className="bg-[#0c1230] border-t border-white/6 py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center gap-2">
          <Tag
            className="h-3 w-3 text-white/25 shrink-0"
            aria-hidden="true"
          />
          <p className="text-white/30 text-xs font-mono">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>
    </>
  )
}

/* ================================================================== */
/* HERO — coming-soon variant (no published posts yet)                  */
/* ================================================================== */
function ComingSoonHero() {
  return (
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
          <span className="relative flex h-2 w-2" aria-hidden="true">
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
          extraction timelines, fire and smoke cleanup, mold prevention, and
          what an insurance carrier actually needs in your file.
        </p>

        <p className="text-white/40 text-sm font-mono tracking-wide">
          Aledo, TX · Fort Worth, TX · 49 DFW Communities
        </p>
      </div>
    </section>
  )
}

function ComingSoonBody() {
  return (
    <section
      className="relative bg-[#131a3e] border-t border-white/8 py-16 lg:py-24 overflow-hidden"
      aria-labelledby="coming-soon-heading"
    >
      <div
        className="absolute inset-0 tactical-grid opacity-20"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
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
              We&apos;re writing field-tested restoration guides — from real
              jobs, not stock copy. Subscribe by phone or check back shortly.
              Until then, here&apos;s what we&apos;ll cover.
            </p>
          </div>

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
  )
}

/* ================================================================== */
/* FeaturedCard — large featured post (latest)                          */
/* ================================================================== */
function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group block relative bg-[#0c1230] border border-white/12 hover:border-red-600/50 rounded-sm overflow-hidden transition-colors"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] bg-[#0a0f28] overflow-hidden">
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div
            className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-[#0c1230]/85 via-[#0c1230]/20 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/90 backdrop-blur-sm rounded-sm">
            <BookOpen className="h-3 w-3 text-white" aria-hidden="true" />
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-white font-bold">
              {post.category}
            </span>
          </span>
        </div>

        <div className="p-7 lg:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono tracking-[0.18em] uppercase text-white/45 mb-4">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3 w-3" aria-hidden="true" />
              {formatBlogDate(post.date)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {post.readMinutes} min read
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {post.city}, TX
            </span>
          </div>

          <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.1] group-hover:text-red-400 transition-colors mb-4">
            {post.title}
          </h3>

          <div className="h-0.5 w-10 bg-red-600 mb-5" aria-hidden="true" />

          <p className="text-white/65 text-base leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div
            className={cn(
              "inline-flex items-center gap-2 text-red-400 group-hover:text-red-300 font-bold uppercase tracking-wider text-sm transition-colors",
              "self-start"
            )}
          >
            Read the full post
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ================================================================== */
/* PostCard — standard listing card                                     */
/* ================================================================== */
function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group relative bg-[#131a3e] border border-white/10 hover:border-red-600/40 rounded-sm overflow-hidden transition-colors h-full flex flex-col"
    >
      <div className="relative aspect-[16/9] bg-[#0c1230] overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.heroAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#131a3e]/85 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 bg-red-600/85 backdrop-blur-sm rounded-sm">
          <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-white font-bold">
            {post.category}
          </span>
        </span>
      </div>
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-mono tracking-[0.15em] uppercase text-white/45 mb-2.5">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3 w-3" aria-hidden="true" />
            {formatBlogDate(post.date)}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {post.readMinutes} min
          </span>
        </div>
        <h3 className="text-white text-lg font-black tracking-tight leading-tight group-hover:text-red-400 transition-colors mb-2.5">
          {post.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.18em] uppercase text-white/45">
            <MapPin
              className="h-3 w-3 text-red-400"
              aria-hidden="true"
            />
            {post.city}, TX
          </span>
          <span className="inline-flex items-center gap-1.5 text-red-400 group-hover:text-red-300 text-xs font-bold uppercase tracking-wider transition-colors">
            Read post
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}
