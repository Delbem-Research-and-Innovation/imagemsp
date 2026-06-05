import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';

import SectionLayout from '../../../../components/ui/SectionLayout';

type ComparisonRow = {
  id: string;
  negation: string;
  affirmation: string;
};

const COMPARISONS: ComparisonRow[] = [
  {
    id: 'map',
    negation: 'Não é apenas um mapa.',
    affirmation: 'É uma infraestrutura de leitura territorial.',
  },
  {
    id: 'repository',
    negation: 'Não é apenas um repositório de dados.',
    affirmation:
      'É uma forma de relacionar população, serviços e condições urbanas.',
  },
  {
    id: 'tool',
    negation: 'Não é apenas uma ferramenta técnica.',
    affirmation:
      'É uma plataforma pública com camadas para diferentes usuários.',
  },
];

/**
 * "What IMAGEM:SP is" section — defines the product clearly with a
 * not-this / this comparison to counter the most common misconceptions.
 *
 * @example
 * <WhatIsSection />
 */
const WhatIsSection = () => {
  return (
    <SectionLayout
      headingId="what-is-heading"
      eyebrow="O que é"
      heading="Uma plataforma pública, georreferenciada e interativa."
      body="O IMAGEM:SP combina dados sobre população, saúde, mobilidade, moradia, espaços públicos, segurança, apoio social e inclusão digital para apoiar decisões mais informadas."
      bodyMaxW="52ch"
    >
      <Stack gap={3}>
        {/* Column headers — two-column layout only */}
        <Grid
          display={{ base: 'none', md: 'grid' }}
          templateColumns="1fr 1fr"
          gap={4}
        >
          <Text textStyle="eyebrow" color="text.muted" ps={6}>
            Não é
          </Text>
          <Text textStyle="eyebrow" color="brand.fg" ps={6}>
            É
          </Text>
        </Grid>

        {COMPARISONS.map((row) => {
          return (
            <Grid
              key={row.id}
              templateColumns={{ base: '1fr', md: '1fr 1fr' }}
              gap={{ base: 2, md: 4 }}
            >
              {/*
               * Negation — dashed border signals an excluded or
               * deprecated concept; no background avoids the
               * surface.muted contrast trap.
               */}
              <Flex
                align="flex-start"
                gap={3}
                px={6}
                py={5}
                border="1px dashed"
                borderColor="border.subtle"
                borderRadius="card"
              >
                <Text
                  color="text.muted"
                  lineHeight="1.6"
                  flexShrink={0}
                  aria-hidden="true"
                  userSelect="none"
                >
                  ✕
                </Text>
                <Text textStyle="body-sm" color="text.secondary">
                  {row.negation}
                </Text>
              </Flex>

              {/* Affirmation — solid white card with brand azure left accent */}
              <Box
                px={6}
                py={5}
                bg="surface.raised"
                border="1px solid"
                borderColor="border.subtle"
                borderLeftWidth="3px"
                borderLeftColor="brand.fg"
                borderRadius="card"
                shadow="card"
              >
                <Text textStyle="body" color="text.primary" fontWeight="600">
                  {row.affirmation}
                </Text>
              </Box>
            </Grid>
          );
        })}
      </Stack>
    </SectionLayout>
  );
};

export default WhatIsSection;
