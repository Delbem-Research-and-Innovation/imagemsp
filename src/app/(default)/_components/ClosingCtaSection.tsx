import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import Container from '../../../components/ui/Container';
import CtaLink from '../../../components/ui/CtaLink';

/**
 * Homepage closing — Act 3 routing.
 *
 * Rendered on `surface.contrast` (olive.900) to signal institutional authority
 * and mark the deliberate end of the editorial sequence. Its role is routing,
 * not navigation — it converts comprehension and trust into action.
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
      bg="surface.contrast"
    >
      <Container>
        <Stack gap={10} maxW={{ base: '100%', lg: '64ch' }}>
          <Stack gap={5}>
            <Text textStyle="eyebrow" color="olive.400">
              Atlas público de inteligência territorial
            </Text>
            <Text
              as="h2"
              id="closing-heading"
              textStyle="h2"
              color="text.onContrast"
            >
              Explore o atlas.
            </Text>
            <Text textStyle="lead" color="text.onFooterMuted" maxW="52ch">
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
            <CtaLink href="/mapas" variant="solid-amber">
              Explorar o mapa
            </CtaLink>
            <CtaLink href="/sobre" variant="outline-dark">
              Conhecer o projeto
            </CtaLink>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default ClosingCtaSection;
