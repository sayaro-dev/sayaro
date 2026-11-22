import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-2fd5737b8b5948e18294f6dbe6d86647.r2.dev",
      },
    ],
  },
};

export default nextConfig;
