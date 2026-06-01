import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';

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
    <Box
      as="section"
      aria-labelledby="what-is-heading"
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      bg="surface.trust"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={12}>
          <Stack gap={3} maxW="52ch">
            <Text textStyle="eyebrow" color="olive.600">
              O que é
            </Text>
            <Text
              as="h2"
              id="what-is-heading"
              textStyle="h2"
              color="text.primary"
            >
              Uma plataforma pública, georreferenciada e interativa.
            </Text>
            <Text textStyle="body" color="text.secondary" maxW="52ch">
              O IMAGEM:SP combina dados sobre população, saúde, mobilidade,
              moradia, espaços públicos, segurança, apoio social e inclusão
              digital para apoiar decisões mais informadas.
            </Text>
          </Stack>

          <Stack gap={4}>
            {COMPARISONS.map((row) => {
              return (
                <Grid
                  key={row.id}
                  templateColumns={{ base: '1fr', sm: '1fr 1fr' }}
                  gap={0}
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="card"
                  overflow="hidden"
                >
                  <Box
                    p={5}
                    bg="surface.muted"
                    borderRight={{ base: 'none', sm: '1px solid' }}
                    borderBottom={{ base: '1px solid', sm: 'none' }}
                    borderColor="border.subtle"
                  >
                    <Text textStyle="body-sm" color="text.muted">
                      {row.negation}
                    </Text>
                  </Box>
                  <Box p={5} bg="surface.base">
                    <Text
                      textStyle="body-sm"
                      color="text.primary"
                      fontWeight="600"
                    >
                      {row.affirmation}
                    </Text>
                  </Box>
                </Grid>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default WhatIsSection;
