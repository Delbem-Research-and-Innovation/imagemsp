'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { EmotionRegistry } from './emotion-registry';
import { system } from './theme';

export const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <EmotionRegistry>
      <ChakraProvider value={system}>{children}</ChakraProvider>
  </EmotionRegistry>
);
