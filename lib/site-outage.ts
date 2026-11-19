/**
 * Temporary site-wide service notice.
 *
 * Leave SITE_OUTAGE_BANNER_ENABLED true to show the dialog and top strip.
 * Set it to false and redeploy to remove both. Dismissal is per browser
 * session only (sessionStorage) — a new session shows the notice again.
 */
export const SITE_OUTAGE_BANNER_ENABLED = true

export const SITE_OUTAGE_DIALOG_DISMISSED_KEY =
  "swat-restoration-outage-dialog-dismissed"

export const SITE_OUTAGE_DISMISSED_KEY = "swat-restoration-outage-dismissed"

export const siteOutageCopy = {
  label: "Service Notice",
  title: "Hold times are longer right now",
  paragraphs: [
    "We're sorry for the inconvenience.",
    "Circumstances beyond our control have taken our internet down, which is limiting our phone line, so hold times are longer than expected.",
    "Thank you for sticking with us — we're still here and will get to you as quickly as we can.",
  ],
  strip: "Our internet is down, so phone hold times are longer than expected.",
} as const
