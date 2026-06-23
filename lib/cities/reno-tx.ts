import type { CityConfig } from "./_types"

export const renoTx: CityConfig = {
  slug: "reno-tx",
  name: "Reno",
  county: "Parker",
  zipCodes: ["76020", "76082"],
  geoCenter: { lat: 32.9447, lng: -97.5510 },
  serviceRadiusMiles: 20,
  closestHubSlug: "aledo",
  hasGbpListing: false,
  primaryHubSlug: "aledo",
  driveTimeMinutes: 18,
  href: "/areas-served/reno-tx",

  h1: "Water & Fire Damage Restoration // Reno, TX",

  metaTitle: "Restoration Reno, TX | S.W.A.T. Restoration",

  metaDescription:
    "Restoration Reno, TX — 24/7 water damage, fire & mold response. Well-water Cat 1/2 nuance, rural housing stock, north Parker County. IICRC-trained. Insurance billing direct. 817-286-4966.",

  heroPainLine:
    "Reno's rural Parker County housing stock draws from private wells that change how every water damage event gets classified under IICRC standards. Mineral load, standing time, and source condition have to be assessed before extraction begins — not assumed. S.W.A.T. Restoration dispatches from Aledo in 18 minutes.",

  entityAnchor:
    "S.W.A.T. Restoration is a family-owned IICRC-trained restoration contractor based at 2111 FM 1187 Suite 100, Aledo, TX 76008, serving Reno and north Parker County 24 hours a day, 7 days a week — call 817-286-4966.",

  trustStrip: [
    "18 Min from Aledo HQ",
    "IICRC-Trained Crews",
    "24/7 Emergency",
    "Well-Water Protocols",
    "Family Owned",
  ],

  localIntro:
    "Reno sits in north Parker County along the US-287 and FM 730 corridor between Weatherford and Azle — a small community defined by rural residential character, private well water, and housing stock that spans from 1960s and 1970s ranch homes to more recent construction on larger parcels. The defining restoration risk in Reno is one that urban DFW markets almost never encounter: well-water event classification.\n\nUnder IICRC water damage classification, a supply line failure in a home on private well water is not automatically Category 1 — the clean water category that applies to most municipal supply breaks. Parker County's limestone aquifer delivers water with elevated mineral and sediment content compared to treated municipal supply. That difference in baseline water quality matters when assessing restoration category. More significantly, if the pressure tank, pressure switch, or well pump are involved in the water event, or if the water has sat in the home for any period before extraction begins, the category can shift toward Category 2 — which changes the extraction protocol, the drying requirements, the materials that can be saved versus removed, and how the event is documented for insurance.\n\nS.W.A.T. Restoration assesses the water source, condition, and category on every Reno well-water job before protocols are set. That classification is documented in the cause-of-loss report — the same documentation your insurance adjuster uses to evaluate the claim. Reno's older ranch homes also carry aging galvanized drain lines and septic systems with decades of service life. A drain line failure in this housing stock is a Category 3 biohazard event regardless of its rural location. S.W.A.T. Restoration reaches Reno from Aledo in approximately 18 minutes on US-287 and serves the full Reno-area ZIP codes 76020 and 76082.",

  neighborhoods: [
    {
      name: "US-287 Corridor Properties",
      note: "Rural residential along the Weatherford-Azle highway, well water, mixed 1960s–1990s housing",
    },
    {
      name: "FM 730 Rural Tracts",
      note: "Large-lot acreage along FM 730 north of Weatherford, well water, septic, older housing stock",
    },
    {
      name: "Reno Town Limits (Parker County)",
      note: "Small incorporated north Parker community, limited municipal services, private well and septic",
    },
    {
      name: "North Parker County Ranch Properties",
      note: "Larger agricultural parcels with ranch improvements, outbuilding fire risk, well-water systems",
    },
  ],

  commonIssues: [
    "Private well-water supply line failures in Reno must be IICRC-classified on-site — mineral content, sediment load, and pressure tank involvement can elevate Cat 1 water to Cat 2 before extraction begins.",
    "Older galvanized drain lines in 1960s and 1970s Reno ranch homes reach end of service life into full-bore failure — Category 3 sewage events requiring biohazard protocols regardless of rural setting.",
    "Aging septic systems on Reno rural parcels fail lateral lines into occupied living space — full Cat 3 biohazard extraction and TCEQ-compliant disposal required.",
    "North Parker County clay soils beneath Reno slab foundations shift seasonally, opening perimeter moisture pathways in homes whose slabs have cycled 40-plus wet-dry seasons.",
    "Ranch outbuildings and agricultural structures on Reno parcels carry aging electrical and wood-frame fire risk — fire can migrate to residential structures before rural volunteer fire response suppresses the origin.",
  ],

  serviceHighlights: [
    {
      serviceSlug: "water-extraction",
      localAngle:
        "S.W.A.T. Restoration classifies well-water source and condition on-site in Reno before extraction begins — IICRC category determines protocol, not the appearance of the water.",
    },
    {
      serviceSlug: "sewage-cleanup",
      localAngle:
        "Galvanized drain line and septic failures in Reno ranch homes are Cat 3 biohazard events — S.W.A.T. Restoration handles full biohazard extraction, disinfection, and TCEQ-compliant disposal.",
    },
    {
      serviceSlug: "structural-drying",
      localAngle:
        "IICRC S500 drying on Reno well-water events sets drying goals based on the assessed water category — Cat 2 events require different drying targets and materials protocols than Cat 1.",
    },
    {
      serviceSlug: "mold-inspection",
      localAngle:
        "Moisture mapping in Reno rural homes identifies active wet zones in wall cavities and subfloor before mold growth begins — critical when water events go undetected on properties with lower occupancy.",
    },
    {
      serviceSlug: "smoke-damage",
      localAngle:
        "Fire and smoke migration from Reno ranch outbuildings into residential structures requires HEPA air scrubbing and structural soot removal — not surface treatment alone.",
    },
    {
      serviceSlug: "board-up",
      localAngle:
        "Post-fire board-up on Reno rural structures prevents secondary weather damage — especially important without fire suppression infrastructure at the property level.",
    },
    {
      serviceSlug: "flood-restoration",
      localAngle:
        "North Parker County storm events push surface water across Reno pasture land toward residential foundations — IICRC S500 extraction and drying address perimeter slab intrusion.",
    },
    {
      serviceSlug: "insurance-claims",
      localAngle:
        "Well-water source classification and septic biohazard documentation built at time of loss — S.W.A.T. Restoration provides adjuster-ready cause-of-loss reports for Parker County rural claims.",
    },
  ],

  whySwatPillars: [
    {
      title: "Well-Water Category Assessment — The Reno Difference",
      primary: true,
      bullets: [
        "IICRC water source classification assessed on every Reno well-water event — not defaulted to Cat 1 without on-site evaluation",
        "Mineral content, sediment load, pressure tank involvement, and standing time all factor into the documented classification",
        "Category determines extraction protocol, drying goals, materials disposition, and insurance documentation — it matters",
      ],
    },
    {
      title: "Rural Parker County Biohazard Handled Right",
      bullets: [
        "Septic lateral failures and old galvanized drain line events in Reno are Cat 3 biohazard jobs — full PPE, EPA disinfection, controlled demolition",
        "TCEQ-compliant waste disposal on all Reno Cat 3 events — rural location doesn't reduce the regulatory requirement",
        "S.W.A.T. Restoration reaches Reno in 18 minutes from Aledo — north Parker County neighbor, not a franchise dispatch",
      ],
    },
    {
      title: "Family Owned — 24/7 Dispatch for Rural Property Emergencies",
      bullets: [
        "Dillon and Danielle Patterson operate a business built for Parker County rural neighbors — not a suburban-only service",
        "24/7 dispatch at 817-286-4966 — live answer at any hour, no answering service, no call center",
        "Direct insurance billing and adjuster documentation on every job regardless of rural or remote location",
      ],
    },
  ],

  faqs: [
    {
      question: "Does my well water in Reno change how water damage gets cleaned up?",
      answer:
        "Yes, and the difference is more significant than most homeowners expect. Under IICRC water damage classification, the source and condition of the water determines the category — and the category determines extraction protocols, drying procedures, what materials can be saved versus removed, and how the event is documented for insurance. A clean well-water supply line burst is typically Category 1, the same as municipal supply. But Parker County limestone aquifer water carries elevated mineral and sediment content. If the pressure tank or pump is involved, if the water has sat before extraction begins, or if the water has contacted soil or contaminated surfaces, the category can shift to Category 2. S.W.A.T. Restoration assesses the source and condition on-site before protocols are set — that assessment is documented in the cause-of-loss report your adjuster reviews.",
    },
    {
      question: "How fast can S.W.A.T. Restoration reach Reno, TX in an emergency?",
      answer:
        "S.W.A.T. Restoration dispatches from the Aledo headquarters at 2111 FM 1187. Reno is approximately 18 minutes from Aledo via US-287. The dispatch line at 817-286-4966 answers 24 hours a day, 7 days a week — including rural property emergencies where time-to-extraction directly affects how far water spreads through wall assemblies and subfloor.",
    },
    {
      question: "My Reno property has an old septic system. What happens if it backs up into the house?",
      answer:
        "A septic backup into living space is a Category 3 (black water) event under IICRC classification — the highest biohazard level. This is true regardless of whether the property is rural or urban. Category 3 water contains pathogenic bacteria, fecal coliform, and potentially parasitic organisms. Porous materials that absorb Cat 3 water — drywall, carpet, wood subfloor, insulation — cannot be dried in place and reused. Remediation requires biohazard-rated PPE and containment, EPA-registered disinfectants on all affected surfaces, and controlled demolition of contaminated porous materials. Waste disposal follows TCEQ requirements. S.W.A.T. Restoration handles the full scope — call 817-286-4966 for 24/7 emergency response.",
    },
    {
      question: "Can a fire in my Reno barn or ranch structure threaten my house?",
      answer:
        "Yes. Rural Parker County properties including those in Reno typically lack fire hydrant infrastructure — suppression depends on Reno-area volunteer fire response and how quickly a crew can arrive with water. Wind direction, separation distance between structures, and the speed of fire spread through dry agricultural materials all affect whether a barn fire reaches a residence. After any fire event involving outbuildings, S.W.A.T. Restoration assesses smoke migration into the residential structure, handles post-fire board-up to protect exposed framing, performs full soot and odor removal from affected spaces, and manages reconstruction. Call 817-286-4966.",
    },
    {
      question: "Does S.W.A.T. Restoration serve the 76082 ZIP code in north Parker County?",
      answer:
        "Yes. S.W.A.T. Restoration serves Reno and the surrounding north Parker County area including both the 76020 and 76082 ZIP codes. Rural locations within these ZIPs are part of the standard service area. Call 817-286-4966 for 24/7 emergency dispatch — rural property emergencies receive the same response priority as suburban calls.",
    },
  ],

  nearbyCities: [
    { slug: "springtown-tx", name: "Springtown", driveMinutes: 10 },
    { slug: "azle-tx", name: "Azle", driveMinutes: 15 },
    { slug: "weatherford-tx", name: "Weatherford", driveMinutes: 20 },
    { slug: "aledo-tx", name: "Aledo", driveMinutes: 18 },
    { slug: "newark-tx", name: "Newark", driveMinutes: 20 },
    { slug: "willow-park-tx", name: "Willow Park", driveMinutes: 22 },
  ],

  lastUpdated: "2026-06-16",
}
