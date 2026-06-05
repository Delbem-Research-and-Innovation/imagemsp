import { Box, Link, Text } from '@chakra-ui/react';

import CtaLink from '../../../../components/ui/CtaLink';
import SectionLayout from '../../../../components/ui/SectionLayout';

const CONTACT_EMAIL = 'contato-imagemsp@usp.br';

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
    <SectionLayout
      headingId="accessibility-note-heading"
      eyebrow="Acessibilidade e inclusão"
      heading="Participação acessível e respeitosa."
      gap={6}
      contentMaxW="64ch"
    >
      <Text textStyle="body" color="text.secondary">
        O IMAGEM:SP valoriza comunicação acessível, participação inclusiva e
        colaboração respeitosa. Os editais de oportunidades devem ser escritos
        em linguagem clara e disponibilizar informações de contato para dúvidas
        sobre acessibilidade, documentação ou procedimentos de inscrição.
      </Text>

      <Text textStyle="body" color="text.secondary">
        Para dúvidas sobre acessibilidade, adequações no processo de seleção ou
        qualquer necessidade específica, entre em contato com a equipe:
      </Text>

      <Box>
        <Link
          href={`mailto:${CONTACT_EMAIL}?subject=[Acessibilidade]`}
          color="link.default"
          textDecoration="underline"
          _hover={{ color: 'link.hover' }}
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
    </SectionLayout>
  );
};

export default AccessibilityNote;
