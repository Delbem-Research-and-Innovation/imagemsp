'use client';

import 'maplibre-gl/dist/maplibre-gl.css';

import { Box, Text } from '@chakra-ui/react';
import type { MapHoverInfo, VisualizationSpec } from '@ttoss/geovis';
import { GeovisWorkspace } from '@ttoss/geovis-workspace';
import { I18nProvider } from '@ttoss/react-i18n';
import { ThemeProvider } from '@ttoss/ui';
import * as React from 'react';

import type { Category, Group } from '@/components/map/lib/indicators';
import {
  getBandIndex,
  LEGEND_COLORS,
  NYC_THRESHOLDS,
} from '@/components/map/lib/mapConfig';
import {
  buildWorkspaceConfig,
  CATEGORY_MENU_ID,
  getDefaultGroup,
  GROUP_MENU_ID,
  MAP_TITLES,
} from '@/components/map/lib/workspaceConfig';
import type { MapDataRow, MapsDataContract } from '@/data-gateway/schema';

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
 * Builds a GeoVis VisualizationSpec for rendering a choropleth map, including a
 * spec-driven hover tooltip on the district layer.
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

  // Lookup used by the spec-driven hover tooltip to resolve a feature's row.
  const rowLookup = new Map(
    (data.mapData[category]?.[group] ?? []).map((r) => {
      return [r.geometryId, r] as const;
    })
  );

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
            title,
            colorBy: {
              type: 'quantitative',
              property: 'value',
              scale: 'threshold',
              thresholds,
              colors: LEGEND_COLORS,
            },
          },
        ],
        hoverTooltip: {
          render: (info: MapHoverInfo) => {
            return renderTooltipContent(
              info.featureId,
              rowLookup,
              category,
              group
            );
          },
          style: {
            background: 'var(--chakra-colors-surface-raised)',
            color: 'var(--chakra-colors-text-primary)',
            border: '1px solid var(--chakra-colors-border-subtle)',
            borderRadius: 'var(--chakra-radii-md)',
            boxShadow: 'var(--chakra-shadows-md)',
            padding: 'var(--chakra-spacing-2) var(--chakra-spacing-3)',
            zIndex: 50,
          },
        },
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
 * Receives pre-fetched canonical maps data from the server component parent and
 * owns the client-side category/group selection. The GeovisWorkspace renders
 * the map canvas and both sidebars (category/group menus and the legend panel),
 * driven by the spec and config rebuilt on each selection change.
 *
 * @param props.mapsData - Canonical maps data from the gateway.
 */
export const MapsView = ({ mapsData }: MapsViewProps) => {
  const [selection, setSelection] = React.useState<{
    category: Category;
    group: Group;
  }>({ category: 'cumulative-total', group: '65' });

  const spec = React.useMemo(() => {
    return buildSpec(mapsData, selection.category, selection.group);
  }, [mapsData, selection]);

  const config = React.useMemo(() => {
    return buildWorkspaceConfig(selection.category, selection.group);
  }, [selection]);

  const variables = React.useMemo(() => {
    return {
      [CATEGORY_MENU_ID]: selection.category,
      [GROUP_MENU_ID]: selection.group,
    };
  }, [selection]);

  const handleVariableChange = (next: Record<string, string | undefined>) => {
    setSelection((prev) => {
      const nextCategory = (next[CATEGORY_MENU_ID] ??
        prev.category) as Category;
      // When the category changes, the available groups change too — reset the
      // group to the new category's first option (cascading behaviour).
      if (nextCategory !== prev.category) {
        return { category: nextCategory, group: getDefaultGroup(nextCategory) };
      }
      const nextGroup = (next[GROUP_MENU_ID] ?? prev.group) as Group;
      return { category: nextCategory, group: nextGroup };
    });
  };

  return (
    <Box
      // The page sits inside DefaultLayout, whose <main> has pt="4.5rem" to
      // clear the fixed header. Subtract that offset so header + map fill
      // exactly one viewport (no overflow/scroll).
      height="calc(100vh - 4.5rem)"
      width="100%"
      overflow="hidden"
      // GeovisWorkspace renders a bordered, 440px-min "card" root that doesn't
      // stretch on its own — force its root container to fill the viewport and
      // drop the card border/radius for a full-bleed map.
      css={{
        '& > *': {
          height: '100%',
          width: '100%',
          minHeight: '100%',
          border: 'none',
          borderRadius: 0,
        },
      }}
    >
      <I18nProvider locale="pt-BR">
        <ThemeProvider>
          <GeovisWorkspace
            config={config}
            visualizationSpec={spec}
            variables={variables}
            onVariableChange={handleVariableChange}
          />
        </ThemeProvider>
      </I18nProvider>
    </Box>
  );
};
