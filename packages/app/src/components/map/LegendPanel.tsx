'use client';

import { Box, IconButton, Link, Text } from '@chakra-ui/react';
import { GeoVisLegend } from '@ttoss/geovis';
import React from 'react';

import { Icon, ICONS } from '@/lib/icons';
import type { Category, Group } from '@/lib/indicators';

const LEGEND_ID = 'pop-legend';

export const MAP_TITLES: Record<Category, Partial<Record<Group, string>>> = {
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

const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

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
