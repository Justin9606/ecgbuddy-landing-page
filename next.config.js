/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
