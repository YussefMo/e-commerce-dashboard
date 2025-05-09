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
    }
  },
  images: {
    remotePatterns: [{
      hostname: 'res.cloudinary.com'
    }]
  }
};

export default nextConfig;
