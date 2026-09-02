import type {
  Category,
  DistrictCounts,
  Group,
  MapDataRow,
} from '@/data-gateway/schema';

/**
 * The numerator and denominator one indicator series reads off a district's
 * counts. Every series the app offers is a ratio of two of those four figures.
 */
type SeriesRatio = (counts: DistrictCounts) => {
  count: number;
  totalCount: number;
};

/** Residents aged 65 or older — the denominator of both `*-65plus` categories. */
const elderly = (counts: DistrictCounts): number => {
  return counts.count65to69 + counts.count70to74 + counts.count75plus;
};

/** Residents aged 70 or older. */
const elderly70plus = (counts: DistrictCounts): number => {
  return counts.count70to74 + counts.count75plus;
};

/**
 * Numerator and denominator per indicator series.
 *
 * The category decides the denominator (the district's whole population, or its
 * own 65+ population) and the group decides the numerator, which is cumulative
 * for `65`/`70`/`75` and a closed band for `65-69`/`70-74`. Encoded as a table
 * so the map, the legend and the tooltip cannot drift apart: all three read the
 * same entry.
 */
const SERIES_RATIOS: Record<Category, Partial<Record<Group, SeriesRatio>>> = {
  'cumulative-total': {
    '65': (counts) => {
      return { count: elderly(counts), totalCount: counts.total };
    },
    '70': (counts) => {
      return { count: elderly70plus(counts), totalCount: counts.total };
    },
    '75': (counts) => {
      return { count: counts.count75plus, totalCount: counts.total };
    },
  },
  'cumulative-65plus': {
    '70': (counts) => {
      return { count: elderly70plus(counts), totalCount: elderly(counts) };
    },
    '75': (counts) => {
      return { count: counts.count75plus, totalCount: elderly(counts) };
    },
  },
  '5year-65plus': {
    '65-69': (counts) => {
      return { count: counts.count65to69, totalCount: elderly(counts) };
    },
    '70-74': (counts) => {
      return { count: counts.count70to74, totalCount: elderly(counts) };
    },
    // Identical to `cumulative-65plus/75`: the open top band is at once the last
    // closed band and a cumulative one, so both menu paths land on this ratio.
    '75': (counts) => {
      return { count: counts.count75plus, totalCount: elderly(counts) };
    },
  },
};

/**
 * Rate rounded to four decimals, guarding a zero denominator.
 *
 * The rounding is what the offline snapshot used to apply before the counts
 * moved to the client, so the values the map paints are unchanged.
 *
 * @param params.numerator - Population in the band.
 * @param params.denominator - Population the band is a share of.
 * @returns The share, in `[0, 1]`, or `0` when there is nobody to divide by.
 *
 * @example
 * safeRate({ numerator: 15169, denominator: 81060 }); // 0.1871
 */
const safeRate = ({
  numerator,
  denominator,
}: {
  numerator: number;
  denominator: number;
}): number => {
  return denominator > 0
    ? Math.round((numerator / denominator) * 10000) / 10000
    : 0;
};

/**
 * Derives the map's value rows for one year and one indicator series.
 *
 * Called on every timeline tick, so it stays a single pass over the year's
 * districts (96 divisions) with no allocation beyond the rows themselves.
 *
 * @param params.counts - Every district/year entry from the gateway.
 * @param params.year - The projection year to paint.
 * @param params.category - The indicator category.
 * @param params.group - The age group within that category.
 * @returns One {@link MapDataRow} per district in that year, carrying the rate
 * plus the absolute figures the tooltip shows.
 * @throws If the category/group pair is not a series the app defines.
 *
 * @example
 * buildMapRows({ counts, year: 2025, category: 'cumulative-total', group: '65' });
 * // [{ geometryId: 1, value: 0.1871, name: 'Água Rasa', count: 15169, totalCount: 81060 }, ...]
 */
export const buildMapRows = ({
  counts,
  year,
  category,
  group,
}: {
  counts: DistrictCounts[];
  year: number;
  category: Category;
  group: Group;
}): MapDataRow[] => {
  const ratio = SERIES_RATIOS[category][group];

  if (!ratio) {
    throw new Error(
      `[mapRows] no ratio defined for ${category}/${group}; the map would paint nothing`
    );
  }

  const rows: MapDataRow[] = [];

  for (const entry of counts) {
    if (entry.year !== year) {
      continue;
    }

    const { count, totalCount } = ratio(entry);

    rows.push({
      geometryId: entry.geometryId,
      value: safeRate({ numerator: count, denominator: totalCount }),
      name: entry.name,
      count,
      totalCount,
    });
  }

  return rows;
};

/**
 * Total 65+ population per year, for the timeline's mini histogram.
 *
 * @param params.counts - Every district/year entry from the gateway.
 * @param params.years - The projection years, ascending.
 * @returns One `{ key, count }` per year, in the shape the timeline control
 * reads.
 *
 * @example
 * buildElderlyHistogram({ counts, years: [2000, 2005] });
 * // [{ key: 2000, count: 670274 }, { key: 2005, count: 784835 }]
 */
export const buildElderlyHistogram = ({
  counts,
  years,
}: {
  counts: DistrictCounts[];
  years: number[];
}): { key: number; count: number }[] => {
  const totals = new Map<number, number>();

  for (const entry of counts) {
    totals.set(entry.year, (totals.get(entry.year) ?? 0) + elderly(entry));
  }

  return years.map((year) => {
    return { key: year, count: totals.get(year) ?? 0 };
  });
};
