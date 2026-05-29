'use client';

import { Box, IconButton, Link, Text } from '@chakra-ui/react';
import React from 'react';

import { Icon, ICONS } from '@/lib/icons';
import type { Category, Group } from '@/lib/indicators';

/** NYC IMAGE fixed-interval thresholds shared by all map categories. */
const NYC_THRESHOLDS = [0.1, 0.2, 0.4, 0.6, 0.7, 0.8];

/** ColorBrewer blue7 sequential palette used in all choropleth layers. */
const LEGEND_COLORS = [
  '#c6dbef',
  '#9ecae1',
  '#6baed6',
  '#4292c6',
  '#2171b5',
  '#08519c',
  '#08306b',
];

export const MAP_TITLES: Record<Category, Partial<Record<Group, string>>> = {
  'cumulative-total': {
    '65': 'POPULAÇÃO 65+ COMO % DA POPULAÇÃO TOTAL',
    '70': 'POPULAÇÃO 70+ COMO % DA POPULAÇÃO TOTAL',
    '75': 'POPULAÇÃO 75+ COMO % DA POPULAÇÃO TOTAL',
  },
  'cumulative-65plus': {
    '70': '70+ COMO % DA POPULAÇÃO 65+',
    '75': '75+ COMO % DA POPULAÇÃO 65+',
  },
  '5year-65plus': {
    '65-69': '65–69 ANOS COMO % DA POPULAÇÃO 65+',
    '70-74': '70–74 ANOS COMO % DA POPULAÇÃO 65+',
    '75': '75+ COMO % DA POPULAÇÃO 65+',
  },
};

const MAP_DESCRIPTIONS: Record<Category, Partial<Record<Group, string>>> = {
  'cumulative-total': {
    '65': 'Proporção da população total do distrito com 65 anos ou mais.',
    '70': 'Proporção da população total do distrito com 70 anos ou mais.',
    '75': 'Proporção da população total do distrito com 75 anos ou mais.',
  },
  'cumulative-65plus': {
    '70': 'Proporção da população 65+ que tem 70 anos ou mais.',
    '75': 'Proporção da população 65+ que tem 75 anos ou mais.',
  },
  '5year-65plus': {
    '65-69': 'Parcela da população 65+ na faixa de 65 a 69 anos.',
    '70-74': 'Parcela da população 65+ na faixa de 70 a 74 anos.',
    '75': 'Parcela da população 65+ com 75 anos ou mais.',
  },
};

const formatPercent = (value: number) => {
  const pct = value * 100;
  return `${pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(1)}%`;
};

/** Builds one legend item per class from the NYC fixed breakpoints. */
const buildLegendItems = () => {
  const breaks = [0, ...NYC_THRESHOLDS, 1];
  return breaks.slice(0, -1).map((lower, i) => ({
    color: LEGEND_COLORS[i],
    label: `${formatPercent(lower)} \u2013 ${formatPercent(breaks[i + 1])}`,
  }));
};

const ThresholdLegend = () => {
  const items = buildLegendItems();
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      {items.map(({ color, label }) => (
        <Box key={label} display="flex" alignItems="center" gap={2}>
          <Box
            width="20px"
            height="14px"
            borderRadius="2px"
            flexShrink={0}
            style={{ backgroundColor: color }}
          />
          <Text fontSize="xs" color="gray.700">
            {label}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

interface LegendPanelProps {
  category: Category;
  group: Group;
  isOpen: boolean;
  onToggle: () => void;
}

export const LegendPanel = ({
  category,
  group,
  isOpen,
  onToggle,
}: LegendPanelProps) => {
  const buttonTop = '48px';
  /** Offset responsivo: ~0.75rem em mobile → escala com 10vw → máx 16rem em telas grandes */
  const rightOffset = 'clamp(0.75rem, 5vw, 16rem)';

  const title =
    (MAP_TITLES[category] as Partial<Record<string, string>>)[group] ?? '';
  const description =
    (MAP_DESCRIPTIONS[category] as Partial<Record<string, string>>)[group] ?? '';

  return (
    <Box
      as="aside"
      position="absolute"
      right={rightOffset}
      top="120px"
      overflow="visible"
      zIndex={20}
      data-theme="light"
    >
      {/* Wrapper de clipping — anima a revelação nos dois sentidos */}
      <Box
        overflow="hidden"
        borderRadius="0 20px 0 20px"
        width={isOpen ? '360px' : '0'}
        opacity={isOpen ? 1 : 0}
        aria-hidden={!isOpen}
        style={{ transition: 'width 0.3s ease, opacity 0.3s ease' }}
      >
        <Box
          width="360px"
          bg="white"
          color="gray.900"
          border="1px solid #e3dede"
          borderRadius="0 20px 0 20px"
          boxShadow="lg"
          p={6}
          display="flex"
          flexDirection="column"
          gap={5}
          maxHeight="80vh"
          overflowY="auto"
        >
          <Box>
            <Text
              fontSize="md"
              fontWeight="bold"
              color="blue.800"
              letterSpacing="0.03em"
              textTransform="uppercase"
              lineHeight="tight"
            >
              {title}
            </Text>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="gray.700"
              mt={2}
              lineHeight="short"
            >
              {description}
            </Text>
          </Box>

          <Box color="gray.900">
            <ThresholdLegend />
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
                <Link
                  href="https://repositorio.seade.gov.br/dataset/populacao-residente-municipio-de-sao-paulo-evolucao"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.700"
                  textDecoration="underline"
                >
                  projeções populacionais por sexo e idade do SEADE
                </Link>{' '}
                para o ano de 2025.
              </Box>
              <Box as="li" fontSize="xs" color="gray.600" lineHeight="base">
                Geometria: Distritos Municipais de São Paulo.
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Botão de toggle — centrado no meio do painel */}
      <IconButton
        aria-label={isOpen ? 'Fechar painel' : 'Abrir painel'}
        aria-expanded={isOpen}
        variant="outline"
        size="sm"
        position="absolute"
        top={buttonTop}
        right={isOpen ? '360px' : `calc(-1 * ${rightOffset})`}
        style={{ transition: 'right 0.3s ease' }}
        zIndex={40}
        bg="white"
        color="gray.700"
        borderColor="#e3dede"
        borderRight="none"
        borderRadius="4px 0 0 4px"
        minW="44px"
        minH="44px"
        onClick={onToggle}
        _hover={{ bg: 'blue.50', color: 'blue.800', borderColor: 'blue.800' }}
        _focusVisible={{ outline: '2px solid', outlineColor: 'blue.700', outlineOffset: '1px' }}
      >
        <Icon
          icon={isOpen ? ICONS.caretDoubleRightBold : ICONS.caretDoubleLeftBold}
          aria-hidden="true"
          height="34px"
        />
      </IconButton>
    </Box>
  );
};
