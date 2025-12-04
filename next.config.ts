import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/how-it-works',
        destination: '/science#biology',
        permanent: true,
      },
      {
        source: '/poses',
        destination: '/protocols',
        permanent: true,
      },
      {
        source: '/pose/:slug',
        destination: '/protocols',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
