/**
 * Server-side Google Places API (New) integration.
 *
 * Fetches live rating, review count, and up to 5 reviews from S.W.A.T.
 * Plumbing's Google Business Profile. Cached for 24h via Next.js ISR.
 *
 * Env vars (server-side only — never exposed to the browser):
 *   GOOGLE_PLACES_API_KEY  — Google Cloud API key with Places API (New) enabled
 *   GOOGLE_PLACE_ID        — the GBP Place ID for S.W.A.T. Restoration
 *
 * If the API call fails or env vars are missing, consumers receive a
 * non-live fallback. The UI may render its own static fallback (rating
 * and count from siteConfig) so the badge still appears in dev.
 */

export type GoogleReview = {
  authorName: string
  authorPhotoUri?: string
  rating: number
  text: string
  relativePublishTime: string
  publishTime?: string
}

export type GoogleReviewData = {
  rating: number | null
  userRatingCount: number | null
  reviews: GoogleReview[]
  isLive: boolean
}

const FALLBACK: GoogleReviewData = {
  rating: null,
  userRatingCount: null,
  reviews: [],
  isLive: false,
}

const REVALIDATE_SECONDS = 60 * 60 * 24 // 24h

export async function getGoogleReviews(): Promise<GoogleReviewData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[google-reviews] missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID — using fallback"
      )
    }
    return FALLBACK
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,reviews",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!res.ok) {
      const body = await res.text().catch(() => "")
      console.error(
        `[google-reviews] Places API ${res.status}: ${body.slice(0, 200)}`
      )
      return FALLBACK
    }

    const data = (await res.json()) as {
      rating?: number
      userRatingCount?: number
      reviews?: Array<{
        rating?: number
        text?: { text?: string }
        originalText?: { text?: string }
        relativePublishTimeDescription?: string
        publishTime?: string
        authorAttribution?: { displayName?: string; photoUri?: string }
      }>
    }

    const reviews: GoogleReview[] = (data.reviews ?? []).map((r) => ({
      authorName: r.authorAttribution?.displayName ?? "Google reviewer",
      authorPhotoUri: r.authorAttribution?.photoUri,
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      relativePublishTime: r.relativePublishTimeDescription ?? "",
      publishTime: r.publishTime,
    }))

    return {
      rating: typeof data.rating === "number" ? data.rating : null,
      userRatingCount:
        typeof data.userRatingCount === "number" ? data.userRatingCount : null,
      reviews,
      isLive: true,
    }
  } catch (err) {
    console.error("[google-reviews] fetch failed:", err)
    return FALLBACK
  }
}

/** Format the review count for display: 247 → "247", 1247 → "1,247". */
export function formatReviewCount(n: number | null | undefined): string | null {
  if (n == null) return null
  return n.toLocaleString("en-US")
}

/** Format the rating with one decimal: 4.85 → "4.9", 5 → "5.0". */
export function formatRating(r: number | null | undefined): string | null {
  if (r == null) return null
  return r.toFixed(1)
}
