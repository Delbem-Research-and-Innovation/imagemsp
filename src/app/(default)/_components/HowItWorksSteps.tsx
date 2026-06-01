import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import Container from '../../../components/ui/Container';

type Step = {
  number: number;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Busque um território',
    description: 'Digite bairro, distrito ou região.',
  },
  {
    number: 2,
    title: 'Escolha uma dimensão',
    description:
      'População, saúde, mobilidade, moradia, segurança ou apoio social.',
  },
  {
    number: 3,
    title: 'Leia a interpretação',
    description:
      'Veja indicadores, relações territoriais, fontes e limitações.',
  },
  {
    number: 4,
    title: 'Compare regiões',
    description:
      'Entenda diferenças sem precisar decodificar camadas técnicas.',
  },
];

/**
 * Step card used in the "How it works" sequence.
 *
 * @param step - Step data.
 * @param isLast - Whether this is the last step; hides the connector line.
 */
const StepCard = ({ step, isLast }: { step: Step; isLast: boolean }) => {
  return (
    <Flex
      direction="column"
      flex={1}
      position="relative"
      gap={4}
      _after={
        !isLast
          ? {
              content: '""',
              display: { base: 'none', md: 'block' },
              position: 'absolute',
              top: '20px',
              left: 'calc(100% + 1px)',
              w: '100%',
              h: '1px',
              bg: 'border.subtle',
              zIndex: 0,
            }
          : {}
      }
    >
      {/* Step number circle */}
      <Box
        w="40px"
        h="40px"
        borderRadius="full"
        bg="olive.700"
        color="paper.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        fontWeight="700"
        fontSize="0.9375rem"
        letterSpacing="-0.02em"
        zIndex={1}
        position="relative"
      >
        {step.number}
      </Box>

      <Stack gap={2}>
        <Text as="h3" textStyle="h4" color="text.primary" fontWeight="600">
          {step.title}
        </Text>
        <Text textStyle="body-sm" color="text.secondary">
          {step.description}
        </Text>
      </Stack>
    </Flex>
  );
};

/**
 * "How it works" — four-step sequence reducing anxiety before entering the map.
 *
 * Desktop: horizontal staggered sequence with connecting line.
 * Mobile: vertical sequence.
 *
 * @example
 * <HowItWorksSteps />
 */
const HowItWorksSteps = () => {
  return (
    <Box
      as="section"
      aria-labelledby="how-heading"
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      bg="background.soft"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={12}>
          <Stack gap={3} maxW="52ch">
            <Text textStyle="eyebrow" color="olive.600">
              Como funciona
            </Text>
            <Text as="h2" id="how-heading" textStyle="h2" color="text.primary">
              Do território à interpretação.
            </Text>
          </Stack>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: 8, md: 0 }}
            align="flex-start"
            position="relative"
          >
            {STEPS.map((step, i) => {
              return (
                <Box
                  key={step.number}
                  flex={1}
                  px={{ base: 0, md: i === 0 ? 0 : 8 }}
                  pr={{ base: 0, md: i === STEPS.length - 1 ? 0 : 8 }}
                >
                  <StepCard step={step} isLast={i === STEPS.length - 1} />
                </Box>
              );
            })}
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default HowItWorksSteps;
