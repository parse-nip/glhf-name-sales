import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i2c.seadn.io" },
      { protocol: "https", hostname: "gigaverse.io" },
      { protocol: "https", hostname: "**.gigaverse.io" },
    ],
  },
};

export default nextConfig;
