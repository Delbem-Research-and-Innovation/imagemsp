import { gateway } from '../../../gateway';

export const GET = async () => {
  const mapsData = await gateway.getMapsData();
  return Response.json(mapsData);
};
