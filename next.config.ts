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
        hostname:"www.myshkin.dev",
        pathname:"/**"
      }
    ],
  },
  
};

export default nextConfig;
