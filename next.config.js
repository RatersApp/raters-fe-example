// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: 'standalone',
  typescript: {
    //todo remove after fix all ts errors
    ignoreBuildErrors: true,
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return {
      ...config,
      optimization: {
        ...config.optimization,
        chunkIds: 'named',
      },
    };
  },
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [
      { hostname: 'image.tmdb.org' },
      { hostname: '**.' + process.env.NEXT_PUBLIC_DOMAIN },
      { hostname: 'm.media-amazon.com' },
      { hostname: 'ratersapp.s3.eu-west-1.amazonaws.com' },
      { hostname: 'scontent.xx.fbcdn.net' },
      { hostname: 'platform-lookaside.fbsbx.com' },
      { hostname: 'lookaside.facebook.com' },
      { hostname: 'graph.facebook.com' },
      { hostname: 'scontent*.fbcdn.net' },
    ],
    loader: 'custom',
    loaderFile: 'loader.ts',
  },
  rewrites: () => {
    return [
      {
        source: '/terms',
        destination: 'https://info.ratersapp.com/terms ',
      },
      {
        source: '/privacy',
        destination: 'https://info.ratersapp.com/privacy',
      },
    ];
  },
  experimental: {
    fontLoaders: [{ loader: '@next/font/google' }],
    esmExternals: false,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
