import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';
import CtaLink from '../../../../components/ui/CtaLink';
import { OPPORTUNITIES } from '../_data/opportunities';

const AREA_CHIPS = [
  'Pesquisa',
  'Tecnologia pública',
  'Dados e mapas',
  'Envelhecimento e território',
  'Acessibilidade',
] as const;

/**
 * Opportunities page hero — establishes page purpose and current status above the fold.
 *
 * Two-column layout: editorial pitch left, live status panel right.
 * The primary CTA adapts automatically: links to open opportunities when they exist,
 * or to the future-interest form when none are active.
 *
 * @example
 * <OportunidadesHero />
 */
const OportunidadesHero = () => {
  const hasActive = OPPORTUNITIES.some((o) => {
    return (
      o.status === 'open' || o.status === 'upcoming' || o.status === 'rolling'
    );
  });

  return (
    <Box
      as="section"
      aria-labelledby="oportunidades-hero-heading"
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
                Vagas e oportunidades
              </Text>
              <Text
                as="h1"
                id="oportunidades-hero-heading"
                textStyle="h1"
                color="text.primary"
              >
                Junte-se à equipe do IMAGEM:SP.
              </Text>
            </Stack>

            <Text textStyle="lead" color="text.secondary" maxW="46ch">
              Participe de um atlas digital público que conecta envelhecimento,
              território, dados, políticas públicas, acessibilidade e tecnologia
              em São Paulo.
            </Text>

            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={3}
              align={{ base: 'flex-start', sm: 'center' }}
            >
              {hasActive ? (
                <CtaLink href="#oportunidades-atuais">
                  Ver oportunidades abertas
                </CtaLink>
              ) : (
                <CtaLink
                  href={`mailto:contato-imagemsp@usp.br?subject=${encodeURIComponent('[Interesse] IMAGEM:SP')}`}
                >
                  Enviar email de interesse
                </CtaLink>
              )}
              <CtaLink href="/sobre" variant="outline">
                Sobre o projeto
              </CtaLink>
            </Flex>
          </Stack>

          {/* Status panel */}
          <Box
            bg="surface.base"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="card"
            p={{ base: 6, md: 8 }}
            boxShadow="raised"
          >
            <Stack gap={6}>
              <Stack gap={2}>
                <Text textStyle="eyebrow" color="olive.600">
                  Status atual
                </Text>
                <Flex align="center" gap={2}>
                  <Box
                    w="10px"
                    h="10px"
                    borderRadius="full"
                    bg={hasActive ? 'olive.500' : 'ink.600'}
                    flexShrink={0}
                    aria-hidden="true"
                  />
                  <Text
                    textStyle="body"
                    fontWeight="medium"
                    color="text.primary"
                  >
                    {hasActive
                      ? 'Há oportunidades abertas'
                      : 'Nenhuma oportunidade aberta'}
                  </Text>
                </Flex>
              </Stack>

              <Stack gap={2}>
                <Text textStyle="eyebrow" color="text.muted">
                  Áreas do projeto
                </Text>
                <Flex gap={2} flexWrap="wrap">
                  {AREA_CHIPS.map((chip) => {
                    return (
                      <Box
                        key={chip}
                        px={3}
                        py={1}
                        bg="surface.action"
                        borderRadius="pill"
                        border="1px solid"
                        borderColor="border.subtle"
                      >
                        <Text textStyle="caption" color="text.secondary">
                          {chip}
                        </Text>
                      </Box>
                    );
                  })}
                </Flex>
              </Stack>

              <Box pt={4} borderTop="1px solid" borderColor="border.subtle">
                <Text textStyle="caption" color="text.muted">
                  Novas vagas e bolsas são publicadas nesta página quando
                  disponíveis. Para interesse antecipado, envie um email à
                  equipe.
                </Text>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default OportunidadesHero;
