import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';

const FACTS = [
  {
    id: 'institution',
    label: 'Instituição sede',
    value: 'Faculdade de Medicina da Universidade de São Paulo',
  },
  {
    id: 'project',
    label: 'Projeto',
    value: 'Mapa Interativo do Envelhecimento para a Cidade de São Paulo',
  },
  {
    id: 'reference',
    label: 'Referência internacional',
    value: 'IMAGE:NYC',
  },
  {
    id: 'access',
    label: 'Acesso',
    value: 'Plataforma web pública',
  },
] as const;

/**
 * "Project origin and institutional context" section — establishes legitimacy.
 *
 * Two-column layout: narrative on the left, compact institutional facts on the
 * right. Factual; no budget details; no long team bios.
 *
 * @example
 * <OriginSection />
 */
const OriginSection = () => {
  return (
    <Box
      as="section"
      aria-labelledby="origin-heading"
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={{ base: 12, lg: 20 }}
          alignItems="start"
        >
          {/* Narrative */}
          <Stack gap={6}>
            <Stack gap={3}>
              <Text textStyle="eyebrow" color="olive.600">
                Origem e contexto
              </Text>
              <Text
                as="h2"
                id="origin-heading"
                textStyle="h2"
                color="text.primary"
              >
                Pesquisa pública, referência internacional.
              </Text>
            </Stack>

            <Text textStyle="body" color="text.secondary" maxW="48ch">
              O IMAGEM:SP nasce no contexto do projeto Desenvolvimento de Mapa
              Interativo do Envelhecimento para a Cidade de São Paulo, vinculado
              à Universidade de São Paulo e inspirado por experiências
              internacionais de mapeamento urbano do envelhecimento.
            </Text>

            <Text textStyle="body" color="text.secondary" maxW="48ch">
              A proposta reúne pesquisadores e especialistas de áreas como
              geriatria, gerontologia, saúde pública, computação, geografia,
              planejamento urbano e políticas públicas.
            </Text>
          </Stack>

          {/* Institutional facts */}
          <Box
            bg="surface.trust"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="card"
            p={{ base: 6, md: 8 }}
          >
            <Stack gap={0} divideY="1px" divideColor="border.subtle">
              {FACTS.map(({ id, label, value }) => {
                return (
                  <Stack key={id} gap={1} py={4}>
                    <Text textStyle="metadata" color="text.muted">
                      {label}
                    </Text>
                    <Text textStyle="body-sm" color="text.primary">
                      {value}
                    </Text>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default OriginSection;
