import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { DecorativeHeroMap } from '../../../components/decorative-hero-map/DecorativeHeroMap';
import Container from '../../../components/ui/Container';
import CtaLink from '../../../components/ui/CtaLink';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Sandbox: DecorativeHeroMap preview.
 * Simulates a two-column hero to test map rendering, animation, and sizing.
 * Route: /hero-map
 */
export default function HeroMapSandboxPage() {
  return (
    <Box
      as="main"
      minH="100dvh"
      bg="background.page"
      pt="clamp(4rem, calc(3rem + 4vw), 8rem)"
      pb="clamp(4rem, calc(3rem + 3vw), 7rem)"
    >
      <Container>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'flex-start', lg: 'center' }}
          gap={{ base: 12, lg: 16 }}
        >
          {/* Text column */}
          <Stack gap={8} flex={{ base: '1 1 auto', lg: '0 0 52%' }}>
            <Stack gap={3}>
              <Text
                textStyle="eyebrow"
                color="text.muted"
                letterSpacing="0.08em"
              >
                Sandbox — DecorativeHeroMap
              </Text>
              <Text
                as="h1"
                id="hero-heading"
                textStyle="h1"
                color="text.primary"
              >
                Entenda o envelhecimento pelo território de São Paulo
              </Text>
            </Stack>

            <Text textStyle="lead" color="text.secondary" maxW="44ch">
              Plataforma pública com dados sobre população idosa, serviços,
              mobilidade, saúde e condições urbanas por distrito.
            </Text>

            <Flex gap={4} wrap="wrap">
              <CtaLink href="/mapas" variant="solid">
                Explorar o mapa
              </CtaLink>
            </Flex>
          </Stack>

          {/* Map column — height drives the size; width follows the 4:3 viewBox */}
          <Box
            flex={{ base: '1 1 auto', lg: '0 0 auto' }}
            h={{ base: '50vw', sm: '60vw', lg: '72vh' }}
            maxH={{ base: '420px', lg: '680px' }}
            alignSelf="center"
            display="flex"
            alignItems="center"
          >
            <DecorativeHeroMap style={{ height: '100%', width: 'auto' }} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
