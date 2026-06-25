import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Phone,
  CalendarDays,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  User,
} from "lucide-react"

import { siteConfig } from "@/lib/site-config"
import {
  allBlogPosts,
  getBlogPost,
  getRelatedPosts,
  formatBlogDate,
} from "@/lib/blog-posts-config"
import type { BlogPost, ContentBlock } from "@/lib/blog-posts-config"
import { blogPostingSchema, blogPostBreadcrumbSchema } from "@/lib/schema"
import { cn, canonicalUrl } from "@/lib/utils"
import { TacticalLabel, AccentLine } from "@/components/ui/tactical-panel"

import SiteHeader from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import MobileCtaBar from "@/components/site/mobile-cta-bar"
import FinalCta from "@/components/sections/final-cta"

/* ------------------------------------------------------------------ */
/* Static params + metadata                                             */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  // Only published posts get pre-rendered routes — draft stubs return 404
  // until their `published` flag is flipped.
  return allBlogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  const canonical =
    post.canonicalOverride ?? canonicalUrl(`/post/${post.slug}`)
  const ogImage = `${siteConfig.url}${post.heroImage}`

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.metaDescription,
      siteName: siteConfig.name,
      images: [{ url: ogImage, alt: post.heroAlt }],
      publishedTime: post.date,
      modifiedTime: post.lastUpdated ?? post.date,
      authors: ["Dillon Patterson"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [ogImage],
    },
  }
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.slug, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostBreadcrumbSchema(post)),
        }}
      />

      <SiteHeader />

      <main id="main-content">
        {/* Visual breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="bg-white border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 py-3">
            <ol
              className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap"
              role="list"
            >
              <li>
                <Link
                  href="/"
                  className="hover:text-gray-900 transition-colors font-medium"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3 text-red-500" />
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-gray-900 transition-colors font-medium"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3 text-red-500" />
              </li>
              <li>
                <span
                  className="text-gray-900 font-semibold truncate max-w-[60vw] sm:max-w-none inline-block align-bottom"
                  aria-current="page"
                >
                  {post.title}
                </span>
              </li>
            </ol>
          </div>
        </nav>

        {/* ============================================================== */}
        {/* HERO — image as backdrop with title overlaid                    */}
        {/* ============================================================== */}
        <section
          className="relative isolate flex items-end overflow-hidden min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] bg-[#0c1230]"
          aria-labelledby="post-heading"
        >
          {/* Background image */}
          <Image
            src={post.heroImage}
            alt={post.heroAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover -z-10"
          />
          {/* Heavy bottom-up gradient so the title sits on a dark base for
              legibility, fading to a soft tint at the top so the image's
              top portion stays visible. */}
          <div
            className="absolute inset-0 -z-10 bg-linear-to-t from-[#0c1230] via-[#0c1230]/85 via-40% to-[#0c1230]/15"
            aria-hidden="true"
          />
          {/* Left-side bias overlay so the title side gets extra darkness */}
          <div
            className="absolute inset-0 -z-10 bg-linear-to-r from-[#0c1230]/70 via-[#0c1230]/20 to-transparent"
            aria-hidden="true"
          />
          {/* Tactical grid texture */}
          <div
            className="absolute inset-0 -z-10 tactical-grid opacity-20"
            aria-hidden="true"
          />
          {/* Red left stripe */}
          <div
            className="absolute left-0 inset-y-0 w-1 bg-red-600"
            aria-hidden="true"
          />

          {/* Title block — anchored to bottom of the hero */}
          <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 py-10 lg:py-14">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-red-600/90 backdrop-blur-sm">
                  <BookOpen
                    className="h-3 w-3 text-white"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-white font-bold">
                    {post.category}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-black/50 backdrop-blur-sm border border-white/20 rounded-sm">
                  <MapPin
                    className="h-3 w-3 text-red-400"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-white/80 font-semibold">
                    {post.city}, TX
                  </span>
                </span>
              </div>

              <TacticalLabel>Field Notes</TacticalLabel>
              <AccentLine />

              <h1
                id="post-heading"
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.07] mb-5 [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
              >
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mb-6 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
                  {post.excerpt}
                </p>
              )}

              {/* Byline strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-1.5 text-white/90 hover:text-red-400 transition-colors group"
                >
                  <User
                    className="h-3.5 w-3.5 text-red-400"
                    aria-hidden="true"
                  />
                  <span className="font-semibold">Dillon Patterson</span>
                  <span className="text-white/55 font-mono">
                    · S.W.A.T. Restoration
                  </span>
                </Link>
                <span className="inline-flex items-center gap-1.5 text-white/70">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  <time dateTime={post.date} className="font-mono">
                    {formatBlogDate(post.date)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5 text-white/70">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="font-mono">
                    {post.readMinutes} min read
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* BODY                                                            */}
        {/* ============================================================== */}
        <section
          className="relative bg-[#131a3e] border-t border-white/8 py-14 lg:py-20 overflow-hidden"
          aria-label="Article body"
        >
          <div
            className="absolute inset-0 tactical-grid opacity-15 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
            <article className="max-w-4xl">
              <div className="space-y-5">
                {post.body.map((block, idx) => (
                  <BlockRenderer key={idx} block={block} />
                ))}
              </div>

              {/* End-of-article CTA */}
              <div className="mt-12 relative bg-[#0c1230] border border-white/12 rounded-sm overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-600/60"
                    aria-hidden="true"
                  />
                  <div className="p-6 lg:p-8 pl-7 lg:pl-9">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                      </span>
                      <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-red-400 font-bold">
                        Dispatch — 24/7
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mb-3">
                      Need restoration help right now?
                    </h2>
                    <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-5">
                      Call the {post.city} dispatch line directly — a live
                      dispatcher answers, not a voicemail tree.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={siteConfig.phone.primary_tel}
                        className={cn(
                          "inline-flex items-center justify-center gap-2",
                          "bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wide uppercase",
                          "px-6 py-3.5 rounded-sm border border-red-500/40 min-h-12 transition-colors"
                        )}
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        Call {siteConfig.phone.primary}
                      </Link>
                      <Link
                        href="/contact-us"
                        className={cn(
                          "inline-flex items-center justify-center gap-2",
                          "border border-white/20 text-white bg-transparent hover:bg-white/8 hover:border-white/35",
                          "font-semibold text-sm tracking-wide uppercase",
                          "px-6 py-3.5 rounded-sm min-h-12 transition-colors"
                        )}
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        Request Service
                      </Link>
                    </div>
                  </div>
                </div>
            </article>
          </div>
        </section>

        {/* ============================================================== */}
        {/* RELATED POSTS                                                   */}
        {/* ============================================================== */}
        {related.length > 0 && (
          <section
            className="relative bg-[#0c1230] border-t border-white/8 py-16 lg:py-20 overflow-hidden"
            aria-labelledby="related-heading"
          >
            <div
              className="absolute inset-0 tactical-grid opacity-25"
              aria-hidden="true"
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
              <div className="mb-10 max-w-2xl">
                <TacticalLabel>Related Reading</TacticalLabel>
                <AccentLine />
                <h2
                  id="related-heading"
                  className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
                >
                  More from the field.
                </h2>
              </div>

              <ul
                role="list"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
              >
                {related.map((p) => (
                  <li key={p.slug}>
                    <RelatedCard post={p} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

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

/* ------------------------------------------------------------------ */
/* Block renderer — discriminates on `type` to render each ContentBlock */
/* ------------------------------------------------------------------ */
function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-white/75 text-base sm:text-lg leading-relaxed">
        {typeof block.content === "string"
          ? block.content
          : block.content.map((token, i) => {
              if (token.type === "text") return <span key={i}>{token.text}</span>
              if (token.type === "strong")
                return (
                  <strong key={i} className="text-white font-semibold">
                    {token.text}
                  </strong>
                )
              return (
                <Link
                  key={i}
                  href={token.href}
                  {...(token.outbound
                    ? { target: "_blank", rel: "noopener noreferrer nofollow" }
                    : {})}
                  className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
                >
                  {token.text}
                </Link>
              )
            })}
      </p>
    )
  }

  if (block.type === "heading") {
    const id = block.id ?? slugify(block.text)
    return (
      <div className="pt-7 pb-1">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="h-px w-6 bg-red-600" aria-hidden="true" />
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-red-400 font-bold">
            Section
          </span>
        </div>
        <h2
          id={id}
          className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
        >
          {block.text}
        </h2>
      </div>
    )
  }

  if (block.type === "list") {
    return (
      <div className="space-y-3">
        {block.intro && (
          <p className="text-white/75 text-base sm:text-lg leading-relaxed">
            {block.intro}
          </p>
        )}
        <ul role="list" className="space-y-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-white/75 text-base leading-relaxed"
            >
              <span
                className="mt-2 h-1 w-1 rounded-full bg-red-500 shrink-0"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (block.type === "callout") {
    return (
      <aside
        className="relative bg-[#0c1230] border border-white/10 rounded-sm overflow-hidden my-2"
        aria-label="Related service"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-0.75 bg-red-600"
          aria-hidden="true"
        />
        <div className="p-5 pl-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-white/75 text-sm sm:text-base leading-relaxed">
            {block.text}{" "}
            <Link
              href={block.href}
              className="text-red-400 hover:text-red-300 font-semibold underline underline-offset-2 transition-colors"
            >
              {block.linkText}
            </Link>
            .
          </p>
          <Link
            href={block.href}
            className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
            aria-label={block.linkText}
          >
            View
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </aside>
    )
  }

  if (block.type === "outbound") {
    return (
      <aside
        className="relative bg-[#0c1230] border border-dashed border-white/15 rounded-sm overflow-hidden my-2"
        aria-label="External resource"
      >
        <div className="p-4 sm:p-5 flex items-start gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-sm bg-white/5 border border-white/15 shrink-0">
            <ExternalLink
              className="h-3.5 w-3.5 text-white/55"
              aria-hidden="true"
            />
          </div>
          <p className="text-white/65 text-sm leading-relaxed">
            {block.text}{" "}
            <Link
              href={block.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-white/85 hover:text-red-400 font-semibold underline underline-offset-2 transition-colors"
            >
              {block.linkText}
            </Link>{" "}
            provides additional information.
          </p>
        </div>
      </aside>
    )
  }

  return null
}

/* ------------------------------------------------------------------ */
/* RelatedCard — small post card for the "Related Reading" grid        */
/* ------------------------------------------------------------------ */
function RelatedCard({ post }: { post: BlogPost }) {
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
          className="absolute inset-0 bg-linear-to-t from-[#131a3e]/80 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 bg-red-600/85 backdrop-blur-sm rounded-sm">
          <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-white font-bold">
            {post.category}
          </span>
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-[0.15em] uppercase text-white/45 mb-2">
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
        <h3 className="text-white text-base sm:text-lg font-black tracking-tight leading-tight group-hover:text-red-400 transition-colors mb-2">
          {post.title}
        </h3>
        <p className="text-white/55 text-sm leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-4 inline-flex items-center gap-1.5 text-red-400 group-hover:text-red-300 text-xs font-bold uppercase tracking-wider transition-colors">
          Read post
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
}

/* Small slugifier for heading anchors */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}
