// Single source of truth for NAP, navigation, services, and cities.
// Edit this file to update content across the entire site.

export const siteConfig = {
  name: "S.W.A.T. Restoration",
  tagline: "First Responders for Water & Fire Disasters",
  description:
    "S.W.A.T. Restoration delivers 24/7 emergency water damage restoration, fire & smoke damage restoration, mold remediation, pack-out & cleaning, roofing, and full reconstruction across Aledo, Fort Worth, and surrounding DFW communities. Family owned and operated.",
  url: "https://www.swat-restoration.com",

  phone: {
    aledo: "817-286-4966",
    primary: "817-286-4966",
    aled_tel: "tel:+18172864966",
    primary_tel: "tel:+18172864966",
  },

  email: "main@swat-restoration.com",

  locations: [
    {
      name: "Aledo",
      address: "2111 FM 1187 Suite 100",
      city: "Aledo",
      state: "TX",
      zip: "76008",
      phone: "817-286-4966",
      tel: "tel:+18172864966",
      placeId: "", // TODO: add Google Place ID when GBP is verified
    },
  ],

  // Flip to true once individual /areas-served/[slug] pages are built.
  // While false: city names render as plain text (no <a> tags), and city URLs
  // are excluded from the sitemap. Schema.org areaServed still lists all cities.
  cityPagesLive: false,

  // DFW service area — same 49-community footprint as legacy SWAT brands.
  // `featured: true` marks priority markets shown in the desktop mega menu.
  serviceArea: [
    { name: "Aledo", slug: "aledo-tx", featured: true },
    { name: "Annetta", slug: "annetta-tx" },
    { name: "Annetta North", slug: "annetta-north-tx" },
    { name: "Annetta South", slug: "annetta-south-tx" },
    { name: "Arlington", slug: "arlington-tx", featured: true },
    { name: "Azle", slug: "azle-tx" },
    { name: "Bedford", slug: "bedford-tx", featured: true },
    { name: "Benbrook", slug: "benbrook-tx" },
    { name: "Blue Mound", slug: "blue-mound-tx" },
    { name: "Burleson", slug: "burleson-tx" },
    { name: "Colleyville", slug: "colleyville-tx" },
    { name: "Crowley", slug: "crowley-tx" },
    { name: "Dalworthington Gardens", slug: "dalworthington-gardens-tx" },
    { name: "Edgecliff Village", slug: "edgecliff-village-tx" },
    { name: "Euless", slug: "euless-tx", featured: true },
    { name: "Everman", slug: "everman-tx" },
    { name: "Flower Mound", slug: "flower-mound-tx" },
    { name: "Forest Hill", slug: "forest-hill-tx" },
    { name: "Fort Worth", slug: "fort-worth-tx", featured: true },
    { name: "Grand Prairie", slug: "grand-prairie-tx" },
    { name: "Grapevine", slug: "grapevine-tx", featured: true },
    { name: "Haltom City", slug: "haltom-city-tx" },
    { name: "Haslet", slug: "haslet-tx" },
    { name: "Hudson Oaks", slug: "hudson-oaks-tx" },
    { name: "Hurst", slug: "hurst-tx", featured: true },
    { name: "Keller", slug: "keller-tx", featured: true },
    { name: "Kennedale", slug: "kennedale-tx" },
    { name: "Lake Worth", slug: "lake-worth-tx" },
    { name: "Lakeside", slug: "lakeside-tx" },
    { name: "Mansfield", slug: "mansfield-tx", featured: true },
    { name: "Newark", slug: "newark-tx" },
    { name: "North Richland Hills", slug: "north-richland-hills-tx", featured: true },
    { name: "Pantego", slug: "pantego-tx" },
    { name: "Pelican Bay", slug: "pelican-bay-tx" },
    { name: "Reno", slug: "reno-tx" },
    { name: "Richland Hills", slug: "richland-hills-tx" },
    { name: "River Oaks", slug: "river-oaks-tx" },
    { name: "Saginaw", slug: "saginaw-tx" },
    { name: "Sansom Park", slug: "sansom-park-tx" },
    { name: "Southlake", slug: "southlake-tx", featured: true },
    { name: "Springtown", slug: "springtown-tx" },
    { name: "Trophy Club", slug: "trophy-club-tx" },
    { name: "Watauga", slug: "watauga-tx" },
    { name: "Weatherford", slug: "weatherford-tx", featured: true },
    { name: "Westlake", slug: "westlake-tx" },
    { name: "Westover Hills", slug: "westover-hills-tx" },
    { name: "Westworth Village", slug: "westworth-village-tx" },
    { name: "White Settlement", slug: "white-settlement-tx" },
    { name: "Willow Park", slug: "willow-park-tx" },
  ],

  // Master service taxonomy — restoration verticals.
  serviceCategories: [
    {
      slug: "water-damage",
      hubHref: "/water-damage",
      title: "Water Damage Restoration",
      shortDescription:
        "Emergency water extraction, structural drying, and full water damage restoration — residential and commercial.",
      icon: "Droplets",
      services: [
        { title: "Water Damage Restoration", href: "/water-damage" },
        { title: "Emergency Water Extraction", href: "/water-damage/water-extraction" },
        { title: "Water Removal", href: "/water-damage/water-removal" },
        { title: "Structural Drying", href: "/water-damage/structural-drying" },
        { title: "Flood Damage Restoration", href: "/water-damage/flood-restoration" },
        { title: "Burst Pipe Cleanup", href: "/water-damage/burst-pipe-cleanup" },
        { title: "Ceiling Leak Repair", href: "/water-damage/ceiling-leak-repair" },
        { title: "Sewage Cleanup", href: "/water-damage/sewage-cleanup" },
      ],
    },
    {
      slug: "fire-damage",
      hubHref: "/fire-damage",
      title: "Fire & Smoke Damage",
      shortDescription:
        "Fire damage restoration, smoke and soot removal, odor neutralization, and contents recovery.",
      icon: "Flame",
      services: [
        { title: "Fire & Smoke Damage Restoration", href: "/fire-damage" },
        { title: "Smoke Damage Restoration", href: "/fire-damage/smoke-damage" },
        { title: "Soot Removal", href: "/fire-damage/soot-removal" },
        { title: "Odor Removal & Neutralization", href: "/fire-damage/odor-removal" },
        { title: "Contents Cleaning", href: "/fire-damage/contents-cleaning" },
        { title: "Board-Up Services", href: "/fire-damage/board-up" },
      ],
    },
    {
      slug: "mold-remediation",
      hubHref: "/mold-remediation",
      title: "Mold Remediation",
      shortDescription:
        "Certified mold inspection, containment, removal, and air-quality restoration.",
      icon: "ShieldCheck",
      services: [
        { title: "Mold Remediation", href: "/mold-remediation" },
        { title: "Mold Inspection & Testing", href: "/mold-remediation/mold-inspection" },
        { title: "Mold Removal", href: "/mold-remediation/mold-removal" },
        { title: "Black Mold Remediation", href: "/mold-remediation/black-mold" },
        { title: "Air Quality Restoration", href: "/mold-remediation/air-quality" },
      ],
    },
    {
      slug: "reconstruction",
      hubHref: "/reconstruction",
      title: "Reconstruction & Roofing",
      shortDescription:
        "Full-scope reconstruction, roofing, general construction, pack-out, and insurance claim assistance.",
      icon: "Wrench",
      services: [
        { title: "Reconstruction Services", href: "/reconstruction" },
        { title: "Roofing Services", href: "/reconstruction/roofing" },
        { title: "General Construction", href: "/reconstruction/general-construction" },
        { title: "Pack-Out & Cleaning", href: "/reconstruction/pack-out-cleaning" },
        { title: "Insurance Claim Assistance", href: "/reconstruction/insurance-claims" },
        { title: "Storm Damage Repair", href: "/reconstruction/storm-damage" },
      ],
    },
  ],

  // Featured services for the homepage grid + footer "Services" column.
  featuredServices: [
    {
      title: "Water Damage Restoration",
      href: "/water-damage",
      description:
        "24/7 emergency water extraction, structural drying, and full restoration — from burst pipes to flood damage.",
      icon: "Droplets",
    },
    {
      title: "Fire & Smoke Damage",
      href: "/fire-damage",
      description:
        "Fire restoration, smoke and soot removal, odor neutralization — restoring homes back to better than before.",
      icon: "Flame",
    },
    {
      title: "Mold Remediation",
      href: "/mold-remediation",
      description:
        "Certified mold inspection, safe containment, and complete removal — protecting your family's air quality.",
      icon: "ShieldCheck",
    },
    {
      title: "Pack-Out & Cleaning",
      href: "/reconstruction/pack-out-cleaning",
      description:
        "Careful contents inventory, off-site cleaning, climate-controlled storage, and full return.",
      icon: "Layers",
    },
    {
      title: "Roofing Services",
      href: "/reconstruction/roofing",
      description:
        "Storm damage repair, full replacement, and roofing reconstruction — insurance claim experienced.",
      icon: "Home",
    },
    {
      title: "24/7 Emergency Response",
      href: "/water-damage",
      description:
        "Burst pipes, fire damage, storm damage — rapid response any hour, any day. First responders for disasters.",
      icon: "Zap",
    },
  ],

  // Top-level navigation. Mega-menu items are wired by category slug.
  nav: [
    {
      label: "Water Damage",
      href: "/water-damage",
      hasMega: true,
      megaCategory: "water-damage",
    },
    {
      label: "Fire & Smoke",
      href: "/fire-damage",
      hasMega: true,
      megaCategory: "fire-damage",
    },
    {
      label: "Mold Remediation",
      href: "/mold-remediation",
      hasMega: true,
      megaCategory: "mold-remediation",
    },
    {
      label: "Reconstruction",
      href: "/reconstruction",
      hasMega: true,
      megaCategory: "reconstruction",
    },
    {
      label: "Areas Served",
      href: "/areas-served",
      hasMega: true,
      megaCategory: "areas",
    },
    {
      label: "Contact",
      href: "/contact-us",
      hasMega: false,
    },
  ],

  // Static routes (used by sitemap + redirects)
  staticPages: [
    { href: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { href: "/about-us", priority: 0.7, changeFrequency: "monthly" as const },
    { href: "/areas-served", priority: 0.9, changeFrequency: "monthly" as const },
    { href: "/insurance-claims", priority: 0.7, changeFrequency: "monthly" as const },
    { href: "/contact-us", priority: 0.8, changeFrequency: "monthly" as const },
    { href: "/blog", priority: 0.6, changeFrequency: "weekly" as const },
    { href: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  ],

  social: {
    facebook: "https://www.facebook.com/swatrestoration",
    google: "https://g.page/swatrestoration",
  },

  // Google rating badge fallback — used when Places API env vars are not set,
  // or when the live fetch fails. Replace with verified GBP numbers post-launch.
  googleRatingFallback: {
    rating: 5.0,
    count: 12,
  },

  // Family / story — surfaced in the "Built on Family" homepage section and
  // on the About page when built.
  owners: {
    names: "Dillon & Danielle Patterson",
    title: "Owners, S.W.A.T. Restoration",
  },
} as const
