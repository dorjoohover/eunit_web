/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: "AIzaSyDrmzxc8MCm7PcO0Ood0MEvliD86e3RBEg"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
    ],
  },
  reactStrictMode: false
};

module.exports =  withBundleAnalyzer(nextConfig);
