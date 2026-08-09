import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for Cloudflare Pages edge runtime
  output: "standalone",

  // External packages that can't be bundled by the edge runtime
  serverExternalPackages: ["sharp"],

  // We handle image optimization via Cloudflare's built-in service
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
