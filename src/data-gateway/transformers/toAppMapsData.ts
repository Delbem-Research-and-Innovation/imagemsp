import { SERIES_THRESHOLDS } from '@/config/thresholds';

import type { StaticMapsDataSource } from '../../data-source-static/types';
import type { DistrictCounts, MapsDataContract } from '../schema';

/**
 * Ascending unique years in `counts`.
 *
 * @param counts - District counts, in any order.
 * @returns The projection years, ascending.
 *
 * @example
 * yearsOf(counts); // [2000, 2005, 2010]
 */
const yearsOf = (counts: DistrictCounts[]): number[] => {
  return [
    ...new Set(
      counts.map((entry) => {
        return entry.year;
      })
    ),
  ].sort((a, b) => {
    return a - b;
  });
};

/**
 * Asserts the years form the evenly spaced series the timeline needs, and that
 * every year carries the same districts.
 *
 * Both are invariants of the generated snapshot (`scripts/generateMapsData.ts`
 * enforces them at build time), re-checked here because this is the boundary a
 * hand-edited or swapped JSON crosses. A year short of districts would paint
 * the missing ones with MapLibre's fallback colour — visually identical to a
 * genuinely low rate.
 *
 * @param counts - District counts for every year.
 * @returns The validated years, ascending.
 * @throws If the years are unevenly spaced or a year is missing districts.
 *
 * @example
 * validateYears(counts); // [2000, 2005, ..., 2050]
 */
const validateYears = (counts: DistrictCounts[]): number[] => {
  const years = yearsOf(counts);

  if (years.length === 0) {
    throw new Error('[data-gateway] toAppMapsData found no projection years');
  }

  const steps = new Set(
    years.slice(1).map((year, index) => {
      return year - (years[index] ?? 0);
    })
  );

  if (steps.size > 1) {
    throw new Error(
      `[data-gateway] projection years are unevenly spaced (${years.join(', ')}); the timeline walks a constant step`
    );
  }

  const districtsPerYear = new Set(
    years.map((year) => {
      return counts.filter((entry) => {
        return entry.year === year;
      }).length;
    })
  );

  if (districtsPerYear.size > 1) {
    throw new Error(
      `[data-gateway] projection years carry different district counts (${[...districtsPerYear].join(', ')}); some year would paint incompletely`
    );
  }

  return years;
};

/**
 * Transforms a source-native maps data record into the canonical app contract.
 *
 * @remarks
 * Renames the source's snake_case fields to the app's shape and keeps the
 * absolute counts as they are — the eight indicator series are derived from
 * them per selection by `components/map/lib/mapRows`, not precomputed here.
 * Thresholds are injected from {@link SERIES_THRESHOLDS} rather than read from
 * JSON, keeping classification decisions in the application layer.
 *
 * @param source - Raw record from data-source-static.
 * @returns Canonical {@link MapsDataContract}.
 * @throws If the snapshot's years are unusable by the timeline (see
 * {@link validateYears}).
 *
 * @example
 * const contract = toAppMapsData(source);
 * // { years: [2000, ..., 2050], thresholds: { ... }, counts: [ ... ] }
 */
export const toAppMapsData = (
  source: StaticMapsDataSource
): MapsDataContract => {
  if (source.districts.length === 0) {
    throw new Error(
      '[data-gateway] toAppMapsData received an empty districts array'
    );
  }

  const counts: DistrictCounts[] = source.districts.map((district) => {
    return {
      geometryId: district.geometry_id,
      name: district.nome,
      year: district.ano,
      count65to69: district.count_65_69,
      count70to74: district.count_70_74,
      count75plus: district.count_75plus,
      total: district.total,
    };
  });

  return {
    years: validateYears(counts),
    thresholds: SERIES_THRESHOLDS,
    counts,
  };
};
