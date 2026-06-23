import type { CityConfig } from "./cities/_types"
import { servicesConfig } from "./services-config"
import { siteConfig } from "./site-config"

// Phase 1 — 12 featured markets
import { aledoTx } from "./cities/aledo-tx"
import { fortWorthTx } from "./cities/fort-worth-tx"
import { arlingtonTx } from "./cities/arlington-tx"
import { bedfordTx } from "./cities/bedford-tx"
import { eulesTx } from "./cities/euless-tx"
import { grapevineTx } from "./cities/grapevine-tx"
import { hurstTx } from "./cities/hurst-tx"
import { kellerTx } from "./cities/keller-tx"
import { mansfieldTx } from "./cities/mansfield-tx"
import { northRichlandHillsTx } from "./cities/north-richland-hills-tx"
import { southlakeTx } from "./cities/southlake-tx"
import { weatherfordTx } from "./cities/weatherford-tx"

// Phase 2 Batch A — Parker / lake / outer DFW (12)
import { annettaTx } from "./cities/annetta-tx"
import { annettaNorthTx } from "./cities/annetta-north-tx"
import { annettaSouthTx } from "./cities/annetta-south-tx"
import { willowParkTx } from "./cities/willow-park-tx"
import { hudsonOaksTx } from "./cities/hudson-oaks-tx"
import { renoTx } from "./cities/reno-tx"
import { springtownTx } from "./cities/springtown-tx"
import { azleTx } from "./cities/azle-tx"
import { newarkTx } from "./cities/newark-tx"
import { lakeWorthTx } from "./cities/lake-worth-tx"
import { lakesideTx } from "./cities/lakeside-tx"
import { pelicanBayTx } from "./cities/pelican-bay-tx"

// Phase 2 Batch B — Established Tarrant mid-cities (13)
import { benbrookTx } from "./cities/benbrook-tx"
import { burlesonTx } from "./cities/burleson-tx"
import { colleyvilleTx } from "./cities/colleyville-tx"
import { crowleyTx } from "./cities/crowley-tx"
import { flowerMoundTx } from "./cities/flower-mound-tx"
import { grandPrairieTx } from "./cities/grand-prairie-tx"
import { haltomCityTx } from "./cities/haltom-city-tx"
import { saginawTx } from "./cities/saginaw-tx"
import { trophyClubTx } from "./cities/trophy-club-tx"
import { wataugaTx } from "./cities/watauga-tx"
import { westlakeTx } from "./cities/westlake-tx"
import { whiteSettlementTx } from "./cities/white-settlement-tx"
import { hasletTx } from "./cities/haslet-tx"

// Phase 2 Batch C — Tarrant small suburbs / villages (12)
import { blueMoundTx } from "./cities/blue-mound-tx"
import { dalworthingtonGardensTx } from "./cities/dalworthington-gardens-tx"
import { edgecliffVillageTx } from "./cities/edgecliff-village-tx"
import { evermanTx } from "./cities/everman-tx"
import { forestHillTx } from "./cities/forest-hill-tx"
import { kennedaleTx } from "./cities/kennedale-tx"
import { pantegoTx } from "./cities/pantego-tx"
import { richlandHillsTx } from "./cities/richland-hills-tx"
import { riverOaksTx } from "./cities/river-oaks-tx"
import { sansomParkTx } from "./cities/sansom-park-tx"
import { westoverHillsTx } from "./cities/westover-hills-tx"
import { westworthVillageTx } from "./cities/westworth-village-tx"

