"use client"

import { useSyncExternalStore } from "react"
import {
  isThanksgivingBannerVisible,
  thanksgivingBannerPhone,
} from "@/lib/thanksgiving-banner"

function subscribe() {
  return () => {}
}

/**
 * Slim Thanksgiving hours bar. Rendered in document flow above the page
 * chrome so the header is not covered and nothing is measured after paint.
 */
export default function ThanksgivingBanner() {
  const visible = useSyncExternalStore(
    subscribe,
    isThanksgivingBannerVisible,
    isThanksgivingBannerVisible
  )

  if (!visible) return null

  return (
    <div
      data-thanksgiving-banner
      className="bg-[#dc2626] text-white"
      role="region"
      aria-label="Thanksgiving hours"
    >
      <p className="mx-auto max-w-7xl px-4 py-2 text-center text-sm leading-snug font-medium text-white sm:px-6 sm:py-2.5">
        Happy Thanksgiving! Our office is closed today, Thursday, Nov 26, for
        standard service calls. {"We're"} still available 24/7 for emergency
        restoration. Call{" "}
        <a
          href={thanksgivingBannerPhone.href}
          className="font-semibold whitespace-nowrap text-white underline decoration-white underline-offset-2 hover:decoration-2 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-label={`Call S.W.A.T. Restoration at ${thanksgivingBannerPhone.display}`}
        >
          {thanksgivingBannerPhone.display}
        </a>
        .
      </p>
    </div>
  )
}
