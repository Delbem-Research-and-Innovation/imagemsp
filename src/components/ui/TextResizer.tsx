'use client';

import { Box, HStack } from '@chakra-ui/react';
import * as React from 'react';

import { EXPO_OUT } from '../../config/site';

type TextSize = 'default' | 'large' | 'extra-large';

const STORAGE_KEY = 'IMAGEM:SP-text-size';

type SizeOption = {
  size: TextSize;
  /**
   * Font-size of the "A" glyph — the primary visual scale signal.
   * Three clearly differentiated sizes communicate the three options
   * without needing text labels.
   */
  glyphSize: string;
  ariaLabel: string;
};

const SIZE_OPTIONS: SizeOption[] = [
  {
    size: 'default',
    glyphSize: '0.6875rem',
    ariaLabel: 'Tamanho de texto padrão',
  },
  {
    size: 'large',
    glyphSize: '1rem',
    ariaLabel: 'Tamanho de texto grande',
  },
  {
    size: 'extra-large',
    glyphSize: '1.375rem',
    ariaLabel: 'Tamanho de texto muito grande',
  },
];

type Props = {
  /**
   * Render on a dark (olive.900) background — switches colors to the footer
   * text palette so the control remains legible in the mobile nav overlay.
   * @default false
   */
  onDark?: boolean;
};

/**
 * Reads the persisted text-size preference from localStorage.
 * Returns `'default'` on the server (no `window`) so SSR is safe.
 * A flash-prevention inline script in `layout.tsx` sets `data-text-size`
 * before first paint so the page is already at the correct font-size by
 * the time React hydrates and this initializer runs.
 */
const getInitialSize = (): TextSize => {
  if (typeof window === 'undefined') return 'default';
  const stored = localStorage.getItem(STORAGE_KEY) as TextSize | null;
  return stored === 'large' || stored === 'extra-large' ? stored : 'default';
};

/**
 * Accessible text-size control — three "A" buttons at increasing glyph sizes.
 *
 * Selecting one sets `data-text-size` on `<html>`, which triggers the
 * `html[data-text-size]` font-size overrides in `theme.ts` (112.5% / 125% of
 * the browser base). Because all textStyles use `rem`, the entire design system
 * scales automatically. Preference is persisted via localStorage.
 *
 * Placed in the site header (desktop) and mobile nav overlay (`onDark`).
 *
 * @example
 * <TextResizer />
 * @example
 * // Inside the mobile overlay (olive.900 background)
 * <TextResizer onDark />
 */
const TextResizer = ({ onDark = false }: Props) => {
  const [size, setSize] = React.useState<TextSize>(getInitialSize);

  // Sync `data-text-size` on `<html>` whenever the selection changes.
  // Effect only updates external DOM — never calls setState.
  React.useEffect(() => {
    if (size === 'default') {
      document.documentElement.removeAttribute('data-text-size');
    } else {
      document.documentElement.setAttribute('data-text-size', size);
    }
  }, [size]);

  const apply = ({ next }: { next: TextSize }) => {
    setSize(next);
    if (next === 'default') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
  };

  // Token sets for light (header) vs dark (mobile overlay) context
  const containerBg = onDark ? 'olive.800' : 'surface.inset';
  const activeColor = onDark ? 'text.onFooter' : 'text.primary';
  const inactiveColor = onDark ? 'text.onFooterMuted' : 'text.muted';
  const activeBg = onDark ? 'olive.700' : 'surface.base';
  const hoverColor = onDark ? 'text.onFooter' : 'text.secondary';
  const hoverBg = onDark ? 'olive.700' : 'surface.base';

  return (
    <HStack
      gap={0}
      role="group"
      aria-label="Tamanho do texto"
      bg={containerBg}
      borderRadius="pill"
      p="3px"
    >
      {SIZE_OPTIONS.map(({ size: s, glyphSize, ariaLabel }) => {
        const active = size === s;

        return (
          <Box
            key={s}
            as="button"
            aria-label={ariaLabel}
            aria-pressed={active}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="36px"
            h="36px"
            borderRadius="pill"
            fontSize={glyphSize}
            fontWeight={active ? '700' : '500'}
            lineHeight="1"
            color={active ? activeColor : inactiveColor}
            bg={active ? activeBg : 'transparent'}
            boxShadow={active ? 'hairline' : 'none'}
            transition={`all 0.15s ${EXPO_OUT}`}
            cursor="pointer"
            _hover={{ color: hoverColor, bg: active ? activeBg : hoverBg }}
            _focusVisible={{
              outline: '2px solid',
              outlineColor: 'focus.ring',
              outlineOffset: '2px',
            }}
            onClick={() => {
              return apply({ next: s });
            }}
          >
            A
          </Box>
        );
      })}
    </HStack>
  );
};

export default TextResizer;
