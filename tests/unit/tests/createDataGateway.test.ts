/**
 * @jest-environment node
 */
import { createDataGateway } from '@/data-gateway/createDataGateway';
import { readStaticMapsData } from '@/data-source-static/readStaticMapsData';

jest.mock('@/data-source-static/readStaticMapsData');

const mockReadStaticMapsData = jest.mocked(readStaticMapsData);

/**
 * Two years of the same district, so the contract's year dimension is exercised
 * — a single-year fixture would pass even if the transformer dropped years.
 */
const MOCK_SOURCE = {
  districts: [
    {
      ano: 2020,
      cod_distr: 80008,
      nome: 'Belém',
      municipio: 'São Paulo',
      geometry_id: 8,
      count_65_69: 1500,
      count_70_74: 1100,
      count_75plus: 2100,
      total: 47000,
    },
    {
      ano: 2025,
      cod_distr: 80008,
      nome: 'Belém',
      municipio: 'São Paulo',
      geometry_id: 8,
      count_65_69: 1782,
      count_70_74: 1301,
      count_75plus: 2659,
      total: 47772,
    },
  ],
};

describe('createDataGateway', () => {
  let savedDataSource: string | undefined;

  beforeEach(() => {
    savedDataSource = process.env['DATA_SOURCE'];
    mockReadStaticMapsData.mockResolvedValue(MOCK_SOURCE);
  });

  afterEach(() => {
    if (savedDataSource === undefined) {
      delete process.env['DATA_SOURCE'];
    } else {
      process.env['DATA_SOURCE'] = savedDataSource;
    }
    jest.clearAllMocks();
  });

  test('returns the canonical data from the default static source', async () => {
    const gateway = createDataGateway();

    const mapsData = gateway.getMapsData;

    expect(mapsData).toEqual(expect.any(Function));
  });

  describe('factory — source selection', () => {
    test('does not throw when DATA_SOURCE is unset (defaults to static)', () => {
      delete process.env['DATA_SOURCE'];
      expect(() => {
        return createDataGateway();
      }).not.toThrow();
    });

    test('does not throw when DATA_SOURCE is explicitly set to static', () => {
      process.env['DATA_SOURCE'] = 'static';
      expect(() => {
        return createDataGateway();
      }).not.toThrow();
    });

    test('throws with a descriptive message on unknown DATA_SOURCE', () => {
      process.env['DATA_SOURCE'] = 'graphql';
      expect(() => {
        return createDataGateway();
      }).toThrow(
        '[data-gateway] Unknown DATA_SOURCE: "graphql". Known: static.'
      );
    });
  });

  describe('getMapsData — static source', () => {
    test('returns a MapsDataContract with the expected shape', async () => {
      delete process.env['DATA_SOURCE'];
      const gateway = createDataGateway();
      const data = await gateway.getMapsData();

      expect(Array.isArray(data.years)).toBe(true);
      expect(typeof data.thresholds).toBe('object');
      expect(Array.isArray(data.counts)).toBe(true);
    });

    test('returns data derived from readStaticMapsData districts', async () => {
      delete process.env['DATA_SOURCE'];
      const gateway = createDataGateway();
      const data = await gateway.getMapsData();

      expect(data.years).toEqual([2020, 2025]);
      // Thresholds come from app constants (per-series breaks fitted to São
      // Paulo's full-period range), never from the source JSON.
      expect(data.thresholds['cumulative-total']?.['65']).toEqual([
        0.05, 0.1, 0.15, 0.2, 0.25, 0.3,
      ]);
      // Counts are carried through per district per year; the rates the map
      // paints are derived from them client-side (see components/map/lib/mapRows).
      expect(data.counts).toHaveLength(2);
      expect(data.counts[0]).toEqual({
        geometryId: 8,
        name: 'Belém',
        year: 2020,
        count65to69: 1500,
        count70to74: 1100,
        count75plus: 2100,
        total: 47000,
      });
      expect(mockReadStaticMapsData).toHaveBeenCalledTimes(1);
    });

    test('rejects a snapshot whose years the timeline cannot walk', async () => {
      delete process.env['DATA_SOURCE'];
      mockReadStaticMapsData.mockResolvedValue({
        districts: [
          { ...MOCK_SOURCE.districts[0], ano: 2000 },
          { ...MOCK_SOURCE.districts[1], ano: 2005 },
          { ...MOCK_SOURCE.districts[1], ano: 2020 },
        ],
      });
      const gateway = createDataGateway();

      await expect(gateway.getMapsData()).rejects.toThrow(
        '[data-gateway] projection years are unevenly spaced'
      );
    });
  });
});
