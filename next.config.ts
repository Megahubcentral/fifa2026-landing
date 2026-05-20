import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "10028"
      }
    ]
  }
};

export default nextConfig;
