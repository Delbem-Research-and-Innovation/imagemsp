/**
 * @jest-environment node
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';

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

/** Nested coordinate arrays, as GeoJSON geometry carries them. */
type Coordinates = number[] | Coordinates[];

/** The district mesh the map frames its camera around. */
const GEOJSON_PATH = path.resolve(
  __dirname,
  '../../../public/distrito-municipal-v2.geojson'
);

/**
 * The extent of the district mesh, read from the GeoJSON itself.
 *
 * @returns The mesh's bounds, in the shape of {@link DISTRICTS_BBOX}.
 */
const meshBbox = (): typeof DISTRICTS_BBOX => {
  const geojson: { features: { geometry: { coordinates: Coordinates } }[] } =
    JSON.parse(readFileSync(GEOJSON_PATH, 'utf8'));

  const bounds = {
    minLng: Number.POSITIVE_INFINITY,
    maxLng: Number.NEGATIVE_INFINITY,
    minLat: Number.POSITIVE_INFINITY,
    maxLat: Number.NEGATIVE_INFINITY,
  };

  const visit = (coordinates: Coordinates): void => {
    if (typeof coordinates[0] === 'number') {
      const [lng, lat] = coordinates as number[];

      bounds.minLng = Math.min(bounds.minLng, lng ?? 0);
      bounds.maxLng = Math.max(bounds.maxLng, lng ?? 0);
      bounds.minLat = Math.min(bounds.minLat, lat ?? 0);
      bounds.maxLat = Math.max(bounds.maxLat, lat ?? 0);

      return;
    }

    for (const nested of coordinates as Coordinates[]) {
      visit(nested);
    }
  };

  for (const feature of geojson.features) {
    visit(feature.geometry.coordinates);
  }

  return bounds;
};

describe('DISTRICTS_BBOX', () => {
  test('still describes the district mesh', () => {
    // The app frames its camera off this constant rather than parsing the
    // GeoJSON — MapLibre fetches the mesh, the app never reads it — so nothing
    // at runtime would notice the two drifting apart. Swapping the mesh for one
    // with a different extent would leave the map framing the old one, cropped
    // or off-centre, with no error anywhere.
    expect(meshBbox()).toEqual(DISTRICTS_BBOX);
  });
});

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

  test('closes in as the viewport grows in both axes', () => {
    // Proportional sizes on purpose. Area alone does not order the fits: a
    // 768x952 tablet frames closer than a 1440x828 desktop, because the mesh is
    // height-bound and the tablet is the taller of the two.
    const zooms = [
      fitZoom(PHONE),
      fitZoom({ width: PHONE.width * 2, height: PHONE.height * 2 }),
      fitZoom({ width: PHONE.width * 4, height: PHONE.height * 4 }),
    ];

    expect(zooms[0]).toBeLessThan(zooms[1] ?? 0);
    expect(zooms[1]).toBeLessThan(zooms[2] ?? 0);
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
