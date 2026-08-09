import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (no SSR/API needed)
  output: "export",

  // Skip TS errors during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // No image optimization needed
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
