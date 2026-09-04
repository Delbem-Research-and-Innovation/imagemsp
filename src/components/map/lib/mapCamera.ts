/**
 * Geographic extent of the 96 municipal districts, in degrees.
 *
 * Read off `public/distrito-municipal-v2.geojson`, whose coordinates carry four
 * decimals, so these are the exact bounds rather than rounded ones. Kept as a
 * constant because the map needs the extent to frame the camera *before* the
 * GeoJSON has been fetched — MapLibre downloads it, the app never parses it —
 * and because the mesh is a fixed dataset.
 *
 * `scripts/generateMapsData.ts` re-derives this from the GeoJSON on every run
 * and fails if it drifts, so replacing the mesh cannot silently leave the
 * camera framing the old one.
 */
export const DISTRICTS_BBOX = {
  minLng: -46.8263,
  maxLng: -46.3654,
  minLat: -24.0082,
  maxLat: -23.3568,
} as const;

/**
 * Centre of {@link DISTRICTS_BBOX} — the camera's target.
 *
 * Derived rather than transcribed: the previous hard-coded centre
 * (`[-46.5958, -23.6825]`) was this value rounded, and a rounded copy is one
 * more thing to keep in step with the mesh.
 */
export const DISTRICTS_CENTER: [number, number] = [
  (DISTRICTS_BBOX.minLng + DISTRICTS_BBOX.maxLng) / 2,
  (DISTRICTS_BBOX.minLat + DISTRICTS_BBOX.maxLat) / 2,
];

/**
 * Breathing room left between the mesh and the container edges, in CSS pixels,
 * on each side.
 *
 * Deliberately not sized to the legend or the sidebar: both float over the map
 * as overlays, and reserving space for them would move the camera whenever one
 * opens.
 */
export const FIT_PADDING = 24;

/**
 * MapLibre's tile size. The zoom scale is defined against it: at zoom `z` the
 * whole world is `512 · 2^z` pixels wide.
 */
const TILE_SIZE = 512;

/**
 * Fallback zoom for the render passes that have no viewport to measure — the
 * server pass, and the first client pass before the store's snapshot is read.
 *
 * The map itself never mounts in either (it is gated behind the hydration flag
 * in `MapsView`), so this value is never actually painted; it exists so the
 * spec is always complete. It is the zoom the map used before the camera was
 * fitted, which framed the mesh on a 1440×900 desktop.
 */
export const FALLBACK_ZOOM = 9.6;

/**
 * Latitude as a fraction of the Web Mercator world, from 0 at the north pole to
 * 1 at the south.
 *
 * Needed because Mercator stretches towards the poles: a degree of latitude
 * covers more pixels at São Paulo's latitude than at the equator, so fitting
 * the mesh vertically cannot divide degrees the way it can horizontally.
 *
 * @param latitude - Latitude in degrees.
 * @returns Its position in `[0, 1]`.
 *
 * @example
 * mercatorFraction(0); // 0.5 — the equator
 */
const mercatorFraction = (latitude: number): number => {
  const sine = Math.sin((latitude * Math.PI) / 180);

  return 0.5 - Math.log((1 + sine) / (1 - sine)) / (4 * Math.PI);
};

/**
 * The zoom at which the whole district mesh fits inside a container of the
 * given size, with {@link FIT_PADDING} to spare on every side.
 *
 * Computed rather than delegated to MapLibre's `fitBounds`: geovis's `ViewState`
 * takes only `center`/`zoom` (no bounds), its `setView` likewise, and
 * `GeovisWorkspace` does not expose the underlying map instance — so the camera
 * has to arrive already framed, in the spec.
 *
 * The smaller of the two axis fits wins, which is what makes the mesh fit
 * rather than fill: São Paulo is taller than it is wide (0.65° of latitude
 * against 0.46° of longitude), so on a short, wide viewport the height binds and
 * space is left at the sides.
 *
 * @param params.width - Container width in CSS pixels; must be positive.
 * @param params.height - Container height in CSS pixels; must be positive.
 * @returns The fitting zoom level. Returns {@link FALLBACK_ZOOM} when either
 * dimension is too small to frame anything, which is the unmeasured case rather
 * than a real viewport.
 *
 * @example
 * fitZoom({ width: 1440, height: 828 }); // ≈ 9.59 — the old fixed zoom
 * fitZoom({ width: 360, height: 568 }); // ≈ 8.89 — a phone needs to pull back
 */
export const fitZoom = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): number => {
  const usableWidth = width - 2 * FIT_PADDING;
  const usableHeight = height - 2 * FIT_PADDING;

  if (usableWidth <= 0 || usableHeight <= 0) {
    return FALLBACK_ZOOM;
  }

  const lngFraction = (DISTRICTS_BBOX.maxLng - DISTRICTS_BBOX.minLng) / 360;
  const latFraction = Math.abs(
    mercatorFraction(DISTRICTS_BBOX.minLat) -
      mercatorFraction(DISTRICTS_BBOX.maxLat)
  );

  return Math.min(
    Math.log2(usableWidth / (TILE_SIZE * lngFraction)),
    Math.log2(usableHeight / (TILE_SIZE * latFraction))
  );
};
