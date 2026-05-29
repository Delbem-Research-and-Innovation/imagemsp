import mapsData from './data/maps-data.json';

import type { StaticMapsDataSource } from './types';

const isDistrictData = (value: unknown): boolean => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const row = value as Record<string, unknown>;
  return (
    typeof row['ano'] === 'number' &&
    typeof row['cod_distr'] === 'number' &&
    typeof row['nome'] === 'string' &&
    typeof row['municipio'] === 'string' &&
    typeof row['geometry_id'] === 'number' &&
    typeof row['count_65_69'] === 'number' &&
    typeof row['count_70_74'] === 'number' &&
    typeof row['count_75plus'] === 'number' &&
    typeof row['total'] === 'number'
  );
};

/**
 * Returns true when `value` matches the expected `StaticMapsDataSource` shape:
 * a `districts` array where every element
 * satisfies {@link isDistrictData}.
 *
 * @remarks
 * Field-level validation is intentional: a shallow top-level check would pass
 * a snapshot with malformed district rows and cause runtime crashes downstream.
 */
const isStaticMapsDataSource = (
  value: unknown
): value is StaticMapsDataSource => {
  if (
    typeof value !== 'object' ||
    value === null ||
    !Array.isArray((value as Record<string, unknown>)['districts'])
  ) {
    return false;
  }
  return (
    (value as Record<string, unknown>)['districts'] as unknown[]
  ).every(isDistrictData);
};

/**
 * Reads and validates the static maps-data snapshot.
 *
 * @returns The raw source record from `data/maps-data.json`.
 * @throws If the data does not match the expected shape.
 *
 * @example
 * const mapsData = await readStaticMapsData();
 * // { districts: [...] }
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
