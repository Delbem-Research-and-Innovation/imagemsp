import { Box, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';

type Prefix = {
  id: string;
  tag: string;
  description: string;
};

const PREFIXES: Prefix[] = [
  {
    id: 'dados',
    tag: '[DADOS]',
    description:
      'dúvidas sobre fontes, indicadores, metodologia, atualização ou correções',
  },
  {
    id: 'parceria',
    tag: '[PARCERIA]',
    description: 'propostas de colaboração institucional, acadêmica ou técnica',
  },
  {
    id: 'imprensa',
    tag: '[IMPRENSA]',
    description:
      'entrevistas, informações públicas ou solicitações de comunicação',
  },
  {
    id: 'acessibilidade',
    tag: '[ACESSIBILIDADE]',
    description: 'barreiras de acesso, leitura, navegação ou uso do site',
  },
  {
    id: 'oportunidades',
    tag: '[OPORTUNIDADES]',
    description: 'dúvidas sobre vagas, bolsas ou formas de colaboração',
  },
  {
    id: 'geral',
    tag: '[GERAL]',
    description: 'outros assuntos relacionados ao projeto',
  },
];

/**
 * Contact page subject prefix list — guides users to use the right prefix
 * for manual triage of incoming messages.
 *
 * @example
 * <SubjectPrefixList />
 */
const SubjectPrefixList = () => {
  return (
    <Box
      as="section"
      aria-labelledby="subject-prefix-heading"
      py="clamp(3rem, calc(2rem + 2vw), 5rem)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={6} maxW="760px">
          <Stack gap={2}>
            <Text
              as="h2"
              id="subject-prefix-heading"
              textStyle="h2"
              color="text.primary"
            >
              Assunto da mensagem
            </Text>
            <Text textStyle="body" color="text.secondary">
              Para ajudar no encaminhamento, comece o assunto do email com uma
              das marcações abaixo:
            </Text>
          </Stack>

          <Stack as="ul" gap={3} listStyleType="none" p={0} m={0}>
            {PREFIXES.map((prefix) => {
              return (
                <Box
                  as="li"
                  key={prefix.id}
                  display="flex"
                  gap={3}
                  alignItems="baseline"
                >
                  <Text
                    as="span"
                    textStyle="body"
                    color="text.primary"
                    fontWeight="semibold"
                    fontFamily="mono"
                    flexShrink={0}
                  >
                    {prefix.tag}
                  </Text>
                  <Text as="span" textStyle="body" color="text.secondary">
                    {prefix.description}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SubjectPrefixList;
