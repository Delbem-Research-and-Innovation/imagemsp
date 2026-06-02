'use client';

import { Box, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';

import { mainNav } from '../../../config/navigation';
import { EXPO_OUT } from '../../../config/site';
import TextResizer from '../../ui/TextResizer';

const HamburgerLines = ({ open }: { open: boolean }) => {
  return (
    <Box as="span" display="flex" flexDirection="column" gap="5px" w="22px">
      <Box
        as="span"
        h="2px"
        bg="currentColor"
        transition={`all 0.3s ${EXPO_OUT}`}
        transformOrigin="center"
        transform={open ? 'rotate(45deg) translate(5px, 5px)' : 'none'}
      />
      <Box
        as="span"
        h="2px"
        bg="currentColor"
        transition={`all 0.3s ${EXPO_OUT}`}
        opacity={open ? 0 : 1}
      />
      <Box
        as="span"
        h="2px"
        bg="currentColor"
        transition={`all 0.3s ${EXPO_OUT}`}
        transformOrigin="center"
        transform={open ? 'rotate(-45deg) translate(5px, -5px)' : 'none'}
      />
    </Box>
  );
};

const CloseLines = () => {
  return (
    <Box as="span" display="flex" flexDirection="column" gap="5px" w="22px">
      <Box
        as="span"
        h="2px"
        bg="currentColor"
        transformOrigin="center"
        transform="rotate(45deg) translate(5px, 5px)"
      />
      <Box as="span" h="2px" bg="currentColor" opacity={0} />
      <Box
        as="span"
        h="2px"
        bg="currentColor"
        transformOrigin="center"
        transform="rotate(-45deg) translate(5px, -5px)"
      />
    </Box>
  );
};

type OverlayProps = { open: boolean; onClose: () => void };

const NavOverlay = ({ open, onClose }: OverlayProps) => {
  return (
    <Box
      id="mobile-nav-overlay"
      role="dialog"
      aria-modal={open}
      aria-label="Menu de navegação"
      position="fixed"
      inset={0}
      zIndex={49}
      bg="olive.900"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={8}
      transition={`opacity 0.4s ${EXPO_OUT}, transform 0.4s ${EXPO_OUT}`}
      opacity={open ? 1 : 0}
      transform={open ? 'none' : 'translateY(-8px)'}
      pointerEvents={open ? 'auto' : 'none'}
      aria-hidden={!open}
    >
      <IconButton
        aria-label="Fechar menu"
        variant="ghost"
        color="paper.300"
        minH="44px"
        minW="44px"
        position="absolute"
        top={3}
        right={4}
        _hover={{ bg: 'olive.800' }}
        onClick={onClose}
      >
        <CloseLines />
      </IconButton>

      <Stack as="nav" gap={2} aria-label="Menu de navegação">
        {mainNav.map((entry, i) => {
          return (
            <Link
              key={entry.id}
              asChild
              display="block"
              color="paper.300"
              fontSize="clamp(2rem, calc(1.5rem + 2vw), 3.5rem)"
              fontFamily="var(--font-source-serif), var(--font-gotham), ui-sans-serif, system-ui, sans-serif"
              fontWeight="700"
              letterSpacing="-0.04em"
              lineHeight="1.05"
              textDecoration="none"
              transition={`opacity 0.4s ${EXPO_OUT} ${i * 0.06}s, transform 0.4s ${EXPO_OUT} ${i * 0.06}s, color 0.3s ${EXPO_OUT}`}
              opacity={open ? 1 : 0}
              transform={open ? 'none' : 'translateY(10px)'}
              _hover={{ color: 'amber.300' }}
              onClick={onClose}
            >
              <NextLink href={entry.href}>{entry.label}</NextLink>
            </Link>
          );
        })}

        <Box
          pt={6}
          transition={`opacity 0.4s ${EXPO_OUT} ${mainNav.length * 0.06 + 0.05}s, transform 0.4s ${EXPO_OUT} ${mainNav.length * 0.06 + 0.05}s`}
          opacity={open ? 1 : 0}
          transform={open ? 'none' : 'translateY(10px)'}
        >
          <Link
            asChild
            display="inline-flex"
            alignItems="center"
            px={6}
            py="13px"
            borderRadius="pill"
            bg="amber.100"
            color="ink.950"
            fontSize="0.8125rem"
            fontWeight="600"
            letterSpacing="0.04em"
            textTransform="uppercase"
            textDecoration="none"
            minH="52px"
            transition={`all 0.3s ${EXPO_OUT}`}
            _hover={{ bg: 'amber.200', transform: 'translateY(-1px)' }}
            onClick={onClose}
          >
            <NextLink href="/mapas">Explorar o mapa</NextLink>
          </Link>
        </Box>
      </Stack>

      <Text
        position="absolute"
        bottom={8}
        left={8}
        color="paper.400"
        fontSize="0.75rem"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        IMAGEM:SP
      </Text>

      {/* Text resizer — bottom-right, symmetrical with the IMAGEM:SP watermark */}
      <Box position="absolute" bottom={8} right={8}>
        <TextResizer onDark />
      </Box>
    </Box>
  );
};

/**
 * Full-screen mobile navigation overlay triggered by a hamburger icon.
 * olive.900 background with large parchment links for maximum legibility.
 * Includes a primary CTA at the bottom of the nav list.
 *
 * @example
 * <MobileMenu />
 */
const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label={open ? 'Fechar menu' : 'Abrir menu de navegação'}
        aria-expanded={open}
        aria-controls="mobile-nav-overlay"
        variant="ghost"
        color="ink.950"
        minH="44px"
        minW="44px"
        onClick={() => {
          setOpen((v) => {
            return !v;
          });
        }}
      >
        <HamburgerLines open={open} />
      </IconButton>
      <NavOverlay open={open} onClose={close} />
    </>
  );
};

export default MobileMenu;
