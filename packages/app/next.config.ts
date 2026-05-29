import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [
      [
        '@swc/plugin-formatjs',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
          ast: true,
        },
      ],
    ],
  },
  turbopack: {},
  webpack: (config) => {
    config.module.rules.push({
      test: /[\\/]node_modules[\\/]maplibre-gl[\\/]/,
      type: 'javascript/auto',
    });
    return config;
  },
};

export default nextConfig;
