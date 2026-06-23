import type { CityConfig } from "./_types"

export const arlingtonTx: CityConfig = {
  slug: "arlington-tx",
  name: "Arlington",
  county: "Tarrant",
  zipCodes: ["76001", "76002", "76006", "76010", "76011", "76012", "76013", "76014", "76015", "76016", "76017", "76018", "76019"],
  geoCenter: { lat: 32.7357, lng: -97.1081 },
  serviceRadiusMiles: 25,
  closestHubSlug: "aledo",
  hasGbpListing: false,
  primaryHubSlug: "aledo",
  driveTimeMinutes: 40,
  href: "/areas-served/arlington-tx",

  h1: "Water & Fire Damage Restoration // Arlington, TX",

  metaTitle: "Restoration Arlington, TX | S.W.A.T. Restoration",

  metaDescription:
    "Restoration Arlington, TX — 24/7 water & fire damage, mold remediation, storm damage repair. IICRC-trained, insurance billing direct. S.W.A.T. Restoration. 817-286-4966.",

  heroPainLine:
    "Arlington absorbs more hail events per year than almost any city in Tarrant County — the stadium district sits at the convergence of two storm tracks, and single-family homes across Johnson Creek and South Arlington take the brunt. S.W.A.T. Restoration reaches Arlington in 40 minutes from Aledo.",

  entityAnchor:
    "S.W.A.T. Restoration is a family-owned IICRC-trained contractor based in Aledo, TX, serving Arlington and surrounding Tarrant County communities 24/7 for water damage restoration, fire and smoke damage, mold remediation, storm damage, and full reconstruction.",

  trustStrip: [
    "40 Min from Aledo HQ",
    "IICRC-Trained Crews",
    "24/7 Emergency",
    "Insurance Billing Direct",
    "Hail & Storm Specialists",
  ],

  localIntro:
    "Arlington's geography puts it at the intersection of two DFW storm tracks, and the result is consistent hail exposure across the city's single-family neighborhoods. The AT&T Stadium and Globe Life Field district creates a localized weather effect that has been documented across multiple storm seasons — convective cells stall near the stadium corridor and drop large hail across South Arlington and the Johnson Creek drainage basin. Homes in Pantego, South Arlington, and the western residential areas around Green Oaks Boulevard absorb hail seasons that punch through roofing materials and drive water into attic assemblies before the storm has passed.\n\nArlington's housing stock spans several distinct eras. The southeastern quadrant — homes built in the 1960s and 1970s — carries original slab construction with copper supply lines now showing pinhole failures under expansive Tarrant County clay. The near-stadium residential neighborhoods along Collins Street and Abram Street hold older wood-frame housing where fire risk is higher and smoke spreads farther through uninsulated wall cavities. Newer construction in Viridian and Southwest Arlington used engineered truss systems that deflect water in unexpected directions when a roof is breached — water intrusion doesn't always follow gravity in these homes.\n\nS.W.A.T. Restoration handles the full Arlington restoration scope: hail and storm damage extraction and drying, structural drying under IICRC S500, fire and smoke remediation, mold inspection and removal, and complete reconstruction including roofing. Direct insurance billing and adjuster documentation are included on every job. Arlington homeowners dealing with storm damage carry a documented claim — S.W.A.T. Restoration's scope-of-loss reporting is built to support it.",

  neighborhoods: [
    {
      name: "Pantego",
      note: "Enclave city inside Arlington, 1960s–70s stock, hail corridor exposure, clay-soil slab movement",
    },
    {
      name: "South Arlington",
      note: "Johnson Creek drainage basin, storm surge and hail impact, 1970s–80s single-family",
    },
    {
      name: "Viridian",
      note: "Newer master-planned community, engineered truss construction, water follows non-standard paths under roof breach",
    },
    {
      name: "Green Oaks",
      note: "Mixed vintage residential, Green Oaks Blvd corridor, hail damage on west-facing elevations",
    },
    {
      name: "North Arlington / Dalworthington Gardens",
      note: "Older residential near Six Flags corridor, original 1970s plumbing, burst-pipe exposure",
    },
    {
      name: "Collins Street Corridor",
      note: "Near-stadium older wood-frame housing, fire risk, smoke spreads in uninsulated cavity walls",
    },
  ],

  commonIssues: [
    "Arlington sits at the intersection of two DFW storm tracks — the stadium corridor creates a stall effect where hail events drop large-diameter stones across South Arlington residential neighborhoods.",
    "1960s–70s copper supply lines under Tarrant County clay slabs develop pinhole failures as clay movement stresses pipe joints — water intrusion starts slow and goes undetected for weeks.",
    "Engineered truss roofing systems in newer Arlington neighborhoods like Viridian redirect water intrusion in unexpected directions — damage appears in rooms far from the roof breach.",
    "Wood-frame housing near the Collins Street and Abram Street corridors holds fire and smoke damage longer than slab construction — uninsulated cavities let smoke migrate across entire floor plates.",
    "Johnson Creek drainage backs up during heavy rain events and pushes Category 2 water into first-floor assemblies in South Arlington homes near the floodplain.",
  ],

  serviceHighlights: [
    {
      serviceSlug: "storm-damage",
      localAngle:
        "Arlington's stadium-corridor hail stall effect makes storm damage the leading restoration event — S.W.A.T. Restoration handles extraction, drying, and full roofing reconstruction.",
    },
    {
      serviceSlug: "roofing",
      localAngle:
        "Hail seasons in Arlington punch through 3-tab and architectural shingles — S.W.A.T. Restoration scopes insurance-covered roof replacement as part of the full restoration job.",
    },
    {
      serviceSlug: "water-extraction",
      localAngle:
        "Storm-driven water intrusion in Arlington homes requires immediate extraction before Tarrant County humidity drives mold colonization inside wet wall assemblies.",
    },
    {
      serviceSlug: "structural-drying",
      localAngle:
        "IICRC S500 drying protocols calibrated for Arlington's clay-soil slab homes — moisture monitoring from subfloor to ceiling until readings return to baseline.",
    },
    {
      serviceSlug: "smoke-damage",
      localAngle:
        "Fire events in Arlington's older wood-frame housing spread smoke through uninsulated wall cavities — S.W.A.T. Restoration uses HEPA air scrubbing and IICRC S700 protocols.",
    },
    {
      serviceSlug: "flood-restoration",
      localAngle:
        "Johnson Creek floodplain events push Category 2 water into South Arlington first floors — S.W.A.T. Restoration extracts, dries, and documents for NFIP or homeowner claims.",
    },
    {
      serviceSlug: "mold-inspection",
      localAngle:
        "Post-storm mold inspection in Arlington homes confirms or rules out colonization before reconstruction begins — clearance testing before drywall goes back up.",
    },
    {
      serviceSlug: "insurance-claims",
      localAngle:
        "Arlington storm claims are complex — S.W.A.T. Restoration provides adjuster-ready scope-of-loss documentation for hail, wind, and water damage on the same claim.",
    },
  ],

  whySwatPillars: [
    {
      title: "Hail & Storm Corridor Experience — Built for Arlington's Exposure",
      primary: true,
      bullets: [
        "DFW stadium corridor hail stall effect is a documented pattern — not a surprise on every job",
        "Engineered truss deflection paths mapped on newer Arlington homes before extraction begins",
        "Full reconstruction including roofing as part of the same job — no handoff to a second contractor",
      ],
    },
    {
      title: "24/7 Dispatch — Storms Don't Wait for Business Hours",
      bullets: [
        "Live dispatch at 817-286-4966 at any hour — no answering service, no callback queue",
        "Board-up and emergency tarping dispatched same call as water extraction",
        "40-minute response from Aledo HQ to South Arlington and Pantego neighborhoods",
      ],
    },
    {
      title: "Insurance Claim Documentation That Holds Up",
      bullets: [
        "Timestamped moisture readings, photo logs, and cause-of-loss reports built for adjuster review",
        "Direct billing to insurer — Arlington homeowners don't advance payment and wait for reimbursement",
        "Experience with both standard homeowner and NFIP flood claims in Tarrant County",
      ],
    },
  ],

  faqs: [
    {
      question: "Does hail damage to my Arlington roof count as a covered insurance claim?",
      answer:
        "Hail damage to roofing materials is typically covered under standard Texas homeowner's insurance policies as a named peril. The key factor is demonstrating the hail event caused the damage — not pre-existing wear. S.W.A.T. Restoration documents hail impact with photo logs, measures stone diameter where measurable, and scopes the roof damage separately from interior water intrusion. This documentation supports your claim with the adjuster. Texas law gives policyholders two years from the date of loss to file a hail claim.",
    },
    {
      question: "How quickly can S.W.A.T. Restoration respond to storm damage in Arlington?",
      answer:
        "S.W.A.T. Restoration dispatches from Aledo and reaches Arlington in approximately 40 minutes. For active weather events affecting multiple neighborhoods simultaneously, the dispatch line at 817-286-4966 remains live 24/7. Board-up and emergency tarping to stop active water intrusion are dispatched on the same call as water extraction — you do not need to source a separate emergency service.",
    },
    {
      question: "I found water damage in my attic after a hail storm. How bad could it be?",
      answer:
        "Attic water intrusion after a hail event can range from a localized wet spot to full saturation of blown insulation, ceiling joists, and drywall below. In Arlington homes with engineered truss systems, water follows horizontal truss members and appears in rooms well away from the roof breach — a wet ceiling in a bedroom may trace to a penetration near the ridge. S.W.A.T. Restoration uses moisture meters and thermal imaging to map the full extent of intrusion before any drying equipment is placed.",
    },
    {
      question: "Can mold grow after an Arlington storm event even if I dried things out quickly?",
      answer:
        "Mold can begin growing inside wall cavities and roof assemblies within 48–72 hours of water exposure, even after visible surface water is removed. Consumer dehumidifiers and fans do not achieve the drying rates required by IICRC S500 to prevent secondary mold in structural assemblies. S.W.A.T. Restoration uses commercial-grade LGR dehumidifiers and air movers calibrated to structural moisture targets — and monitors daily until readings confirm the assembly is dry. Mold inspection after drying is included on complex jobs.",
    },
    {
      question: "Does S.W.A.T. Restoration handle reconstruction after the water damage is dried?",
      answer:
        "Yes. S.W.A.T. Restoration handles the full scope from extraction to rebuild — drywall, flooring, ceilings, roofing, and paint. Using one contractor for mitigation and reconstruction eliminates the documentation gap between phases that can delay or complicate insurance claims. Arlington homeowners do not need to source a separate general contractor for the rebuild after the drying phase is complete.",
    },
  ],

  nearbyCities: [
    { slug: "fort-worth-tx", name: "Fort Worth", driveMinutes: 20 },
    { slug: "mansfield-tx", name: "Mansfield", driveMinutes: 15 },
    { slug: "grand-prairie-tx", name: "Grand Prairie", driveMinutes: 12 },
    { slug: "bedford-tx", name: "Bedford", driveMinutes: 18 },
    { slug: "euless-tx", name: "Euless", driveMinutes: 20 },
    { slug: "kennedale-tx", name: "Kennedale", driveMinutes: 10 },
  ],

  lastUpdated: "2026-06-16",
}
