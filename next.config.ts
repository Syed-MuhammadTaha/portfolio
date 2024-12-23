import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "assets.aceternity.com", "aceternity.com"], // Add Unsplash as an allowed domain
  },
  /* other config options */
};

export default nextConfig;
