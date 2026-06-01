import { Box, Text } from '@chakra-ui/react';

import Container from '../../../../components/ui/Container';

/**
 * Contact page scope notice — explicitly states that this channel does not
 * handle medical emergencies or individual social service requests.
 *
 * Required because the project covers aging, health, services, and
 * vulnerability; the contact page must not appear to be a direct assistance channel.
 *
 * @example
 * <ScopeNotice />
 */
const ScopeNotice = () => {
  return (
    <Box
      as="section"
      aria-label="Aviso sobre escopo do canal"
      py="clamp(2rem, calc(1.5rem + 1.5vw), 4rem)"
      borderBottom="1px solid"
      borderColor="border.subtle"
    >
      <Container>
        <Box
          maxW="760px"
          bg="surface.inset"
          borderLeft="4px solid"
          borderLeftColor="border.strong"
          borderRadius="sm"
          px={{ base: 5, md: 6 }}
          py={{ base: 4, md: 5 }}
        >
          <Text textStyle="body" color="text.primary">
            O IMAGEM:SP não realiza atendimento médico, atendimento de
            emergência ou encaminhamento individual para serviços sociais por
            este canal. Em situações urgentes, procure os serviços públicos
            responsáveis.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default ScopeNotice;