// ---------------------------------------------------------------------------
// City registry — keyed by slug for O(1) lookup.
// Add new city files here as they are built (seo-writer delivers them in
// parallel). The aggregator IS the gate: only slugs in builtCities produce
// /areas-served/[slug] routes.
// ---------------------------------------------------------------------------
export const citiesConfig: Record<string, CityConfig> = {
  // Phase 1 — 12 featured markets
  [aledoTx.slug]: aledoTx,
  [fortWorthTx.slug]: fortWorthTx,
  [arlingtonTx.slug]: arlingtonTx,
  [bedfordTx.slug]: bedfordTx,
  [eulesTx.slug]: eulesTx,
  [grapevineTx.slug]: grapevineTx,
  [hurstTx.slug]: hurstTx,
  [kellerTx.slug]: kellerTx,
  [mansfieldTx.slug]: mansfieldTx,
  [northRichlandHillsTx.slug]: northRichlandHillsTx,
  [southlakeTx.slug]: southlakeTx,
  [weatherfordTx.slug]: weatherfordTx,

  // Phase 2 Batch A — Parker / lake / outer DFW (12)
  [annettaTx.slug]: annettaTx,
  [annettaNorthTx.slug]: annettaNorthTx,
  [annettaSouthTx.slug]: annettaSouthTx,
  [willowParkTx.slug]: willowParkTx,
  [hudsonOaksTx.slug]: hudsonOaksTx,
  [renoTx.slug]: renoTx,
  [springtownTx.slug]: springtownTx,
  [azleTx.slug]: azleTx,
  [newarkTx.slug]: newarkTx,
  [lakeWorthTx.slug]: lakeWorthTx,
  [lakesideTx.slug]: lakesideTx,
  [pelicanBayTx.slug]: pelicanBayTx,

  // Phase 2 Batch B — Established Tarrant mid-cities (13)
  [benbrookTx.slug]: benbrookTx,
  [burlesonTx.slug]: burlesonTx,
  [colleyvilleTx.slug]: colleyvilleTx,
  [crowleyTx.slug]: crowleyTx,
  [flowerMoundTx.slug]: flowerMoundTx,
  [grandPrairieTx.slug]: grandPrairieTx,
  [haltomCityTx.slug]: haltomCityTx,
  [saginawTx.slug]: saginawTx,
  [trophyClubTx.slug]: trophyClubTx,
  [wataugaTx.slug]: wataugaTx,
  [westlakeTx.slug]: westlakeTx,
  [whiteSettlementTx.slug]: whiteSettlementTx,
  [hasletTx.slug]: hasletTx,

  // Phase 2 Batch C — Tarrant small suburbs / villages (12)
  [blueMoundTx.slug]: blueMoundTx,
  [dalworthingtonGardensTx.slug]: dalworthingtonGardensTx,
  [edgecliffVillageTx.slug]: edgecliffVillageTx,
  [evermanTx.slug]: evermanTx,
  [forestHillTx.slug]: forestHillTx,
  [kennedaleTx.slug]: kennedaleTx,
  [pantegoTx.slug]: pantegoTx,
  [richlandHillsTx.slug]: richlandHillsTx,
  [riverOaksTx.slug]: riverOaksTx,
  [sansomParkTx.slug]: sansomParkTx,
  [westoverHillsTx.slug]: westoverHillsTx,
  [westworthVillageTx.slug]: westworthVillageTx,
}

export const builtCities: CityConfig[] = Object.values(citiesConfig)
export const builtCitySlugs = new Set(builtCities.map((c) => c.slug))

export function getCityConfig(slug: string): CityConfig | null {
  return citiesConfig[slug] ?? null
}

// ---------------------------------------------------------------------------
// Inline service shape for highlights that resolve outside service category paths
// ---------------------------------------------------------------------------
interface InlineService {
  name: string
  href: string
  heroPainLine?: string
}

export interface ResolvedServiceHighlight {
  service: InlineService
  localAngle: string
}

/**
 * Resolve a city's serviceHighlights against the restoration services registry.
 * Falls back to siteConfig.serviceCategories for any slug not in servicesConfig
 * (handles category-level hrefs like /water-damage, /mold-remediation, etc.).
 * Drops highlights whose slug can't be found anywhere (typo-proof).
 */
export function resolveCityServiceHighlights(
  cfg: CityConfig
): ResolvedServiceHighlight[] {
  // Build a flat href map from ALL siteConfig service categories
  type ServiceLink = { title: string; href: string }
  const siteconfigMap: Record<string, ServiceLink> = Object.fromEntries(
    (
      siteConfig.serviceCategories as unknown as Array<{
        services: ServiceLink[]
      }>
    )
      .flatMap((c) => c.services)
      .map((s) => {
        // Key by the final path segment: /water-damage/water-extraction → water-extraction
        const slug = s.href.replace(/^\/[^/]+\//, "").replace(/^\//, "")
        return [slug, s]
      })
  )

  return cfg.serviceHighlights
    .map((h): ResolvedServiceHighlight | null => {
      const full = servicesConfig[h.serviceSlug]
      if (full) {
        return {
          service: {
            name: full.name,
            href: full.href,
            heroPainLine: full.heroPainLine,
          },
          localAngle: h.localAngle,
        }
      }

      // Fall back to siteConfig lookup
      const link = siteconfigMap[h.serviceSlug]
      if (link) {
        return {
          service: {
            name: link.title,
            href: link.href,
          },
          localAngle: h.localAngle,
        }
      }

      return null
    })
    .filter((r): r is ResolvedServiceHighlight => r !== null)
}

/**
 * Annotate nearbyCities with an isBuilt flag indicating whether a live city
 * page exists. The component renders all nearby cities; only built ones get
 * a <Link> — unbuilt ones render as static coverage-signal cards.
 */
export function annotateNearbyCities(cfg: CityConfig) {
  return cfg.nearbyCities.map((nc) => ({
    ...nc,
    isBuilt: builtCitySlugs.has(nc.slug),
  }))
}
