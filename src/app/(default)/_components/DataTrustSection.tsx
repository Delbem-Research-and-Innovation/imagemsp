import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../components/ui/Container';
import CtaLink from '../../../components/ui/CtaLink';
import Section from '../../../components/ui/Section';

const TRUST_POINTS = [
  {
    id: 'sources',
    label: 'Fontes públicas e institucionais.',
    detail: 'Dados de SEADE, IBGE, prefeitura e outras fontes governamentais.',
  },
  {
    id: 'documented',
    label: 'Indicadores documentados.',
    detail:
      'Cada indicador tem definição, fórmula e contexto de interpretação.',
  },
  {
    id: 'updates',
    label: 'Atualizações identificáveis.',
    detail: 'Ano e versão explícitos em cada indicador.',
  },
  {
    id: 'methodology',
    label: 'Metodologia acessível.',
    detail: 'Documentação aberta sobre escolhas, recortes e limitações.',
  },
  {
    id: 'limitations',
    label: 'Limitações explicitadas.',
    detail: 'O que os dados não cobrem é tão importante quanto o que cobrem.',
  },
];

/**
 * "Data and trust" section — establishes credibility without becoming a
 * methodology page. Five trust pillars plus a CTA to full documentation.
 *
 * @example
 * <DataTrustSection />
 */
const DataTrustSection = () => {
  return (
    <Section labelledBy="data-heading">
      <Container>
        <Grid
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={{ base: 12, lg: 20 }}
          alignItems="start"
        >
          {/* Left: heading + description */}
          <Stack gap={6}>
            <Stack gap={3}>
              <Text textStyle="eyebrow" color="brand.fg">
                Dados com responsabilidade
              </Text>
              <Text
                as="h2"
                id="data-heading"
                textStyle="h2"
                color="text.primary"
              >
                Fontes claras, limitações declaradas.
              </Text>
            </Stack>

            <Text textStyle="body" color="text.secondary" maxW="48ch">
              Cada indicador deve informar fonte, ano, unidade territorial e
              limitações de interpretação. Transparência é parte do produto, não
              um adendo.
            </Text>

            <CtaLink href="/mapas">Ver dados e metodologia</CtaLink>
          </Stack>

          {/* Right: trust pillars */}
          <Stack gap={3}>
            {TRUST_POINTS.map((point) => {
              return (
                <Box
                  key={point.id}
                  p={5}
                  borderRadius="card"
                  border="1px solid"
                  borderColor="border.subtle"
                  bg="surface.raised"
                >
                  <Stack gap={1}>
                    <Text
                      textStyle="body"
                      color="text.primary"
                      fontWeight="600"
                    >
                      {point.label}
                    </Text>
                    <Text textStyle="body-sm" color="text.secondary">
                      {point.detail}
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Grid>
      </Container>
    </Section>
  );
};

export default DataTrustSection;
