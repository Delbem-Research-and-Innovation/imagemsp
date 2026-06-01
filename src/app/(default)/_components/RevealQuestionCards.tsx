import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../components/ui/Container';

type QuestionCard = {
  question: string;
  description: string;
  /** Decorative grid pattern color intensity (1–5). */
  accent: number;
};

const CARDS: QuestionCard[] = [
  {
    question: 'Onde vivem mais pessoas idosas?',
    description:
      'Veja a distribuição da população idosa por território e faixa etária.',
    accent: 1,
  },
  {
    question: 'Onde serviços e infraestrutura não acompanham a demanda?',
    description:
      'Compare população, cuidado, mobilidade e infraestrutura urbana.',
    accent: 2,
  },
  {
    question: 'Como mobilidade, moradia e saúde se cruzam no território?',
    description:
      'Entenda relações entre saúde, moradia, transporte, segurança e participação social.',
    accent: 3,
  },
  {
    question:
      'Quais regiões precisam de mais atenção, evidência e acompanhamento?',
    description:
      'Use evidências territoriais para orientar planejamento, monitoramento e pesquisa.',
    accent: 4,
  },
];

/** Miniature cartographic micro-visual differentiating each card. */
const CartographicMicro = ({ accent }: { accent: number }) => {
  const cols = accent + 2;
  const opacities = Array.from({ length: cols * 3 }, (_, i) => {
    return Math.round((((i * accent + 17) % 100) / 100) * 85 + 15) / 100;
  });

  return (
    <Grid
      templateColumns={`repeat(${cols}, 1fr)`}
      gap={1}
      w="48px"
      h="36px"
      overflow="hidden"
      borderRadius="sm"
      flexShrink={0}
      aria-hidden="true"
    >
      {opacities.map((op, i) => {
        return <Box key={i} bg="olive.600" opacity={op} borderRadius="2px" />;
      })}
    </Grid>
  );
};

/**
 * "What IMAGEM:SP reveals" — four question cards that turn product value into
 * concrete territorial questions.
 *
 * Informational only; each card does not require live data.
 *
 * @example
 * <RevealQuestionCards />
 */
const RevealQuestionCards = () => {
  return (
    <Box
      as="section"
      aria-labelledby="reveal-heading"
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      bg="background.soft"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={10}>
          <Stack gap={3} maxW="52ch">
            <Text textStyle="eyebrow" color="olive.600">
              O que o IMAGEM:SP revela
            </Text>
            <Text
              as="h2"
              id="reveal-heading"
              textStyle="h2"
              color="text.primary"
            >
              Perguntas territoriais, respostas em dados.
            </Text>
          </Stack>

          <Grid
            templateColumns={{
              base: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={4}
          >
            {CARDS.map((card) => {
              return (
                <Stack
                  key={card.question}
                  gap={4}
                  p={6}
                  borderRadius="card"
                  border="1px solid"
                  borderColor="border.default"
                  bg="surface.base"
                  shadow="raised"
                  justify="space-between"
                >
                  <Stack gap={3}>
                    <Text
                      as="h3"
                      textStyle="h4"
                      color="text.primary"
                      fontWeight="600"
                    >
                      {card.question}
                    </Text>
                    <Text textStyle="body-sm" color="text.secondary">
                      {card.description}
                    </Text>
                  </Stack>
                  <CartographicMicro accent={card.accent} />
                </Stack>
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default RevealQuestionCards;
