'use client';

import 'maplibre-gl/dist/maplibre-gl.css';

import { Box, HStack, Text } from '@chakra-ui/react';
import {
  GeoVisCanvas,
  GeoVisLegend,
  GeoVisProvider,
} from '@ttoss/geovis';
import type { VisualizationSpec } from '@ttoss/geovis';
import React from 'react';

import mapsData from '../../../tmp_data/maps-data.json';

// ── Types ─────────────────────────────────────────────────────────────────────

type Category = 'cumulative-total' | 'cumulative-65plus' | '5year-65plus';
type Group = '65' | '70' | '75' | '65-69' | '70-74';

// ── Category / Group options ───────────────────────────────────────────────────

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'cumulative-total', label: 'Cumulativo, % do total' },
  { value: 'cumulative-65plus', label: 'Cumulativo, % da pop 65+' },
  { value: '5year-65plus', label: 'Grupos de 5 anos, % da pop 65+' },
];

const GROUP_OPTIONS: Record<Category, { value: Group; label: string }[]> = {
  'cumulative-total': [
    { value: '65', label: '65 anos ou mais' },
    { value: '70', label: '70 anos ou mais' },
    { value: '75', label: '75 anos ou mais' },
  ],
  'cumulative-65plus': [
    { value: '70', label: '70 anos ou mais' },
    { value: '75', label: '75 anos ou mais' },
  ],
  '5year-65plus': [
    { value: '65-69', label: '65 a 69 anos' },
    { value: '70-74', label: '70 a 74 anos' },
    { value: '75', label: '75 anos ou mais' },
  ],
};

// ── Dados pré-computados ──────────────────────────────────────────────────────

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
};

const data = mapsData as unknown as MapsDataFile;
const THRESHOLDS = data.thresholds;

// Paleta azul sequencial — ColorBrewer Blues-5
const COLORS = ['#deebf7', '#9ecae1', '#6baed6', '#2171b5', '#08519c'];

const LEGEND_ID = 'pop-legend';
const MAP_DATA_ID = 'pop-data';
const SOURCE_ID = 'sp-districts';
const LAYER_ID = 'sp-districts-fill';

// ── Títulos e descrições por categoria / grupo ────────────────────────────────

const MAP_TITLES: Record<Category, Partial<Record<Group, string>>> = {
  'cumulative-total': {
    '65': 'POPULAÇÃO COM 65 ANOS OU MAIS',
    '70': 'POPULAÇÃO COM 70 ANOS OU MAIS',
    '75': 'POPULAÇÃO COM 75 ANOS OU MAIS',
  },
  'cumulative-65plus': {
    '70': '70+ COMO % DA POPULAÇÃO 65+',
    '75': '75+ COMO % DA POPULAÇÃO 65+',
  },
  '5year-65plus': {
    '65-69': '65 A 69 ANOS, % DA POPULAÇÃO 65+',
    '70-74': '70 A 74 ANOS, % DA POPULAÇÃO 65+',
    '75': '75 ANOS OU MAIS, % DA POPULAÇÃO 65+',
  },
};

const MAP_DESCRIPTIONS: Record<Category, Partial<Record<Group, string>>> = {
  'cumulative-total': {
    '65': 'Proporção da população total do distrito com 65 anos ou mais, 2025.',
    '70': 'Proporção da população total do distrito com 70 anos ou mais, 2025.',
    '75': 'Proporção da população total do distrito com 75 anos ou mais, 2025.',
  },
  'cumulative-65plus': {
    '70': 'Proporção da população 65+ que tem 70 anos ou mais, 2025.',
    '75': 'Proporção da população 65+ que tem 75 anos ou mais, 2025.',
  },
  '5year-65plus': {
    '65-69': 'Parcela da população 65+ na faixa de 65 a 69 anos, 2025.',
    '70-74': 'Parcela da população 65+ na faixa de 70 a 74 anos, 2025.',
    '75': 'Parcela da população 65+ com 75 anos ou mais, 2025.',
  },
};

