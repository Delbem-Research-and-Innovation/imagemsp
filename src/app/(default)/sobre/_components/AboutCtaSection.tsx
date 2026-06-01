import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';
import CtaLink from '../../../../components/ui/CtaLink';

/**
 * About page closing — routes users to the correct next step.
 *
 * Rendered on `surface.contrast` (olive.700) to signal the deliberate end of
 * the institutional narrative. Primary CTA is the map; three secondary CTAs
 * serve data/methodology, participation, and contact intents.
 *
 * @example
 * <AboutCtaSection />
 */
const AboutCtaSection = () => {
  return (
    <Box
      as="section"
      aria-labelledby="about-cta-heading"
      py="clamp(5rem, calc(4rem + 4vw), 9rem)"
      bg="surface.contrast"
    >
      <Container>
        <Stack gap={12}>
          <Stack gap={5} maxW={{ base: '100%', lg: '56ch' }}>
            <Text textStyle="eyebrow" color="olive.200">
              Atlas público de inteligência territorial
            </Text>
            <Text
              as="h2"
              id="about-cta-heading"
              textStyle="h2"
              color="text.onContrast"
            >
              Explore o mapa do envelhecimento em São Paulo.
            </Text>
            <Text textStyle="lead" color="text.onFooterMuted" maxW="48ch">
              Dados territoriais organizados para facilitar compreensão,
              pesquisa e políticas públicas sobre o envelhecimento na cidade.
            </Text>
          </Stack>

          <Grid
            templateColumns={{ base: '1fr', sm: 'auto auto auto auto' }}
            gap={3}
            justifyContent={{ base: 'stretch', sm: 'start' }}
          >
            <CtaLink href="/mapas" variant="solid-amber">
              Explorar o mapa
            </CtaLink>

            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={3}
              align={{ base: 'flex-start', sm: 'center' }}
              gridColumn={{ base: '1', sm: '2 / -1' }}
            >
              <CtaLink href="/mapas" variant="outline-dark">
                Ver dados e metodologia
              </CtaLink>
              <CtaLink href="/oportunidades" variant="outline-dark">
                Participar
              </CtaLink>
              <CtaLink href="/contato" variant="outline-dark">
                Entrar em contato
              </CtaLink>
            </Flex>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutCtaSection;
