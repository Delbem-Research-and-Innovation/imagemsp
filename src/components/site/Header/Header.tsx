'use client';

import { Box, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';

import { EXPO_OUT } from '../../../config/site';
import Container from '../../ui/Container';
import TextResizer from '../../ui/TextResizer';
import BrandName from './BrandName';
import MobileMenu from './MobileMenu';
import NavLinks from './NavLinks';

const SCROLL_THRESHOLD = 40;

/**
 * Site header: warm parchment strip with brand left, nav centre, CTA right.
 * At rest the bottom border is invisible; on scroll it appears with a light shadow
 * to maintain legibility over page content without visual noise.
 * Desktop: [Brand logo] — [Nav links] — [TextResizer] — [Explorar o mapa].
 * Mobile:  [Brand logo] — [MobileMenu trigger]. TextResizer is inside MobileMenu overlay.
 *
 * @example
 * <Header />
 */
const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg={scrolled ? 'surface.header' : 'transparent'}
      borderBottom="1px solid"
      borderColor={scrolled ? 'border.default' : 'transparent'}
      transition={`background-color 0.4s ${EXPO_OUT}, border-color 0.4s ${EXPO_OUT}`}
      style={{
        boxShadow: scrolled ? '0 1px 8px rgba(33, 24, 20, 0.08)' : 'none',
      }}
    >
      <Container>
        <Flex h="header.height" align="center" justify="space-between" gap={4}>
          {/* Brand */}
          <BrandName />

          {/* Primary nav — desktop */}
          <Box display={{ base: 'none', md: 'block' }}>
            <NavLinks />
          </Box>

          {/* Right: text resizer (desktop) + CTA (desktop) + mobile menu trigger */}
          <Flex align="center" gap={3} flexShrink={0}>
            <Box display={{ base: 'none', md: 'flex' }}>
              <TextResizer />
            </Box>

            <Link
              asChild
              display={{ base: 'none', md: 'inline-flex' }}
              alignItems="center"
              px={5}
              py="11px"
              borderRadius="pill"
              bg="brand.solid"
              color="brand.contrast"
              fontSize="0.8125rem"
              fontWeight="600"
              letterSpacing="0.04em"
              textTransform="uppercase"
              textDecoration="none"
              transition={`all 0.3s ${EXPO_OUT}`}
              _hover={{
                bg: 'brand.hover',
                transform: 'translateY(-1px)',
              }}
            >
              <NextLink href="/mapas">Explorar o mapa</NextLink>
            </Link>

            <Box display={{ base: 'flex', md: 'none' }}>
              <MobileMenu />
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
