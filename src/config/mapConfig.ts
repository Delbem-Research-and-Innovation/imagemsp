/**
 * NYC IMAGE fixed-interval threshold breakpoints shared by all choropleth
 * categories and groups.
 *
 * Source: IMAGE:NYC choroplethConfig.js (urbanresearchmaps.org/imagenycmap).
 * Defined here (not in JSON) because classification is an application concern,
 * independent of the raw population data.
 *
 * @example
 * import { NYC_THRESHOLDS } from '@/config/mapConfig';
 * // NYC_THRESHOLDS === [0.1, 0.2, 0.4, 0.6, 0.7, 0.8]
 */
export const NYC_THRESHOLDS: number[] = [0.1, 0.2, 0.4, 0.6, 0.7, 0.8];
