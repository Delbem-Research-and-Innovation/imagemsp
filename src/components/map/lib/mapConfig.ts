/**
 * ColorBrewer Blues-7 sequential palette used in all choropleth layers.
 *
 * Seven colours, which is why every series in `config/thresholds` declares six
 * breaks: geovis resolves one colour per class.
 */
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
 * Returns the 0-based colour band index for `value` against `thresholds`.
 * A value below the first threshold maps to band 0 (lightest); above the last
 * maps to band 6 (darkest).
 *
 * The breaks are a parameter rather than a module constant because each
 * indicator series carries its own (see `config/thresholds`): reading a fixed
 * set here would colour the tooltip's swatch off a different scale than the one
 * the layer is painted with, for every series but one.
 *
 * @param params.value - The rate to classify, as a fraction.
 * @param params.thresholds - The active series' breaks, ascending.
 * @returns The palette index, in `[0, thresholds.length]`.
 *
 * @example
 * getBandIndex({ value: 0.187, thresholds: [0.05, 0.1, 0.15, 0.2, 0.25, 0.3] }); // 3
 */
export const getBandIndex = ({
  value,
  thresholds,
}: {
  value: number;
  thresholds: number[];
}): number => {
  return thresholds.filter((threshold) => {
    return value >= threshold;
  }).length;
};
