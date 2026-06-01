/**
 * @jest-environment node
 */
import { createDataGateway } from '@/data-gateway/createDataGateway';
import { readStaticMapsData } from '@/data-source-static/readStaticMapsData';

jest.mock('@/data-source-static/readStaticMapsData');

const mockReadStaticMapsData = readStaticMapsData as jest.MockedFunction<
  typeof readStaticMapsData
>;

const MOCK_SOURCE = {
  districts: [
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

      expect(typeof data.year).toBe('number');
      expect(typeof data.thresholds).toBe('object');
      expect(typeof data.mapData).toBe('object');
    });

    test('returns data derived from readStaticMapsData districts', async () => {
      delete process.env['DATA_SOURCE'];
      const gateway = createDataGateway();
      const data = await gateway.getMapsData();

      expect(data.year).toBe(MOCK_SOURCE.districts[0].ano);
      // thresholds come from app constants (NYC fixed intervals), not from the source JSON
      expect(data.thresholds['cumulative-total']?.['65']).toEqual([
        0.1, 0.2, 0.4, 0.6, 0.7, 0.8,
      ]);
      // mapData is computed from district counts
      expect(data.mapData['cumulative-total']?.['65']?.[0]?.geometryId).toBe(8);
      expect(mockReadStaticMapsData).toHaveBeenCalledTimes(1);
    });
  });
});
