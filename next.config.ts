import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'img.spoonacular.com'
      }
    ]
  }
};

export default nextConfig;
