/* eslint-disable max-lines */
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { geovisTokens } from './themeGeovis';

/**
 * Cartographic data-visualization tokens — map components only.
 * Do not use in general UI. Import from `theme.ts`; never from `themeGeovis.ts` directly.
 */
export const mapTokens = geovisTokens.semantic;

const config = defineConfig({
  globalCss: {
    html: {
      scrollBehavior: 'smooth',
    },
    /*
     * Text-size scaling — multiplies the browser's base font size so ALL rem
     * values in the design system (textStyles, spacing, Chakra components) scale
     * without touching individual token values. Percentages preserve the user's
     * own browser font-size preference (e.g. if the user has 20px set, Large → 22.5px).
     * The data-text-size attribute is managed by TextResizer.tsx and persisted to
     * localStorage. An inline script in layout.tsx applies it before first paint
     * to prevent layout flash.
     */
    'html[data-text-size="large"]': {
      fontSize: '112.5%',
    },
    'html[data-text-size="extra-large"]': {
      fontSize: '125%',
    },
    body: {
      bg: '{colors.paper.200}',
      color: '{colors.ink.950}',
      fontFamily: 'var(--font-sans), system-ui, -apple-system, sans-serif',
      textRendering: 'optimizeLegibility',
    },
    /* Montserrat for h1-h2 — brand authority. h3–h6 inherit body sans-serif. */
    'h1, h2': {
      fontFamily: 'var(--font-heading), system-ui, sans-serif',
    },
    /* Branded text selection */
    '::selection': {
      bg: '{colors.azure.50}',
      color: '{colors.ink.950}',
    },
    /* Branded focus ring — visible keyboard navigation */
    ':focus-visible': {
      outline: '2px solid {colors.focus.ring}',
      outlineOffset: '3px',
      borderRadius: '4px',
    },
    /* Webkit scrollbar — paper palette, not browser default gray */
    '::-webkit-scrollbar': {
      width: '6px',
    },
    '::-webkit-scrollbar-track': {
      bg: '{colors.paper.300}',
    },
    '::-webkit-scrollbar-thumb': {
      bg: '{colors.paper.400}',
      borderRadius: '3px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      bg: '{colors.ink.600}',
    },
    /* Respect reduced-motion — injected via <style> in layout.tsx */
    /* Text-scale resizer CSS vars (--text-scale) injected via <style> in layout.tsx:
       default → 1 | data-text-size="large" → 1.125 | data-text-size="extra-large" → 1.25 */
  },
  theme: {
    tokens: {
      fonts: {
        /** Source Sans 3 — primary UI/body. Load via next/font as --font-sans. */
        body: {
          value:
            'var(--font-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        /** Montserrat — brand headings (display, h1, h2). Load via next/font as --font-heading. */
        heading: {
          value: 'var(--font-heading), system-ui, sans-serif',
        },
        /** Source Serif 4 — editorial long-form (About, institutional). Load as --font-editorial. */
        editorial: {
          value: 'var(--font-editorial), Georgia, serif',
        },
        /** Atkinson Hyperlegible — accessibility mode. Load via next/font as --font-atkinson. */
        accessible: {
          value:
            'var(--font-atkinson), "Atkinson Hyperlegible", system-ui, sans-serif',
        },
        /** Source Code Pro — data, metadata, units, IDs. Load via next/font as --font-mono. */
        mono: {
          value: 'var(--font-mono), "SFMono-Regular", Consolas, monospace',
        },
      },
      radii: {
        none: { value: '0' },
        xs: { value: '0.375rem' },
        sm: { value: '0.625rem' },
        md: { value: '0.875rem' },
        lg: { value: '1.25rem' },
        xl: { value: '1.75rem' },
        '2xl': { value: '2.25rem' },
        pill: { value: '999px' },
        /** card — editorial panel radius; restrained, not consumer-app. */
        card: { value: '1rem' },
      },
      colors: {
        /**
         * Paper — warm linen surface scale.
         * 50: inverse text. 100: elevated warm card bg (#FAF7F2). 200: section surface (#F1ECE4).
         * 300: border subtle (#DED6CE). 400: border strong (#CFC5BA). 500: scrollbar thumb.
         */
        paper: {
          50: { value: '#FDFDF9' },
          100: { value: '#FAF7F2' },
          200: { value: '#F1ECE4' },
          300: { value: '#DED6CE' },
          400: { value: '#CFC5BA' },
          500: { value: '#C5C0B5' },
        },
        /** Ink — text scale, never pure black. Anchor: primary #2F2D3A (950). */
        ink: {
          600: { value: '#7A7480' },
          700: { value: '#625D68' },
          800: { value: '#3C3843' },
          950: { value: '#2F2D3A' },
        },
        /** Green — success state only. Anchors: success #275B3C (600), subtle #EEF5F0 (50). */
        green: {
          50: { value: '#EEF5F0' },
          100: { value: '#D2E9DA' },
          200: { value: '#A5CDB3' },
          300: { value: '#72AF8B' },
          400: { value: '#499167' },
          500: { value: '#35754F' },
          600: { value: '#275B3C' },
          700: { value: '#1B412B' },
          800: { value: '#13301F' },
          900: { value: '#0B1F14' },
        },
        /** Orange — accent; controlled accent CTAs and highlights. Anchor: #D65A2C (500). */
        orange: {
          50: { value: '#FDEADE' },
          500: { value: '#D65A2C' },
          600: { value: '#B9451E' },
          700: { value: '#983514' },
        },
        /** Amber — warm editorial accent; callouts, warnings. Anchor: #8A6512 (400). */
        amber: {
          50: { value: '#FDF5E0' },
          100: { value: '#F5DC94' },
          200: { value: '#D4A938' },
          300: { value: '#A87C18' },
          400: { value: '#8A6512' },
          500: { value: '#6D4F0C' },
        },
        /** Azure — primary brand; CTAs, links, selection, interactive states. Anchor: #17629F (600). */
        azure: {
          50: { value: '#C6E2FF' },
          600: { value: '#17629F' },
          700: { value: '#0F4777' },
          800: { value: '#092F52' },
        },
        /** Red — error, destructive actions, risk. Anchor: #8B2E24 (500). */
        red: {
          50: { value: '#F7E2DE' },
          100: { value: '#E9B8AE' },
          300: { value: '#B85A4D' },
          500: { value: '#8B2E24' },
          700: { value: '#662017' },
        },
      },
      sizes: {
        content: {
          max: { value: '1440px' },
        },
        header: {
          height: { value: '4.5rem' },
        },
      },
      spacing: {
        /** 4px */
        1: { value: '0.25rem' },
        /** 8px */
        2: { value: '0.5rem' },
        /** 12px */
        3: { value: '0.75rem' },
        /** 16px */
        4: { value: '1rem' },
        /** 20px */
        5: { value: '1.25rem' },
        /** 24px */
        6: { value: '1.5rem' },
        /** 32px */
        8: { value: '2rem' },
        /** 40px */
        10: { value: '2.5rem' },
        /** 48px */
        12: { value: '3rem' },
        /** 64px */
        16: { value: '4rem' },
        /** 80px */
        20: { value: '5rem' },
        /** 96px */
        24: { value: '6rem' },
        /** 128px */
        32: { value: '8rem' },
      },
      durations: {
        fast: { value: '120ms' },
        base: { value: '180ms' },
        slow: { value: '260ms' },
      },
      easings: {
        /** Standard easing — UI transitions, feedback responses. */
        standard: { value: 'cubic-bezier(0.2, 0, 0, 1)' },
        /** Emphasized easing — entrances, spatial transitions. */
        emphasized: { value: 'cubic-bezier(0.2, 0, 0, 1)' },
      },
      shadows: {
        /** Zero-elevation outline — card borders, panel hairlines. */
        hairline: { value: '0 0 0 1px rgba(90, 60, 35, 0.12)' },
        /** Standard card elevation — warm-tinted for linen canvas. */
        raised: {
          value:
            '0 1px 2px rgba(90, 60, 35, 0.07), 0 8px 24px rgba(90, 60, 35, 0.08)',
        },
        /** Floating panel elevation — drawers, dropdowns, modals. */
        floating: {
          value:
            '0 4px 12px rgba(90, 60, 35, 0.09), 0 20px 48px rgba(90, 60, 35, 0.10)',
        },
        /** Focus ring glow — complements :focus-visible outline. */
        focus: { value: '0 0 0 3px rgba(23, 98, 159, 0.35)' },
        /** card — alias for raised; used in content cards. */
        card: {
          value:
            '0 1px 2px rgba(90, 60, 35, 0.07), 0 8px 24px rgba(90, 60, 35, 0.08)',
        },
      },
    },
    keyframes: {
      /** Fade in with upward slide — used for section and hero entrances. */
      fadeSlideUp: {
        from: { opacity: '0', transform: 'translateY(16px)' },
        to: { opacity: '1', transform: 'translateY(0)' },
      },
      /** Opacity-only fade — used for image block entrance. */
      fadeIn: {
        from: { opacity: '0' },
        to: { opacity: '1' },
      },
      /**
       * Breathing pulse (scale + opacity) — used by the loading indicator.
       * Combines a gentle grow with a fade so the brand mark reads as
       * "breathing" rather than zooming. Under `prefers-reduced-motion` the
       * global reset in layout.tsx collapses it to a single 0.01ms iteration,
       * leaving the mark at rest (scale 1, opacity 0.55).
       */
      pulseScale: {
        '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
        '50%': { transform: 'scale(1.07)', opacity: '1' },
      },
    },
    textStyles: {
      /** Hero-level display — Montserrat, maximum brand weight. */
      display: {
        value: {
          fontFamily: 'var(--font-heading), system-ui, sans-serif',
          fontSize: 'clamp(3rem, 7vw, 6.5rem)',
          lineHeight: '0.95',
          letterSpacing: '-0.04em',
          fontWeight: '800',
        },
      },
      /** Page and section title — Montserrat, brand authority. */
      h1: {
        value: {
          fontFamily: 'var(--font-heading), system-ui, sans-serif',
          fontSize: 'clamp(2.75rem, 5vw, 5rem)',
          lineHeight: '1.08',
          letterSpacing: '-0.03em',
          fontWeight: '700',
        },
      },
      /** Sub-section heading — Montserrat, section-level title. */
      h2: {
        value: {
          fontFamily: 'var(--font-heading), system-ui, sans-serif',
          fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
          lineHeight: '1.1',
          letterSpacing: '-0.025em',
          fontWeight: '700',
        },
      },
      /** Card and panel heading — inherits body (Source Sans 3). */
      h3: {
        value: {
          fontSize: 'clamp(1.5rem, 2vw, 2rem)',
          lineHeight: '1.2',
          letterSpacing: '-0.015em',
          fontWeight: '600',
        },
      },
      /** Component-level heading — inherits body (Source Sans 3). */
      h4: {
        value: {
          fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)',
          lineHeight: '1.25',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        },
      },
      /** Prominent intro paragraph — section leads, hero sub-copy. */
      lead: {
        value: {
          fontFamily: 'var(--font-editorial), Georgia, serif',
          fontSize: 'clamp(1.25rem, 1.7vw, 1.5rem)',
          lineHeight: '1.5',
          letterSpacing: '0',
        },
      },
      /** 19px — feature text, card descriptions. */
      'body-lg': {
        value: {
          fontFamily: 'var(--font-editorial), Georgia, serif',
          fontSize: '1.1875rem',
          lineHeight: '1.65',
          letterSpacing: '0',
        },
      },
      /** 18px — default body copy. */
      body: {
        value: {
          fontFamily: 'var(--font-editorial), Georgia, serif',
          fontSize: '1.125rem',
          lineHeight: '1.6',
          letterSpacing: '0',
        },
      },
      /** 16px — secondary copy, filter labels. */
      'body-sm': {
        value: {
          fontSize: '1rem',
          lineHeight: '1.55',
          letterSpacing: '0',
        },
      },
      /** 16px medium — UI controls, chips, navigation items. */
      label: {
        value: {
          fontSize: '1rem',
          lineHeight: '1.35',
          letterSpacing: '0.005em',
          fontWeight: '500',
        },
      },
      /** 15px — map labels, source lines. Use sparingly. */
      caption: {
        value: {
          fontSize: '0.9375rem',
          lineHeight: '1.45',
          letterSpacing: '0.01em',
        },
      },
      /** 15px medium — source attribution, footnotes, legal metadata. */
      metadata: {
        value: {
          fontSize: '0.9375rem',
          lineHeight: '1.45',
          letterSpacing: '0.01em',
          fontWeight: '500',
        },
      },
      /** Uppercase — section eyebrows, category markers. */
      eyebrow: {
        value: {
          fontSize: '1.25rem',
          letterSpacing: '0.08em',
          lineHeight: '1.4em',
          textTransform: 'uppercase',
          fontWeight: '500',
          color: 'eyebrown.fg',
        },
      },
      /** 17px semibold — button text. */
      button: {
        value: {
          fontSize: '1.0625rem',
          lineHeight: '1.25',
          letterSpacing: '0',
          fontWeight: '600',
        },
      },
      /** Large numeric indicator — big stat cards, hero metrics. Tabular numerals. */
      'data-lg': {
        value: {
          fontFamily: 'var(--font-mono), "SFMono-Regular", Consolas, monospace',
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          lineHeight: '1',
          letterSpacing: '-0.03em',
          fontWeight: '600',
          fontVariantNumeric: 'tabular-nums',
        },
      },
      /** Standard numeric indicator — panels, tables, inline stats. Tabular numerals. */
      data: {
        value: {
          fontFamily: 'var(--font-mono), "SFMono-Regular", Consolas, monospace',
          fontSize: '1.25rem',
          lineHeight: '1.25',
          letterSpacing: '-0.01em',
          fontWeight: '500',
          fontVariantNumeric: 'tabular-nums',
        },
      },
      /**
       * Alias for h2 — kept for backwards compatibility with existing components.
       * @deprecated Use `h2` instead.
       */
      'title-2': {
        value: {
          fontFamily: 'var(--font-heading), system-ui, sans-serif',
          fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
          lineHeight: '1.1',
          letterSpacing: '-0.025em',
          fontWeight: '700',
        },
      },
      /**
       * Alias for h4 — kept for backwards compatibility with existing components.
       * @deprecated Use `h4` instead.
       */
      'title-4': {
        value: {
          fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)',
          lineHeight: '1.25',
          letterSpacing: '-0.01em',
          fontWeight: '600',
        },
      },
    },
    semanticTokens: {
      colors: {
        /** Page-level backgrounds — outer container and inverse sections. */
        background: {
          /** Main page background — warm linen canvas; the atlas material. */
          page: { value: '{colors.paper.200}' },
          /** Soft variant — subtle warm tint for nested insets. */
          soft: { value: '{colors.paper.100}' },
          /** Inverse section background — deep ink. */
          inverse: { value: '{colors.ink.950}' },
        },
        /** Content surfaces — cards, panels, insets, map canvas. */
        surface: {
          /** Base section surface — warm sand. */
          base: { value: '{colors.paper.200}' },
          /** Raised card surface — white, elevated over surface.base. */
          raised: { value: '#FFFFFF' },
          /** Muted zone — depressed areas, sidebars. */
          muted: { value: '{colors.paper.400}' },
          /** Inset surface — input backgrounds, nested containers. */
          inset: { value: '{colors.paper.100}' },
          /** Data surface — indicator panels, precise and technical. */
          data: { value: '{colors.paper.100}' },
          /** Map canvas — cartographic, clean warm-neutral. */
          map: { value: '#EDEDEA' },
          /** Action surface — brand soft tint; CTAs, filters, interactive zones. */
          action: { value: '{colors.azure.50}' },
          /** Trust surface — sources, methodology, institutional strips.
           * paper.100: slightly lighter than the canvas (paper.200) for a subtle lift.
           */
          trust: { value: '{colors.paper.100}' },
          /** Semi-transparent card lift on background.inverse dark sections. */
          inverseCard: { value: 'rgba(255, 255, 255, 0.06)' },
          /** Site footer — warm sand, matches surface.base. */
          footer: { value: '{colors.paper.200}' },
          /** Site header — warm linen; matches page canvas on scroll. */
          header: { value: '{colors.paper.200}' },
        },
        text: {
          primary: { value: '{colors.ink.950}' },
          secondary: { value: '{colors.ink.700}' },
          muted: { value: '{colors.ink.600}' },
          /** Text on dark inverted sections. */
          inverse: { value: '{colors.paper.50}' },
          /** Text on primary brand CTAs. */
          onPrimary: { value: '{colors.paper.50}' },
          /** Text on accent orange CTAs. */
          onAccent: { value: '{colors.paper.50}' },
          /** Primary text on the warm sand footer. */
          onFooter: { value: '{colors.ink.950}' },
          /** Muted text on the warm sand footer. */
          onFooterMuted: { value: '{colors.ink.700}' },
          /** Primary text on deep dark surfaces (e.g. mobile nav overlay). */
          onDark: { value: '{colors.paper.50}' },
          /** Muted text on deep dark surfaces — azure soft tint for brand context. */
          onDarkMuted: { value: '{colors.azure.50}' },
          /** Body copy on dark inverse sections — warm light gray, high contrast. */
          onDarkBody: { value: '{colors.paper.300}' },
        },
        /** Borders — structural dividers and component outlines. */
        border: {
          /** Subtle divider — card edges, section separators. */
          subtle: { value: '{colors.paper.300}' },
          /** Default border — form inputs, panel outlines. */
          default: { value: '{colors.paper.300}' },
          /** Strong border — prominent panel outlines, emphasis dividers. */
          strong: { value: '{colors.paper.400}' },
          /** Subtle border on semi-transparent cards inside background.inverse dark sections. */
          inverseSubtle: { value: 'rgba(255, 255, 255, 0.10)' },
        },
        /**
         * Focus ring — brand azure applied consistently for interactive elements.
         * Pairs with a glow shadow (shadows.focus) for double-layer visibility.
         */
        focus: {
          ring: { value: '{colors.azure.600}' },
          ringOffset: { value: '{colors.paper.50}' },
        },
        /** Primary brand: azure — CTAs, links, selection, interactive states. */
        brand: {
          solid: { value: '{colors.azure.600}' },
          hover: { value: '{colors.azure.700}' },
          pressed: { value: '{colors.azure.800}' },
          subtle: { value: '{colors.azure.50}' },
          contrast: { value: '{colors.paper.50}' },
          fg: { value: '{colors.azure.600}' },
        },
        /** Eyebrow: orange — section eyebrows, category markers; secondary brand color. */
        eyebrown: {
          solid: { value: '{colors.orange.500}' },
          hover: { value: '{colors.orange.700}' },
          pressed: { value: '{colors.orange.800}' },
          subtle: { value: '{colors.orange.50}' },
          contrast: { value: '{colors.paper.50}' },
          fg: { value: '{colors.orange.500}' },
        },
        /** Accent: orange — controlled accent; use sparingly for emphasis. */
        accent: {
          solid: { value: '{colors.orange.500}' },
          hover: { value: '{colors.orange.600}' },
          pressed: { value: '{colors.orange.700}' },
          subtle: { value: '{colors.orange.50}' },
          contrast: { value: '{colors.paper.50}' },
          fg: { value: '{colors.orange.500}' },
        },
        /** Links — navigational, in-content, visited states. */
        link: {
          default: { value: '{colors.azure.600}' },
          hover: { value: '{colors.azure.800}' },
          visited: { value: '{colors.orange.600}' },
        },
        /** Semantic state colors — feedback, validation, and data quality signals. */
        state: {
          /** Positive outcome, verified data, completed action. */
          success: {
            solid: { value: '{colors.green.600}' },
            subtle: { value: '{colors.green.50}' },
            fg: { value: '{colors.green.600}' },
            contrast: { value: '{colors.paper.100}' },
          },
          /** Caution, data limitation notice, attention required. */
          warning: {
            solid: { value: '{colors.amber.400}' },
            subtle: { value: '{colors.amber.50}' },
            fg: { value: '{colors.amber.400}' },
            contrast: { value: '{colors.ink.950}' },
          },
          /** Error, invalid input, destructive action. */
          error: {
            solid: { value: '{colors.red.500}' },
            subtle: { value: '{colors.red.50}' },
            fg: { value: '{colors.red.500}' },
            contrast: { value: '{colors.paper.100}' },
          },
          /** Neutral information, hints, methodology notes. */
          info: {
            solid: { value: '{colors.azure.600}' },
            subtle: { value: '{colors.azure.50}' },
            fg: { value: '{colors.azure.600}' },
            contrast: { value: '{colors.paper.100}' },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
