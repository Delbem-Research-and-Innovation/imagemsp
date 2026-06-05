import { Flex, Stack, Text } from '@chakra-ui/react';

import SectionLayout from '../../../../components/ui/SectionLayout';

type Principle = {
  id: string;
  number: string;
  title: string;
  description: string;
};

const PRINCIPLES: Principle[] = [
  {
    id: 'clarity',
    number: '01',
    title: 'Clareza pública',
    description: 'Informação compreensível antes da complexidade técnica.',
  },
  {
    id: 'accessibility',
    number: '02',
    title: 'Acessibilidade',
    description:
      'A interface deve poder ser usada por pessoas com diferentes níveis de visão, destreza, cognição e confiança digital.',
  },
  {
    id: 'transparency',
    number: '03',
    title: 'Transparência',
    description:
      'Indicadores devem mostrar fonte, ano, unidade territorial e limitações.',
  },
  {
    id: 'responsibility',
    number: '04',
    title: 'Responsabilidade territorial',
    description:
      'Comparações devem considerar escala, contexto e desigualdades entre regiões.',
  },
  {
    id: 'evolution',
    number: '05',
    title: 'Evolução contínua',
    description:
      'O sistema deve permitir atualização de dados, melhoria de indicadores e contribuição estruturada.',
  },
];

/**
 * "Guiding principles" section — defines how the project should be trusted.
 *
 * Stacked editorial panels, numbered. Principles are operational, not
 * decorative — no vague claims.
 *
 * @example
 * <PrinciplesSection />
 */
const PrinciplesSection = () => {
  return (
    <SectionLayout
      headingId="principles-heading"
      eyebrow="Princípios"
      heading="Como o projeto deve ser entendido e confiado."
    >
      <Stack gap={3}>
        {PRINCIPLES.map((principle) => {
          return (
            <Flex
              key={principle.id}
              gap={6}
              p={5}
              bg="surface.raised"
              border="1px solid"
              borderColor="border.subtle"
              borderRadius="card"
              shadow="card"
              align="baseline"
            >
              <Text
                textStyle="eyebrow"
                color="text.muted"
                flex="0 0 auto"
                aria-hidden="true"
              >
                {principle.number}
              </Text>
              <Stack gap={1}>
                <Text textStyle="body" color="text.primary" fontWeight="600">
                  {principle.title}
                </Text>
                <Text textStyle="body-sm" color="text.secondary">
                  {principle.description}
                </Text>
              </Stack>
            </Flex>
          );
        })}
      </Stack>
    </SectionLayout>
  );
};

export default PrinciplesSection;
