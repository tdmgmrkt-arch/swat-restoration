import type { CityConfig } from "./_types"

export const evermanTx: CityConfig = {
  slug: "everman-tx",
  name: "Everman",
  county: "Tarrant",
  zipCodes: ["76140"],
  geoCenter: { lat: 32.6318, lng: -97.2900 },
  serviceRadiusMiles: 20,
  closestHubSlug: "aledo",
  hasGbpListing: false,
  primaryHubSlug: "aledo",
  driveTimeMinutes: 30,
  href: "/areas-served/everman-tx",

  h1: "Water & Fire Damage Restoration // Everman, TX",

  metaTitle: "Restoration Everman, TX | S.W.A.T. Restoration",

  metaDescription:
    "Restoration Everman, TX — 24/7 water damage, sewage cleanup, mold remediation. Mid-century southeast Fort Worth suburb in 76140. IICRC-trained, insurance billing direct. 817-286-4966.",

  heroPainLine:
    "Everman's mid-century housing stock carries original cast-iron drain lines and copper supply systems now 50 to 60 years into service — and in a working-class community where families have lived in the same home for generations, a sewage backup or burst pipe is not just a property event, it disrupts the household for days. S.W.A.T. Restoration responds from Aledo in 30 minutes and handles the full cleanup.",

  entityAnchor:
    "S.W.A.T. Restoration is a family-owned IICRC-trained restoration contractor based in Aledo, TX, serving Everman and southeast Tarrant County 24/7 for water damage restoration, sewage backup cleanup, mold remediation, and insurance claim coordination — call 817-286-4966.",

  trustStrip: [
    "30 Min from Aledo HQ",
    "IICRC-Trained Crews",
    "24/7 Emergency",
    "Sewage Cleanup",
    "Insurance Billing Direct",
  ],

  localIntro:
    "Everman is a small southeast Tarrant County city just south of Fort Worth, bordered by Kennedale and Forest Hill. The community is tightly knit and multi-generational — many families here have owned the same home since the 1960s or 1970s, which means the houses are well-maintained in the ways families maintain things but have not necessarily received the system-level upgrades that come with investor-driven renovation. Original cast-iron drain lines, original copper supply systems, and original slab foundations are common in Everman homes built between 1950 and 1975.\n\nCast-iron drain lines in this age range corrode from the inside at the joints. Scale buildup and rust narrowing the pipe bore leads to slow drains, recurring clogs, and eventually root-intrusion points at corroded joints — the pathway for sewage backups at the lowest floor drain in the home. Sewage backup is a category 3 water event requiring professional containment, pathogen treatment, and removal of all porous materials that contacted the sewage. In a home that has been occupied by the same family for 40 years, the personal property and flooring affected by a sewage event carry both financial and sentimental weight — the cleanup needs to be thorough.\n\nWater damage from burst pipes and copper pinhole drips follows the same aging-housing pattern seen in nearby Forest Hill and Kennedale. Summer droughts on Tarrant County clay contract the soil beneath Everman slabs, stressing embedded supply lines. The February cold snaps that periodically hit southeast Tarrant County freeze supply lines in under-insulated exterior walls. S.W.A.T. Restoration handles the full event — extraction, moisture mapping, structural drying to IICRC S500 standards, mold remediation, and insurance claim documentation — so families in Everman can return to a dry, clean home without managing multiple contractors.",

  neighborhoods: [
    {
      name: "Homes along Everman Parkway (US-174)",
      note: "Primary north-south artery, 1960s–70s single-family, cast-iron drain and copper supply at service-life end",
    },
    {
      name: "Kennedale-adjacent tracts along Mansfield Highway",
      note: "East border residential, 1970s housing stock, slab clay-movement exposure",
    },
    {
      name: "Crowley ISD zone in southwest Everman",
      note: "School boundary, 1960s–70s homes, shared vintage with Edgecliff Village and Forest Hill",
    },
  ],

  commonIssues: [
    "Cast-iron drain lines in Everman's 1950s–70s homes corrode at joints over 50–60 years — scale buildup and root intrusion at corroded connections produce sewage backups at the lowest floor drain.",
    "Copper supply lines in 1960s–70s Everman homes are approaching pinhole-failure age — slow drips inside wall cavities build mold colonies for weeks before a stain or soft drywall signals the leak.",
    "February cold snaps freeze supply lines running through under-insulated exterior walls in pre-1980 Everman construction — burst events release water at line pressure inside the wall cavity.",
    "Tarrant County clay contraction during summer droughts stresses supply lines embedded in Everman's 50-year-old slab foundations, producing slow slab leaks beneath finished floors.",
    "Sewage backup from aging drain systems is a category 3 event — porous flooring materials and base wall assemblies must be removed and replaced, not dried and sanitized in place.",
  ],

  serviceHighlights: [
    {
      serviceSlug: "sewage-cleanup",
      localAngle:
        "Sewage backups from corroded cast-iron drain lines in Everman's mid-century homes require category 3 protocols — containment, pathogen treatment, and removal of all contacted porous materials.",
    },
    {
      serviceSlug: "water-extraction",
      localAngle:
        "Burst pipe and slab leak events in Everman's 1960s–70s housing release water into subfloor and wall cavities — extraction staged to the full saturation zone before drying begins.",
    },
    {
      serviceSlug: "structural-drying",
      localAngle:
        "IICRC S500 structural drying in Everman mid-century homes monitors daily readings until slab edge and base wall assemblies return to baseline — Tarrant County clay slows evaporation.",
    },
    {
      serviceSlug: "mold-inspection",
      localAngle:
        "Slow copper drips and sewage events in Everman wall and floor assemblies create mold risk within 48–72 hours — moisture mapping locates colonization before demo begins.",
    },
    {
      serviceSlug: "mold-removal",
      localAngle:
        "Mold in Everman wall cavities and subfloor assemblies is remediated to IICRC S520 containment standards — clearance testing required before any reconstruction begins.",
    },
    {
      serviceSlug: "burst-pipe-cleanup",
      localAngle:
        "Burst supply lines in Everman's pre-1980 exterior walls require same-day extraction and full moisture mapping — delayed response allows saturation to spread into adjacent rooms and subfloor.",
    },
    {
      serviceSlug: "odor-removal",
      localAngle:
        "Sewage backup and mold events in Everman homes produce persistent odor inside wall and floor assemblies — HEPA air scrubbing and odor treatment after remediation confirms clean air before occupancy.",
    },
    {
      serviceSlug: "insurance-claims",
      localAngle:
        "Everman sewage, burst-pipe, and slab claims require category documentation and cause-of-loss evidence — S.W.A.T. Restoration delivers adjuster-ready reports from the first visit.",
    },
  ],

  whySwatPillars: [
    {
      title: "Sewage and Water Damage Expertise for Aging Southeast Tarrant Housing",
      primary: true,
      bullets: [
        "Category 3 sewage protocols — containment, pathogen treatment, and full material removal",
        "Moisture mapping before demo confirms full saturation zone in 1950s–70s slab assemblies",
        "Full-scope: extraction, drying, mold remediation, odor removal, and reconstruction on one job",
      ],
    },
    {
      title: "IICRC Standards — Not Consumer Cleanup",
      bullets: [
        "IICRC S500 water damage and S520 mold remediation standards on every job",
        "Daily moisture readings logged throughout the drying phase — required for insurance documentation",
        "Clearance testing before reconstruction — mold remediation is not complete until air sampling confirms it",
      ],
    },
    {
      title: "Family-Owned — 30-Minute Response from Aledo to Everman",
      bullets: [
        "S.W.A.T. Restoration is owned by Dillon and Danielle Patterson in Aledo — not a franchise",
        "Every crew member is a direct employee, trained in-house and background-checked",
        "24/7 dispatch at 817-286-4966 — live answer any hour for Everman and southeast Tarrant County",
      ],
    },
  ],

  faqs: [
    {
      question: "My Everman home had a sewage backup. Is it safe to stay in the house?",
      answer:
        "Sewage backup is classified as category 3 water — it contains bacteria, viruses, and other pathogens that pose a health risk. The safety of remaining in the home depends on the extent of the backup and how much of the living space is affected. Areas with sewage contact should be avoided until professional cleanup is complete. S.W.A.T. Restoration sets up containment barriers to isolate the affected area, removes all porous materials that contacted sewage, applies antimicrobial treatment, and confirms the area is clean before removing containment. Do not attempt to clean sewage backup with consumer products — the pathogen risk requires professional protocols.",
    },
    {
      question: "How do I know if my Everman home's drain lines need replacement?",
      answer:
        "Cast-iron drain lines installed in the 1950s through 1970s have a service life of roughly 50 to 75 years under normal residential use. Signs of failing drain lines include recurring slow drains that don't clear with standard treatment, multiple clogs in different fixtures over a short period, gurgling sounds in floor drains, and sewage odors from drains when no fixture is running. A licensed plumber can camera-inspect the main drain line to assess corrosion and root intrusion. S.W.A.T. Restoration handles the water and sewage damage cleanup — the plumber handles the pipe assessment and replacement.",
    },
    {
      question: "Does S.W.A.T. Restoration serve both Forest Hill and Everman?",
      answer:
        "Yes. S.W.A.T. Restoration serves Everman, Forest Hill, Kennedale, and the broader southeast Tarrant County area from the Aledo HQ. Response time to Everman addresses is approximately 30 minutes. Call 817-286-4966 for 24/7 emergency dispatch.",
    },
    {
      question: "What happens to the flooring in my Everman home after a sewage backup?",
      answer:
        "Any porous flooring material that contacted sewage — carpet, pad, wood flooring, laminate, or the subfloor substrate — must be removed and replaced, not dried and sanitized in place. This is an IICRC S500 category 3 requirement, not a contractor recommendation. Tile and sealed concrete can often be cleaned and disinfected if the tile itself has no cracks. S.W.A.T. Restoration removes affected materials as part of the cleanup scope and documents the removal for the insurance claim. Flooring replacement is handled in the reconstruction phase after the area passes clearance.",
    },
    {
      question: "Will homeowner's insurance cover sewage backup damage in Everman?",
      answer:
        "Standard Texas homeowner's insurance policies do not automatically cover sewage backup damage — it is typically a separate endorsement called sewer backup or water backup coverage. Many homeowners in Everman and throughout Tarrant County do not realize this endorsement is missing from their policy until a backup occurs. S.W.A.T. Restoration documents the event for whichever coverage applies — if sewer backup coverage is in place, the documentation supports that claim; if only the main water damage policy applies, we document accordingly. Call 817-286-4966 immediately after a sewage event to begin the documentation process.",
    },
  ],

  nearbyCities: [
    { slug: "fort-worth-tx", name: "Fort Worth", driveMinutes: 12 },
    { slug: "forest-hill-tx", name: "Forest Hill", driveMinutes: 8 },
    { slug: "kennedale-tx", name: "Kennedale", driveMinutes: 10 },
    { slug: "mansfield-tx", name: "Mansfield", driveMinutes: 15 },
    { slug: "edgecliff-village-tx", name: "Edgecliff Village", driveMinutes: 10 },
  ],

  lastUpdated: "2026-06-16",
}
