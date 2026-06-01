// Exception: imports directly from `themeGeovis.ts` instead of going through `theme.ts`.
// This is acceptable only because DecorativeHeroMap is a purely decorative SVG on the
// homepage hero — it consumes raw hex arrays for SVG `fill` attributes, not Chakra tokens.
// Do not replicate this import pattern elsewhere in the app.
import { geovisTokens } from '../../config/themeGeovis';

const d = geovisTokens.core.dataviz.color.data;

/**
 * Sequential blue palette. Cycle position 1 (tray initial state).
 * 14 stops; `district.dataClass` 0–13 maps directly to index 0–13.
 * Source: `geovisTokens.core.dataviz.color.data.sequential.blue`.
 *
 * @example
 * import { HERO_MAP_PALETTES } from './heroMapPalette';
 * const fill = HERO_MAP_PALETTES[0][district.dataClass] ?? HERO_MAP_PALETTES[0][0];
 */
const HERO_MAP_BLUE = d.sequential.blue;

/**
 * Sequential green palette. Cycle position 2.
 * Source: `geovisTokens.core.dataviz.color.data.sequential.green`.
 */
const HERO_MAP_GREEN = [...d.sequential.green].reverse();

/**
 * Diverging olive → clay palette. Cycle position 3.
 * Warm brand diverging: positive/growth (olive) ↔ negative/decline (clay).
 * Source: `geovisTokens.core.dataviz.color.data.diverging.oliveClay`.
 */
const HERO_MAP_OLIVE_CLAY = d.diverging.oliveClay;

/**
 * Sequential yellow-orange palette. Cycle position 4.
 * Source: `geovisTokens.core.dataviz.color.data.sequential.yellowOrange`.
 */
const HERO_MAP_YELLOW_ORANGE = [...d.sequential.yellowOrange].reverse();

/**
 * Sequential green-blue palette. Cycle position 5.
 * Source: `geovisTokens.core.dataviz.color.data.sequential.greenBlue`.
 */
const HERO_MAP_GREEN_BLUE = d.sequential.greenBlue;

/**
 * Categorical muted-earth palette. Cycle position 6.
 * Source: `geovisTokens.core.dataviz.color.data.categorical.default`.
 */
const HERO_MAP_CATEGORICAL = d.categorical.default;

/**
 * All 6 palettes in cycle order.
 * Tray starts at index 0; overlays step through 0→5 and wrap.
 * Each palette has 14 stops; `district.dataClass` maps directly to the stop index.
 *
 * @example
 * const palette = HERO_MAP_PALETTES[cycleCount % HERO_MAP_PALETTES.length] ?? HERO_MAP_PALETTES[0];
 */
export const HERO_MAP_PALETTES = [
  HERO_MAP_BLUE,
  HERO_MAP_GREEN,
  HERO_MAP_OLIVE_CLAY,
  HERO_MAP_YELLOW_ORANGE,
  HERO_MAP_GREEN_BLUE,
  HERO_MAP_CATEGORICAL,
] as const;
