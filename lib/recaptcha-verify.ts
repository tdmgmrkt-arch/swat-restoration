/**
 * Server-side reCAPTCHA v3 verification.
 *
 * Calls Google's siteverify endpoint and enforces:
 *   - success === true
 *   - score >= MIN_SCORE (0.5 — Google's default safe baseline)
 *   - action matches the expected form (if provided)
 *
 * Graceful degrade: if RECAPTCHA_SECRET_KEY is not set, verification is
 * skipped (logged as a warn). Lets the site keep accepting form submissions
 * before env vars are wired in Vercel.
 */
const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
const MIN_SCORE = 0.5

type SiteverifyResponse = {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  "error-codes"?: string[]
}

export type VerifyResult =
  | { ok: true; score?: number }
  | { ok: false; reason: string; score?: number }

export async function verifyRecaptcha(
  token: string | null | undefined,
  expectedAction?: string
): Promise<VerifyResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret) {
    console.warn(
      "[recaptcha] RECAPTCHA_SECRET_KEY not set — skipping verification"
    )
    return { ok: true }
  }

  if (!token) {
    return { ok: false, reason: "Missing reCAPTCHA token" }
  }

  try {
    const body = new URLSearchParams({ secret, response: token })
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
    const json = (await res.json()) as SiteverifyResponse

    if (!json.success) {
      return {
        ok: false,
        reason: `siteverify failed: ${(json["error-codes"] ?? []).join(",") || "unknown"}`,
      }
    }
    if (typeof json.score === "number" && json.score < MIN_SCORE) {
      return { ok: false, reason: "Low score", score: json.score }
    }
    if (expectedAction && json.action && json.action !== expectedAction) {
      return {
        ok: false,
        reason: `Action mismatch: expected ${expectedAction}, got ${json.action}`,
        score: json.score,
      }
    }
    return { ok: true, score: json.score }
  } catch (err) {
    console.error("[recaptcha] verify error:", err)
    return { ok: false, reason: "Verification request failed" }
  }
}
