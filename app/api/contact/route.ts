import { NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/contact-schema"
import { verifyRecaptcha } from "@/lib/recaptcha-verify"

export async function POST(req: NextRequest) {
  // GHL_WEBHOOK_URL is pending — add to Vercel env vars when provided by client.
  const webhookUrl = process.env.GHL_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn(
      "[contact/route] GHL_WEBHOOK_URL is not set — lead not forwarded to GHL"
    )
    return NextResponse.json(
      { ok: false, error: "Service temporarily unavailable" },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    )
  }

  const recaptchaToken =
    typeof body === "object" && body !== null && "recaptcha_token" in body
      ? (body as { recaptcha_token?: unknown }).recaptcha_token
      : null
  const recaptcha = await verifyRecaptcha(
    typeof recaptchaToken === "string" ? recaptchaToken : null,
    "contact"
  )
  if (!recaptcha.ok) {
    console.warn(`[contact/route] reCAPTCHA blocked submission: ${recaptcha.reason}`)
    // Silently accept to avoid tipping off bots; lead is dropped.
    return NextResponse.json({ ok: true })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const data = parsed.data

  // Honeypot check — bots fill the hidden `website` field; silently accept
  if (data.website) {
    return NextResponse.json({ ok: true })
  }

  const payload = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    city: data.city ?? "",
    service_requested: data.service_type,
    urgency: data.urgency,
    preferred_contact: data.preferred_contact,
    message: data.message ?? "",
    source_page: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swat-restoration.com"}/contact-us`,
    submitted_at: new Date().toISOString(),
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!res.ok) {
      console.error(`[contact/route] GHL webhook returned ${res.status}`)
      return NextResponse.json(
        { ok: false, error: "Downstream error — please call us directly" },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      console.error("[contact/route] GHL webhook timed out after 5s")
      return NextResponse.json(
        { ok: false, error: "Request timed out — please call us directly" },
        { status: 504 }
      )
    }
    console.error("[contact/route] Unexpected error:", err)
    return NextResponse.json(
      { ok: false, error: "Unexpected error — please call us directly" },
      { status: 500 }
    )
  } finally {
    clearTimeout(timeout)
  }
}
