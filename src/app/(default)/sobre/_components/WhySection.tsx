import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';

type PrincipleCard = {
  id: string;
  title: string;
  description: string;
};

const PRINCIPLES: PrincipleCard[] = [
  {
    id: 'territorial',
    title: 'Envelhecimento é territorial',
    description:
      'As condições de cada região influenciam como as pessoas envelhecem.',
  },
  {
    id: 'interpretation',
    title: 'Dados precisam virar interpretação',
    description:
      'A plataforma não deve apenas listar dados, mas ajudar a entender relações.',
  },
  {
    id: 'continuity',
    title: 'Política pública precisa de continuidade',
    description:
      'Monitorar mudanças ao longo do tempo é parte do valor do projeto.',
  },
];

/**
 * "Why the project exists" section — explains the problem without alarmism.
 *
 * Two-column editorial block: short narrative on the left, three principle
 * cards on the right. Keeps emotional register sober.
 *
 * @example
 * <WhySection />
 */
const WhySection = () => {
  return (
    <Box
      as="section"
      aria-labelledby="why-heading"
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
                Por que existe
              </Text>
              <Text
                as="h2"
                id="why-heading"
                textStyle="h2"
                color="text.primary"
              >
                São Paulo está envelhecendo em territórios muito diferentes
                entre si.
              </Text>
            </Stack>

            <Text textStyle="body" color="text.secondary" maxW="48ch">
              A idade da população não é o único dado que importa. O
              envelhecimento também depende de acesso a serviços, mobilidade,
              moradia, saúde, segurança, espaços públicos, apoio social e
              informação. O IMAGEM:SP existe para tornar essas relações
              visíveis.
            </Text>
          </Stack>

          {/* Principle cards */}
          <Stack gap={3}>
            {PRINCIPLES.map((card) => {
              return (
                <Box
                  key={card.id}
                  p={5}
                  bg="surface.base"
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="card"
                  boxShadow="card"
                >
                  <Stack gap={1}>
                    <Text
                      textStyle="body"
                      color="text.primary"
                      fontWeight="600"
                    >
                      {card.title}
                    </Text>
                    <Text textStyle="body-sm" color="text.secondary">
                      {card.description}
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhySection;
