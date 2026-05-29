'use client';

import { ChakraProvider } from '@chakra-ui/react';

import { EmotionRegistry } from './emotion-registry';
import { system } from './theme';

export const Providers = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale?: string;
}) => (
  <EmotionRegistry>
      <ChakraProvider value={system}>{children}</ChakraProvider>
  </EmotionRegistry>
);
