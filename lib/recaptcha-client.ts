/**
 * Client-side reCAPTCHA v3 helper — executes the invisible challenge and
 * returns a token to send to the server for verification.
 *
 * Returns null if:
 *   - NEXT_PUBLIC_RECAPTCHA_SITE_KEY isn't set (lets the form still submit)
 *   - the grecaptcha script hasn't loaded yet
 *
 * Server verification has matching graceful-degrade behavior so a null
 * token still produces a valid submission when keys aren't configured.
 */
type Grecaptcha = {
  ready: (cb: () => void) => void
  execute: (siteKey: string, opts: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
  }
}

export function executeRecaptcha(action: string): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(null)

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) return resolve(null)

    const grecaptcha = window.grecaptcha
    if (!grecaptcha) return resolve(null)

    grecaptcha.ready(() => {
      grecaptcha
        .execute(siteKey, { action })
        .then((token) => resolve(token))
        .catch(() => resolve(null))
    })
  })
}
