import mapsData from './data/maps-data.json';

import type { StaticMapsDataSource } from './types';

/**
 * Returns true when every value in a nested `Record<string, unknown>` satisfies
 * the provided predicate. Used to validate that nested map data objects have the
 * expected shape before the app casts them to a narrower contract type.
 */
const allNestedValues = (
  outer: Record<string, unknown>,
  predicate: (value: unknown) => boolean
): boolean => {
  return Object.values(outer).every((inner) => {
    if (typeof inner !== 'object' || inner === null) {
      return false;
    }
    return Object.values(inner as Record<string, unknown>).every(predicate);
  });
};

const isNumberArray = (value: unknown): boolean => {
  return Array.isArray(value) && value.every((v) => typeof v === 'number');
};

const isMapDataRowArray = (value: unknown): boolean => {
  return (
    Array.isArray(value) &&
    value.every(
      (row) =>
        typeof row === 'object' &&
        row !== null &&
        typeof (row as Record<string, unknown>)['geometryId'] === 'number' &&
        typeof (row as Record<string, unknown>)['value'] === 'number'
    )
  );
};

/**
 * Validates that a parsed value matches the expected `StaticMapsDataSource`
 * shape, including nested `thresholds` (number arrays) and `mapData`
 * (MapDataRow arrays).
 *
 * @remarks
 * The shallow-only check (year/thresholds/mapData top-level keys) is
 * insufficient: a snapshot with malformed nested values would pass the
 * top-level guard and still cause runtime crashes downstream. This validator
 * recurses into the nested objects so malformed snapshots are rejected early
 * at the data boundary.
 */
const isStaticMapsDataSource = (
  value: unknown
): value is StaticMapsDataSource => {
  if (
    typeof value !== 'object' ||
    value === null ||
    typeof (value as Record<string, unknown>)['year'] !== 'number' ||
    typeof (value as Record<string, unknown>)['thresholds'] !== 'object' ||
    typeof (value as Record<string, unknown>)['mapData'] !== 'object'
  ) {
    return false;
  }

  const thresholds = (value as Record<string, unknown>)[
    'thresholds'
  ] as Record<string, unknown>;
  const mapData = (value as Record<string, unknown>)['mapData'] as Record<
    string,
    unknown
  >;

  return (
    allNestedValues(thresholds, isNumberArray) &&
    allNestedValues(mapData, isMapDataRowArray)
  );
};

/**
 * Reads and validates the static maps-data snapshot.
 *
 * @returns The raw source record from `data/maps-data.json`.
 * @throws If the data does not match the expected shape.
 *
 * @example
 * const mapsData = await readStaticMapsData();
 * // { year: 2025, thresholds: { ... }, mapData: { ... } }
 */
export const readStaticMapsData = async (): Promise<StaticMapsDataSource> => {
  const parsed: unknown = mapsData;

  if (!isStaticMapsDataSource(parsed)) {
    throw new Error(
      `[data-source-static] maps-data.json has an unexpected shape: ${JSON.stringify(parsed)}`
    );
  }

  return parsed;
};
