import { BadgeCheck, Calendar, ShieldCheck, FileCheck } from "lucide-react"

/**
 * Compact horizontal credentials bar.
 *
 * Surfaces S.W.A.T. Restoration's highest-trust signals (IICRC certified,
 * insurance-claim experienced, family-owned, licensed/insured) outside
 * the about page so visitors researching from a service page or city
 * page don't have to navigate away to verify credibility.
 *
 * Designed as a thin strip (no significant vertical weight) that sits
 * directly under the page hero.
 */
export default function CredentialsStrip() {
  return (
    <section
      className="relative bg-[#0c1230] border-y border-white/8 py-3 sm:py-4 lg:py-5 overflow-hidden"
      aria-label="Credentials and accreditations"
    >
      <div
        className="absolute left-0 inset-y-0 w-0.5 bg-red-600"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* Layout strategy:
            - Mobile (<640px): 2x2 grid, smaller labels — halves vertical height
              and the row stops dominating above-the-fold space
            - Tablet (sm 640px+): 4-up grid
            - Desktop (lg 1024px+): flex row, full credentials text */}
        <ul
          role="list"
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-6 text-white/80"
        >
          {/* IICRC Certified — industry-standard restoration credential */}
          <li>
            <a
              href="https://iicrc.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 sm:gap-2.5 transition-opacity hover:opacity-90"
              aria-label="IICRC Certified — water, fire & mold restoration (opens IICRC.org in new tab)"
            >
              <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-red-600/10 border border-red-600/40 shrink-0">
                <BadgeCheck
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400"
                  aria-hidden="true"
                />
              </span>
              <span className="flex flex-col leading-tight min-w-0">
                <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/55 font-semibold">
                  Certified
                </span>
                <span className="text-white text-xs sm:text-sm font-bold tracking-tight">
                  IICRC <span className="hidden sm:inline">Restoration</span>
                </span>
              </span>
            </a>
          </li>

          {/* Insurance Claim Experienced — matches utility bar messaging */}
          <li className="inline-flex items-center gap-2 sm:gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-red-600/10 border border-red-600/40 shrink-0">
              <FileCheck
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400"
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/55 font-semibold">
                Insurance
              </span>
              <span className="text-white text-xs sm:text-sm font-bold tracking-tight">
                Claim <span className="hidden sm:inline">Experienced</span>
                <span className="sm:hidden">Ready</span>
              </span>
            </span>
          </li>

          {/* Family-Owned — matches "Built on Family" brand theme */}
          <li className="inline-flex items-center gap-2 sm:gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-red-600/10 border border-red-600/40 shrink-0">
              <Calendar
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400"
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/55 font-semibold">
                Family-Owned
              </span>
              <span className="text-white text-xs sm:text-sm font-bold tracking-tight">
                <span className="hidden sm:inline">Right Here in </span>
                DFW
              </span>
            </span>
          </li>

          {/* Licensed · Bonded · Insured — standard contractor coverage */}
          <li className="inline-flex items-center gap-2 sm:gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-sm bg-red-600/10 border border-red-600/40 shrink-0">
              <ShieldCheck
                className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400"
                aria-hidden="true"
              />
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/55 font-semibold">
                Coverage
              </span>
              <span className="text-white text-xs sm:text-sm font-bold tracking-tight">
                <span className="hidden sm:inline">Licensed · Bonded · </span>
                Insured<span className="sm:hidden"> · Bonded</span>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  )
}
