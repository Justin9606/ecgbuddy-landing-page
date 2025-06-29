/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true
  },
  // Ensure compatibility with WebContainer
  webpack: (config, { dev, isServer }) => {
    // Optimize for development in WebContainer
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  }
}

module.exports = nextConfig