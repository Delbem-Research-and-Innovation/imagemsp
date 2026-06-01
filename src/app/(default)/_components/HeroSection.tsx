import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import { DecorativeHeroMap } from '../../../components/decorative-hero-map/DecorativeHeroMap';
import Container from '../../../components/ui/Container';
import CtaLink from '../../../components/ui/CtaLink';

/**
 * Homepage hero — Act 1: Revelation.
 *
 * Establishes product identity and routes users to the map.
 * Headline leads with the territorial insight ("Entenda o envelhecimento…");
 * IMAGEMSP acts as the institutional eyebrow above it.
 *
 * Desktop: two-column layout (text + map preview).
 * Mobile: stacked, text first, preview below.
 * Primary CTA is always visible above the fold.
 *
 * @example
 * <HeroSection />
 */
const HeroSection = () => {
  return (
    <Box
      as="section"
      aria-labelledby="hero-heading"
      mt="-4.5rem"
      pt="clamp(5rem, calc(4rem + 3vw), 7.5rem)"
      pb="clamp(2.5rem, calc(2rem + 2vw), 5rem)"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      borderBottom="1px solid"
      borderColor="border.subtle"
      overflow="hidden"
    >
      <Container>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'flex-start', lg: 'center' }}
          gap={{ base: 12, lg: 16 }}
        >
          {/* Text column */}
          <Stack gap={8} flex={{ base: '1 1 auto', lg: '0 0 50%' }}>
            <Stack gap={3}>
              <Text textStyle="eyebrow" color="olive.600">
                IMAGEM:SP — Atlas do Envelhecimento de São Paulo
              </Text>

              <Text
                as="h1"
                id="hero-heading"
                textStyle="h1"
                color="text.primary"
              >
                Envelhecimento em São Paulo pelo território.
              </Text>
            </Stack>

            <Text textStyle="lead" color="text.secondary" maxW="44ch">
              O IMAGEM:SP conecta dados públicos, indicadores urbanos e leitura
              territorial para apoiar pesquisa, planejamento e políticas
              públicas sobre envelhecimento.
            </Text>

            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={3}
              align={{ base: 'flex-start', sm: 'center' }}
            >
              <CtaLink href="/mapas">Explorar o mapa</CtaLink>
              <CtaLink href="/sobre" variant="outline">
                Conhecer o projeto
              </CtaLink>
            </Flex>
          </Stack>

          {/* Map column — portrait SVG (540×720), height-driven.
              Desktop: alignSelf=stretch gives the Box the flex-row height (text column height),
              SVG fills it with height:100%; width:auto.
              Mobile: explicit clamp height; same SVG sizing. */}
          <Box
            flex={{ base: '0 0 auto', lg: '1 1 0' }}
            alignSelf={{ base: 'center', lg: 'stretch' }}
            h={{ base: 'clamp(320px, 80vw, 75vh)', lg: undefined }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            minW={0}
          >
            <DecorativeHeroMap
              style={{ display: 'block', height: '100%', width: 'auto' }}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HeroSection;
