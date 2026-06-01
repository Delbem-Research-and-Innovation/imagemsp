import { createDataGateway } from 'src/data-gateway/createDataGateway';

describe('createDataGateway', () => {
  test('returns the canonical data from the default static source', async () => {
    const gateway = createDataGateway();

    const mapsData = gateway.getMapsData;

    expect(mapsData).toEqual(expect.any(Function));
  });
});
