import { siteConfig } from "@/lib/site-config"

/**
 * Thanksgiving hours notice.
 *
 * Set THANKSGIVING_BANNER_ENABLED to false to remove the bar immediately.
 * While the flag is true, the bar hides on its own after Nov 26, 2026
 * at 11:59:59 PM America/Los_Angeles.
 *
 * The phone is the Restoration main line from siteConfig — 817-286-4966,
 * tel:+18172864966 — not a SWAT Plumbing number.
 */
export const THANKSGIVING_BANNER_ENABLED = true

export const THANKSGIVING_BANNER_TIME_ZONE = "America/Los_Angeles"

/** Last instant the bar may show, in America/Los_Angeles local time. */
export const THANKSGIVING_BANNER_HIDE_AFTER = "2026-11-26T23:59:59"

export const THANKSGIVING_PHONE_DISPLAY = "817-286-4966"
export const THANKSGIVING_PHONE_TEL = "tel:+18172864966"

if (
  siteConfig.phone.primary !== THANKSGIVING_PHONE_DISPLAY ||
  siteConfig.phone.primary_tel !== THANKSGIVING_PHONE_TEL
) {
  throw new Error(
    `Thanksgiving banner must use the Restoration main line ${THANKSGIVING_PHONE_DISPLAY} (${THANKSGIVING_PHONE_TEL}). siteConfig has ${siteConfig.phone.primary} (${siteConfig.phone.primary_tel}).`
  )
}

export const thanksgivingBannerPhone = {
  display: siteConfig.phone.primary,
  href: siteConfig.phone.primary_tel,
} as const

export function losAngelesStamp(now: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: THANKSGIVING_BANNER_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now)

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00"

  // Some engines report midnight as hour "24".
  const hour = read("hour") === "24" ? "00" : read("hour")

  return `${read("year")}-${read("month")}-${read("day")}T${hour}:${read("minute")}:${read("second")}`
}

export function isThanksgivingBannerVisible(now: Date = new Date()): boolean {
  if (!THANKSGIVING_BANNER_ENABLED) return false
  return losAngelesStamp(now) <= THANKSGIVING_BANNER_HIDE_AFTER
}
