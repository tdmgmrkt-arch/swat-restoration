"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Phone,
  CalendarDays,
  Menu,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Check,
  X,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

type MegaKey = string

/* ------------------------------------------------------------------ */
/* Contextual emergency-panel content — one per mega menu              */
/* ------------------------------------------------------------------ */
type CtaIcon = "phone" | "calendar" | "map"
type EmergencyContent = {
  label: string
  headline: string
  subline: string
  /** Tactical response signals — 3 short trust/capability statements */
  signals?: string[]
  /** Tactical data readout below signals (fills lower panel space) */
  data?: { label: string; items: string[] }
  /** Contextual primary CTA — defaults to "Call Now" + tel: link */
  cta?: { label: string; href: string; icon: CtaIcon }
}

const emergencyByMenu: Record<string, EmergencyContent> = {
  "water-damage": {
    label: "Water Emergency?",
    headline: "Every minute matters.",
    subline: "Burst pipes, floods, sewage backups — fast extraction stops secondary damage.",
    signals: [
      "24/7 emergency dispatch",
      "Rapid water extraction",
      "Insurance claim experienced",
    ],
    data: {
      label: "Response Data",
      items: [
        "Residential + Commercial",
        "Emergency + Scheduled",
        "49 DFW Communities · 24/7",
      ],
    },
  },
  "fire-damage": {
    label: "Fire Damage?",
    headline: "Full restoration after the smoke clears.",
    subline: "Soot removal, odor neutralization, contents cleaning, full rebuild.",
    signals: [
      "Smoke & soot removal",
      "Odor neutralization",
      "Contents pack-out & cleaning",
    ],
    data: {
      label: "Process",
      items: [
        "Emergency Board-Up",
        "Contents Pack-Out",
        "Full Reconstruction",
      ],
    },
    cta: {
      label: "Request Service",
      href: "/contact-us",
      icon: "calendar",
    },
  },
  "mold-remediation": {
    label: "Mold Concern?",
    headline: "Mold inspection & complete removal.",
    subline: "Certified containment, safe removal, air-quality restoration.",
    signals: [
      "Certified mold inspection",
      "Safe containment & removal",
      "Air-quality restoration",
    ],
    data: {
      label: "We Remediate",
      items: [
        "Black mold",
        "Hidden moisture damage",
        "Post-flood mold growth",
      ],
    },
    cta: {
      label: "Request Inspection",
      href: "/contact-us",
      icon: "calendar",
    },
  },
  reconstruction: {
    label: "Need a Rebuild?",
    headline: "Pack-out, roofing & full reconstruction.",
    subline: "From contents care to roofing to general construction — one team.",
    signals: [
      "Roofing services",
      "Pack-out & cleaning",
      "Insurance claim assistance",
    ],
    data: {
      label: "Scope",
      items: [
        "Residential + Commercial",
        "Roofing + General Construction",
        "Insurance Claim Coordination",
      ],
    },
    cta: {
      label: "Start Your Claim",
      href: "/insurance-claims",
      icon: "calendar",
    },
  },
  areas: {
    label: "In Our Coverage Zone?",
    headline: "Service in your city — today.",
    subline: "49 DFW communities across 4 counties.",
    signals: [
      "Aledo main office",
      "24/7 emergency dispatch",
      "Tarrant + Parker + Denton + Johnson",
    ],
    data: {
      label: "Coverage Map",
      items: [
        "Tarrant County · base",
        "Parker · Denton · Johnson",
        "Family owned & operated",
      ],
    },
    cta: {
      label: "Check Availability",
      href: "/contact-us",
      icon: "map",
    },
  },
}

const DEFAULT_EMERGENCY: EmergencyContent = emergencyByMenu["water-damage"]

/* ------------------------------------------------------------------ */
/* Compressed header content for each category mega menu               */
/*   `points`: inline selling points rendered with red `•` separators   */
/* ------------------------------------------------------------------ */
type CategoryHeader = {
  points: string[]
}

