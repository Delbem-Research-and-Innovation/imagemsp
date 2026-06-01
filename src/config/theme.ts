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
      bg: '{colors.paper.300}',
      color: '{colors.ink.950}',
      fontFamily: 'var(--font-plex-sans), system-ui, -apple-system, sans-serif',
      textRendering: 'optimizeLegibility',
    },
    /* Newsreader for h1 — editorial authority. h2–h6 inherit body sans-serif. */
    h1: {
      fontFamily: 'var(--font-newsreader), Georgia, "Times New Roman", serif',
    },
    /* Branded text selection */
    '::selection': {
      bg: '{colors.olive.100}',
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
      bg: '{colors.paper.400}',
    },
    '::-webkit-scrollbar-thumb': {
      bg: '{colors.paper.500}',
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
        /** IBM Plex Sans — primary UI/body. Load via next/font as --font-plex-sans. */
        body: {
          value:
            'var(--font-plex-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        /** Newsreader (serif) — display and h1. Load via next/font as --font-newsreader. */
        heading: {
          value: 'var(--font-newsreader), Georgia, "Times New Roman", serif',
        },
        /** Atkinson Hyperlegible — accessibility mode. Load via next/font as --font-atkinson. */
        accessible: {
          value:
            'var(--font-atkinson), "Atkinson Hyperlegible", system-ui, sans-serif',
        },
        /** IBM Plex Mono — code and data. Load via next/font as --font-plex-mono. */
        mono: {
          value: 'var(--font-plex-mono), "SFMono-Regular", Consolas, monospace',
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
        /** card — alias for xl; used in content cards and panels. */
        card: { value: '1.75rem' },
      },
      colors: {
        /**
         * Paper — warm surface scale. Anchors: page bg #F4DFC5 (300), raised #FFF4E8 (100).
         */
        paper: {
          50: { value: '#FFF9F0' },
          100: { value: '#FFF4E8' },
          200: { value: '#FCEBD7' },
          300: { value: '#F4DFC5' },
          400: { value: '#E7D4B7' },
          500: { value: '#D6C1A2' },
        },
        /** Ink — text scale, never pure black. Anchor: primary #1F1712 (950). */
        ink: {
          600: { value: '#6B5F54' },
          700: { value: '#51463D' },
          800: { value: '#3A3028' },
          950: { value: '#1F1712' },
        },
        /** Olive — primary brand. Anchors: brand #3F4F30 (700), muted #5F6B4A (500). */
        olive: {
          50: { value: '#F0F3E8' },
          100: { value: '#DDE5CF' },
          200: { value: '#C3CEAA' },
          300: { value: '#9EAD7E' },
          400: { value: '#75845B' },
          500: { value: '#5F6B4A' },
          600: { value: '#4E5B3B' },
          700: { value: '#3F4F30' },
          800: { value: '#334024' },
          900: { value: '#273219' },
        },
        /** Clay — accent; secondary CTAs, highlights, alerts. Anchor: #9C5737 (500). */
        clay: {
          50: { value: '#F8E8DF' },
          100: { value: '#EBC8B6' },
          200: { value: '#D99B7C' },
          300: { value: '#BF734E' },
          400: { value: '#A65F3E' },
          500: { value: '#9C5737' },
          600: { value: '#81452C' },
          700: { value: '#673421' },
        },
        /** Amber — warm editorial accent; callouts, warnings. Anchor: #8A5A13 (400). */
        amber: {
          50: { value: '#FAECD4' },
          100: { value: '#E9C993' },
          200: { value: '#C58E45' },
          300: { value: '#9A6420' },
          400: { value: '#8A5A13' },
          500: { value: '#70470D' },
        },
        /** Blue — focus ring, info states, auxiliary links. Anchor: #2F5F73 (500). */
        blue: {
          50: { value: '#E5F0F3' },
          100: { value: '#BED9E2' },
          300: { value: '#6A9AAF' },
          500: { value: '#2F5F73' },
          700: { value: '#214555' },
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
        hairline: { value: '0 0 0 1px rgba(31, 23, 18, 0.08)' },
        /** Standard card elevation. */
        raised: {
          value:
            '0 1px 2px rgba(31, 23, 18, 0.08), 0 8px 24px rgba(31, 23, 18, 0.06)',
        },
        /** Floating panel elevation — drawers, dropdowns, modals. */
        floating: {
          value:
            '0 4px 12px rgba(31, 23, 18, 0.10), 0 20px 48px rgba(31, 23, 18, 0.08)',
        },
        /** Focus ring glow — complements :focus-visible outline. */
        focus: { value: '0 0 0 3px rgba(47, 95, 115, 0.35)' },
        /** card — alias for raised; used in content cards. */
        card: {
          value:
            '0 1px 2px rgba(31, 23, 18, 0.08), 0 8px 24px rgba(31, 23, 18, 0.06)',
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
    },
    textStyles: {
      /** Hero-level display — Newsreader serif, homepage headline. */
      display: {
        value: {
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontSize: 'clamp(3rem, 7vw, 6.5rem)',
          lineHeight: '0.95',
          letterSpacing: '-0.04em',
          fontWeight: '600',
        },
      },
      /** Page and section title — Newsreader, editorial authority. */
      h1: {
        value: {
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontSize: 'clamp(2.5rem, 5vw, 4.75rem)',
          lineHeight: '1.12',
          letterSpacing: '-0.035em',
          fontWeight: '600',
        },
      },
      /** Sub-section heading — sans-serif, structural clarity. */
      h2: {
        value: {
          fontFamily:
            'var(--font-plex-sans), system-ui, -apple-system, sans-serif',
          fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
          lineHeight: '1.08',
          letterSpacing: '-0.03em',
          fontWeight: '600',
        },
      },
      /** Card and panel heading. */
      h3: {
        value: {
          fontFamily:
            'var(--font-plex-sans), system-ui, -apple-system, sans-serif',
          fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
          lineHeight: '1.18',
          letterSpacing: '-0.02em',
          fontWeight: '600',
        },
      },
      /** Component-level heading. */
      h4: {
        value: {
          fontFamily:
            'var(--font-plex-sans), system-ui, -apple-system, sans-serif',
          fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)',
          lineHeight: '1.25',
          letterSpacing: '-0.015em',
          fontWeight: '600',
        },
      },
      /** Prominent intro paragraph — section leads, hero sub-copy. */
      lead: {
        value: {
          fontSize: 'clamp(1.25rem, 1.7vw, 1.5rem)',
          lineHeight: '1.5',
          letterSpacing: '-0.01em',
        },
      },
      /** 19px — feature text, card descriptions. */
      'body-lg': {
        value: {
          fontSize: '1.1875rem',
          lineHeight: '1.65',
          letterSpacing: '0',
        },
      },
      /** 18px — default body copy. */
      body: {
        value: {
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
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          lineHeight: '1.4em',
          textTransform: 'uppercase',
          fontWeight: '500',
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
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          lineHeight: '1',
          letterSpacing: '-0.04em',
          fontWeight: '600',
          fontVariantNumeric: 'tabular-nums',
        },
      },
      /** Standard numeric indicator — panels, tables, inline stats. Tabular numerals. */
      data: {
        value: {
          fontSize: '1.25rem',
          lineHeight: '1.25',
          letterSpacing: '-0.015em',
          fontWeight: '600',
          fontVariantNumeric: 'tabular-nums',
        },
      },
      /**
       * Alias for h2 — kept for backwards compatibility with existing components.
       * @deprecated Use `h2` instead.
       */
      'title-2': {
        value: {
          fontFamily:
            'var(--font-plex-sans), system-ui, -apple-system, sans-serif',
          fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
          lineHeight: '1.08',
          letterSpacing: '-0.03em',
          fontWeight: '600',
        },
      },
      /**
       * Alias for h4 — kept for backwards compatibility with existing components.
       * @deprecated Use `h4` instead.
       */
      'title-4': {
        value: {
          fontFamily:
            'var(--font-plex-sans), system-ui, -apple-system, sans-serif',
          fontSize: 'clamp(1.25rem, 1.5vw, 1.5rem)',
          lineHeight: '1.25',
          letterSpacing: '-0.015em',
          fontWeight: '600',
        },
      },
    },
    semanticTokens: {
      colors: {
        /** Page-level backgrounds — outer container and inverse sections. */
        background: {
          /** Main page background — warm paper. */
          page: { value: '{colors.paper.300}' },
          /** Soft variant — slightly lighter reading surface. */
          soft: { value: '{colors.paper.200}' },
          /** Inverse section background — deep ink. */
          inverse: { value: '{colors.ink.950}' },
        },
        /** Content surfaces — cards, panels, insets, map canvas. */
        surface: {
          /** Base reading container — clean, light. */
          base: { value: '{colors.paper.100}' },
          /** Raised card surface — default container elevation. */
          raised: { value: '#FFF6E8' },
          /** Muted zone — depressed areas, sidebars. */
          muted: { value: '{colors.paper.400}' },
          /** Inset surface — input backgrounds, nested containers. */
          inset: { value: '#EEDCC2' },
          /** Data surface — indicator panels, precise and technical. */
          data: { value: '{colors.paper.100}' },
          /** Map canvas — cartographic, warm near-neutral. */
          map: { value: '#F6E7D1' },
          /** Action surface — CTAs, filters, interactive zones. */
          action: { value: '{colors.olive.50}' },
          /** Trust surface — sources, methodology, institutional strips. */
          trust: { value: '{colors.paper.200}' },
          /** High-contrast section — olive.900; pair with text.onContrast. */
          contrast: { value: '{colors.olive.900}' },
          /** Site footer — olive.900; text.onFooter gives 11:1 contrast. */
          footer: { value: '{colors.olive.900}' },
          /** Site header — matches page background. */
          header: { value: '{colors.paper.300}' },
        },
        text: {
          primary: { value: '{colors.ink.950}' },
          secondary: { value: '{colors.ink.700}' },
          muted: { value: '{colors.ink.600}' },
          /** Text on inverse/contrast dark sections. */
          inverse: { value: '{colors.paper.100}' },
          /** Text on primary olive CTAs. */
          onPrimary: { value: '{colors.paper.100}' },
          /** Text on accent clay CTAs. */
          onAccent: { value: '{colors.paper.100}' },
          /** Paper on olive.900 high-contrast sections. */
          onContrast: { value: '{colors.paper.300}' },
          /** Paper on olive.900 footer — 11:1 contrast. */
          onFooter: { value: '{colors.paper.300}' },
          /** Muted warm text on olive.900 footer — body and mission copy. */
          onFooterMuted: { value: '{colors.paper.500}' },
        },
        /** Borders — structural dividers and component outlines. */
        border: {
          /** Subtle divider — card edges, section separators on paper. */
          subtle: { value: '#D9C6A9' },
          /** Default border — form inputs, panel outlines. */
          default: { value: '#BDA98C' },
          /** Strong border — active selection, focused input outline. */
          strong: { value: '{colors.olive.700}' },
        },
        /**
         * Focus ring — blue for clear distinction from olive brand color.
         * Distinct hue improves visibility for keyboard users.
         */
        focus: {
          ring: { value: '{colors.blue.500}' },
          ringOffset: { value: '{colors.paper.100}' },
        },
        /** Primary brand: olive — navigation, primary CTAs, structural elements. */
        brand: {
          solid: { value: '{colors.olive.700}' },
          hover: { value: '{colors.olive.800}' },
          pressed: { value: '{colors.olive.900}' },
          subtle: { value: '{colors.olive.50}' },
          contrast: { value: '{colors.paper.100}' },
          fg: { value: '{colors.olive.700}' },
        },
        /** Accent: clay — secondary CTAs, editorial highlights, alerts. */
        accent: {
          solid: { value: '{colors.clay.500}' },
          hover: { value: '{colors.clay.600}' },
          pressed: { value: '{colors.clay.700}' },
          subtle: { value: '{colors.clay.50}' },
          contrast: { value: '{colors.paper.100}' },
          fg: { value: '{colors.clay.500}' },
        },
        /** Links — navigational, in-content, visited states. */
        link: {
          default: { value: '{colors.olive.700}' },
          hover: { value: '{colors.olive.900}' },
          visited: { value: '{colors.clay.600}' },
        },
        /** Semantic state colors — feedback, validation, and data quality signals. */
        state: {
          /** Positive outcome, verified data, completed action. */
          success: {
            solid: { value: '#41613B' },
            subtle: { value: '{colors.olive.50}' },
            fg: { value: '#41613B' },
            contrast: { value: '{colors.paper.200}' },
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
            contrast: { value: '{colors.paper.200}' },
          },
          /** Neutral information, hints, methodology notes. */
          info: {
            solid: { value: '{colors.blue.500}' },
            subtle: { value: '{colors.blue.50}' },
            fg: { value: '{colors.blue.500}' },
            contrast: { value: '{colors.paper.200}' },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
