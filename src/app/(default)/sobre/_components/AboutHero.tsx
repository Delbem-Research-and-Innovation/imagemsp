import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';
import CtaLink from '../../../../components/ui/CtaLink';

const METADATA = [
  { label: 'Cidade', value: 'São Paulo' },
  { label: 'Tema', value: 'Envelhecimento e território' },
  { label: 'Uso', value: 'Pesquisa, planejamento e compreensão pública' },
  { label: 'Acesso', value: 'Plataforma web pública' },
] as const;

/**
 * About page hero — establishes project identity and institutional purpose.
 *
 * Two-column layout: editorial text on the left, restrained metadata panel on
 * the right. No live map; no dense institutional text above the fold.
 *
 * @example
 * <AboutHero />
 */
const AboutHero = () => {
  return (
    <Box
      as="section"
      aria-labelledby="about-hero-heading"
      mt="-4.5rem"
      pt="clamp(7rem, calc(5rem + 4vw), 10rem)"
      pb="clamp(4rem, calc(3rem + 3vw), 7rem)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={{ base: 14, lg: 20 }}
          alignItems="center"
        >
          {/* Editorial text */}
          <Stack gap={8}>
            <Stack gap={3}>
              <Text textStyle="eyebrow" color="olive.600">
                Sobre o projeto
              </Text>
              <Text
                as="h1"
                id="about-hero-heading"
                textStyle="h1"
                color="text.primary"
              >
                Um atlas digital do envelhecimento de São Paulo.
              </Text>
            </Stack>

            <Text textStyle="lead" color="text.secondary" maxW="46ch">
              O IMAGEM:SP integra dados públicos e indicadores territoriais para
              apoiar pesquisa, planejamento, políticas públicas e compreensão
              social sobre o envelhecimento na cidade.
            </Text>

            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={3}
              align={{ base: 'flex-start', sm: 'center' }}
            >
              <CtaLink href="/mapas">Explorar o mapa</CtaLink>
              <CtaLink href="/mapas" variant="outline">
                Ver dados e metodologia
              </CtaLink>
            </Flex>
          </Stack>

          {/* Metadata panel */}
          <Box
            bg="surface.base"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="card"
            p={{ base: 6, md: 8 }}
            boxShadow="raised"
          >
            <Stack gap={1} mb={6}>
              <Text textStyle="eyebrow" color="olive.600">
                IMAGEM:SP
              </Text>
              <Text textStyle="h4" color="text.primary">
                Mapa Inteligente do Envelhecimento de São Paulo
              </Text>
            </Stack>

            <Stack gap={0} divideY="1px" divideColor="border.subtle">
              {METADATA.map(({ label, value }) => {
                return (
                  <Flex key={label} py={4} gap={4} align="baseline">
                    <Text
                      textStyle="metadata"
                      color="text.muted"
                      minW="8ch"
                      flex="0 0 auto"
                    >
                      {label}
                    </Text>
                    <Text textStyle="body-sm" color="text.primary">
                      {value}
                    </Text>
                  </Flex>
                );
              })}
            </Stack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutHero;
