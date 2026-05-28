'use client';

import 'maplibre-gl/dist/maplibre-gl.css';

import { Box, Button } from '@chakra-ui/react';
import { GeoVisCanvas, GeoVisProvider } from '@ttoss/geovis';
import type { VisualizationSpec } from '@ttoss/geovis';
import React from 'react';

import { CategoryMenu, GROUP_OPTIONS } from '@/components/map/CategoryMenu';
import { LegendPanel, MAP_TITLES } from '@/components/map/LegendPanel';
import type { MapsDataContract } from '@/data-gateway/schema';
import type { Category, Group } from '@/lib/indicators';

// Sequential blue palette from ColorBrewer Blues-5
const COLORS = ['#deebf7', '#9ecae1', '#6baed6', '#2171b5', '#08519c'];

const LEGEND_ID = 'pop-legend';
const MAP_DATA_ID = 'pop-data';
const SOURCE_ID = 'sp-districts';
const LAYER_ID = 'sp-districts-fill';

/**
 * Builds a GeoVis VisualizationSpec for rendering a choropleth map.
 *
 * @param data - Canonical maps data from the gateway.
 * @param category - The demographic category to visualize.
 * @param group - The age group to visualize.
 * @returns A complete VisualizationSpec for GeoVis rendering.
 */
const buildSpec = (
  data: MapsDataContract,
  category: Category,
  group: Group
): VisualizationSpec => {
  const mapDataRows =
    (
      data.mapData[category] as Partial<
        Record<Group, { geometryId: number; value: number }[]>
      >
    )[group] ?? [];

  const thresholds =
    (data.thresholds[category] as Partial<Record<string, number[]>>)[group] ??
    [0.2, 0.4, 0.6, 0.8];

  const title =
    (MAP_TITLES[category] as Partial<Record<string, string>>)[group] ?? '';

  return {
    id: `sp-${category}-${group}`,
    engine: 'maplibre',
    basemap: {
      styleUrl: 'https://tiles.openfreemap.org/styles/positron',
    },
    view: {
      center: [-46.6333, -23.5505],
      zoom: 10,
    },
    sources: [
      {
        id: SOURCE_ID,
        type: 'geojson',
        data: '/distrito-municipal-v2.geojson',
      },
    ],
    layers: [
      {
        id: LAYER_ID,
        sourceId: SOURCE_ID,
        geometry: 'polygon',
        mapDataId: MAP_DATA_ID,
        activeLegendId: LEGEND_ID,
        legends: [
          {
            id: LEGEND_ID,
            label: title,
            colorBy: {
              type: 'quantitative',
              property: 'value',
              scale: 'threshold',
              thresholds,
              colors: COLORS,
            },
          },
        ],
      },
    ],
    mapData: [
      {
        mapDataId: MAP_DATA_ID,
        mapId: SOURCE_ID,
        data: mapDataRows,
      },
    ],
  };
};

export type MapsViewProps = {
  mapsData: MapsDataContract;
};

/**
 * Interactive client component for the demographic maps visualization.
 *
 * Receives pre-fetched canonical maps data from the server component parent
 * and owns all client-side state: category/group selection and panel
 * visibility. Builds the GeoVis spec on each selection change via useMemo.
 *
 * @param props.mapsData - Canonical maps data from the gateway.
 */
export const MapsView = ({ mapsData }: MapsViewProps) => {
  const [selection, setSelection] = React.useState<{
    category: Category;
    group: Group;
  }>({ category: 'cumulative-total', group: '65' });
  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);

  const spec = React.useMemo(
    () => buildSpec(mapsData, selection.category, selection.group),
    [mapsData, selection]
  );

  return (
    <GeoVisProvider spec={spec}>
      <Box position="relative" height="100vh" overflow="hidden">
        <CategoryMenu
          category={selection.category}
          group={selection.group}
          isOpen={leftOpen}
          onCategoryChange={(c) =>
            setSelection((prev) => ({
              ...prev,
              category: c,
              group: GROUP_OPTIONS[c][0].value,
            }))
          }
          onGroupChange={(g) =>
            setSelection((prev) => ({ ...prev, group: g }))
          }
        />

        <GeoVisCanvas
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />

        <Button
          position="absolute"
          top="-4px"
          left="50%"
          transform="translateX(-50%)"
          zIndex={25}
          bg="white"
          color="blue.800"
          borderWidth="2px"
          borderStyle="solid"
          borderColor="blue.800"
          boxShadow="0 0 0 1px #e3dede"
          borderRadius="md"
          fontWeight="bold"
          fontSize="lg"
          textTransform="uppercase"
          letterSpacing="0.03em"
          px={6}
          minH="44px"
          onClick={() => setLeftOpen((prev) => !prev)}
          _hover={{ bg: 'blue.50' }}
          _focusVisible={{
            outline: '2px solid',
            outlineColor: 'blue.800',
            outlineOffset: '2px',
          }}
        >
          DEMOGRAFIA
        </Button>

        <LegendPanel
          category={selection.category}
          group={selection.group}
          isOpen={rightOpen}
          onToggle={() => setRightOpen((prev) => !prev)}
        />
      </Box>
    </GeoVisProvider>
  );
};
