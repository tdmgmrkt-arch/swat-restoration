# E-E-A-T Audit — S.W.A.T. Restoration

_Date: 2026-06-23 · Scope: pre-launch codebase scan · Site not yet deployed_

---

## Overall Grade: **B+**

Strong content depth and trust scaffolding for a pre-launch site. Real owner story, real photography, technically rich service pages, and clean schema. Two real gaps before launch (live GBP + verifiable license/cert numbers) and one big post-launch lift (published blog content + case studies). The bones are better than 90% of restoration sites we'd benchmark against — what's missing is *proof*, not story.

---

## Pillar Scores

| Pillar | Score | Justification |
|---|---|---|
| **Experience** | 8 / 10 | Real owner photos, named family story, real job photos (atwork.jpeg, dispatch.png, fleet.jpeg + 6 process shots in `/public`), testimonials with full names + city attribution. Missing: dated case studies, before/afters, years-in-business statement. |
| **Expertise** | 8 / 10 | Service pages cite IICRC S500, FLIR thermal imaging, Phoenix dehumidifiers, Dri-Eaz air movers, Injectidry interstitial drying, Category 1/2/3 water classification, EPA guidelines. Real technical fluency. Missing: IICRC cert numbers, owner/tech credentials, Xactimate license confirmation (flagged in ACTIVE_WORK pre-launch list). |
| **Authoritativeness** | 5 / 10 | No external signals: no BBB, no chamber, no industry association, no insurance-carrier list, no media mentions, no awards. Blog is scaffolded but empty — zero published thought leadership. Footer's "Insurance Claim Experienced" badge has no names attached. |
| **Trustworthiness** | 7 / 10 | Strong schema (LocalBusiness + GeneralContractor, FAQ, Breadcrumb, ContactPage, two-tier city schema). Privacy policy + Terms of Service exist (608 lines combined). NAP consistent. Honest hours (office vs 24/7 emergency). Weak spots: hard-coded `reviewCount: 12` fallback in [lib/schema.ts:154](lib/schema.ts#L154), no license/cert numbers visible anywhere, GBP not yet verified (Place ID blank). |

---

## Top 5 Wins Already in Place

1. **About page is the real deal** — [app/about-us/page.tsx](app/about-us/page.tsx) is 616 lines with named owners (Dillon & Danielle Patterson), real headshots (`/dillon.webp`, `/danielle.webp`), a three-value code of ethics broken into Company / Clients / Vendors, and a family-first mission. This is uncommon for restoration sites. **Strongest single E-E-A-T asset.**
2. **Service pages have genuine technical depth** — e.g. [lib/services/water-extraction.ts:32-60](lib/services/water-extraction.ts#L32-L60) walks Dispatch → Assess (FLIR + moisture meters per IICRC S500) → Extract & Dry (Phoenix/Dri-Eaz/Injectidry) → Document. This is exactly the kind of passage AI engines cite.
3. **Schema is comprehensive and architecturally correct** — [lib/schema.ts](lib/schema.ts) emits `[LocalBusiness, GeneralContractor]` with `@id` continuity across pages, `EMERGENCY_CONTACT_POINT` for 24/7 dispatch, separate `OFFICE_HOURS`, FAQPage on every category hub and city, two-tier GBP/SAB strategy ready for when Aledo's Place ID lands.
4. **Real local footprint** — 49 DFW cities with lat/lng, ZIP codes, county, service radius. Each city has its own page + schema. Local-search machinery is in place.
5. **Honest 3-step "what happens next" framing** in email + service pages — replaced plumbing's "flat-rate" promise (which would have been a lie for restoration) with assessment + insurance coordination. Trust signal in itself.

---

## Top 10 Prioritized Gaps

### Pre-launch (block soft-launch until fixed)

1. **No verifiable license or certification numbers anywhere on the site.** "Licensed & Insured" appears in [site-footer.tsx:324](components/site/site-footer.tsx#L324) but no TRCC/MPL roofing license, no IICRC company cert ID, no Texas mold remediation registration. → **Fix:** add a "Credentials" block to the footer or About page with the actual numbers (TRCC, IICRC, Texas Mold Assessor/Remediator if applicable). **ETA: pre-launch.**

2. **GBP not verified, Place ID blank.** [lib/site-config.ts:29](lib/site-config.ts#L29) — `placeId: ""`. Until Google Business Profile is live, the Aledo location can't earn map-pack ranking or live review pulls. → **Fix:** verify GBP, drop Place ID into site-config + `GOOGLE_PLACE_ID` env var, flip `hasGbpListing: true` on `aledo-tx.ts`. **ETA: pre-launch.**

3. **Hard-coded `reviewCount: 12, ratingValue: 5.0` in schema fallback** — [lib/schema.ts:154](lib/schema.ts#L154). If Google's structured-data parser sees this before live reviews are pulled, it could trigger a soft penalty for AggregateRating without verifiable source. → **Fix:** either gate this behind `hasGbpListing` or remove the AggregateRating fallback entirely. **ETA: pre-launch.**

### Month 1 post-launch (high-leverage)

4. **Insurance carrier list is missing** — site says "Insurance Claim Experienced" everywhere but never names a single carrier. Adding "We work with State Farm, Allstate, USAA, Farmers, Liberty Mutual, and others" is a massive trust unlock. → **Fix:** add a "Carriers We Work With" strip to `/insurance-claims` (service page) and the homepage trust section.

5. **Owner bios lack credentials and tenure** — [app/about-us/page.tsx:88-105](app/about-us/page.tsx#L88-L105) — Dillon and Danielle have personality bios but no IICRC certs held, no years in restoration, no prior industry experience. → **Fix:** add 1-line credential under each role. e.g. "Dillon Patterson — Owner · IICRC WRT, ASD, AMRT · 12 years in DFW restoration."

6. **No case studies / before-after galleries** — restoration is *uniquely* visual. The site has zero published job stories. → **Fix:** ship 3 case-study pages (1 water, 1 fire, 1 mold) with before/during/after photos, scope, timeline, and a 1-line outcome. Massive Experience boost + AI-citation goldmine.

7. **Blog is a scaffolded shell** — [app/blog/page.tsx](app/blog/page.tsx) (274 lines) lists topic previews but has zero published articles. For AI citation readiness, this is the biggest single gap. → **Fix:** ship 5 cornerstone articles in month 1 — "First 24 hours after water damage," "What insurance pays for in a kitchen fire," "Mold vs. mildew," "How long does drying really take," "Reading your adjuster's scope." Each authored by Dillon or Danielle.

### Ongoing

8. **No external Authoritativeness signals** — no BBB rating, no Aledo Chamber of Commerce, no Texas Restoration Association affiliation, no supplier partnerships (Phoenix, Dri-Eaz). → **Fix:** earn and display 2-3 of these in months 1-3.

9. **Pre-launch confirmations in ACTIVE_WORK.md (#1-6) are E-E-A-T-load-bearing** — roofing licensing language, Xactimate license, third-party mold clearance, TCEQ biohazard wording, Esporta access. If any of these are aspirational rather than current, copy is making false expertise claims. → **Fix:** lock these answers with client before launch and adjust copy per item.

10. **No `llms.txt`** — for AI-engine discoverability. → **Fix:** add `/public/llms.txt` enumerating service URLs + a short business summary. Low-effort, high-ROI for ChatGPT/Perplexity citation pickup.

---

## AI-Citation Readiness

**Likely to get cited for:**
- Technical "how does X work" queries — service pages contain quotable, specific passages (e.g. "Category 3 biohazard containment per IICRC S500")
- Local "restoration company in Aledo / Fort Worth" queries — schema + 49 city pages + named owners give engines clean entity data
- "First 24 hours after water damage" — *if* the blog gets written

**Will NOT get cited for:**
- "Best restoration company in DFW" — no awards, no third-party validation, no review aggregation visible to crawlers
- Industry insight queries — no published author content
- "How much does X cost" — no pricing transparency anywhere

**Quick wins for AIO/Perplexity:**
- `llms.txt`
- 5 cornerstone blog articles with author byline (Dillon Patterson)
- Insurance carrier list (this single addition could surface SWAT in "restoration companies that work with [Carrier]" queries)

---

## Pre-Launch Verdict

**Cleared to launch with 3 conditions:**
1. License/cert numbers added (gap #1)
2. Schema `reviewCount` fallback gated or removed until real reviews land (gap #3)
3. Pre-launch confirmations #1-6 in ACTIVE_WORK.md resolved with client and copy adjusted accordingly

GBP verification (gap #2) is parallel-trackable — site can go live while GBP claim is in flight.

Everything else is post-launch optimization. Strong foundation.
