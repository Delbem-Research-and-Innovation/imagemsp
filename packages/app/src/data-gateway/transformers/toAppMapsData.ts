import type { StaticMapsDataSource } from '../../data-source-static/types';
import type { MapsDataContract } from '../schema';

/**
 * Transforms a source-native maps data record into the canonical app contract.
 *
 * @remarks
 * `StaticMapsDataSource` uses `Record<string, ...>` keys because JSON imports
 * are untyped at runtime. `MapsDataContract` narrows those to the known
 * `Category` and `Group` union types. The cast is safe because
 * `readStaticMapsData` already validated the object shape before this
 * transformer is called.
 *
 * @param source - Raw record from data-source-static.
 * @returns Canonical {@link MapsDataContract}.
 *
 * @example
 * const contract = toAppMapsData(source);
 * // { year: 2025, thresholds: { ... }, mapData: { ... } }
 */
export const toAppMapsData = (source: StaticMapsDataSource): MapsDataContract => {
  return {
    year: source.year,
    thresholds: source.thresholds as MapsDataContract['thresholds'],
    mapData: source.mapData as MapsDataContract['mapData'],
  };
};
