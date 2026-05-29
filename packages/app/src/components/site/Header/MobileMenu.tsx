'use client';

import { Box, IconButton, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';

import { mainNav } from '../../../config/navigation';

const EXPO_OUT = 'cubic-bezier(0.19, 1, 0.22, 1)';

/**
 * Full-screen mobile navigation overlay triggered by a hamburger icon.
 * Dark charcoal background, column links, expo-out entrance animation.
 *
 * Keyboard: Esc closes the overlay and returns focus to the trigger button.
 * Tab cycles focus within the overlay (focus trap) while it is open.
 *
 * @example
 * <MobileMenu />
 */
const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const hasOpenedRef = React.useRef(false);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Focus management: open → close button; close → trigger (only after first open)
  React.useEffect(() => {
    if (open) {
      hasOpenedRef.current = true;
      closeButtonRef.current?.focus();
    } else if (hasOpenedRef.current) {
      triggerRef.current?.focus();
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'Tab' && overlayRef.current) {
      const focusable = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  };

  return (
    <>
      <IconButton
        ref={triggerRef}
        aria-label={open ? 'Fechar menu' : 'Abrir menu de navegação'}
        aria-expanded={open}
        aria-controls="mobile-nav-overlay"
        variant="ghost"
        color="charcoal.900"
        onClick={() => {
          setOpen((v) => {
            return !v;
          });
        }}
        minH="44px"
        minW="44px"
      >
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
      </IconButton>

      {/* Full-screen overlay — zIndex 51 sits above the fixed header (zIndex 50) */}
      <Box
        ref={overlayRef}
        id="mobile-nav-overlay"
        role="dialog"
        aria-modal
        aria-label="Menu de navegação"
        aria-hidden={!open}
        position="fixed"
        inset={0}
        zIndex={51}
        bg="charcoal.900"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={8}
        transition={`opacity 0.5s ${EXPO_OUT}, transform 0.5s ${EXPO_OUT}`}
        opacity={open ? 1 : 0}
        transform={open ? 'none' : 'translateY(-8px)'}
        pointerEvents={open ? 'auto' : 'none'}
        onKeyDown={handleKeyDown}
      >
        <IconButton
          ref={closeButtonRef}
          aria-label="Fechar menu"
          variant="ghost"
          color="ivory.100"
          position="absolute"
          top={4}
          right={4}
          minH="44px"
          minW="44px"
          _hover={{ bg: 'whiteAlpha.200' }}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Box
            as="span"
            display="flex"
            flexDirection="column"
            gap="5px"
            w="22px"
          >
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
        </IconButton>
        <Stack as="nav" gap={6} aria-label="Navegação principal">
          {mainNav.map((entry, i) => {
            return (
              <Link
                key={entry.id}
                asChild
                color="ivory.100"
                fontSize="clamp(1.875rem, calc(1.4375rem + 1.8vw), 3.25rem)"
                fontWeight="700"
                letterSpacing="-0.04em"
                lineHeight="1.1"
                textDecoration="none"
                transition={`opacity 0.5s ${EXPO_OUT} ${i * 0.07}s, transform 0.5s ${EXPO_OUT} ${i * 0.07}s`}
                opacity={open ? 1 : 0}
                transform={open ? 'none' : 'translateY(12px)'}
                _hover={{ color: 'ivory.400' }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                <NextLink href={entry.href}>{entry.label}</NextLink>
              </Link>
            );
          })}
        </Stack>

        <Text
          position="absolute"
          bottom={8}
          left={8}
          color="charcoal.500"
          fontSize="0.75rem"
          letterSpacing="0.08em"
          textTransform="uppercase"
        >
          ImagemSP
        </Text>
      </Box>
    </>
  );
};

export default MobileMenu;
