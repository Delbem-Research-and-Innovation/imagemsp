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
      },
      sizes: {
        content: {
          max: { value: '1280px' },
        },
        header: {
          height: { value: '4rem' },
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
