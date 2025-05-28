import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  swcMinify: true, // Add this line
};

export default nextConfig;
