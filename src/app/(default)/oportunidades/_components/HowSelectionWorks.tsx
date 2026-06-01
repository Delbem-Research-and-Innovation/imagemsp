import { Box, Grid, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';

type Step = {
  id: string;
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    id: 'published',
    number: '01',
    title: 'Oportunidade publicada',
    description:
      'Cada vaga inclui título, área, elegibilidade, atividades, prazo, documentos necessários e canal de inscrição.',
  },
  {
    id: 'application',
    number: '02',
    title: 'Candidato envia inscrição',
    description:
      'As inscrições seguem o canal indicado no edital de cada oportunidade.',
  },
  {
    id: 'review',
    number: '03',
    title: 'Equipe avalia elegibilidade e perfil',
    description:
      'A seleção considera os requisitos listados para a oportunidade específica publicada.',
  },
  {
    id: 'shortlist',
    number: '04',
    title: 'Candidatos pré-selecionados são contatados',
    description:
      'A equipe pode solicitar entrevista, portfólio, amostra de escrita, material técnico ou documentação adicional.',
  },
  {
    id: 'result',
    number: '05',
    title: 'Resultado e próximos passos',
    description:
      'Candidatos selecionados recebem instruções sobre formalização, data de início e requisitos institucionais.',
  },
];

/**
 * "How selection works" section — explains the process in generic, fair terms.
 *
 * Generic enough to apply to both scholarships and positions.
 * The official opportunity notice always prevails over this description.
 *
 * @example
 * <HowSelectionWorks />
 */
const HowSelectionWorks = () => {
  return (
    <Box
      as="section"
      aria-labelledby="selection-heading"
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={12}>
          <Stack gap={3} maxW="52ch">
            <Text textStyle="eyebrow" color="olive.600">
              Como funciona a seleção
            </Text>
            <Text
              as="h2"
              id="selection-heading"
              textStyle="h2"
              color="text.primary"
            >
              Um processo transparente e acessível.
            </Text>
          </Stack>

          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={4}
          >
            {STEPS.map((step) => {
              return (
                <Box
                  key={step.id}
                  p={{ base: 6, md: 7 }}
                  bg="surface.base"
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="card"
                >
                  <Stack gap={3}>
                    <Text
                      textStyle="data"
                      color="olive.400"
                      aria-hidden="true"
                      userSelect="none"
                    >
                      {step.number}
                    </Text>
                    <Text as="h3" textStyle="h4" color="text.primary">
                      {step.title}
                    </Text>
                    <Text textStyle="body-sm" color="text.secondary">
                      {step.description}
                    </Text>
                  </Stack>
                </Box>
              );
            })}
          </Grid>

          <Box
            bg="surface.trust"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="card"
            p={{ base: 5, md: 6 }}
            maxW="64ch"
          >
            <Text textStyle="body-sm" color="text.secondary">
              Este processo é genérico e se aplica tanto a bolsas quanto a
              cargos. Quando houver conflito entre o que está descrito aqui e o
              edital oficial de uma oportunidade, o edital prevalece.
            </Text>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HowSelectionWorks;
