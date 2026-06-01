import { Box, Link, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';

const EMAIL = 'contato@imagemsp.org.br';

/**
 * Contact page primary email block — presents the official email above the fold.
 *
 * Email is shown as copiable visible text and as a descriptive mailto link,
 * meeting WCAG 2.2 requirements for accessible link text.
 *
 * @example
 * <ContactEmailBlock />
 */
const ContactEmailBlock = () => {
  return (
    <Box
      as="section"
      aria-labelledby="contact-email-heading"
      py="clamp(3rem, calc(2rem + 2vw), 5rem)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={5} maxW="760px">
          <Stack gap={2}>
            <Text
              as="h2"
              id="contact-email-heading"
              textStyle="h2"
              color="text.primary"
            >
              Email oficial
            </Text>
            <Text textStyle="body" color="text.secondary">
              Para entrar em contato, envie sua mensagem para:
            </Text>
          </Stack>

          <Box
            bg="surface.raised"
            boxShadow="card"
            border="1px solid"
            borderColor="border.subtle"
            borderRadius="card"
            px={{ base: 5, md: 8 }}
            py={{ base: 5, md: 6 }}
          >
            <Stack gap={3}>
              <Text
                textStyle="body"
                color="text.primary"
                fontWeight="medium"
                userSelect="all"
              >
                {EMAIL}
              </Text>
              <Link
                href={`mailto:${EMAIL}`}
                color="olive.700"
                textDecoration="underline"
                _hover={{ color: 'olive.900' }}
                fontWeight="medium"
              >
                Enviar email para {EMAIL}
              </Link>
              <Text textStyle="caption" color="text.muted">
                Tempo estimado de resposta: até 5 dias úteis.
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactEmailBlock;
