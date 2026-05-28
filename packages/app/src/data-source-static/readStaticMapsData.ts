import mapsData from './data/maps-data.json';

import type { StaticMapsDataSource } from './types';

const isStaticMapsDataSource = (
  value: unknown
): value is StaticMapsDataSource => {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>)['year'] === 'number' &&
    typeof (value as Record<string, unknown>)['thresholds'] === 'object' &&
    typeof (value as Record<string, unknown>)['mapData'] === 'object'
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
