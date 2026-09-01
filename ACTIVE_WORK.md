# ACTIVE_WORK — S.W.A.T. Restoration

_Last updated: 2026-09-01_

## Recently Completed
- **`public/llms.txt` created (2026-09-01)** — Full AI-agent content map per `sops/web-developer/ai-agent-visibility.md` Step 4. 131 URLs: 7 core pages, 4 category hubs + 21 sub-service pages, all 49 blog posts (grouped Water / Mold / Fire & Smoke / Storm & Roofing / Insurance & Cost), all 49 city pages (grouped by county + a featured-12 block), plus How-to-Take-Action, Contact, and Notes-for-AI-Assistants sections. Every URL audited against `lib/services/`, `lib/cities/`, `lib/blog/`, and `siteConfig.staticPages` — 0 mismatches. Trailing slashes throughout to match `trailingSlash: true`. Points to `/ai-actions.json` and `/sitemap.xml`. Added `/llms.txt` to `app/sitemap.ts`. **Bug fixed along the way:** `canonicalUrl()` appends a trailing slash, so the sitemap had been emitting `/ai-actions.json/` (404) — both static-file entries now build from `siteConfig.url` directly. **Correction:** Newark TX is in Wise County, not one of the four originally documented — county list corrected in `llms.txt`, `ai-actions.json`, and `CLIENT.md` to Tarrant / Parker / Denton / Johnson / Wise. `npx tsc --noEmit` clean.
- **GBP Auto-Poster onboarding complete (2026-08-26)** — Onboarded as `client_id = 12` on `https://gbautopost-production.up.railway.app`. Posts to Aledo GBP `locations/1559128427364597090`. `industry_context` includes August seasonal steering (DFW summer heat + thunderstorm season → AC condensate leaks, sudden storm water intrusion, hot-attic mold). **50 images uploaded** from Google Drive folder `1PFK-Y3RIU7KcNdjZ2quK_jMtzvQV4mzg` (numbered `swat-restoration-gbp-01.png` through `-55.png` with some gaps; each has the navy/red S.W.A.T. Restoration shield logo lower-third overlay). Used create-then-pause workaround (immediately PATCHed `last_post_date = today` after `POST /clients` before uploading images) to avoid the cron race that hit Gallagher + SWAT Plumbing — worked cleanly, first post shipped with image on the first try. First live post: thermal-imaging-moisture-detection image (`image_id 373`), LEARN_MORE CTA to `https://swat-restoration.com/`.

## In Progress
_(nothing blocked — city Phase 2 wire-up complete)_

