"use client"

import Script from "next/script"

/**
 * Loads the reCAPTCHA v3 script. Render once per page that hosts a
 * protected form. next/script dedupes so multiple instances are safe.
 *
 * Renders nothing if NEXT_PUBLIC_RECAPTCHA_SITE_KEY isn't set, so local
 * dev without keys keeps working.
 */
export function RecaptchaScript() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey) return null

  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
      strategy="afterInteractive"
    />
  )
}
