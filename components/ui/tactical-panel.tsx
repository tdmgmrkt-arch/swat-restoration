import * as React from "react"
import { cn } from "@/lib/utils"

interface TacticalPanelProps extends React.ComponentProps<"div"> {
  /** Show corner marks (red L-bracket decorations) */
  corners?: boolean
  /** Show grid background */
  grid?: boolean
  /** Add a left red accent border stripe */
  accentBorder?: boolean
  /** Padding preset */
  pad?: "none" | "sm" | "md" | "lg"
}

export function TacticalPanel({
  corners = false,
  grid = false,
  accentBorder = false,
  pad = "md",
  className,
  children,
  ...props
}: TacticalPanelProps) {
  const padClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8 lg:p-12",
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        grid && "tactical-grid",
        corners && "corner-mark",
        accentBorder && "border-l-2 border-l-red-600",
        padClasses[pad],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/** Small red accent line — used as a section divider above headings */
export function AccentLine({ className }: { className?: string }) {
  return (
    <div
      className={cn("w-10 h-0.5 bg-red-600 mb-4", className)}
      aria-hidden="true"
    />
  )
}

/** Tactical label — small uppercase tracking label before headings */
export function TacticalLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-red-500 mb-2",
        className
      )}
    >
      {children}
    </p>
  )
}
