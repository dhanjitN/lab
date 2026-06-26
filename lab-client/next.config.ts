import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: "out",
  experimental: {
    esmExternals: "loose"
  },
  transpilePackages: ["@react-pdf/renderer"],
  /* experimental: {
    // serverComponentsExternalPackages: ['@react-pdf/renderer']
  } */
  /* config options here */
};

export default nextConfig;
