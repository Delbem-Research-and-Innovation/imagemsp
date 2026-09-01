'use client';

import 'maplibre-gl/dist/maplibre-gl.css';
// Side-effect import: registers the Lucide icons GeovisWorkspace renders by
// name, so they resolve from the bundle instead of the Iconify API at runtime.
import '@/components/map/lib/icons';

import { Box, Text } from '@chakra-ui/react';
import type { MapHoverInfo, VisualizationSpec } from '@ttoss/geovis';
import { GeovisWorkspace } from '@ttoss/geovis-workspace';
import { I18nProvider } from '@ttoss/react-i18n';
import { BruttalTheme } from '@ttoss/theme/Bruttal';
import * as React from 'react';
import { ThemeUIProvider } from 'theme-ui';

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
  MAP_DESCRIPTIONS,
  MAP_TITLES,
} from '@/components/map/lib/workspaceConfig';
import type { MapDataRow, MapsDataContract } from '@/data-gateway/schema';

/**
 * Bruttal theme scoped for the GeovisWorkspace sidebars only.
 *
 * theme-ui's <ThemeUIProvider>, when top-level (our app root is Chakra, not
 * theme-ui), renders <RootStyles> which injects the theme's `styles.root` onto
 * the document GLOBALLY — `* { box-sizing }`, `html { ...styles.root }` and,
 * crucially, `html a { font-family, color, text-decoration }`. That leaks into
 * sibling components like the header's "explorar o mapa" button.
 *
 * `config.useRootStyles: false` makes theme-ui skip that global injection
 * entirely (it returns null). The sidebars style themselves via `sx` against
 * the theme context, so they keep their look; only the page-wide root styles
 * are suppressed. Color custom properties (`--theme-ui-*`, namespaced) stay on
 * so sidebar colors still resolve.
 */
const scopedSidebarTheme = {
  ...BruttalTheme,
  config: {
    ...BruttalTheme.config,
    useRootStyles: false,
  },
};

const LEGEND_ID = 'pop-legend';
const MAP_DATA_ID = 'pop-data';
const SOURCE_ID = 'sp-districts';
const LAYER_ID = 'sp-districts-fill';

/**
 * Data-source attribution rendered under the legend swatches. `reference`
 * supports an inline link with the `{link:text|url}` syntax, so the SEADE
 * source keeps its hyperlink (the geometry source is plain text).
 */
const LEGEND_REFERENCE =
  'Fonte dos dados: {link:Dados agregados por distrito municipal a partir das projeções populacionais por sexo e idade do SEADE para o ano de 2025.|https://repositorio.seade.gov.br/dataset/populacao-residente-municipio-de-sao-paulo-evolucao} Geometria: Distritos Municipais de São Paulo.';

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
  // geovis MapDataRow is strictly `{ geometryId, value }` and its runtime
  // schema sets `additionalProperties: false`. The canonical row also carries
  // `name`, `count` and `totalCount` for the tooltip, so those must be
  // stripped here or the spec is rejected and the map never renders. The
  // tooltip is unaffected: it reads the full rows from `rowLookup` below.
  const mapDataRows = (data.mapData[category]?.[group] ?? []).map(
    ({ geometryId, value }) => {
      return { geometryId, value };
    }
  );

  const thresholds =
    (
      data.thresholds[category] as Partial<Record<string, number[]>> | undefined
    )?.[group] ?? NYC_THRESHOLDS;

  const title =
    (MAP_TITLES[category] as Partial<Record<string, string>>)[group] ?? '';
  const description =
    (MAP_DESCRIPTIONS[category] as Partial<Record<string, string>>)[group] ??
    '';

  // Lookup used by the spec-driven hover tooltip to resolve a feature's row.
  const rowLookup = new Map(
    (data.mapData[category]?.[group] ?? []).map((r) => {
      return [r.geometryId, r] as const;
    })
  );

  return {
    engine: 'maplibre',
    basemap: {
      styleUrl: 'https://tiles.openfreemap.org/styles/positron',
    },
    view: {
      center: [-46.5958, -23.6825],
      zoom: 9.6,
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
            subtitle: description,
            // geovis' provider auto-renders any legend that carries a
            // `position`, so this appears as an overlay in the map's bottom-right
            // corner — replacing the old right sidebar with no extra wiring.
            position: 'bottom-right',
            // Inset from the anchored map edges, in pixels — a single value
            // applies to both axes.
            //
            // 46 clears maplibre compact attribution toggle, which claims the
            // same bottom-right corner (10px margin + 24px button = 34px),
            // plus the 12px gap the left sidebar card uses (SidebarOverlay
            // insets it with `padding: [0, "3"]`, and theme space `3` is
            // 0.75rem). Kept equal on both axes so the legend sits on a
            // consistent diagonal from the corner.
            offset: 46,
            colorBy: {
              type: 'quantitative',
              property: 'value',
              scale: 'threshold',
              thresholds,
              colors: LEGEND_COLORS,
            },
            // Values are proportions in [0, 1]; render each bin as a percent
            // range (`< 10%`, `10% – 20%`, … `> 80%`) instead of raw breaks.
            labelFormat: { type: 'percentage', decimals: 0 },
            reference: LEGEND_REFERENCE,
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
      // Since 0.10.0 GeovisWorkspace nests its flex root inside an extra
      // `position: relative` Box, and that root only carries
      // `min-height: 440px` — it never stretches. So the wrapper has to be
      // filled and the root told to grow, or the map collapses to 440px tall.
      //
      // The wrapper is turned into a flex container instead of sizing the
      // root directly: geovis renders the positioned legend as a SIBLING of
      // that root, and absolutely-positioned elements are not flex items, so
      // `flex: 1` stretches the map while leaving the legend untouched.
      // The card border/radius is dropped via `appearance: "bare"` in the
      // config (see buildWorkspaceConfig), not here.
      css={{
        '& > *': {
          height: '100%',
          width: '100%',
          display: 'flex',
        },
        '& > * > *': {
          flex: 1,
          minWidth: 0,
        },
      }}
    >
      <I18nProvider locale="pt-BR">
        {/*
         * Scope the GeovisWorkspace sidebars to theme-ui's provider ONLY, with
         * global root styles disabled (see scopedSidebarTheme). @ttoss/ui's own
         * <ThemeProvider> is avoided because it also mounts a second Chakra v3
         * system whose global `--chakra-*` variables clobber the app's tokens.
         * The sidebars only use theme-ui primitives (Box/Flex/Heading/
         * IconButton/Link/Text), so the theme-ui context is all they need.
         */}
        <ThemeUIProvider theme={scopedSidebarTheme}>
          <GeovisWorkspace
            config={config}
            visualizationSpec={spec}
            variables={variables}
            onVariableChange={handleVariableChange}
          />
        </ThemeUIProvider>
      </I18nProvider>
    </Box>
  );
};
