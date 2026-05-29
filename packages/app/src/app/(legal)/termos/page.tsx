import { Heading, Stack, Text } from '@chakra-ui/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso — ImagemSP',
};

const TermosPage = () => {
  return (
    <Stack gap={2}>
      <Heading as="h1" size="2xl">
        Termos de Uso
      </Heading>
      <Text color="fg.muted" fontSize="sm">
        Última atualização: maio de 2026
      </Text>
      <p>Termos de Uso — em breve.</p>
    </Stack>
  );
};

export default TermosPage;
