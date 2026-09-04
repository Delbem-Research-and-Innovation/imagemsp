/**
 * Props for {@link BrandMark}.
 */
type Props = {
  /**
   * Rendered size — applied to both width and height (the mark is square).
   * Accepts any CSS length value.
   *
   * @default '1em'
   */
  size?: string | number;
};

/**
 * IMAGEM:SP brand mark — the "circulo" symbol from the full logo lockup,
 * extracted and re-framed to its own tight square viewBox
 * (143.87 x 143.32 user units, translated from the lockup's
 * 0 0 384.93 162.56 coordinate space).
 *
 * Inlined rather than loaded from `public/` for two reasons: the fill is
 * `currentColor`, so the mark takes its color from the nearest Chakra `color`
 * prop instead of the lockup's fixed light blue (#C8E0F4, which was authored to
 * sit behind the dark wordmark and is too faint on the linen canvas); and it
 * paints on first render with no network round-trip, which matters for the
 * loading indicator that uses it.
 *
 * Decorative by default: no `<title>` and `aria-hidden`, so the accessible name
 * comes from the labelled region around it (see {@link LoadingIndicator}). For
 * the full logo with the wordmark, use the header's `BrandName` instead.
 *
 * @example
 * <Box color="azure.600">
 *   <BrandMark size="6rem" />
 * </Box>
 */
const BrandMark = ({ size = '1em' }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 143.87 143.32"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block' }}
    >
      {/* Re-origins the lockup's coordinates onto the extracted viewBox. */}
      <g transform="translate(-77.69 -9.36)">
        <path d="M218.74,61.2c-.78-2.72-1.7-5.38-2.78-7.95l-4.93,8.68,7.71-.73Z" />
        <path d="M96.32,118.5c-1.58,1.39-3.17,2.8-4.75,4.21,11.25,15.71,28.61,26.53,48.26,29.29l-14.62-57.48c-9.86,7.73-19.53,15.75-28.89,23.97Z" />
        <path d="M117.98,95.12l-36.7,6.73c1.89,6.26,4.62,12.12,8.02,17.49,1.45-1.3,2.91-2.59,4.36-3.87,7.9-6.94,16.04-13.74,24.32-20.36Z" />
        <path d="M206.14,62.39l7.73-13.61c-1.37-2.71-2.88-5.32-4.56-7.81-1.52-2.25-3.18-4.4-4.94-6.45-13.74,10.77-27.69,21.47-41.73,31.99l43.5-4.11Z" />
        <path d="M127.89,12.83l.05.21,11.53,65.59.03-.02v.03c20.91-15.31,41.78-31.14,62.16-47.12-2.76-2.88-5.74-5.54-8.93-7.93-.92-.69-1.85-1.35-2.81-1.99-11.41-7.7-25.1-12.17-39.63-12.23-2.42-.01-4.87.1-7.33.34-5.23.51-10.27,1.58-15.07,3.12Z" />
        <path d="M221.22,74.13c-.3-3.07-.8-6.06-1.47-8.99l-11.15,1.05-32.66,57.48,13.73,8.57h0s6.18,3.78,6.18,3.78c12.22-10.24,20.89-24.42,24.21-40.36.48-2.3.85-4.64,1.1-7.01.25-2.37.38-4.77.39-7.19.01-2.42-.1-4.87-.34-7.33Z" />
        <path d="M127.31,87.8c2.84-2.19,5.69-4.35,8.55-6.48l-11.8-67.14c-1.77.68-3.51,1.41-5.2,2.22-2.11,1.01-4.16,2.12-6.14,3.33-.99.6-1.97,1.23-2.92,1.87-1.29.87-2.53,1.79-3.76,2.74l21.27,63.45Z" />
        <path d="M187.58,135.68h0s-13.62-8.5-13.62-8.5l-14.11,24.83c6.27-.88,12.25-2.53,17.84-4.89,5.29-2.22,10.23-5.06,14.75-8.41l-4.78-2.98-.08-.05Z" />
        <path d="M144.47,108.78l7.23,43.9c1.07-.03,2.15-.08,3.23-.16l15.61-27.47-26.07-16.27Z" />
        <path d="M80.62,62.55c-2.15,8.05-2.93,16.62-2.08,25.4.33,3.42.91,6.76,1.7,10l34.83-6.39-34.45-29.02Z" />
        <path d="M120.19,90.63l3.6-.66-21.08-62.88c-3.81,3.34-7.27,7.05-10.29,11.1-1.37,1.84-2.66,3.74-3.85,5.71-1.79,2.95-3.37,6.03-4.72,9.22-.73,1.72-1.37,3.47-1.96,5.25l38.3,32.27Z" />
        <path d="M156.45,71.12c-5.4,4.02-10.81,8-16.22,11.96l3.36,20.41,28.93,18.05,31.19-54.89-47.26,4.47Z" />
        <path d="M128.67,91.83l15.43,60.64c1.17.09,2.35.16,3.53.19l-11.02-66.89c-2.66,1.99-5.3,4.02-7.93,6.06Z" />
        <path d="M81.89,58.36c-.14.43-.3.85-.44,1.28.13-.43.29-.85.44-1.28h0Z" />
        <path d="M106.04,24.35h0c-1.14.88-2.24,1.79-3.32,2.74h0c1.08-.95,2.19-1.86,3.32-2.74Z" />
      </g>
    </svg>
  );
};

export default BrandMark;
