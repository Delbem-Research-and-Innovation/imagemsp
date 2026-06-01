import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';

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
    <Box
      as="section"
      aria-labelledby="audience-heading"
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      bg="surface.action"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={12}>
          <Stack gap={3} maxW="52ch">
            <Text textStyle="eyebrow" color="olive.600">
              Para quem é
            </Text>
            <Text
              as="h2"
              id="audience-heading"
              textStyle="h2"
              color="text.primary"
            >
              Uma plataforma com camadas para públicos diferentes.
            </Text>
          </Stack>

          <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={4}>
            {AUDIENCES.map((card) => {
              return (
                <Box
                  key={card.id}
                  p={6}
                  bg="surface.base"
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="card"
                  boxShadow="card"
                >
                  <Stack gap={2}>
                    <Text textStyle="h4" color="text.primary">
                      {card.title}
                    </Text>
                    <Text textStyle="body-sm" color="text.secondary">
                      {card.description}
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default AudienceSection;
