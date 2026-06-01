import { Box, Link, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';
import CtaLink from '../../../../components/ui/CtaLink';

const CONTACT_EMAIL = 'contato@imagemsp.org.br';

/**
 * Accessibility and inclusion note — communicates IMAGEM:SP's commitment to
 * accessible participation without framing it as a favor.
 *
 * Provides a direct contact channel for accessibility-related questions.
 *
 * @example
 * <AccessibilityNote />
 */
const AccessibilityNote = () => {
  return (
    <Box
      as="section"
      aria-labelledby="accessibility-note-heading"
      py="clamp(4rem, calc(3rem + 3vw), 7rem)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={6} maxW="64ch">
          <Stack gap={3}>
            <Text textStyle="eyebrow" color="olive.600">
              Acessibilidade e inclusão
            </Text>
            <Text
              as="h2"
              id="accessibility-note-heading"
              textStyle="h2"
              color="text.primary"
            >
              Participação acessível e respeitosa.
            </Text>
          </Stack>

          <Text textStyle="body" color="text.secondary">
            O IMAGEM:SP valoriza comunicação acessível, participação inclusiva e
            colaboração respeitosa. Os editais de oportunidades devem ser
            escritos em linguagem clara e disponibilizar informações de contato
            para dúvidas sobre acessibilidade, documentação ou procedimentos de
            inscrição.
          </Text>

          <Text textStyle="body" color="text.secondary">
            Para dúvidas sobre acessibilidade, adequações no processo de seleção
            ou qualquer necessidade específica, entre em contato com a equipe:
          </Text>

          <Box>
            <Link
              href={`mailto:${CONTACT_EMAIL}?subject=[Acessibilidade]`}
              color="olive.700"
              textDecoration="underline"
              _hover={{ color: 'olive.900' }}
              fontWeight="medium"
            >
              {CONTACT_EMAIL}
            </Link>
          </Box>

          <Box>
            <CtaLink href="/contato" variant="outline">
              Página de contato
            </CtaLink>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AccessibilityNote;
