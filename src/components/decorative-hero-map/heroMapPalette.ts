/**
 * 14-stop sequential blue palette. dataClass 0–13 maps directly to index 0–13.
 * Anchors at indices 0/3/6/9/13: #B2D2E8 · #6BAED6 · #3987C0 · #1761A8 · #08519C.
 *
 * @example
 * import { HERO_MAP_PALETTES } from './heroMapPalette';
 * const fill = HERO_MAP_PALETTES[0][district.dataClass] ?? HERO_MAP_PALETTES[0][0];
 */
export const HERO_MAP_BLUE = [
  '#B2D2E8',
  '#9AC6E2',
  '#83BADC',
  '#6BAED6',
  '#5AA1CE',
  '#4A94C7',
  '#3987C0',
  '#2E7AB8',
  '#226DB0',
  '#1761A8',
  '#135DA5',
  '#1059A2',
  '#0C559F',
  '#08519C',
] as const;

/**
 * 14-stop sequential green palette.
 * Anchors at indices 0/3/6/9/13: #B4E1AE · #74C476 · #37A055 · #147C38 · #005823.
 */
export const HERO_MAP_GREEN = [
  '#B4E1AE',
  '#9FD79B',
  '#89CE89',
  '#74C476',
  '#60B86B',
  '#4BAC60',
  '#37A055',
  '#2B944B',
  '#208842',
  '#147C38',
  '#0F7333',
  '#0A6A2E',
  '#056128',
  '#005823',
] as const;

/**
 * 14-stop blue-orange diverging palette (cool → neutral → warm).
 * Anchors at indices 0/3/6/9/13: #0868AC · #7BCCC4 · #F4DFC5 · #EFC22F · #BD3F37.
 */
export const HERO_MAP_BLUE_ORANGE = [
  '#0868AC',
  '#2E89B4',
  '#55ABBC',
  '#7BCCC4',
  '#A3D2C4',
  '#CCD9C5',
  '#F4DFC5',
  '#F2D593',
  '#F1CC61',
  '#EFC22F',
  '#E3A131',
  '#D68133',
  '#CA6035',
  '#BD3F37',
] as const;

/**
 * 14-stop yellow-orange sequential palette (warm, darkening).
 * Anchors at indices 0/3/6/9/13: #EFB22B · #EC8121 · #D9532A · #AD3E37 · #8E3A36.
 */
export const HERO_MAP_YELLOW_ORANGE = [
  '#EFB22B',
  '#EEA228',
  '#ED9124',
  '#EC8121',
  '#E67224',
  '#DF6227',
  '#D9532A',
  '#CA4C2E',
  '#BC4533',
  '#AD3E37',
  '#A53D37',
  '#9E3C37',
  '#963B36',
  '#8E3A36',
] as const;

/**
 * 14-stop green-blue sequential palette.
 * Anchors at indices 0/3/6/9/13: #BAE4BD · #7BCCC4 · #40A4CC · #187AB5 · #08548F.
 */
export const HERO_MAP_GREEN_BLUE = [
  '#BAE4BD',
  '#A5DCBF',
  '#90D4C2',
  '#7BCCC4',
  '#67BFC7',
  '#54B1C9',
  '#40A4CC',
  '#3396C4',
  '#2588BD',
  '#187AB5',
  '#1471AC',
  '#1067A2',
  '#0C5E99',
  '#08548F',
] as const;

/**
 * 14-stop categorical palette (interpolated between five distinct hues).
 * Anchors at indices 0/3/6/9/13: #2F5F73 · #9C5737 · #3F4F30 · #7B5B8E · #8A5A13.
 */
export const HERO_MAP_CATEGORICAL = [
  '#2F5F73',
  '#535C5F',
  '#785A4B',
  '#9C5737',
  '#7D5435',
  '#5E5232',
  '#3F4F30',
  '#53534F',
  '#67576F',
  '#7B5B8E',
  '#7F5B6F',
  '#835B51',
  '#865A32',
  '#8A5A13',
] as const;

/**
 * All 6 palettes in cycle order.
 * Tray uses index 0; overlays step through 0→5 and wrap.
 *
 * @example
 * const palette = HERO_MAP_PALETTES[cycleCount % HERO_MAP_PALETTES.length] ?? HERO_MAP_PALETTES[0];
 */
export const HERO_MAP_PALETTES = [
  HERO_MAP_BLUE,
  HERO_MAP_GREEN,
  HERO_MAP_BLUE_ORANGE,
  HERO_MAP_YELLOW_ORANGE,
  HERO_MAP_GREEN_BLUE,
  HERO_MAP_CATEGORICAL,
] as const;
