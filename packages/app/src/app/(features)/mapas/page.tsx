import type { Metadata } from 'next';

import { gateway } from '../../gateway';
import { MapsView } from './_components/MapsView';

export const metadata: Metadata = {
  title: 'ImagemSP Mapas — Visualizações demográficas de São Paulo',
};

export default async function MapasPage() {
  const mapsData = await gateway.getMapsData();

  return <MapsView mapsData={mapsData} />;
}
