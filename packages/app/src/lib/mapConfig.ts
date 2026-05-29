/**
 * NYC IMAGE fixed-interval threshold breakpoints shared by all choropleth
 * categories and groups.
 *
 * Source: IMAGE:NYC choroplethConfig.js (urbanresearchmaps.org/imagenycmap).
 * Defined here (not in JSON) because classification is an application concern,
 * independent of the raw population data.
 */
export const NYC_THRESHOLDS: number[] = [0.1, 0.2, 0.4, 0.6, 0.7, 0.8];

/** ColorBrewer Blues-7 sequential palette used in all choropleth layers. */
export const LEGEND_COLORS: string[] = [
  '#c6dbef',
  '#9ecae1',
  '#6baed6',
  '#4292c6',
  '#2171b5',
  '#08519c',
  '#08306b',
];

/**
 * Returns the 0-based colour band index for `value` against NYC thresholds.
 * A value below the first threshold maps to band 0 (lightest); above the last
 * maps to band 6 (darkest).
 */
export const getBandIndex = (value: number): number =>
  NYC_THRESHOLDS.filter((t) => value >= t).length;