## Up Next
- [ ] **Service+City combo pages (programmatic SEO)** — defer until all base city pages ship
- [ ] **Replace `/public/swat-restoration-logo.svg`** — current is a programmatically generated banner placeholder. Drop the real client-provided logo (PNG or SVG) at this exact path; the header/sheet/footer all reference it.
- [ ] **`GHL_WEBHOOK_URL` env var** — contact form route handler is wired but returns 503 until this var is set. Add to Vercel env vars when client provides webhook URL.
- [ ] **Credentials block** — drop real values into `siteConfig.credentials` in `lib/site-config.ts` (IICRC cert #, TRCC license #, mold remediator registration). Footer trust strip only renders lines with non-empty values, so currently nothing shows. Pre-launch blocker per EEAT audit.
- [ ] **Restrict Google Places API key** in Cloud Console — currently unrestricted (Application restrictions: None). Add HTTP referrer restriction for `swat-restoration.com/*` and `*.vercel.app/*` once domain is live.
- [ ] **Set Vercel env vars on deploy (Production scope):**
  - `GOOGLE_PLACES_API_KEY=AIzaSyBAmLsSEWxOQavcMXJVmWgcBzEoLmRQ6ok`
  - `GOOGLE_PLACE_ID=ChIJv7lsMNYPToYRoqmCYKJ65Nc`
  - `GHL_WEBHOOK_URL` (pending from client)
- [ ] Real photography for `team-fleet` section — replace placeholder slots
- [ ] Vercel project setup + domain (swat-restoration.com — confirm with client)
- [ ] GitHub repo creation
- [ ] GA4 tracking ID from client
- [ ] Favicon + branded OG image (generate after final logo is in)

## Pre-launch client confirmations

The following items require client (Dillon & Danielle) confirmation before these pages go fully live:

1. **Roofing in-house vs. subcontracted** — `roofing.ts` and `storm-damage.ts` position S.W.A.T. as the roofing contractor of record. If they sub roofing out, copy needs softening to "coordinated through a licensed roofing partner" (Texas Occupations Code contractor licensing risk).
2. **Esporta Wash System access** — `contents-cleaning.ts` and `pack-out-cleaning.ts` name Esporta by brand. Confirm S.W.A.T. owns / has direct access, or adjust language to "partner facility."
3. **Xactimate license held internally?** — `insurance-claims.ts` positions S.W.A.T. as writing Xactimate estimates internally. Confirm an active Xactimate license is held; otherwise switch "writes" → "prepares" / "submits via licensed estimator."
4. **Third-party clearance testing on mold jobs** — `mold-removal.ts` + `black-mold.ts` specify post-remediation air sampling by an *independent* lab. Confirm this is standard SOP, not self-certified.
5. **`ceiling-leak-repair.ts`** (water-damage, surfaced in prior pass) — neutral on whether S.W.A.T. does source-plumbing repair in-house or refers out. Confirm so language can sharpen.
6. **TCEQ biohazard disposal language in `sewage-cleanup.ts`** (water-damage, surfaced in prior pass) — verify with client given legal weight.
7. ~~**Aledo GBP Place ID**~~ — ✅ DONE 2026-06-23. Place ID `ChIJv7lsMNYPToYRoqmCYKJ65Nc` verified live (rating 4.8, 329 reviews). `hasGbpListing: true` on `aledo-tx.ts`, `placeId` set in `site-config.ts`, env var live in `.env.local`.
8. **Mansfield county** — `mansfield-tx.ts` is set to Tarrant; city straddles the Tarrant/Johnson line. Confirm with client whether Johnson County belongs in any copy.
9. **NRH meta title truncation** — `north-richland-hills-tx.ts` meta title trimmed to fit ≤60 chars (dropped "Restoration" word). Confirm acceptable or propose alternate trim.
10. **Southlake/Grapevine share ZIP 76092** — both cities list 76092 in their `zipCodes` array. Verify nothing in the template breaks if both render simultaneously (no ZIP-based unique key in city components).
11. **Annetta family neighborhood names** — Annetta North and Annetta South lack publicly documented subdivisions; copy uses county-road corridor proxies. Confirm with client if specific area names are preferred.
12. **Pelican Bay neighborhoods** — used FM 1886 and lakefront-easement proxies; no named subdivisions of record.
13. **Lakeside ZIP confirmation** — listed 76108 + 76135 (both appear in public records). Verify against Parker/Tarrant appraisal district.
14. **Reno ZIPs** — listed 76020 + 76082 (parcels appear in both). Verify with client or county.
15. **Burleson primarily Johnson County** — file uses `county: "Johnson"` per the type contract. Both ZIPs (76028, 76058) sit in Johnson County. Confirm the city is acceptable as a Johnson-County listing in customer-facing copy.
16. **Grand Prairie locked to Tarrant** — the type contract doesn't include `"Dallas"`, so the file uses `"Tarrant"` since most residential ZIPs (75050-75054) sit Tarrant-side. Confirm OK or expand the type.
17. **Shared ZIP confirmations** — Westlake/Trophy Club share 76262; Watauga/Haltom City share 76148; River Oaks/Sansom Park/Westworth Village share 76114. Templates handle this gracefully but flagging for awareness.
18. **DWG / Pantego subdivisions** — no named subdivisions documented; copy uses arterial road anchors (S. Hampshire Blvd, W. Park Row Dr, Pioneer Pkwy / SH-303). Confirm with client.
19. **Saginaw / Crowley neighborhood proxies** — Western Hills Estates, Saginaw Heights, McAlister Farms used as area references rather than confirmed HOA subdivisions; client may have local-knowledge corrections.
20. **Blue Mound** — only 3 neighborhood entries (Castleberry ISD zone, Bailey Boswell Rd corridor, Blue Mound Rd corridor); city has very limited platted subdivision data.

## Recently Completed
- [x] **EEAT audit + pre-launch schema fixes** (2026-06-23): Full E-E-A-T audit completed → `audits/eeat-audit-2026-06-23.md`, overall B+. Pre-launch fixes shipped: (1) AggregateRating gated behind `placeId` in `lib/schema.ts` (was hard-coded 5.0/12), (2) verifiable credentials block stub added to `siteConfig.credentials` + footer trust strip — empty values render nothing, no false claims.
- [x] **Aledo GBP wired up** (2026-06-23): Place ID `ChIJv7lsMNYPToYRoqmCYKJ65Nc` verified live (rating **4.8 / 329 reviews**). New API key `AIzaSyBAm...Q6ok` configured with Places API (New) restriction on its own Cloud project. Schema + fallback + city flag all updated.
- [x] **Service-page universal hero background** (2026-06-23): `/public/hero-images/service-pages-hero.webp` set as default for all 22 service pages via `service-hero.tsx` fallback. Opacity standardized at 0.55.
- [x] **GHL email templates** (2026-06-23): Two HTML templates added at `emails/internal-notification.html` (dispatch alert) + `emails/customer-confirmation.html` (auto-reply). Restoration-branded with navy palette and 4.8/329 ready to plug in. Logo CDN URL still needs swap (currently placeholder).
- [x] **City pages Phase 2 shipped: 37 long-tail cities (all 49 of 49 service-area cities now live)** (2026-06-17): Annetta, Annetta North, Annetta South, Azle, Benbrook, Blue Mound, Burleson, Colleyville, Crowley, Dalworthington Gardens, Edgecliff Village, Everman, Flower Mound, Forest Hill, Grand Prairie, Haltom City, Haslet, Hudson Oaks, Kennedale, Lake Worth, Lakeside, Newark, Pantego, Pelican Bay, Reno, Richland Hills, River Oaks, Saginaw, Sansom Park, Springtown, Trophy Club, Watauga, Westlake, Westover Hills, Westworth Village, White Settlement, Willow Park. Build: 83 static routes clean, 49 pre-rendered `/areas-served/[slug]` paths.
- [x] **Phase 2 Batch A — 12 city data files written** (2026-06-17): Annetta, Annetta North, Annetta South, Willow Park, Hudson Oaks, Reno, Springtown, Azle, Newark, Lake Worth, Lakeside, Pelican Bay. All conform to `CityConfig` type contract.
- [x] **City pages Phase 1 shipped** (2026-06-17): `/areas-served` hub + 12 featured city pages (Aledo, Fort Worth, Arlington, Bedford, Euless, Grapevine, Hurst, Keller, Mansfield, North Richland Hills, Southlake, Weatherford). `cityPagesLive` flag flipped to `true`. Build: 46 static routes clean.
- [x] **Cloned from swat-plumbing** (2026-06-09): copied repo skeleton (excluding node_modules/.next/.git), then full rebrand pass
- [x] **Color palette swap** — black → navy `#232d5e` system across all components + `globals.css`. Red `#dc2626` accent preserved.
- [x] **Brand rewrite** — name, NAP, tagline, owners, all CTAs ("Schedule Online" → "Request Service"), email + phone, sister-brand removal of Fort Worth secondary location (single Aledo office)
- [x] **Service taxonomy** — restructured `lib/site-config.ts` from plumbing (3 cats, 22 sub-services) to restoration (4 cats: water-damage, fire-damage, mold-remediation, reconstruction; 24 sub-services)
- [x] **Homepage sections rewritten** — hero, services-overview missions, why-choose pillars, financing-banner → insurance-claims pivot, testimonials (the 3 supplied), team-fleet (family-first), service-area (single hub), final-cta
- [x] **Header mega-menu content** — 4 new category panels + areas; emergency-side panel content rewritten per vertical
- [x] **Schema.ts** — switched from `Plumber` to `[LocalBusiness, GeneralContractor]` + email field added
- [x] **Logo placeholder** — `/public/swat-restoration-logo.svg` (programmatic banner; awaiting real file)
- [x] **Dynamic service-page template** — `app/water-damage/[slug]/page.tsx` with `generateStaticParams` (water-extraction only). Includes: `lib/services/_types.ts`, `lib/services/water-extraction.ts`, `lib/services-config.ts` (aggregator, schema helpers, related-services resolver). All 10 `components/sections/service-page/` components copied + adapted from swat-plumbing. (2026-06-16)
- [x] **Contact page** — `app/contact-us/page.tsx` with single Aledo location card (no Fort Worth secondary). Includes: `lib/contact-schema.ts` (restoration service types), `components/forms/contact-form.tsx` (react-hook-form + zod), `app/api/contact/route.ts` (GHL webhook handler, wired to `GHL_WEBHOOK_URL` env var — pending). Schema functions `contactPageSchema()` + `contactBreadcrumbSchema()` added to `lib/schema.ts`. (2026-06-16)
- [x] **New dependencies** — `react-hook-form`, `@hookform/resolvers`, `zod` added via npm install (2026-06-16)
- [x] **Water-damage vertical shipped** — `/water-damage` hub + 7 sub-service pages (water-extraction, water-removal, structural-drying, flood-restoration, burst-pipe-cleanup, ceiling-leak-repair, sewage-cleanup). All 7 pages static SSG, clean build. `lib/services-config.ts` registry + `generateStaticParams` updated to pull from `waterDamageCategoryServices`. (2026-06-16)
- [x] **Fire / mold / reconstruction verticals shipped** — 3 category hubs + 14 sub-service pages registered in `lib/services-config.ts`. Pages: smoke-damage, soot-removal, odor-removal, contents-cleaning, board-up, mold-inspection, mold-removal, black-mold, air-quality, roofing, general-construction, pack-out-cleaning, insurance-claims, storm-damage. All 22 service pages live across 4 categories. Build: 33 static routes clean. (2026-06-16)
- [x] **City-page infrastructure scaffolded** — 16 new files: `lib/cities/_types.ts`, `lib/cities-config.ts`, 11 city-page section components (`components/sections/city-page/`), `app/areas-served/page.tsx` (hub with FAQPage + BreadcrumbList JSON-LD, single Aledo hub card, 49-city grid), `app/areas-served/[slug]/page.tsx` (empty `generateStaticParams`, full 11-section layout), `components/site/page-breadcrumb.tsx`, city schema helpers added to `lib/schema.ts`. Build: 34 static routes clean. (2026-06-17)

## Decisions Log
- **Color spec:** Navy `#232d5e` (user-specified) replaces all black surfaces. Built a 3-tier navy palette around it: `#0c1230` (deepest backgrounds), `#232d5e` (primary surface), `#2c3970` (elevated). Red `#dc2626` preserved as accent across all SWAT brands.
- **NAP:** single Aledo office only (no Fort Worth secondary like plumbing has). Service-area component and contact page both use 1-hub layout.
- **Financing → Insurance Claims pivot:** the original financing banner section was repurposed as an insurance-claim-assistance banner (more relevant for restoration). Same component, new copy + CTA going to `/insurance-claims`.
- **Service area kept identical** to swat-plumbing (49 DFW cities) — same geographic footprint, same featured 12.
- **Logo placeholder:** generated programmatic SVG banner as stand-in. Real logo needs to be dropped at `/public/swat-restoration-logo.svg`.
- **Schema:** changed from `Plumber` to `[LocalBusiness, GeneralContractor]` — there's no `RestorationContractor` schema.org type, and `GeneralContractor` is the closest fit recognized by Google for damage-restoration businesses.
- **Contact page route:** `/contact-us` (matches `siteConfig.nav` href and `staticPages` sitemap entry). Contact form POSTs to `/api/contact` which proxies to `GHL_WEBHOOK_URL` env var.
- **Service page fallback background:** `service-hero.tsx` falls back to `/team-fleet-hero.webp` (not the plumbing fleet image) when `cfg.heroImage` is not set.
