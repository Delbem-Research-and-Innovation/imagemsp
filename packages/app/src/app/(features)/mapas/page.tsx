import type { Metadata } from 'next';

import { gateway } from '../../gateway';
import { MapsView } from './_components/MapsView';

export const metadata: Metadata = {
  title: 'Mapas — Cozinhas Solidárias',
};

export default async function MapasPage() {
  const mapsData = await gateway.getMapsData();

  return <MapsView mapsData={mapsData} />;
}
