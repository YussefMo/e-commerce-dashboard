import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb'
    },
    staleTimes: {
      dynamic: 30,
      static: 100
    }
  },
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
