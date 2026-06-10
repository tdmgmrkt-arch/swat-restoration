import Image from "next/image"
import { AccentLine, TacticalLabel } from "@/components/ui/tactical-panel"
import { cn } from "@/lib/utils"

/**
 * "Meet the Unit" — humanizes the brand with team + fleet imagery.
 */

type PhotoSlot = {
  /** Section header label */
  label: string
  /** Editorial caption that ships with the photo */
  caption: string
  /** Image source — must live under /public */
  img: string
  /** Aspect ratio for the photo box */
  aspect: "16/9" | "4/5" | "1/1" | "3/4"
  /** Visual span on lg+ — for layout balance */
  span: "lg:col-span-2" | "lg:col-span-1"
  /** Featured: gets the "Hero Shot" tag */
  featured?: boolean
  /** CSS object-position override (e.g. "center top", "50% 20%") */
  objectPosition?: string
}

const slots: PhotoSlot[] = [
  {
    label: "Built on Family",
    caption: "Dillon & Danielle Patterson — Owners. We treat your home like our own.",
    img: "/teamphoto.jpeg",
    aspect: "16/9",
    span: "lg:col-span-2",
    featured: true,
  },
  {
    label: "Fleet Ready",
    caption: "Fully stocked trucks. Drying equipment, air scrubbers, containment — on every dispatch.",
    img: "/fleet.jpeg",
    aspect: "4/5",
    span: "lg:col-span-1",
  },
  {
    label: "On Site",
    caption: "Water extraction in progress — every minute matters to stop secondary damage.",
    img: "/atwork1.jpeg",
    aspect: "4/5",
    span: "lg:col-span-1",
    objectPosition: "center top",
  },
  {
    label: "Dispatch Center",
    caption: "24/7 dispatch — when disaster hits, the first call is to family.",
    img: "/dispatch.png",
    aspect: "16/9",
    span: "lg:col-span-2",
  },
]

export default function TeamFleet() {
  return (
    <section
      className="relative bg-white py-20 lg:py-28"
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Section header */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <TacticalLabel>The Unit</TacticalLabel>
          <AccentLine />
          <h2
            id="team-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight"
          >
            Built on Family.
            <br />
            <span className="text-red-600">Right Here in DFW.</span>
          </h2>
          <p className="mt-5 text-gray-500 text-base sm:text-lg leading-relaxed">
            At S.W.A.T. Restoration, family is at the heart of everything we do.
            From the moment you call to the final touches, our team is committed
            to ensuring you feel supported and cared for every step of the way.
            With S.W.A.T. Restoration, you&apos;re not just a customer — you&apos;re part of our family.
          </p>
          <p className="mt-4 text-gray-700 text-base sm:text-lg font-semibold">
            — Dillon &amp; Danielle Patterson, Owners
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {slots.map((slot) => (
            <PhotoCard key={slot.label} slot={slot} />
          ))}
        </div>

      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Photo Card — image with editorial caption below.                     */
/* ------------------------------------------------------------------ */
function PhotoCard({ slot }: { slot: PhotoSlot }) {
  return (
    <article
      className={cn(
        "group relative bg-gray-950 rounded-sm overflow-hidden border border-gray-200",
        slot.span
      )}
    >
      {/* Photo */}
      <div
        className="relative bg-gray-950 border-b border-white/10 overflow-hidden"
        style={{ aspectRatio: slot.aspect.replace("/", " / ") }}
      >
        <Image
          src={slot.img}
          alt={slot.caption}
          fill
          sizes={
            slot.span === "lg:col-span-2"
              ? "(min-width: 1024px) 66vw, 100vw"
              : "(min-width: 1024px) 33vw, 100vw"
          }
          style={slot.objectPosition ? { objectPosition: slot.objectPosition } : undefined}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Tactical corner marks */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-red-600/60 z-1" aria-hidden="true" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-red-600/60 z-1" aria-hidden="true" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-red-600/60 z-1" aria-hidden="true" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-red-600/60 z-1" aria-hidden="true" />

        {/* Featured tag */}
        {slot.featured && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0e1430]/90 border border-red-600/40 rounded-sm backdrop-blur-sm z-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-red-400 font-mono">
              Hero Shot
            </span>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="p-5 lg:p-6 bg-gray-950">
        <div className="text-white text-sm font-bold tracking-wide mb-2 uppercase">
          {slot.label}
        </div>
        <p className="text-white/65 text-sm leading-relaxed">
          {slot.caption}
        </p>
      </div>
    </article>
  )
}
