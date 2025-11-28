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
    ];
  },
};

export default nextConfig;
