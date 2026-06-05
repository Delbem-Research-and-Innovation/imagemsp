import { Box, Stack, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';

/**
 * Contact page hero — establishes the page purpose and primary audience.
 *
 * Narrow single-column layout matching the spec's 760px max-width constraint.
 *
 * @example
 * <ContactHero />
 */
const ContactHero = () => {
  return (
    <Box
      as="section"
      aria-labelledby="contact-hero-heading"
      mt="-4.5rem"
      pt="clamp(7rem, calc(5rem + 4vw), 10rem)"
      pb="clamp(3rem, calc(2rem + 2vw), 5rem)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Stack gap={4} maxW="760px">
          <Text textStyle="eyebrow" color="brand.fg">
            Fale com a equipe
          </Text>
          <Text
            as="h1"
            id="contact-hero-heading"
            textStyle="h1"
            color="text.primary"
          >
            Contato
          </Text>
          <Text textStyle="lead" color="text.secondary">
            Fale com a equipe do IMAGEM:SP sobre o projeto, dados, parcerias,
            imprensa ou acessibilidade.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactHero;
