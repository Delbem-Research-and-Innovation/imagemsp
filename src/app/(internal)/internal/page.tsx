import { Box, Link, Stack, Text } from '@chakra-ui/react';
import type { Metadata } from 'next';
import NextLink from 'next/link';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function InternalIndexPage() {
  return (
    <Box as="main" p={10}>
      <Stack gap={6}>
        <Text as="h1" textStyle="h4" color="text.primary">
          Internal
        </Text>
        <Stack as="ul" gap={2} listStyleType="none" p={0}>
          <li>
            <Link asChild color="link.default">
              <NextLink href="/hero-map">hero-map</NextLink>
            </Link>
          </li>
        </Stack>
      </Stack>
    </Box>
  );
}
