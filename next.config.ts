import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol:"http",
        hostname:"localhost",
        pathname:"/**"
      },
      {
        protocol:"https",
        hostname:"myshkin.dev",
        pathname:"/**"
      }
    ],
  },
  
};

export default nextConfig;
