import { NYC_THRESHOLDS } from '@/config/thresholds';

export { NYC_THRESHOLDS };

/** ColorBrewer Blues-7 sequential palette used in all choropleth layers. */
export const LEGEND_COLORS: string[] = [
  '#c6dbef',
  '#9ecae1',
  '#6baed6',
  '#4292c6',
  '#2171b5',
  '#08519c',
  '#08306b',
];

/**
 * Returns the 0-based colour band index for `value` against NYC thresholds.
 * A value below the first threshold maps to band 0 (lightest); above the last
 * maps to band 6 (darkest).
 */
export const getBandIndex = (value: number): number => {
  return NYC_THRESHOLDS.filter((t) => {
    return value >= t;
  }).length;
};
