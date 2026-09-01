# S.W.A.T. Restoration

## Overview
Family-owned water & fire damage restoration company serving Aledo, Fort Worth, and the surrounding DFW metroplex. Tagline: **"First Responders for Water & Fire Disasters."** Sister brand to S.W.A.T. Plumbing (same SWAT-style premium tactical aesthetic — swapped from black to navy).

## Owners
**Dillon & Danielle Patterson** — Owners, S.W.A.T. Restoration. Family is at the heart of every job; surface this in About content.

## Repo Path
`C:\Users\Owner\agency\clients\swat-restoration\`

## NAP (Name / Address / Phone)
- **Primary:** S.W.A.T. Restoration · 2111 FM 1187 Suite 100, Aledo, TX 76008 · 817-286-4966
- **Email:** main@swat-restoration.com

## Brand
- **Palette:** Navy `#232d5e` (primary), `#0c1230` (deep), `#2c3970` (elevated), Red `#dc2626` (accent), Grey `#6b7280`, White
- **Aesthetic:** Premium, sharp, high-trust. Subtle tactical/SWAT cues — first-responder readiness, rapid deployment. Family-first warmth balances the tactical edge.
- **Typography:** Geist Sans (body + headings), Geist Mono (stats, labels, tactical numerics)
- **Logo:** Placeholder at `/public/swat-restoration-logo.svg` — **REPLACE** with real banner mark provided by client. Wired at header (`h-14 lg:h-20`), mobile sheet (`h-14`), footer (`h-16`).

## Tech Stack
- Next.js 16.2.7 (App Router, TypeScript strict)
- Tailwind CSS v4 (`@theme inline` in globals.css — no tailwind.config.js)
- shadcn/ui v4 (base-ui primitives)
- lucide-react
- npm (not pnpm)

## Service Verticals (4 categories)
1. **Water Damage Restoration** (`/water-damage`) — water extraction, structural drying, flood, burst pipes, ceiling leaks, sewage cleanup
2. **Fire & Smoke Damage** (`/fire-damage`) — smoke, soot, odor removal, contents cleaning, board-up
3. **Mold Remediation** (`/mold-remediation`) — inspection, removal, black mold, air-quality restoration
4. **Reconstruction & Roofing** (`/reconstruction`) — roofing, general construction, pack-out & cleaning, insurance claims, storm damage

## Key Differentiators
- 24/7 emergency response — first responders for water & fire disasters
- Family owned & operated (Dillon & Danielle Patterson)
- Right here in DFW
- Insurance claim experienced — direct billing, adjuster coordination, full documentation
- IICRC-trained crews

## Service Area
**49 DFW cities** across Tarrant, Parker, Denton, Johnson & Wise counties (Newark is Wise County). Full list lives in `lib/site-config.ts`. 12 featured markets surface in the desktop mega menu. All 49 appear on the homepage service-area section, the footer, and in the JSON-LD `areaServed` schema.

**City pages:** gated behind `siteConfig.cityPagesLive` (default `false`). While false, city names render as plain text (no `<a>`) and individual city URLs are excluded from the sitemap.

## GHL
- Webhook URL: _pending — add as `GHL_WEBHOOK_URL` env var when ready_

## Vercel
- Project: _not yet created_
- Domain: swat-restoration.com (confirm with client)

## Notes
- **Cloned from swat-plumbing** on 2026-06-09 — same component architecture, same shadcn v4 / base-ui quirks
- shadcn Button does NOT support `asChild` — use styled `<Link>` elements directly for link-buttons
- Accordion uses `multiple` prop (boolean), not `type="multiple"`
- SheetTrigger/SheetClose use `render={<element />}` not `asChild`
- Logo file needs replacement (`/public/swat-restoration-logo.svg` is a placeholder banner)
- Google Place ID for Aledo location: _pending GBP verification_ — once known, add to `lib/site-config.ts` and set `GOOGLE_PLACE_ID` env var

## GBP (Google Business Profile)
- **GBP location_id (auto-poster format):** `locations/1559128427364597090` — S.W.A.T. RESTORATION at 2111 E. FM 1187 Suite 100, Aledo TX 76008
- **Auto-poster status (2026-08-26):** Onboarded as `client_id = 12` on `https://gbautopost-production.up.railway.app`. 50 images in library (Google Drive folder `1PFK-Y3RIU7KcNdjZ2quK_jMtzvQV4mzg` — all AI-generated `swat-restoration-gbp-XX.png` scenes with navy/red S.W.A.T. Restoration shield logo lower-third overlay). Posting daily. `industry_context`: "Water, fire, storm, and mold damage restoration serving Aledo, Fort Worth, and the DFW metroplex out of Aledo HQ. Focus on 24/7 emergency response and direct insurance billing. Currently August - peak DFW summer heat and thunderstorm season; bias content toward AC condensate line leaks, sudden thunderstorm water intrusion, and hot-attic mold growth." First live post: 2026-08-26 (thermal-imaging-moisture-detection image, LEARN_MORE CTA to website). Onboarding used the create-then-immediately-pause workaround (`PATCH last_post_date = <today>` before uploading images) to avoid the create → upload cron race that hit Gallagher and SWAT Plumbing.
