'use client';

import 'maplibre-gl/dist/maplibre-gl.css';

import { Box, Button } from '@chakra-ui/react';
import {
  GeoVisCanvas,
  GeoVisProvider,
} from '@ttoss/geovis';
import type { VisualizationSpec } from '@ttoss/geovis';
import React from 'react';

import { CategoryMenu, GROUP_OPTIONS } from '@/components/map/CategoryMenu';
import { LegendPanel, MAP_TITLES } from '@/components/map/LegendPanel';
import { IndicatorSelector } from '@/components/map/IndicatorSelector';
import type { Category, Group, IndicatorId } from '@/lib/indicators';
import mapsData from '../../data/maps-data.json';

// Pre-computed data types and constants

type DistrictData = {
  district_code: number;
  geometry_id: number;
  'cumulative-total': { '65': number; '70': number; '75': number };
  'cumulative-65plus': { '70': number; '75': number };
  '5year-65plus': { '65-69': number; '70-74': number; '75': number };
};

type MapsDataFile = {
  year: number;
  thresholds: Record<Category, Partial<Record<Group, number[]>>>;
  districts: DistrictData[];
  mapData: Record<
    Category,
    Partial<Record<Group, { geometryId: number; value: number }[]>>
  >;
};

const data = mapsData as unknown as MapsDataFile;
const THRESHOLDS = data.thresholds;

// Sequential blue palette from ColorBrewer Blues-5
const COLORS = ['#deebf7', '#9ecae1', '#6baed6', '#2171b5', '#08519c'];

const LEGEND_ID = 'pop-legend';
const MAP_DATA_ID = 'pop-data';
const SOURCE_ID = 'sp-districts';
const LAYER_ID = 'sp-districts-fill';

// Visualization spec builder

/**
 * Builds a GeoVis VisualizationSpec for rendering a choropleth map.
 *
 * Constructs the complete map specification including basemap, sources, layers,
 * legends, and map data based on the selected category and age group.
 *
 * @param category - The demographic category to visualize
 * @param group - The age group to visualize
 * @returns A complete VisualizationSpec for GeoVis rendering
 */
const buildSpec = (category: Category, group: Group): VisualizationSpec => {
  const mapDataRows =
    (data.mapData[category] as Partial<
      Record<Group, { geometryId: number; value: number }[]>
    >)[group] ?? [];

  const thresholds =
    (THRESHOLDS[category] as Partial<Record<string, number[]>>)[group] ??
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



// Main maps page component

/**
 * Main page component for the demographic maps visualization.
 *
 * Orchestrates the full map UI: left sidebar for category/group selection,
 * center map canvas with GeoVis, right legend panel, and toggle buttons.
 * Manages state for selection and panel visibility.
 */
const MapsPage = () => {
  const [selection, setSelection] = React.useState<{
    category: Category;
    group: Group;
    indicator: IndicatorId;
  }>({ category: 'cumulative-total', group: '65', indicator: 'pop-60plus' });
  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);

  const spec = React.useMemo(
    () => buildSpec(selection.category, selection.group),
    [selection]
  );

  return (
    <GeoVisProvider spec={spec}>
      <Box position="relative" height="100vh" overflow="hidden">
        {/* Menu esquerdo — toggle integrado ao componente */}
        <CategoryMenu
          category={selection.category}
          group={selection.group}
          isOpen={leftOpen}
          onToggle={() => setLeftOpen((prev) => !prev)}
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

          {/* <IndicatorSelector
            value={selection.indicator}
            onChange={(ind) => setSelection((prev) => ({ ...prev, indicator: ind }))}
          /> */}

          <GeoVisCanvas
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
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
            outline="1px solid #e3dede"
            borderRadius="md"
            fontWeight="bold"
            fontSize="lg"
            textTransform="uppercase"
            letterSpacing="0.03em"
            px={6}
            minH="40px"
            onClick={() => setLeftOpen((prev) => !prev)}
            _hover={{ bg: 'blue.50' }}
          >
            DEMOGRAFIA
          </Button>

          {/* Painel de legenda — toggle integrado ao componente */}
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

export default MapsPage;
