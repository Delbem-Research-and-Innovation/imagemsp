'use client';

import 'maplibre-gl/dist/maplibre-gl.css';

import { Box, Button, Text } from '@chakra-ui/react';
import type { VisualizationSpec } from '@ttoss/geovis';
import {
  GeoVisCanvas,
  GeoVisHoverTooltip,
  GeoVisProvider,
} from '@ttoss/geovis';
import * as React from 'react';

import { CategoryMenu, GROUP_OPTIONS } from '@/components/map/CategoryMenu';
import { LegendPanel, MAP_TITLES } from '@/components/map/LegendPanel';
import type { Category, Group } from '@/components/map/lib/indicators';
import {
  getBandIndex,
  LEGEND_COLORS,
  NYC_THRESHOLDS,
} from '@/components/map/lib/mapConfig';
import type { MapDataRow, MapsDataContract } from '@/data-gateway/schema';

// Sequential blue palette from ColorBrewer Blues-7 — imported from mapConfig
// LEGEND_COLORS is the canonical reference used by all choropleth UI.

const LEGEND_ID = 'pop-legend';
const MAP_DATA_ID = 'pop-data';
const SOURCE_ID = 'sp-districts';
const LAYER_ID = 'sp-districts-fill';

/**
 * Generates dynamic tooltip text based on selected category and group.
 *
 * @param category - The demographic category.
 * @param group - The age group.
 * @returns Descriptive text for the tooltip value line.
 */
const getTooltipText = (category: Category, group: Group): string => {
  const ageLabels: Record<Group, string> = {
    '65': '65+',
    '70': '70+',
    '75': '75+',
    '65-69': '65 a 69 anos',
    '70-74': '70 a 74 anos',
  };

  const contextLabels: Record<Category, string> = {
    'cumulative-total': 'do total',
    'cumulative-65plus': 'da pop 65+',
    '5year-65plus': 'da pop 65+',
  };

  return `População com idade ${ageLabels[group]} ${contextLabels[category]}`;
};

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
      data.mapData[category] as
        | Partial<Record<Group, { geometryId: number; value: number }[]>>
        | undefined
    )?.[group] ?? [];

  const thresholds =
    (
      data.thresholds[category] as Partial<Record<string, number[]>> | undefined
    )?.[group] ?? NYC_THRESHOLDS;

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
              colors: LEGEND_COLORS,
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
 * Renders the tooltip content for a district feature.
 *
 * @param featureId - The feature ID from the hover event.
 * @param rowLookup - Map of geometryId to MapDataRow.
 * @param category - Current selected category.
 * @param group - Current selected group.
 * @returns Tooltip JSX content.
 */
const renderTooltipContent = (
  featureId: string | number,
  rowLookup: Map<number, MapDataRow>,
  category: Category,
  group: Group
) => {
  const row = rowLookup.get(Number(featureId));
  const bandIndex = row != null ? getBandIndex(row.value) : null;
  const swatchColor =
    bandIndex != null
      ? LEGEND_COLORS[bandIndex]
      : 'var(--chakra-colors-border-subtle)';

  return (
    <Box display="flex" flexDirection="column" gap="2" minWidth="200px">
      {/* District name */}
      <Text fontWeight="bold" fontSize="md" lineHeight="tight">
        {row?.name ?? String(featureId)}
      </Text>

      {/* Value with color swatch */}
      {row && (
        <Box display="flex" flexDirection="column" gap="1">
          <Box display="flex" alignItems="center" gap="2">
            <Box
              width="14px"
              height="14px"
              borderRadius="2px"
              flexShrink={0}
              bg={swatchColor}
            />
            <Text fontSize="xs" color="text.muted" lineHeight="tight">
              {(row.value * 100).toFixed(1)}% {getTooltipText(category, group)}
            </Text>
          </Box>
          {row.count != null && row.totalCount != null && (
            <Text fontSize="xs" color="text.muted" lineHeight="tight" pl="22px">
              ({row.count.toLocaleString('pt-BR')} de{' '}
              {row.totalCount.toLocaleString('pt-BR')} pessoas)
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
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

  const spec = React.useMemo(() => {
    return buildSpec(mapsData, selection.category, selection.group);
  }, [mapsData, selection]);

  const rowLookup = React.useMemo(() => {
    const rows = mapsData.mapData[selection.category]?.[selection.group] ?? [];
    return new Map(
      rows.map((r) => {
        return [r.geometryId, r] as const;
      })
    );
  }, [mapsData, selection.category, selection.group]);

  return (
    <GeoVisProvider spec={spec}>
      <Box position="relative" height="100vh" overflow="hidden">
        <CategoryMenu
          category={selection.category}
          group={selection.group}
          isOpen={leftOpen}
          onCategoryChange={(c) => {
            return setSelection((prev) => {
              return {
                ...prev,
                category: c,
                group: GROUP_OPTIONS[c][0].value,
              };
            });
          }}
          onGroupChange={(g) => {
            return setSelection((prev) => {
              return { ...prev, group: g };
            });
          }}
        />

        <GeoVisCanvas
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />

        <GeoVisHoverTooltip
          render={(info) => {
            return renderTooltipContent(
              info.featureId,
              rowLookup,
              selection.category,
              selection.group
            );
          }}
          style={{
            background: 'var(--chakra-colors-surface-raised)',
            color: 'var(--chakra-colors-text-primary)',
            border: '1px solid var(--chakra-colors-border-subtle)',
            borderRadius: 'var(--chakra-radii-md)',
            boxShadow: 'var(--chakra-shadows-md)',
            padding: 'var(--chakra-spacing-2) var(--chakra-spacing-3)',
            zIndex: 50,
          }}
        />

        <Button
          position="absolute"
          top="-8px"
          left="50%"
          transform="translateX(-50%)"
          zIndex={25}
          bg="surface.raised"
          color="brand.fg"
          borderWidth="2px"
          borderStyle="solid"
          borderColor="brand.fg"
          boxShadow="hairline"
          borderRadius="md"
          fontWeight="bold"
          fontSize="lg"
          textTransform="uppercase"
          letterSpacing="0.03em"
          px={6}
          minH="44px"
          onClick={() => {
            return setLeftOpen((prev) => {
              return !prev;
            });
          }}
          _hover={{ bg: 'brand.subtle' }}
          _focusVisible={{
            outline: '2px solid',
            outlineColor: 'focus.ring',
            outlineOffset: '2px',
          }}
        >
          DEMOGRAFIA
        </Button>

        <LegendPanel
          category={selection.category}
          group={selection.group}
          isOpen={rightOpen}
          onToggle={() => {
            return setRightOpen((prev) => {
              return !prev;
            });
          }}
        />
      </Box>
    </GeoVisProvider>
  );
};
