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

/** Canonical maps data contract consumed by the app. */
export type MapsDataContract = {
  year: number;
  thresholds: Record<Category, Partial<Record<Group, number[]>>>;
  mapData: Record<Category, Partial<Record<Group, MapDataRow[]>>>;
};
