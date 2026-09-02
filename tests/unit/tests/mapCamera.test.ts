/**
 * @jest-environment node
 */
import {
  DISTRICTS_BBOX,
  DISTRICTS_CENTER,
  FALLBACK_ZOOM,
  fitZoom,
} from '@/components/map/lib/mapCamera';

/** A phone in portrait, minus the site header. */
const PHONE = { width: 360, height: 568 };

/** The desktop the map's previously fixed zoom of 9.6 was calibrated for. */
const DESKTOP = { width: 1440, height: 828 };

describe('DISTRICTS_CENTER', () => {
  test('is the centre of the district extent', () => {
    expect(DISTRICTS_CENTER).toEqual([
      (DISTRICTS_BBOX.minLng + DISTRICTS_BBOX.maxLng) / 2,
      (DISTRICTS_BBOX.minLat + DISTRICTS_BBOX.maxLat) / 2,
    ]);
  });
});

describe('fitZoom', () => {
  test('reproduces the hand-picked zoom on the screen it was picked for', () => {
    // The map used a fixed 9.6 before the camera was fitted, which framed the
    // mesh on a 1440x900 desktop. Landing on the same value there is what makes
    // this a generalisation of that framing rather than a new one.
    expect(fitZoom(DESKTOP)).toBeCloseTo(9.59, 2);
  });

  test('pulls back further on a phone than on a desktop', () => {
    expect(fitZoom(PHONE)).toBeLessThan(fitZoom(DESKTOP));
  });

  test('closes in as the viewport grows', () => {
    const zooms = [
      fitZoom(PHONE),
      fitZoom({ width: 768, height: 952 }),
      fitZoom(DESKTOP),
      fitZoom({ width: 1920, height: 1008 }),
    ];

    expect(zooms).toEqual(
      [...zooms].sort((a, b) => {
        return a - b;
      })
    );
  });

  test('lets the height bind on a short, wide viewport', () => {
    // São Paulo is taller than it is wide, so past a point extra width buys no
    // zoom — the mesh would spill off the top and bottom instead.
    expect(fitZoom({ width: 2000, height: 400 })).toBe(
      fitZoom({ width: 4000, height: 400 })
    );
  });

  test('falls back when there is no viewport to measure', () => {
    // The server pass and the first client pass before the store is read. The
    // map does not mount in either, so this only keeps the spec complete.
    expect(fitZoom({ width: 0, height: 0 })).toBe(FALLBACK_ZOOM);
  });

  test('falls back when the padding alone exceeds the viewport', () => {
    expect(fitZoom({ width: 40, height: 40 })).toBe(FALLBACK_ZOOM);
  });
});
