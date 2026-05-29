import type { StaticMapsDataSource } from '../../data-source-static/types';
import type { MapDataRow, MapsDataContract } from '../schema';

/**
 * NYC fixed-interval thresholds shared by all map categories and groups.
 * Defined here (not in JSON) because classification is an application concern,
 * independent of the raw population data.
 *
 * Source: IMAGE:NYC choroplethConfig.js (urbanresearchmaps.org/imagenycmap).
 */
const NYC_THRESHOLDS = [0.1, 0.2, 0.4, 0.6, 0.7, 0.8];

/** Pre-built thresholds injected into every {@link MapsDataContract}. */
const ALL_THRESHOLDS: MapsDataContract['thresholds'] = {
  'cumulative-total': {
    '65': NYC_THRESHOLDS,
    '70': NYC_THRESHOLDS,
    '75': NYC_THRESHOLDS,
  },
  'cumulative-65plus': { '70': NYC_THRESHOLDS, '75': NYC_THRESHOLDS },
  '5year-65plus': {
    '65-69': NYC_THRESHOLDS,
    '70-74': NYC_THRESHOLDS,
    '75': NYC_THRESHOLDS,
  },
};

const safeRate = (numerator: number, denominator: number): number => {
  return denominator > 0
    ? Math.round((numerator / denominator) * 10000) / 10000
    : 0;
};

const makeRow = (
  gid: number,
  value: number,
  name: string,
  count: number,
  totalCount: number
): MapDataRow => ({ geometryId: gid, value, name, count, totalCount });

/**
 * Transforms a source-native maps data record into the canonical app contract.
 *
 * @remarks
 * Computes all eight category/group rate series from the absolute population
 * counts in `source.districts`. NYC fixed thresholds are injected from the
 * application constant {@link NYC_THRESHOLDS} rather than read from JSON,
 * keeping classification decisions in the app layer.
 *
 * @param source - Raw record from data-source-static.
 * @returns Canonical {@link MapsDataContract}.
 *
 * @example
 * const contract = toAppMapsData(source);
 * // { year: 2025, thresholds: { ... }, mapData: { ... } }
 */
export const toAppMapsData = (source: StaticMapsDataSource): MapsDataContract => {
  const ct65: MapDataRow[] = [];
  const ct70: MapDataRow[] = [];
  const ct75: MapDataRow[] = [];
  const cp70: MapDataRow[] = [];
  const cp75: MapDataRow[] = [];
  const sy69: MapDataRow[] = [];
  const sy74: MapDataRow[] = [];
  const sy75: MapDataRow[] = [];

  for (const d of source.districts) {
    const n65plus = d.count_65_69 + d.count_70_74 + d.count_75plus;
    const n70plus = d.count_70_74 + d.count_75plus;
    const { geometry_id: gid, nome: name } = d;
    const { count_65_69, count_70_74, count_75plus, total } = d;

    ct65.push(makeRow(gid, safeRate(n65plus, total), name, n65plus, total));
    ct70.push(makeRow(gid, safeRate(n70plus, total), name, n70plus, total));
    ct75.push(makeRow(gid, safeRate(count_75plus, total), name, count_75plus, total));
    cp70.push(makeRow(gid, safeRate(n70plus, n65plus), name, n70plus, n65plus));
    cp75.push(makeRow(gid, safeRate(count_75plus, n65plus), name, count_75plus, n65plus));
    sy69.push(makeRow(gid, safeRate(count_65_69, n65plus), name, count_65_69, n65plus));
    sy74.push(makeRow(gid, safeRate(count_70_74, n65plus), name, count_70_74, n65plus));
    sy75.push(makeRow(gid, safeRate(count_75plus, n65plus), name, count_75plus, n65plus));
  }

  return {
    year: source.districts[0]?.ano ?? 0,
    thresholds: ALL_THRESHOLDS,
    mapData: {
      'cumulative-total': { '65': ct65, '70': ct70, '75': ct75 },
      'cumulative-65plus': { '70': cp70, '75': cp75 },
      '5year-65plus': { '65-69': sy69, '70-74': sy74, '75': sy75 },
    },
  };
};
