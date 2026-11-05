"use client"

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react"
import { X } from "lucide-react"
import {
  SITE_OUTAGE_BANNER_ENABLED,
  SITE_OUTAGE_DIALOG_DISMISSED_KEY,
  SITE_OUTAGE_DISMISSED_KEY,
  siteOutageCopy,
} from "@/lib/site-outage"

const OFFSET_VAR = "--outage-strip-offset"

type Phase = "pending" | "dialog" | "strip" | "hidden"

function readSession(key: string) {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function writeSession(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // Storage can throw in private mode. The notice still renders this view.
  }
}

function setStripOffset(height: number) {
  document.documentElement.style.setProperty(OFFSET_VAR, `${Math.max(0, height)}px`)
}

function clearStripOffset() {
  document.documentElement.style.setProperty(OFFSET_VAR, "0px")
}

function releaseDialogFocus(dialog: HTMLDialogElement | null) {
  const active = document.activeElement
  if (!(active instanceof HTMLElement)) return
  if ((dialog && dialog.contains(active)) || !active.isConnected) {
    active.blur()
  }
}

const phaseListeners = new Set<() => void>()

function subscribePhase(listener: () => void) {
  phaseListeners.add(listener)
  return () => {
    phaseListeners.delete(listener)
  }
}

function emitPhase() {
  for (const listener of phaseListeners) listener()
}

function getClientPhase(): Phase {
  if (!SITE_OUTAGE_BANNER_ENABLED) return "hidden"
  if (readSession(SITE_OUTAGE_DISMISSED_KEY) === "1") return "hidden"
  if (readSession(SITE_OUTAGE_DIALOG_DISMISSED_KEY) === "1") return "strip"
  return "dialog"
}

function getServerPhase(): Phase {
  return SITE_OUTAGE_BANNER_ENABLED ? "pending" : "hidden"
}

export default function SiteOutageNotice() {
  const phase = useSyncExternalStore(subscribePhase, getClientPhase, getServerPhase)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const ignoreCloseRef = useRef(false)

  const assignStrip = useCallback((node: HTMLDivElement | null) => {
    stripRef.current = node
    if (!node) {
      clearStripOffset()
      return
    }
    setStripOffset(Math.ceil(node.getBoundingClientRect().height))
  }, [])

  useEffect(() => {
    const node = stripRef.current
    if (!node || phase !== "strip") {
      clearStripOffset()
      return
    }

    const apply = () => {
      setStripOffset(Math.ceil(node.getBoundingClientRect().height))
    }
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(node)
    return () => {
      observer.disconnect()
      clearStripOffset()
    }
  }, [phase])

  useEffect(() => {
    if (phase !== "dialog") return
    const dialog = dialogRef.current
    if (!dialog) return

    try {
      if (!dialog.open) dialog.showModal()
    } catch {
      // showModal throws if the dialog is already open.
    }
    panelRef.current?.focus()

    return () => {
      if (!dialog.open) return
      ignoreCloseRef.current = true
      dialog.close()
      ignoreCloseRef.current = false
    }
  }, [phase])

  useEffect(() => {
    if (phase !== "dialog") return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [phase])

  function handleDialogClose() {
    if (ignoreCloseRef.current) return
    writeSession(SITE_OUTAGE_DIALOG_DISMISSED_KEY, "1")
    releaseDialogFocus(dialogRef.current)
    emitPhase()
  }

  function requestDialogClose() {
    const dialog = dialogRef.current
    if (dialog?.open) {
      dialog.close()
      return
    }
    handleDialogClose()
  }

  function dismissStrip() {
    writeSession(SITE_OUTAGE_DISMISSED_KEY, "1")
    emitPhase()
  }

  if (!SITE_OUTAGE_BANNER_ENABLED || phase === "pending" || phase === "hidden") {
    return null
  }

  return (
    <>
      {phase === "strip" && (
        <div
          ref={assignStrip}
          data-outage-strip
          role="region"
          aria-label={siteOutageCopy.label}
          className="fixed inset-x-0 top-0 z-50 border-b border-red-600/40 bg-[#0c1230] pt-[env(safe-area-inset-top)] text-white"
        >
          <div
            className="absolute inset-y-0 left-0 w-1 bg-red-600"
            aria-hidden="true"
          />
          <div className="mx-auto flex max-w-7xl items-center gap-3 py-2 pr-2 pl-4 sm:px-6">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
              <span className="inline-flex shrink-0 items-center gap-2">
                <span
                  className="inline-flex h-1.5 w-1.5 rounded-full bg-red-500 animate-slow-pulse"
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] font-bold tracking-[0.22em] text-red-400 uppercase">
                  {siteOutageCopy.label}
                </span>
              </span>
              <p className="text-[13px] leading-snug font-medium text-white/90 sm:text-sm">
                {siteOutageCopy.strip}
              </p>
            </div>
            <button
              type="button"
              onClick={dismissStrip}
              aria-label="Dismiss service notice"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/20 text-white/75 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {phase === "dialog" && (
        <dialog
          ref={dialogRef}
          data-outage-dialog
          aria-labelledby="site-outage-title"
          aria-describedby="site-outage-description"
          aria-modal="true"
          onClose={handleDialogClose}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              event.currentTarget.close()
            }
          }}
          className="site-outage-dialog"
        >
          <div
            ref={panelRef}
            tabIndex={-1}
            className="corner-mark relative w-full max-w-lg overflow-hidden border border-white/10 bg-[#131a3e] shadow-[0_24px_80px_rgba(0,0,0,0.45)] outline-none"
          >
            <div
              className="absolute inset-y-0 left-0 w-1 bg-red-600"
              aria-hidden="true"
            />
            <div
              className="tactical-grid pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={requestDialogClose}
              aria-label="Close service notice"
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-[#131a3e]/80 text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="relative px-7 pt-8 pb-7 sm:px-8 sm:pt-9 sm:pb-8">
              <div className="mb-4 flex items-center gap-3 pr-10">
                <span
                  className="relative inline-flex h-2 w-2"
                  aria-hidden="true"
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                <p className="font-mono text-[10px] font-bold tracking-[0.25em] text-red-400 uppercase">
                  {siteOutageCopy.label}
                </p>
                <span
                  className="h-px w-12 bg-red-600/40"
                  aria-hidden="true"
                />
              </div>
              <h2
                id="site-outage-title"
                className="mb-4 text-2xl font-black tracking-tight text-white sm:text-[1.75rem] sm:leading-tight"
              >
                {siteOutageCopy.title}
              </h2>
              <div
                id="site-outage-description"
                className="space-y-3 text-sm leading-relaxed text-white/80 sm:text-[15px]"
              >
                {siteOutageCopy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-7 flex sm:justify-end">
                <button
                  type="button"
                  onClick={requestDialogClose}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-red-500/50 bg-red-600 px-6 py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131a3e] sm:w-auto"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}
