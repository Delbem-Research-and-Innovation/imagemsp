/**
 * @jest-environment node
 */

describe('readStaticMapsData — validation', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('resolves with the parsed data when the snapshot is well-formed', async () => {
    jest.doMock('@/data-source-static/data/maps-data.json', () => ({
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
    }));

    const { readStaticMapsData } = await import(
      '@/data-source-static/readStaticMapsData'
    );
    const result = await readStaticMapsData();

    expect(result.districts).toHaveLength(1);
    expect(result.districts[0].ano).toBe(2025);
    expect(result.districts[0].nome).toBe('Belém');
  });

  it('throws when top-level required fields are missing', async () => {
    jest.doMock('@/data-source-static/data/maps-data.json', () => ({
      // districts missing
    }));

    const { readStaticMapsData } = await import(
      '@/data-source-static/readStaticMapsData'
    );
    await expect(readStaticMapsData()).rejects.toThrow('[data-source-static]');
  });

  it('throws when districts is not an array', async () => {
    jest.doMock('@/data-source-static/data/maps-data.json', () => ({
      districts: 'not-an-array',
    }));

    const { readStaticMapsData } = await import(
      '@/data-source-static/readStaticMapsData'
    );
    await expect(readStaticMapsData()).rejects.toThrow('[data-source-static]');
  });

  it('throws when a district row is missing required fields', async () => {
    jest.doMock('@/data-source-static/data/maps-data.json', () => ({
      districts: [{ cod_distr: 80008 }], // missing nome, geometry_id, counts, total
    }));

    const { readStaticMapsData } = await import(
      '@/data-source-static/readStaticMapsData'
    );
    await expect(readStaticMapsData()).rejects.toThrow('[data-source-static]');
  });
});
