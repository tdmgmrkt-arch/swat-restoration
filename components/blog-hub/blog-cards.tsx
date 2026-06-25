import Image from "next/image"
import Link from "next/link"
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  BookOpen,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { formatBlogDate } from "@/lib/blog-posts-config"
import type { BlogPost } from "@/lib/blog-posts-config"

/* ================================================================== */
/* FeaturedCard — large featured post (latest on page 1)                */
/* ================================================================== */
export function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group block relative bg-[#0c1230] border border-white/12 hover:border-red-600/50 rounded-sm overflow-hidden transition-colors"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="relative aspect-16/10 lg:aspect-auto lg:min-h-90 bg-[#0a0f28] overflow-hidden">
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
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group relative bg-[#131a3e] border border-white/10 hover:border-red-600/40 rounded-sm overflow-hidden transition-colors h-full flex flex-col"
    >
      <div className="relative aspect-video bg-[#0c1230] overflow-hidden">
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

/* ================================================================== */
/* PaginationNav — Prev | 1 2 3 4 5 | Next                              */
/* /blog/        page 1                                                 */
/* /blog/page/N/ page N (2+)                                            */
/* ================================================================== */
export function PaginationNav({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  if (totalPages <= 1) return null

  const hrefForPage = (n: number) => (n === 1 ? "/blog" : `/blog/page/${n}`)
  const prevHref = currentPage > 1 ? hrefForPage(currentPage - 1) : null
  const nextHref = currentPage < totalPages ? hrefForPage(currentPage + 1) : null

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-10 lg:mt-12 flex items-center justify-between gap-4 border-t border-white/10 pt-8"
    >
      {/* Prev */}
      {prevHref ? (
        <Link
          href={prevHref}
          rel="prev"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-sm",
            "border border-white/20 text-white bg-transparent hover:bg-white/8 hover:border-white/40",
            "font-semibold text-xs sm:text-sm tracking-wide uppercase transition-colors"
          )}
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Previous</span>
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/8 text-white/25 font-semibold text-xs sm:text-sm tracking-wide uppercase cursor-not-allowed"
          aria-disabled="true"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Previous</span>
        </span>
      )}

      {/* Page numbers */}
      <ul className="flex items-center gap-1.5" role="list">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
          const isCurrent = n === currentPage
          return (
            <li key={n}>
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-sm bg-red-600 text-white font-bold text-sm font-mono tracking-wide"
                >
                  {n}
                </span>
              ) : (
                <Link
                  href={hrefForPage(n)}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-white/15 text-white/70 hover:text-white hover:border-red-600/50 hover:bg-red-600/10 font-bold text-sm font-mono tracking-wide transition-colors"
                >
                  {n}
                </Link>
              )}
            </li>
          )
        })}
      </ul>

      {/* Next */}
      {nextHref ? (
        <Link
          href={nextHref}
          rel="next"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2.5 rounded-sm",
            "bg-red-600 hover:bg-red-700 text-white border border-red-500/40",
            "font-bold text-xs sm:text-sm tracking-wide uppercase transition-colors"
          )}
        >
          <span>Next</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/8 text-white/25 font-semibold text-xs sm:text-sm tracking-wide uppercase cursor-not-allowed"
          aria-disabled="true"
        >
          <span>Next</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      )}
    </nav>
  )
}
