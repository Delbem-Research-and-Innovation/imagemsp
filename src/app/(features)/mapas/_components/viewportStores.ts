/**
 * Browser-environment stores behind the map's responsive behaviour, in the
 * shape `useSyncExternalStore` takes: a subscribe function, a client snapshot
 * and a server snapshot.
 *
 * They live here rather than in `MapsView` for size, and as stores rather than
 * as effects because both answer "what is the environment right now?" — a
 * snapshot, not state to synchronise. That framing also keeps them clear of the
 * React compiler's `react-hooks/set-state-in-effect` rule, which the
 * `useState` + `useEffect` idiom would trip.
 */

/** Height of the fixed site header, in `rem` (the `sizes.header.height` token). */
const HEADER_HEIGHT_REM = 4.5;

/**
 * Height of the map surface: one viewport minus the fixed header, which
 * `DefaultLayout` clears with a matching `pt="4.5rem"` on `<main>`.
 *
 * `dvh`, not `vh`: on mobile browsers `100vh` is the viewport with the URL bar
 * hidden, so a `100vh` map starts taller than the screen — its bottom sits
 * under the browser chrome and the page gains a scrollbar it should not have.
 * `dvh` tracks the space actually visible.
 */
export const MAP_HEIGHT = `calc(100dvh - ${HEADER_HEIGHT_REM}rem)`;

/**
 * Viewport available to the map, as a `"<width>x<height>"` snapshot.
 *
 * A string because `useSyncExternalStore` compares snapshots by identity: an
 * object would be a new reference on every read and loop forever.
 *
 * The header's height is resolved from the root font size rather than assumed
 * to be 72px, because the text-size control (`TextResizer`) scales the root and
 * the header scales with it — a fixed pixel value would leave the map short, or
 * overflowing, at the larger text settings.
 *
 * @returns The measured viewport, e.g. `"1440x828"`.
 *
 * @example
 * mapViewportSnapshot(); // '390x772' on an iPhone 14
 */
export const mapViewportSnapshot = (): string => {
  const rootFontSize = Number.parseFloat(
    window.getComputedStyle(document.documentElement).fontSize
  );
  const height = window.innerHeight - HEADER_HEIGHT_REM * rootFontSize;

  return `${window.innerWidth}x${Math.round(height)}`;
};

/**
 * No viewport to measure while rendering on the server.
 *
 * @returns The empty snapshot.
 *
 * @example
 * emptyViewportSnapshot(); // ''
 */
export const emptyViewportSnapshot = (): string => {
  return '';
};

/**
 * Subscribes to orientation changes only — not to `resize`.
 *
 * Rotating a phone is a new framing and should refit the camera; dragging a
 * window edge is not, and refitting there would pull the camera back to the
 * overview while the user was looking at a district.
 *
 * @param onStoreChange - React's snapshot invalidation callback.
 * @returns The unsubscribe function.
 *
 * @example
 * useSyncExternalStore(subscribeToOrientation, mapViewportSnapshot, emptyViewportSnapshot);
 */
export const subscribeToOrientation = (onStoreChange: () => void) => {
  const query = window.matchMedia('(orientation: portrait)');

  query.addEventListener('change', onStoreChange);

  return () => {
    query.removeEventListener('change', onStoreChange);
  };
};

/**
 * Width at which the workspace's left sidebar stops covering the map.
 *
 * It is the first breakpoint of `@ttoss/theme` (480px), which is where the
 * workspace's `SidebarOverlay` switches from `width: 100%` — a full-screen
 * panel — to a floating card. Below it, an open sidebar hides the map entirely.
 */
const SIDEBAR_FITS_BESIDE_MAP = '(min-width: 480px)';

/**
 * Whether the sidebar can sit beside the map instead of covering it.
 *
 * @returns `true` above the breakpoint.
 *
 * @example
 * sidebarFitsBesideMap(); // false on a phone
 */
export const sidebarFitsBesideMap = (): boolean => {
  return window.matchMedia(SIDEBAR_FITS_BESIDE_MAP).matches;
};

/**
 * Assume the narrow case on the server; the map only mounts client-side anyway.
 *
 * @returns `false`.
 *
 * @example
 * sidebarCoversMap(); // false
 */
export const sidebarCoversMap = (): boolean => {
  return false;
};

/**
 * Subscribes to the sidebar breakpoint.
 *
 * @param onStoreChange - React's snapshot invalidation callback.
 * @returns The unsubscribe function.
 *
 * @example
 * useSyncExternalStore(subscribeToSidebarBreakpoint, sidebarFitsBesideMap, sidebarCoversMap);
 */
export const subscribeToSidebarBreakpoint = (onStoreChange: () => void) => {
  const query = window.matchMedia(SIDEBAR_FITS_BESIDE_MAP);

  query.addEventListener('change', onStoreChange);

  return () => {
    query.removeEventListener('change', onStoreChange);
  };
};
