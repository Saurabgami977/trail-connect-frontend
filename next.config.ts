/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-2a7a6ba5327c4b54a1dc8ddde1d1dd85.r2.dev",
        pathname: "/uploads/**", // Optional: restrict to specific paths
      },
      // Add other domains as needed
      {
        protocol: "https",
        hostname: "your-bucket.r2.dev", // For other R2 buckets
      },
    ],
    // Optional: Adjust image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
