"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  Accessibility,
  X,
  Type,
  Contrast,
  Palette,
  Link2,
  BookOpen,
  MousePointer2,
  PauseCircle,
  RotateCcw,
} from "lucide-react"

type Settings = {
  textSize: 0 | 1 | 2 | 3
  highContrast: boolean
  invert: boolean
  highlightLinks: boolean
  readableFont: boolean
  bigCursor: boolean
  pauseAnimations: boolean
}

const DEFAULT_SETTINGS: Settings = {
  textSize: 0,
  highContrast: false,
  invert: false,
  highlightLinks: false,
  readableFont: false,
  bigCursor: false,
  pauseAnimations: false,
}

const STORAGE_KEY = "swat-restoration-a11y-settings"

const TEXT_SIZE_LABELS = ["Default", "Large", "Extra Large", "Huge"] as const

function applyToDocument(s: Settings) {
  const root = document.documentElement
  root.classList.toggle("a11y-text-1", s.textSize === 1)
  root.classList.toggle("a11y-text-2", s.textSize === 2)
  root.classList.toggle("a11y-text-3", s.textSize === 3)
  root.classList.toggle("a11y-high-contrast", s.highContrast)
  root.classList.toggle("a11y-invert", s.invert)
  root.classList.toggle("a11y-highlight-links", s.highlightLinks)
  root.classList.toggle("a11y-readable-font", s.readableFont)
  root.classList.toggle("a11y-big-cursor", s.bigCursor)
  root.classList.toggle("a11y-pause-anim", s.pauseAnimations)
}

export function AccessibilityWidget() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    // Hydration-safe mount flag — server can't run localStorage, so we wait
    // until the client mounts before reading saved settings. This setState
    // is the intended pattern, not a cascading-render issue.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Settings>
        const merged = { ...DEFAULT_SETTINGS, ...parsed }
        setSettings(merged)
        applyToDocument(merged)
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    applyToDocument(settings)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* ignore */
    }
  }, [settings, mounted])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const update = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const toggle = useCallback(
    (key: Exclude<keyof Settings, "textSize">) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    },
    [],
  )

  const cycleTextSize = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      textSize: ((prev.textSize + 1) % 4) as Settings["textSize"],
    }))
  }, [])

  const reset = useCallback(() => setSettings(DEFAULT_SETTINGS), [])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open accessibility menu"
        aria-expanded={open}
        aria-controls="a11y-panel"
        className="a11y-widget-root fixed z-[60] right-4 bottom-[88px] lg:right-6 lg:bottom-6 h-12 w-12 lg:h-14 lg:w-14 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-lg shadow-[#0c1230]/50 ring-2 ring-white/10 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-400/60"
      >
        <Accessibility className="h-6 w-6 lg:h-7 lg:w-7" aria-hidden="true" />
      </button>

      {open && (
        <div
          className="a11y-widget-root fixed inset-0 z-[70] flex justify-end"
          role="presentation"
        >
          <button
            type="button"
            aria-label="Close accessibility menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[#0c1230]/70 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            id="a11y-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-panel-title"
            className="relative h-full w-full max-w-sm bg-[#0c1230] text-white border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#232d5e]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-red-600 flex items-center justify-center">
                  <Accessibility className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="a11y-panel-title"
                    className="font-bold text-base leading-tight"
                  >
                    Accessibility
                  </h2>
                  <p className="text-xs text-white/60 font-mono uppercase tracking-wider">
                    Adjust your view
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close accessibility menu"
                className="h-9 w-9 rounded-md hover:bg-white/10 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              <Section title="Text">
                <RowButton
                  icon={<Type className="h-5 w-5" aria-hidden="true" />}
                  label="Text size"
                  state={TEXT_SIZE_LABELS[settings.textSize]}
                  active={settings.textSize > 0}
                  onClick={cycleTextSize}
                />
                <RowToggle
                  icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
                  label="Readable font"
                  active={settings.readableFont}
                  onClick={() => toggle("readableFont")}
                />
              </Section>

              <Section title="Display">
                <RowToggle
                  icon={<Contrast className="h-5 w-5" aria-hidden="true" />}
                  label="High contrast"
                  active={settings.highContrast}
                  onClick={() => {
                    if (!settings.highContrast && settings.invert) update("invert", false)
                    toggle("highContrast")
                  }}
                />
                <RowToggle
                  icon={<Palette className="h-5 w-5" aria-hidden="true" />}
                  label="Invert colors"
                  active={settings.invert}
                  onClick={() => {
                    if (!settings.invert && settings.highContrast) update("highContrast", false)
                    toggle("invert")
                  }}
                />
                <RowToggle
                  icon={<PauseCircle className="h-5 w-5" aria-hidden="true" />}
                  label="Pause animations"
                  active={settings.pauseAnimations}
                  onClick={() => toggle("pauseAnimations")}
                />
              </Section>

              <Section title="Navigation">
                <RowToggle
                  icon={<Link2 className="h-5 w-5" aria-hidden="true" />}
                  label="Highlight links"
                  active={settings.highlightLinks}
                  onClick={() => toggle("highlightLinks")}
                />
                <RowToggle
                  icon={<MousePointer2 className="h-5 w-5" aria-hidden="true" />}
                  label="Large cursor"
                  active={settings.bigCursor}
                  onClick={() => toggle("bigCursor")}
                />
              </Section>
            </div>

            <div className="px-5 py-4 border-t border-white/10 bg-[#232d5e]">
              <button
                type="button"
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-mono uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset all
              </button>
              <p className="mt-3 text-[11px] text-white/40 leading-relaxed text-center">
                Your preferences are saved on this device.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40 mb-2 px-1">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function RowToggle({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-md border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
        active
          ? "bg-red-600/15 border-red-600/60 text-white"
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white/90"
      }`}
    >
      <span
        className={`h-9 w-9 rounded-md flex items-center justify-center shrink-0 ${
          active ? "bg-red-600 text-white" : "bg-white/5 text-white/70"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1 font-medium text-sm">{label}</span>
      <span
        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded ${
          active ? "bg-red-600 text-white" : "bg-white/5 text-white/50"
        }`}
      >
        {active ? "On" : "Off"}
      </span>
    </button>
  )
}

function RowButton({
  icon,
  label,
  state,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  state: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-md border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
        active
          ? "bg-red-600/15 border-red-600/60 text-white"
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white/90"
      }`}
    >
      <span
        className={`h-9 w-9 rounded-md flex items-center justify-center shrink-0 ${
          active ? "bg-red-600 text-white" : "bg-white/5 text-white/70"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1 font-medium text-sm">{label}</span>
      <span
        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded ${
          active ? "bg-red-600 text-white" : "bg-white/5 text-white/50"
        }`}
      >
        {state}
      </span>
    </button>
  )
}
