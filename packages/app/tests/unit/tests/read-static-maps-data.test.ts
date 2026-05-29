/**
 * @jest-environment node
 */

describe('readStaticMapsData — validation', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('resolves with the parsed data when the snapshot is well-formed', async () => {
    jest.doMock('@/data-source-static/data/maps-data.json', () => ({
      year: 2025,
      thresholds: { 'cumulative-total': { '65': [0.1, 0.3, 0.5, 0.7] } },
      mapData: {
        'cumulative-total': { '65': [{ geometryId: 1, value: 0.45 }] },
      },
    }));

    const { readStaticMapsData } = await import(
      '@/data-source-static/readStaticMapsData'
    );
    const result = await readStaticMapsData();

    expect(result.year).toBe(2025);
    expect(result.thresholds).toEqual({
      'cumulative-total': { '65': [0.1, 0.3, 0.5, 0.7] },
    });
    expect(result.mapData).toEqual({
      'cumulative-total': { '65': [{ geometryId: 1, value: 0.45 }] },
    });
  });

  it('throws when top-level required fields are missing', async () => {
    jest.doMock('@/data-source-static/data/maps-data.json', () => ({
      year: 2025,
      // thresholds and mapData missing
    }));

    const { readStaticMapsData } = await import(
      '@/data-source-static/readStaticMapsData'
    );
    await expect(readStaticMapsData()).rejects.toThrow('[data-source-static]');
  });

  it('throws when a threshold entry contains a non-array value', async () => {
    jest.doMock('@/data-source-static/data/maps-data.json', () => ({
      year: 2025,
      thresholds: { 'cumulative-total': { '65': 'not-an-array' } },
      mapData: {
        'cumulative-total': { '65': [{ geometryId: 1, value: 0.45 }] },
      },
    }));

    const { readStaticMapsData } = await import(
      '@/data-source-static/readStaticMapsData'
    );
    await expect(readStaticMapsData()).rejects.toThrow('[data-source-static]');
  });

  it('throws when a mapData row is missing geometryId or value', async () => {
    jest.doMock('@/data-source-static/data/maps-data.json', () => ({
      year: 2025,
      thresholds: { 'cumulative-total': { '65': [0.1, 0.3, 0.5, 0.7] } },
      mapData: {
        'cumulative-total': { '65': [{ id: 99 }] }, // missing geometryId + value
      },
    }));

    const { readStaticMapsData } = await import(
      '@/data-source-static/readStaticMapsData'
    );
    await expect(readStaticMapsData()).rejects.toThrow('[data-source-static]');
  });
});
