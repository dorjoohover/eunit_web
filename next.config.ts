import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.qpay.mn",
      },
      {
        protocol: "https",
        hostname: "qpay.mn",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
