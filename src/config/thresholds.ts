/**
 * NYC IMAGE fixed-interval threshold breakpoints shared by all choropleth
 * categories and groups.
 *
 * Source: IMAGE:NYC choroplethConfig.js (urbanresearchmaps.org/imagenycmap).
 * Defined here (not in components) because classification is an application
 * concern, independent of both raw data and UI rendering.
 *
 * Consumed by:
 *  - `data-gateway/transformers/toAppMapsData` — injects into MapsDataContract
 *  - `components/map/lib/mapConfig` — re-exports for choropleth rendering
 */
export const NYC_THRESHOLDS: number[] = [0.1, 0.2, 0.4, 0.6, 0.7, 0.8];
