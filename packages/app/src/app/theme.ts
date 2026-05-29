import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

// Color scale aligned with ColorBrewer Blues-5 used in the choropleth map layers
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#deebf7' },
          100: { value: '#c6dbef' },
          200: { value: '#9ecae1' },
          300: { value: '#6baed6' },
          400: { value: '#4292c6' },
          500: { value: '#2171b5' },
          600: { value: '#08519c' },
          700: { value: '#084594' },
          800: { value: '#08306b' },
          900: { value: '#041a40' },
        },
        // Warm cream — used for light text on dark surfaces (e.g. mobile menu links)
        ivory: {
          50: { value: '#fffef8' },
          100: { value: '#fdf8ec' },
          200: { value: '#f9f0d4' },
          300: { value: '#f3e4b5' },
          400: { value: '#e9ce88' },
          500: { value: '#ddb75c' },
          600: { value: '#c0963a' },
          700: { value: '#93721e' },
          800: { value: '#634d10' },
          900: { value: '#382a06' },
        },
        // Warm dark — used for backgrounds and body text (e.g. mobile menu bg, footer text)
        charcoal: {
          50: { value: '#f5f2ef' },
          100: { value: '#e6e0d9' },
          200: { value: '#cdc3b7' },
          300: { value: '#b0a291' },
          400: { value: '#8d7f6d' },
          500: { value: '#6b5f4e' },
          600: { value: '#4e4437' },
          700: { value: '#3a3128' },
          800: { value: '#271f18' },
          900: { value: '#160e08' },
        },
        // Warm red — used for Footer background
        coral: {
          50: { value: '#fff3f0' },
          100: { value: '#ffe3dd' },
          200: { value: '#ffbfb3' },
          300: { value: '#ff9585' },
          400: { value: '#ff6a55' },
          500: { value: '#f04a2f' },
          600: { value: '#c83520' },
          700: { value: '#a12715' },
          800: { value: '#781b0d' },
          900: { value: '#4f1007' },
        },
        // Green — reserved for positive indicators and status badges
        verde: {
          50: { value: '#f0fdf4' },
          100: { value: '#dcfce7' },
          200: { value: '#bbf7d0' },
          300: { value: '#86efac' },
          400: { value: '#4ade80' },
          500: { value: '#22c55e' },
          600: { value: '#16a34a' },
          700: { value: '#15803d' },
          800: { value: '#166534' },
          900: { value: '#14532d' },
        },
      },
      radii: {
        // Full-round pill shape — used in nav islands and tag elements
        pill: { value: '9999px' },
      },
      sizes: {
        content: {
          max: { value: '1440px' },
        },
        header: {
          height: { value: '4rem' },
        },
      },
    },
    textStyles: {
      // Large display headline — used for brand mark in Footer and hero sections
      'title-1': {
        value: {
          fontSize: 'clamp(3rem, calc(2rem + 4vw), 6rem)',
          fontWeight: '700',
          letterSpacing: '-0.04em',
          lineHeight: '1',
        },
      },
      // Small body text — used in Footer nav links and secondary content
      'body-sm': {
        value: {
          fontSize: '0.875rem',
          lineHeight: '1.5',
        },
      },
      // Caption — used for legal/data attribution text at the base of Footer
      caption: {
        value: {
          fontSize: '0.75rem',
          lineHeight: '1.4',
          letterSpacing: '0.02em',
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.brand.600}' },
          muted: { value: '{colors.brand.50}' },
          subtle: { value: '{colors.brand.100}' },
          contrast: { value: 'white' },
          fg: { value: '{colors.brand.800}' },
        },
        surface: {
          page: { value: 'white' },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
