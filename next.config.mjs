import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/djlwtz7qw/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        pathname: '/**',
        search: '',
      }
    ],
  },
});
