export type Category =
  | 'cumulative-total'
  | 'cumulative-65plus'
  | '5year-65plus';

export type Group = '65' | '70' | '75' | '65-69' | '70-74';

/** Canonical map data row shape consumed by the app. */
export type MapDataRow = {
  geometryId: number;
  value: number;
  /** District name for tooltip display. */
  name?: string;
  /** Absolute population count for the numerator of this rate (tooltip). */
  count?: number;
  /** Absolute population count for the denominator of this rate (tooltip). */
  totalCount?: number;
};

/**
 * Absolute population counts for one district in one projection year — the
 * figures every indicator the map paints is derived from.
 *
 * Counts rather than rates: the eight series the app offers are ratios of these
 * four numbers, and the timeline multiplies everything by eleven years.
 * Pre-computing all of them server-side would ship roughly 700 kB of rows to
 * the browser, against 94 kB for the counts, to save 96 divisions per timeline
 * tick. See `components/map/lib/mapRows` for the derivation.
 */
export type DistrictCounts = {
  /** Feature id of the district's polygon in the GeoJSON. */
  geometryId: number;
  /** District name, for the tooltip. */
  name: string;
  /** Projection year these counts describe. */
  year: number;
  /** Residents aged 65 to 69. */
  count65to69: number;
  /** Residents aged 70 to 74. */
  count70to74: number;
  /** Residents aged 75 or older. */
  count75plus: number;
  /** Residents of every age — the denominator of the `cumulative-total` series. */
  total: number;
};

/** Canonical maps data contract consumed by the app. */
export type MapsDataContract = {
  /**
   * Projection years present in `counts`, ascending and evenly spaced. The
   * timeline control derives its `min`, `max` and `step` from this, so the even
   * spacing is an invariant the gateway enforces rather than an observation.
   */
  years: number[];
  thresholds: Record<Category, Partial<Record<Group, number[]>>>;
  /** One entry per district per year. */
  counts: DistrictCounts[];
};
