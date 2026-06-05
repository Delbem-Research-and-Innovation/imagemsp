import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import SectionLayout from '../../../../components/ui/SectionLayout';

type AudienceCard = {
  id: string;
  title: string;
  description: string;
};

const AUDIENCES: AudienceCard[] = [
  {
    id: 'residents',
    title: 'Pessoas idosas e familiares',
    description:
      'Para entender melhor o território onde vivem e os serviços ao redor.',
  },
  {
    id: 'managers',
    title: 'Gestores públicos',
    description:
      'Para comparar regiões, identificar lacunas e acompanhar prioridades.',
  },
  {
    id: 'researchers',
    title: 'Pesquisadores',
    description:
      'Para explorar indicadores, hipóteses, fontes e comparações territoriais.',
  },
  {
    id: 'organizations',
    title: 'Organizações sociais e parceiros',
    description:
      'Para orientar ações, validar informações e colaborar com conhecimento local.',
  },
];

/**
 * "Who it serves" section — multi-audience value without fragmenting the page.
 *
 * Four restrained cards in a 2×2 grid. No persona illustrations. Does not
 * infantilize older adults or make technical audiences dominate the hierarchy.
 *
 * @example
 * <AudienceSection />
 */
const AudienceSection = () => {
  return (
    <SectionLayout
      headingId="audience-heading"
      eyebrow="Para quem é"
      heading="Uma plataforma com camadas para públicos diferentes."
      bg="background.inverse"
      variant="inverse"
    >
      <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={4}>
        {AUDIENCES.map((card) => {
          return (
            <Box
              key={card.id}
              p={6}
              bg="surface.inverseCard"
              border="1px solid"
              borderColor="border.inverseSubtle"
              borderRadius="card"
            >
              <Stack gap={2}>
                <Text textStyle="h4" color="text.onDark">
                  {card.title}
                </Text>
                <Text textStyle="body-sm" color="text.onDarkBody">
                  {card.description}
                </Text>
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </SectionLayout>
  );
};

export default AudienceSection;