// ── Map data lookup ────────────────────────────────────────────────────────────

const computeMapData = (
  category: Category,
  group: Group
): { geometryId: number; value: number }[] =>
  data.districts.map((d) => ({
    geometryId: d.geometry_id,
    value: (d[category] as Record<string, number>)[group] ?? 0,
  }));

// ── Spec builder ───────────────────────────────────────────────────────────────

const buildSpec = (category: Category, group: Group): VisualizationSpec => {
  const mapDataRows = computeMapData(category, group);
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

const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

// ── CategoryMenu ───────────────────────────────────────────────────────────────

const CategoryMenu = ({
  category,
  group,
  onCategoryChange,
  onGroupChange,
}: {
  category: Category;
  group: Group;
  onCategoryChange: (c: Category) => void;
  onGroupChange: (g: Group) => void;
}) => {
  const menuItem = (
    active: boolean,
    onClick: () => void,
    label: string,
    key: string
  ) => (
    <Box
      key={key}
      as="button"
      display="block"
      width="100%"
      textAlign="left"
      py="6px"
      px={3}
      mb="2px"
      borderRadius="md"
      fontSize="sm"
      fontWeight={active ? 'semibold' : 'normal'}
      color={active ? 'blue.700' : 'gray.700'}
      bg={active ? 'blue.50' : 'transparent'}
      onClick={onClick}
      cursor="pointer"
      lineHeight="short"
      aria-pressed={active}
    >
      {label}
    </Box>
  );

  return (
    <Box
      as="aside"
      width="220px"
      flexShrink={0}
      bg="white"
      color="gray.900"
      borderRight="1px solid"
      borderColor="gray.200"
      p={4}
      display="flex"
      flexDirection="column"
      gap={5}
      overflowY="auto"
      height="100%"
      data-theme="light"
    >
      <Box>
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={2}
        >
          Variáveis
        </Text>
        {CATEGORY_OPTIONS.map((opt) =>
          menuItem(
            category === opt.value,
            () => {
              onCategoryChange(opt.value);
              onGroupChange(GROUP_OPTIONS[opt.value][0].value);
            },
            opt.label,
            opt.value
          )
        )}
      </Box>

      <Box>
        <Text
          fontSize="xs"
          fontWeight="semibold"
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="wider"
          mb={2}
        >
          Faixa etária
        </Text>
        {GROUP_OPTIONS[category].map((opt) =>
          menuItem(
            group === opt.value,
            () => onGroupChange(opt.value),
            opt.label,
            opt.value
          )
        )}
      </Box>
    </Box>
  );
};

// ── LegendPanel ────────────────────────────────────────────────────────────────

const LegendPanel = ({
  category,
  group,
  onClose,
}: {
  category: Category;
  group: Group;
  onClose: () => void;
}) => {
  const title =
    (MAP_TITLES[category] as Partial<Record<string, string>>)[group] ?? '';
  const description =
    (MAP_DESCRIPTIONS[category] as Partial<Record<string, string>>)[group] ??
    '';

  return (
    <Box
      as="aside"
      position="absolute"
      right={4}
      top="50%"
      style={{ transform: 'translateY(-50%)' }}
      zIndex={20}
      width="280px"
      bg="white"
      color="gray.900"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      display="flex"
      flexDirection="column"
      gap={5}
      overflowY="auto"
      maxHeight="72vh"
      data-theme="light"
    >
      {/* Botão fechar */}
      <Box display="flex" justifyContent="flex-end" mt={-2} mr={-2}>
        <Box
          as="button"
          onClick={onClose}
          color="gray.400"
          fontSize="lg"
          lineHeight={1}
          px={1}
          cursor="pointer"
          aria-label="Fechar painel"
        >
          ✕
        </Box>
      </Box>

      <Box>
        <Text
          fontSize="md"
          fontWeight="bold"
          color="blue.600"
          letterSpacing="0.03em"
          textTransform="uppercase"
          lineHeight="tight"
        >
          {title}
        </Text>
        <Text fontSize="sm" fontWeight="bold" color="gray.700" mt={2} lineHeight="short">
          {description}
        </Text>
      </Box>

      <Box color="gray.900">
        <GeoVisLegend legendId={LEGEND_ID} formatValue={formatPercent} />
      </Box>

      <Box>
        <Text fontSize="sm" fontWeight="bold" color="gray.700">
          Fonte dos dados:
        </Text>
        <Box
          as="ul"
          pl={4}
          mt={1}
          display="flex"
          flexDirection="column"
          gap={1}
        >
          <Box as="li" fontSize="xs" color="gray.600" lineHeight="base">
            Dados agregados por distrito municipal a partir das{' '}
            <Box
              as="a"
              href="https://repositorio.seade.gov.br/dataset/populacao-residente-municipio-de-sao-paulo-evolucao"
              target="_blank"
              rel="noopener noreferrer"
              color="blue.600"
              textDecoration="underline"
            >
              projeções populacionais por sexo e idade do SEADE
            </Box>{' '}
            para o ano de 2025.
          </Box>
          <Box as="li" fontSize="xs" color="gray.600" lineHeight="base">
            Geometria: Distritos Municipais de São Paulo.
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// ── MapsPage ───────────────────────────────────────────────────────────────────

const MapsPage = () => {
  const [selection, setSelection] = React.useState<{
    category: Category;
    group: Group;
  }>({ category: 'cumulative-total', group: '65' });
  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);

  const spec = React.useMemo(
    () => buildSpec(selection.category, selection.group),
    [selection]
  );

  return (
    <GeoVisProvider spec={spec}>
      <HStack height="100vh" gap={0} align="stretch" overflow="hidden">
        {/* Menu esquerdo */}
        {leftOpen && (
          <CategoryMenu
            category={selection.category}
            group={selection.group}
            onCategoryChange={(c) =>
              setSelection({ category: c, group: GROUP_OPTIONS[c][0].value })
            }
            onGroupChange={(g) =>
              setSelection((prev) => ({ ...prev, group: g }))
            }
          />
        )}

        {/* Área do mapa */}
        <Box flex={1} position="relative">
          {/* Botão de colapso — borda esquerda */}
          <Box
            as="button"
            position="absolute"
            left={0}
            top="50%"
            style={{ transform: 'translateY(-50%)' }}
            zIndex={10}
            onClick={() => setLeftOpen((prev) => !prev)}
            bg="white"
            border="1px solid"
            borderColor="gray.300"
            borderLeft="none"
            px={2}
            py={4}
            fontSize="xs"
            fontWeight="bold"
            color="gray.600"
            cursor="pointer"
            borderRadius="0 4px 4px 0"
            lineHeight={1}
            aria-label={leftOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={leftOpen}
          >
            {leftOpen ? '<<' : '>>'}
          </Box>

          <GeoVisCanvas
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />

          {/* Painel de legenda — overlay */}
          {rightOpen && (
            <LegendPanel
              category={selection.category}
              group={selection.group}
              onClose={() => setRightOpen(false)}
            />
          )}

          {/* Botão de colapso — borda direita */}
          {!rightOpen && (
            <Box
              as="button"
              position="absolute"
              right={0}
              top="50%"
              style={{ transform: 'translateY(-50%)' }}
              zIndex={10}
              onClick={() => setRightOpen(true)}
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              borderRight="none"
              px={2}
              py={4}
              fontSize="xs"
              fontWeight="bold"
              color="gray.600"
              cursor="pointer"
              borderRadius="4px 0 0 4px"
              lineHeight={1}
              aria-label="Abrir painel"
              aria-expanded={false}
            >
              {'<<'}
            </Box>
          )}
        </Box>
      </HStack>
    </GeoVisProvider>
  );
};

export default MapsPage;
