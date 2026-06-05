import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import Container from '../../../components/ui/Container';
import CtaLink from '../../../components/ui/CtaLink';

/**
 * Homepage closing — Act 3 routing.
 *
 * Rendered on the inverse (dark) surface to close the editorial sequence with
 * authority. The orange accent bar marks the decisive routing moment.
 *
 * Follows `DataTrustSection` (fontes, metodologia) and precedes the Footer.
 *
 * @example
 * <ClosingCtaSection />
 */
const ClosingCtaSection = () => {
  return (
    <Box
      as="section"
      aria-labelledby="closing-heading"
      py="clamp(5rem, calc(4rem + 4vw), 9rem)"
      bg="background.inverse"
    >
      <Container>
        <Stack gap={10} maxW={{ base: '100%', lg: '64ch' }}>
          <Stack gap={6}>
            <Box
              w="40px"
              h="4px"
              borderRadius="pill"
              bg="accent.solid"
              aria-hidden="true"
            />
            <Text
              as="h2"
              id="closing-heading"
              textStyle="h2"
              color="text.onDark"
            >
              Explore o atlas.
            </Text>
            <Text textStyle="lead" color="text.onDarkBody" maxW="52ch">
              Dados territoriais sobre envelhecimento em São Paulo, organizados
              para facilitar compreensão, pesquisa e políticas públicas.
              Construído com fontes abertas e documentado para uso em análise,
              educação e planejamento.
            </Text>
          </Stack>

          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={3}
            align={{ base: 'flex-start', sm: 'center' }}
          >
            <CtaLink href="/mapas">Explorar o mapa</CtaLink>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default ClosingCtaSection;
