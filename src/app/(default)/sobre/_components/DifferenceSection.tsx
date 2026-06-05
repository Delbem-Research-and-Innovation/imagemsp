import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import SectionLayout from '../../../../components/ui/SectionLayout';

type DifferenceCard = {
  id: string;
  mark: string;
  title: string;
  description: string;
};

const DIFFERENCES: DifferenceCard[] = [
  {
    id: 'decision',
    mark: '01',
    title: 'Decisão antes de dados',
    description:
      'A plataforma parte de perguntas reais sobre território, acesso e cuidado.',
  },
  {
    id: 'layers',
    mark: '02',
    title: 'Camadas para diferentes públicos',
    description:
      'A experiência pública é clara; a camada analítica preserva profundidade técnica.',
  },
  {
    id: 'agefriendly',
    mark: '03',
    title: 'Estrutura age-friendly',
    description:
      'Os temas seguem uma visão ampla do envelhecimento urbano, não apenas saúde.',
  },
  {
    id: 'monitoring',
    mark: '04',
    title: 'Monitoramento contínuo',
    description:
      'O sistema foi pensado para evoluir com novas fontes, atualizações e contribuições.',
  },
];

/**
 * "What makes it different" section — communicates differentiation without hype.
 *
 * Four cards in a responsive 2×2 grid, each with an abstract numeric mark.
 *
 * @example
 * <DifferenceSection />
 */
const DifferenceSection = () => {
  return (
    <SectionLayout
      headingId="difference-heading"
      eyebrow="O que diferencia"
      heading="Mais do que visualização de dados."
    >
      <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={4}>
        {DIFFERENCES.map((card) => {
          return (
            <Box
              key={card.id}
              p={6}
              bg="surface.raised"
              border="1px solid"
              borderColor="border.subtle"
              borderRadius="card"
              shadow="card"
            >
              <Stack gap={4}>
                <Text textStyle="eyebrow" color="text.muted" aria-hidden="true">
                  {card.mark}
                </Text>
                <Stack gap={2}>
                  <Text textStyle="h4" color="text.primary">
                    {card.title}
                  </Text>
                  <Text textStyle="body-sm" color="text.secondary">
                    {card.description}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </SectionLayout>
  );
};

export default DifferenceSection;
