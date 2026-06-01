import { Box, Flex } from '@chakra-ui/react';

import Container from '../../ui/Container';
import TextResizer from '../../ui/TextResizer';
import BrandName from './BrandName';

/**
 * Compact header for legal pages: brand home link only, no main navigation.
 * Legal pages are reached from the footer, not the primary nav.
 * Uses the same parchment.300 background as the main header for consistency.
 *
 * @example
 * <LegalHeader />
 */
const LegalHeader = () => {
  return (
    <Box
      as="header"
      bg="surface.header"
      borderBottom="1px solid"
      borderColor="border.default"
    >
      <Container>
        <Flex h="header.height" align="center" justify="space-between">
          <BrandName />
          <TextResizer />
        </Flex>
      </Container>
    </Box>
  );
};

export default LegalHeader;
