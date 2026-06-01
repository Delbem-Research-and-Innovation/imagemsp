import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';

import CtaLink from '../../../components/ui/CtaLink';

type MapTileProps = {
  opacity: number;
};

const MapTile = ({ opacity }: MapTileProps) => {
  return (
    <Box
      rounded="sm"
      bg="olive.600"
      opacity={opacity}
      h={{ base: '28px', md: '32px' }}
    />
  );
};

/** Abstract choropleth-like grid of tiles to suggest territory data. */
const AbstractMapGrid = () => {
  const tiles = [
    0.15, 0.45, 0.7, 0.3, 0.55, 0.85, 0.25, 0.6, 0.4, 0.9, 0.2, 0.5, 0.35, 0.75,
    0.5, 0.65, 0.1, 0.8, 0.45, 0.3, 0.6, 0.95, 0.35, 0.5,
  ];

  return (
    <Grid templateColumns="repeat(6, 1fr)" gap={1.5} p={4}>
      {tiles.map((opacity, i) => {
        return <MapTile key={i} opacity={opacity} />;
      })}
    </Grid>
  );
};

/** Static search/filter bar at the top of the preview card. */
const PreviewSearchBar = () => {
  return (
    <Flex
      align="center"
      gap={3}
      px={4}
      py="12px"
      borderBottom="1px solid"
      borderColor="border.subtle"
      bg="surface.base"
    >
      <Box
        flex={1}
        px={3}
        py={2}
        borderRadius="md"
        border="1px solid"
        borderColor="border.default"
        bg="surface.base"
      >
        <Text textStyle="body-sm" color="text.muted">
          Busca: Sé
        </Text>
      </Box>
      <Box
        px={3}
        py={2}
        borderRadius="md"
        border="1px solid"
        borderColor="olive.200"
        bg="olive.50"
      >
        <Text textStyle="body-sm" color="olive.700" fontWeight="500">
          Tema: População 65+
        </Text>
      </Box>
    </Flex>
  );
};

/** Abstract map canvas with choropleth grid, highlighted district, and legend. */
const PreviewMapArea = () => {
  return (
    <Box
      flex="1"
      bg="surface.map"
      position="relative"
      borderRight={{ base: 'none', sm: '1px solid' }}
      borderBottom={{ base: '1px solid', sm: 'none' }}
      borderColor="border.subtle"
    >
      <AbstractMapGrid />

      {/* Selected district highlight */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="44px"
        h="44px"
        borderRadius="sm"
        border="2px solid"
        borderColor="amber.600"
        bg="amber.200"
        opacity={0.8}
      />

      {/* Scale legend */}
      <Flex
        position="absolute"
        bottom={3}
        left={4}
        right={4}
        align="center"
        gap={2}
      >
        <Text textStyle="caption" color="text.muted" flexShrink={0}>
          0%
        </Text>
        {/*
         * Custom choropleth ramp — warm olive light-to-deep scale for the legend strip.
         * Values (#DDE5D5, #5F6B4A, #2D3921) are perceptually tuned for this scale and
         * do not match any palette token exactly; no token path applies.
         */}
        <Box
          flex={1}
          h="6px"
          borderRadius="pill"
          backgroundImage="linear-gradient(to right, #DDE5D5, #5F6B4A, #2D3921)"
        />
        <Text textStyle="caption" color="text.muted" flexShrink={0}>
          25%+
        </Text>
      </Flex>
    </Box>
  );
};

/** Right-hand indicator panel with territory name, description, and metadata. */
const PreviewIndicatorPanel = () => {
  return (
    <Stack
      gap={4}
      p={4}
      w={{ base: '100%', sm: '220px' }}
      flexShrink={0}
      bg="surface.base"
    >
      <Stack gap={1}>
        <Text textStyle="eyebrow" color="olive.600">
          Território selecionado
        </Text>
        <Text textStyle="h4" color="text.primary" fontWeight="700">
          Sé · População 65+
        </Text>
      </Stack>

      <Text textStyle="body-sm" color="text.secondary">
        Proporção estimada de pessoas com 65 anos ou mais no território
        selecionado.
      </Text>

      <Stack gap={1.5} pt={3} borderTop="1px solid" borderColor="border.subtle">
        <Flex gap={2}>
          <Text textStyle="caption" color="text.muted" w="80px" flexShrink={0}>
            Fonte
          </Text>
          <Text textStyle="caption" color="text.secondary" fontWeight="500">
            SEADE
          </Text>
        </Flex>
        <Flex gap={2}>
          <Text textStyle="caption" color="text.muted" w="80px" flexShrink={0}>
            Unidade
          </Text>
          <Text textStyle="caption" color="text.secondary" fontWeight="500">
            Distrito
          </Text>
        </Flex>
        <Flex gap={2}>
          <Text textStyle="caption" color="text.muted" w="80px" flexShrink={0}>
            Atualização
          </Text>
          <Text textStyle="caption" color="text.secondary" fontWeight="500">
            Verificar fonte
          </Text>
        </Flex>
      </Stack>

      <CtaLink href="/mapas">Abrir no mapa</CtaLink>
    </Stack>
  );
};

/**
 * Lightweight static mock of the IMAGEMSP product interface.
 *
 * Demonstrates the map + territory selection + indicator panel without loading
 * a GIS engine. Contains source metadata exactly as the real product would show.
 * Includes a CTA to the real map.
 *
 * @example
 * <MapPreviewCard />
 */
const MapPreviewCard = () => {
  return (
    <Box
      borderRadius="card"
      border="1px solid"
      borderColor="border.default"
      bg="surface.map"
      overflow="hidden"
      shadow="raised"
      w="100%"
    >
      <PreviewSearchBar />
      <Flex direction={{ base: 'column', sm: 'row' }} minH="240px">
        <PreviewMapArea />
        <PreviewIndicatorPanel />
      </Flex>
    </Box>
  );
};

export default MapPreviewCard;
