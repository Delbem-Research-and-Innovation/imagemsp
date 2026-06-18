import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';

import CtaLink from '../../../components/ui/CtaLink';

type MapTileProps = {
  opacity: number;
};

const MapTile = ({ opacity }: MapTileProps) => {
  return (
    <Box
      rounded="sm"
      bg="brand.fg"
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
      bg="surface.raised"
    >
      <Box
        flex={1}
        px={3}
        py={2}
        borderRadius="md"
        border="1px solid"
        borderColor="border.default"
        bg="surface.raised"
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
        borderColor="border.subtle"
        bg="brand.subtle"
      >
        <Text textStyle="body-sm" color="brand.fg" fontWeight="500">
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
        borderColor="brand.fg"
        bg="brand.subtle"
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
         * Choropleth ramp — azure light-to-deep scale matching the tile opacity range above.
         * Values (azure.50 → azure.600 → azure.800) represent the data density gradient;
         * raw hex used because CSS gradient has no token path.
         */}
        <Box
          flex={1}
          h="6px"
          borderRadius="pill"
          backgroundImage="linear-gradient(to right, #C6E2FF, #17629F, #092F52)"
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
      bg="surface.raised"
    >
      <Stack gap={1}>
        <Text textStyle="eyebrow" color="eyebrown.fg">
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
 * Lightweight static mock of the IMAGEM:SP product interface.
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
