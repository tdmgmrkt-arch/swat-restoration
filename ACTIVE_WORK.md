# ACTIVE_WORK — S.W.A.T. Restoration

_Last updated: 2026-06-09_

## In Progress
_(nothing currently active)_

## City pages — gating note
`siteConfig.cityPagesLive` is `false`. While false, city names render as `<span>` (not `<a>`) across the homepage, header mega menu, mobile accordion, and footer — no 404s. Sitemap also excludes `/areas-served/[slug]` URLs. Flip the flag the same commit you ship the city-page template + data.

## Up Next
- [ ] **Replace `/public/swat-restoration-logo.svg`** — current is a programmatically generated banner placeholder. Drop the real client-provided logo (PNG or SVG) at this exact path; the header/sheet/footer all reference it.
- [ ] **Build inner pages** (none exist yet — homepage only). Recommended order:
  - Category hubs: `/water-damage`, `/fire-damage`, `/mold-remediation`, `/reconstruction`, `/areas-served`, `/insurance-claims`
  - Water damage sub-services (7): water-extraction, water-removal, structural-drying, flood-restoration, burst-pipe-cleanup, ceiling-leak-repair, sewage-cleanup
  - Fire damage sub-services (5): smoke-damage, soot-removal, odor-removal, contents-cleaning, board-up
  - Mold sub-services (4): mold-inspection, mold-removal, black-mold, air-quality
  - Reconstruction sub-services (5): roofing, general-construction, pack-out-cleaning, insurance-claims, storm-damage
  - Static: `/about-us`, `/contact-us`, `/blog`, `/privacy-policy`
- [ ] **Service+City combo pages (programmatic SEO)** — defer until base pages ship.
- [ ] Contact form with react-hook-form + zod → GHL webhook server action (POST to `GHL_WEBHOOK_URL` env var)
- [ ] GHL webhook URL from client → add to `GHL_WEBHOOK_URL` env var
- [ ] **Google Business Profile setup** — verify GBP listing, capture Place ID for `lib/site-config.ts` and `GOOGLE_PLACE_ID` env var
- [ ] **Restrict Google Places API key in Cloud Console** (when GBP comes online) — Application Restrictions to "None" or IP-allowlist Vercel's egress IPs; API Restrictions to "Places API (New)" only
- [ ] **Set Vercel env vars on deploy:** `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (Production scope)
- [ ] Real photography for `team-fleet` section — replace placeholder slots (4 slots have AI generation prompts ready in the component file)
- [ ] Vercel project setup + domain (swat-restoration.com — confirm with client)
- [ ] GitHub repo creation
- [ ] GA4 tracking ID from client
- [ ] Favicon + branded OG image (generate after final logo is in)

## Recently Completed
- [x] **Cloned from swat-plumbing** (2026-06-09): copied repo skeleton (excluding node_modules/.next/.git), then full rebrand pass
- [x] **Color palette swap** — black → navy `#232d5e` system across all components + `globals.css`. Red `#dc2626` accent preserved.
- [x] **Brand rewrite** — name, NAP, tagline, owners, all CTAs ("Schedule Online" → "Request Service"), email + phone, sister-brand removal of Fort Worth secondary location (single Aledo office)
- [x] **Service taxonomy** — restructured `lib/site-config.ts` from plumbing (3 cats, 22 sub-services) to restoration (4 cats: water-damage, fire-damage, mold-remediation, reconstruction; 24 sub-services)
- [x] **Homepage sections rewritten** — hero, services-overview missions, why-choose pillars, financing-banner → insurance-claims pivot, testimonials (the 3 supplied), team-fleet (family-first), service-area (single hub), final-cta
- [x] **Header mega-menu content** — 4 new category panels + areas; emergency-side panel content rewritten per vertical
- [x] **Schema.ts** — switched from `Plumber` to `[LocalBusiness, GeneralContractor]` + email field added
- [x] **Logo placeholder** — `/public/swat-restoration-logo.svg` (programmatic banner; awaiting real file)

## Decisions Log
- **Color spec:** Navy `#232d5e` (user-specified) replaces all black surfaces. Built a 3-tier navy palette around it: `#0c1230` (deepest backgrounds), `#232d5e` (primary surface), `#2c3970` (elevated). Red `#dc2626` preserved as accent across all SWAT brands.
- **NAP:** single Aledo office only (no Fort Worth secondary like plumbing has). Service-area component switched from 2-hub layout to 1-hub layout.
- **Financing → Insurance Claims pivot:** the original financing banner section was repurposed as an insurance-claim-assistance banner (more relevant for restoration). Same component, new copy + CTA going to `/insurance-claims`.
- **Service area kept identical** to swat-plumbing (49 DFW cities) — same geographic footprint, same featured 12.
- **Logo placeholder:** generated programmatic SVG banner as stand-in. Real logo needs to be dropped at `/public/swat-restoration-logo.svg`.
- **Schema:** changed from `Plumber` to `[LocalBusiness, GeneralContractor]` — there's no `RestorationContractor` schema.org type, and `GeneralContractor` is the closest fit recognized by Google for damage-restoration businesses.
