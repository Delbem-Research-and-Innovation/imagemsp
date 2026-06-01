'use client';

import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavEntry } from '../../../config/navigation';
import { EXPO_OUT } from '../../../config/site';

type Props = Pick<NavEntry, 'href' | 'label'>;

/**
 * Navigation link for the site header strip.
 * Active state: olive.700 bottom border — editorial underline indicator.
 * No pill backgrounds on hover to preserve the warm paper strip aesthetic.
 *
 * @example
 * <NavLink href="/sobre" label="Sobre" />
 */
const NavLink = ({ href, label }: Props) => {
  const pathname = usePathname();
  const isCurrent =
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Box
      as="span"
      position="relative"
      display="inline-flex"
      alignItems="center"
    >
      <Link
        asChild
        display="inline-flex"
        alignItems="center"
        px={4}
        py="6px"
        color={isCurrent ? 'text.primary' : 'text.secondary'}
        fontSize="0.8125rem"
        fontWeight={isCurrent ? '600' : '500'}
        letterSpacing="0.05em"
        textTransform="uppercase"
        textDecoration="none"
        transition={`color 0.3s ${EXPO_OUT}`}
        aria-current={isCurrent ? 'page' : undefined}
        _hover={{ color: 'text.primary' }}
      >
        <NextLink href={href}>{label}</NextLink>
      </Link>
      {/* Active indicator: thin olive underline */}
      <Box
        position="absolute"
        bottom={0}
        left={4}
        right={4}
        h="2px"
        bg="olive.700"
        borderRadius="1px"
        transition={`opacity 0.3s ${EXPO_OUT}, transform 0.3s ${EXPO_OUT}`}
        opacity={isCurrent ? 1 : 0}
        transform={isCurrent ? 'scaleX(1)' : 'scaleX(0)'}
        transformOrigin="left"
      />
    </Box>
  );
};

export default NavLink;
