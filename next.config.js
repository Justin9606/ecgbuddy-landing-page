/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true
  }
}

module.exports = nextConfig