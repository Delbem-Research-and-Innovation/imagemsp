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
  year: 2025,
  thresholds: {
    'cumulative-total': { '65': [0.1, 0.3, 0.5, 0.7] },
  },
  mapData: {
    'cumulative-total': { '65': [{ geometryId: 1, value: 0.45 }] },
  },
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

  describe('factory — source selection', () => {
    it('does not throw when DATA_SOURCE is unset (defaults to static)', () => {
      delete process.env['DATA_SOURCE'];
      expect(() => createDataGateway()).not.toThrow();
    });

    it('does not throw when DATA_SOURCE is explicitly set to static', () => {
      process.env['DATA_SOURCE'] = 'static';
      expect(() => createDataGateway()).not.toThrow();
    });

    it('throws with a descriptive message on unknown DATA_SOURCE', () => {
      process.env['DATA_SOURCE'] = 'graphql';
      expect(() => createDataGateway()).toThrow(
        '[data-gateway] Unknown DATA_SOURCE: "graphql". Known: static.'
      );
    });
  });

  describe('getMapsData — static source', () => {
    it('returns a MapsDataContract with the expected shape', async () => {
      delete process.env['DATA_SOURCE'];
      const gateway = createDataGateway();
      const data = await gateway.getMapsData();

      expect(typeof data.year).toBe('number');
      expect(typeof data.thresholds).toBe('object');
      expect(typeof data.mapData).toBe('object');
    });

    it('returns data from readStaticMapsData via toAppMapsData', async () => {
      delete process.env['DATA_SOURCE'];
      const gateway = createDataGateway();
      const data = await gateway.getMapsData();

      expect(data.year).toBe(MOCK_SOURCE.year);
      expect(data.thresholds).toEqual(MOCK_SOURCE.thresholds);
      expect(data.mapData).toEqual(MOCK_SOURCE.mapData);
      expect(mockReadStaticMapsData).toHaveBeenCalledTimes(1);
    });
  });
});