const categoryHeaderByCategory: Record<string, CategoryHeader> = {
  "water-damage": {
    points: [
      "24/7 Emergency Dispatch",
      "Rapid Water Extraction",
      "Insurance Claim Experienced",
    ],
  },
  "fire-damage": {
    points: [
      "Smoke & Soot Removal",
      "Odor Neutralization",
      "Full Reconstruction",
    ],
  },
  "mold-remediation": {
    points: [
      "Certified Inspection",
      "Safe Containment",
      "Air-Quality Restoration",
    ],
  },
  reconstruction: {
    points: [
      "Roofing Services",
      "Pack-Out & Cleaning",
      "Insurance Claim Assistance",
    ],
  },
}

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMega, setOpenMega] = React.useState<MegaKey | null>(null)
  const closeTimer = React.useRef<number | null>(null)
  const openTimer = React.useRef<number | null>(null)

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const cancelOpen = React.useCallback(() => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current)
      openTimer.current = null
    }
  }, [])

  const scheduleClose = React.useCallback(() => {
    cancelOpen()
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 150)
  }, [cancelClose, cancelOpen])

  const openNow = React.useCallback(
    (key: MegaKey) => {
      cancelClose()
      cancelOpen()
      if (openMega !== null) {
        // already open — switch instantly
        setOpenMega(key)
      } else {
        // first open — small delay so brushing past the trigger doesn't fire it
        openTimer.current = window.setTimeout(() => setOpenMega(key), 80)
      }
    },
    [cancelClose, cancelOpen, openMega]
  )

  const closeNow = React.useCallback(() => {
    cancelOpen()
    cancelClose()
    setOpenMega(null)
  }, [cancelClose, cancelOpen])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [closeNow])

  React.useEffect(
    () => () => {
      cancelClose()
      cancelOpen()
    },
    [cancelClose, cancelOpen]
  )

  const activeCategory = siteConfig.serviceCategories.find(
    (c) => c.slug === openMega
  )

  return (
    <header
      className="sticky top-0 z-40 w-full bg-[#1a2347] border-b border-white/8 shadow-lg"
      onMouseLeave={scheduleClose}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo — relative z-50 keeps the overhanging shield above the mega menu panel */}
        <Link
          href="/"
          className="relative z-50 flex items-center shrink-0 group"
          aria-label="S.W.A.T. Restoration — Home"
          onMouseEnter={scheduleClose}
        >
          <Image
            src="/swatroughlogo.png"
            alt="S.W.A.T. Restoration"
            width={375}
            height={322}
            priority
            className="h-14 w-auto lg:h-20 lg:translate-y-2"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center flex-1 justify-center"
          aria-label="Main navigation"
        >
          <ul className="flex items-center gap-0">
            {siteConfig.nav.map((item) =>
              item.hasMega ? (
                <MegaTrigger
                  key={item.label}
                  label={item.label}
                  menuKey={item.megaCategory}
                  openMega={openMega}
                  onOpen={openNow}
                  onScheduleClose={scheduleClose}
                  onToggle={(k) => setOpenMega(openMega === k ? null : k)}
                />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onMouseEnter={scheduleClose}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Desktop CTAs */}
        <div
          className="hidden lg:flex items-center gap-2 shrink-0"
          onMouseEnter={scheduleClose}
        >
          <Link
            href={siteConfig.phone.primary_tel}
            className={cn(
              "inline-flex items-center gap-1.5 h-9 px-4 text-sm font-medium",
              "border border-white/20 text-white rounded-lg bg-transparent",
              "hover:bg-white/8 hover:border-white/40 transition-colors"
            )}
            aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.primary}`}
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Call Now
          </Link>
          <Link
            href="/contact-us"
            className={cn(
              "inline-flex items-center gap-1.5 h-9 px-4 text-sm font-semibold",
              "bg-red-600 hover:bg-red-700 text-white rounded-lg",
              "border border-red-500/50 transition-colors"
            )}
          >
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            Request Service
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href={siteConfig.phone.primary_tel}
            className={cn(
              "inline-flex items-center justify-center w-9 h-9",
              "bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            )}
            aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.primary}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  className={cn(
                    "inline-flex items-center justify-center w-9 h-9",
                    "border border-white/20 text-white bg-transparent",
                    "hover:bg-white/8 rounded-lg transition-colors"
                  )}
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-sm bg-[#1a2347] border-l border-white/10 p-0"
              showCloseButton={false}
            >
              <MobileNav onClose={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mega Menu Panel — full viewport width, content centered */}
      <div
        className={cn(
          "hidden lg:block absolute left-0 right-0 top-full pointer-events-none",
          openMega && "pointer-events-auto"
        )}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div
          className={cn(
            "bg-[#1a2347] border-b border-white/10 shadow-2xl shadow-black/50 origin-top transition-[opacity,transform] duration-200 ease-out",
            openMega
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-1 invisible"
          )}
          aria-hidden={!openMega}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6">
            {activeCategory && (
              <CategoryMegaMenu
                category={activeCategory}
                onNavigate={closeNow}
              />
            )}
            {openMega === "areas" && <AreasMegaMenu onNavigate={closeNow} />}
          </div>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: Mega Menu Trigger Button                                    */
/* ------------------------------------------------------------------ */
function MegaTrigger({
  label,
  menuKey,
  openMega,
  onOpen,
  onScheduleClose,
  onToggle,
}: {
  label: string
  menuKey: MegaKey
  openMega: MegaKey | null
  onOpen: (k: MegaKey) => void
  onScheduleClose: () => void
  onToggle: (k: MegaKey) => void
}) {
  const isOpen = openMega === menuKey
  return (
    <li>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onMouseEnter={() => onOpen(menuKey)}
        onFocus={() => onOpen(menuKey)}
        onClick={() => onToggle(menuKey)}
        onBlur={onScheduleClose}
        className={cn(
          "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          "text-white/80 hover:text-white hover:bg-white/5",
          isOpen && "bg-white/5 text-white"
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: Generic Service-Category Mega Menu                          */
/*    Drives Plumbing Services / Water Heaters / Water Quality          */
/* ------------------------------------------------------------------ */
type ServiceCategory = (typeof siteConfig.serviceCategories)[number]

function CategoryMegaMenu({
  category,
  onNavigate,
}: {
  category: ServiceCategory
  onNavigate: () => void
}) {
  // Pick column count based on how many sub-services there are.
  // >12 items → 3 cols, 6–12 → 2 cols, <6 → 1 col.
  const count = category.services.length
  const cols = count > 12 ? "grid-cols-3" : count > 5 ? "grid-cols-2" : "grid-cols-1"
  const emergency = emergencyByMenu[category.slug] ?? DEFAULT_EMERGENCY
  const header = categoryHeaderByCategory[category.slug]

  return (
    <div className="grid grid-cols-[1fr_320px]">
      <div className="p-8 border-r border-white/8 flex flex-col">
        {/* Briefing panel — distinct tactical zone above the service list */}
        <div className="relative bg-white/3 border border-white/10 mb-6 overflow-hidden">
          {/* 4px red left accent line — signature SWAT element */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"
            aria-hidden="true"
          />
          {/* Tactical corner mark, top-right */}
          <div
            className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-red-600/60"
            aria-hidden="true"
          />

          <div className="flex items-end justify-between gap-6 pl-6 pr-5 py-5">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                {category.title}
              </p>
              {header && (
                <p className="text-white/65 text-xs mt-2.5 leading-relaxed">
                  {header.points.map((point, i) => (
                    <span key={point}>
                      {i > 0 && (
                        <span
                          className="text-red-500/70 mx-2"
                          aria-hidden="true"
                        >
                          •
                        </span>
                      )}
                      {point}
                    </span>
                  ))}
                </p>
              )}
            </div>
            <Link
              href={category.hubHref}
              onClick={onNavigate}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors shrink-0"
            >
              View {category.title.toLowerCase()}
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={cn("grid gap-1", cols)}>
          {category.services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-2 px-3 py-2.5 rounded-md transition-all min-h-10",
                "text-white/75 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/8"
              )}
            >
              <ChevronRight
                className="h-3 w-3 text-red-500/60 shrink-0 group-hover:text-red-400 transition-colors"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">{service.title}</span>
            </Link>
          ))}
        </div>
      </div>
      <EmergencyPanel content={emergency} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Desktop: Areas Mega Menu                                             */
/*   Shows featured cities only — full 49-city list lives on the        */
/*   homepage service-area section, the footer, and /areas-served.      */
/* ------------------------------------------------------------------ */
function AreasMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  type City = { name: string; slug: string; featured?: boolean }
  const cities = siteConfig.serviceArea as readonly City[]
  const featured = cities.filter((c) => c.featured)
  const total = cities.length
  const emergency = emergencyByMenu.areas ?? DEFAULT_EMERGENCY

  const stats: { value: string; accent?: string; label: string }[] = [
    { value: String(total), accent: "+", label: "Communities" },
    { value: "24/7", label: "Coverage" },
    { value: String(siteConfig.locations.length), label: "Response Hubs" },
  ]

  return (
    <div className="grid grid-cols-[1fr_320px]">
      <div className="p-8 border-r border-white/8">
        <div className="flex items-start justify-between mb-5 gap-6">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/30">
            Area of Operations
          </p>
          <Link
            href="/areas-served"
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors shrink-0"
          >
            View all {total} areas
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Mini stats row — ties menu to homepage design language */}
        <div className="grid grid-cols-3 gap-0 mb-6 border-y border-white/10 divide-x divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-3">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-black text-white tracking-tight leading-none">
                  {s.value}
                </span>
                {s.accent && (
                  <span className="text-lg font-black text-red-500 leading-none">
                    {s.accent}
                  </span>
                )}
              </div>
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/55 mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {featured.map((city) => {
            const cls =
              "flex items-center gap-2 px-3 py-3 rounded-md text-sm text-white/75 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/8 transition-all"
            const inner = (
              <>
                <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" aria-hidden="true" />
                {city.name}
              </>
            )
            if (siteConfig.cityPagesLive) {
              return (
                <Link
                  key={city.slug}
                  href={`/areas-served/${city.slug}`}
                  onClick={onNavigate}
                  className={cls}
                >
                  {inner}
                </Link>
              )
            }
            return (
              <div key={city.slug} className={cls}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
      <EmergencyPanel content={emergency} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Shared: Emergency Panel (right column of mega menus)                */
/* ------------------------------------------------------------------ */
const ctaIconMap = {
  phone: Phone,
  calendar: CalendarDays,
  map: MapPin,
} as const

function EmergencyPanel({
  content = DEFAULT_EMERGENCY,
}: {
  content?: EmergencyContent
}) {
  const cta = content.cta ?? {
    label: "Call Now",
    href: siteConfig.phone.primary_tel,
    icon: "phone" as CtaIcon,
  }
  const CtaIconComponent = ctaIconMap[cta.icon]

  return (
    <div className="relative p-8 bg-linear-to-b from-red-950/60 to-red-950/30 flex flex-col justify-between overflow-hidden">
      {/* Subtle tactical-grid overlay — adds depth without visual clutter */}
      <div
        className="absolute inset-0 tactical-grid opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="h-4 w-4 text-red-400" aria-hidden="true" />
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-red-400">
            {content.label}
          </span>
        </div>
        <p className="text-white text-sm font-semibold leading-snug mb-1.5">
          {content.headline}
        </p>
        <p className="text-white/60 text-xs leading-relaxed">
          {content.subline}
        </p>

        {/* Response signals — 3 tactical trust markers */}
        {content.signals && (
          <ul
            className="mt-5 pt-4 border-t border-white/10 space-y-2"
            role="list"
          >
            {content.signals.map((signal) => (
              <li
                key={signal}
                className="flex items-start gap-2 text-xs text-white/80 leading-tight"
              >
                <Check
                  className="h-3.5 w-3.5 text-red-400 shrink-0 mt-px"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tactical data readout — fills the lower panel zone with spec data */}
        {content.data && (
          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-red-400/90 font-semibold mb-2.5">
              {content.data.label}
            </div>
            <ul className="space-y-1.5" role="list">
              {content.data.items.map((item) => (
                <li
                  key={item}
                  className="text-white/65 text-[11px] font-mono leading-tight"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative mt-6 space-y-2">
        <Link
          href={cta.href}
          className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-2.5 px-3 rounded-md transition-colors min-h-11 text-center"
        >
          <CtaIconComponent className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{cta.label}</span>
        </Link>
        <Link
          href={siteConfig.phone.primary_tel}
          className="block text-center text-white/50 hover:text-white/80 text-xs font-mono tracking-wider transition-colors"
          aria-label={`Call S.W.A.T. Restoration at ${siteConfig.phone.primary}`}
        >
          or call {siteConfig.phone.primary}
        </Link>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile Navigation Sheet                                             */
/* ------------------------------------------------------------------ */
function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <SheetHeader className="px-5 py-4 border-b border-white/10 flex flex-row items-center justify-between">
        <SheetTitle className="flex items-center text-white">
          <Image
            src="/swatroughlogo.png"
            alt="S.W.A.T. Restoration"
            width={375}
            height={322}
            className="h-14 w-auto"
          />
        </SheetTitle>
        <SheetClose
          render={
            <button
              className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-colors"
              aria-label="Close menu"
              onClick={onClose}
            />
          }
        >
          <X className="h-4 w-4" />
        </SheetClose>
      </SheetHeader>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile navigation">
        <Accordion multiple className="w-full">

          {/* One accordion per service category */}
          {siteConfig.serviceCategories.map((cat) => (
            <AccordionItem
              key={cat.slug}
              value={cat.slug}
              className="border-b border-white/8"
            >
              <AccordionTrigger className="text-white/80 hover:text-white text-sm font-medium py-3 hover:no-underline">
                {cat.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pb-2 space-y-0.5">
                  {cat.services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={onClose}
                      className="flex items-center gap-2 px-2 py-2.5 rounded text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors min-h-11"
                    >
                      <ChevronRight
                        className="h-3 w-3 text-red-500/70 shrink-0"
                        aria-hidden="true"
                      />
                      {service.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}

          {/* Areas accordion */}
          <AccordionItem value="areas" className="border-b border-white/8">
            <AccordionTrigger className="text-white/80 hover:text-white text-sm font-medium py-3 hover:no-underline">
              Areas Served
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-2">
                <Link
                  href="/areas-served"
                  onClick={onClose}
                  className="flex items-center justify-between px-2 py-2 mb-2 rounded text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  View all {siteConfig.serviceArea.length} service areas
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <div className="grid grid-cols-2 gap-0.5">
                  {siteConfig.serviceArea.map((city) => {
                    const cls =
                      "flex items-center gap-2 px-2 py-2.5 rounded text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors min-h-11"
                    const inner = (
                      <>
                        <MapPin className="h-3.5 w-3.5 text-red-500 shrink-0" aria-hidden="true" />
                        {city.name}
                      </>
                    )
                    if (siteConfig.cityPagesLive) {
                      return (
                        <Link key={city.slug} href={`/areas-served/${city.slug}`} onClick={onClose} className={cls}>
                          {inner}
                        </Link>
                      )
                    }
                    return (
                      <div key={city.slug} className={cls}>
                        {inner}
                      </div>
                    )
                  })}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Plain nav links */}
        <div className="mt-1">
          {siteConfig.nav
            .filter((item) => !item.hasMega)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center px-2 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors min-h-11 border-b border-white/8 last:border-0"
              >
                {item.label}
              </Link>
            ))}
        </div>
      </nav>

      {/* Mobile footer CTAs */}
      <div className="p-4 border-t border-white/10 space-y-2.5 bg-[#0c1230]">
        <Link
          href={siteConfig.phone.primary_tel}
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-3.5 rounded-md transition-colors min-h-11"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {siteConfig.phone.primary}
        </Link>
        <Link
          href="/contact-us"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full border border-white/20 text-white text-sm font-medium py-3.5 rounded-md hover:bg-white/5 transition-colors min-h-11"
        >
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          Request Service
        </Link>
        {/* Emergency note */}
        <div className="flex items-center gap-2 pt-1">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
          </span>
          <p className="text-white/40 text-xs">First Responders for Water &amp; Fire Disasters</p>
        </div>
      </div>
    </div>
  )
}
